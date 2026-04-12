const express = require("express");
const { pool } = require("./db");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4010;
const WORDLE_GAME_ID = 1;
const DEFAULT_USER_ID = 1;
const DEFAULT_TIMEZONE = process.env.WORDLE_TIMEZONE || "America/Monterrey";
const MAX_ATTEMPTS = 6;
const WORD_LENGTH = 5;
const PROFILE_SERVICE_URL = process.env.PROFILE_SERVICE_URL || "http://icarus-profile:4006";

function formatDateInTimezone(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: DEFAULT_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  return `${year}-${month}-${day}`;
}

function normalizePuzzleDate(input) {
  const rawValue = input || formatDateInTimezone();

  if (!/^\d{4}-\d{2}-\d{2}$/.test(rawValue)) {
    throw new Error("Invalid puzzle_date. Expected YYYY-MM-DD.");
  }

  return rawValue;
}

function normalizePlayedAt(input) {
  if (!input) {
    return new Date().toISOString();
  }

  const parsedDate = new Date(input);

  if (Number.isNaN(parsedDate.getTime())) {
    throw new Error("Invalid played_at value.");
  }

  return parsedDate.toISOString();
}

function parsePositiveInteger(value, fieldName, { allowZero = false, fallback } = {}) {
  const resolvedValue = value ?? fallback;
  const parsedValue = Number.parseInt(String(resolvedValue), 10);

  if (Number.isNaN(parsedValue)) {
    throw new Error(`Invalid ${fieldName}. Expected an integer.`);
  }

  if (allowZero ? parsedValue < 0 : parsedValue <= 0) {
    throw new Error(`Invalid ${fieldName}.`);
  }

  return parsedValue;
}

function serializeSession(row) {
  return {
    sessionId: row.session_id,
    gameId: row.game_id,
    userId: row.user_id,
    score: row.score,
    playtimeSeconds: row.playtime_seconds,
    playedAt: row.played_at,
    attemptCount: row.attempt_count,
    puzzleDate: row.puzzle_date,
  };
}

function serializeLeaderboardEntry(row) {
  return {
    leaderboardId: row.leaderboard_id,
    gameId: row.game_id,
    userId: row.user_id,
    playerName: `User ${row.user_id}`,
    score: row.score,
    rank: row.rank,
    attemptCount: row.attempt_count,
    playtimeSeconds: row.playtime_seconds,
    puzzleDate: row.puzzle_date,
  };
}

async function getProfileName(userId) {
  try {
    const response = await fetch(`${PROFILE_SERVICE_URL}/${userId}`);

    if (!response.ok) {
      return `User ${userId}`;
    }

    const data = await response.json();
    const profile = data?.profile;

    if (!profile) {
      return `User ${userId}`;
    }

    const firstName = (profile.first_name || "").trim();
    return profile.username || firstName || `User ${userId}`;
  } catch (error) {
    console.error(`offseason-service profile lookup failed for user ${userId}:`, error);
    return `User ${userId}`;
  }
}

async function getWordleConfig() {
  const result = await pool.query(
    `
      SELECT game_id, name
      FROM games
      WHERE game_id = $1
      LIMIT 1;
    `,
    [WORDLE_GAME_ID],
  );

  if (result.rowCount === 0) {
    throw new Error("Wordle game configuration is missing in games table.");
  }

  return {
    gameId: result.rows[0].game_id,
    gameName: result.rows[0].name,
    userId: DEFAULT_USER_ID,
    puzzleDate: formatDateInTimezone(),
    maxAttempts: MAX_ATTEMPTS,
    wordLength: WORD_LENGTH,
  };
}

async function getWordleLeaderboardByDate(puzzleDateInput) {
  const puzzleDate = normalizePuzzleDate(puzzleDateInput);
  const result = await pool.query(
    `
      WITH best_sessions AS (
        SELECT
          session_id,
          game_id,
          user_id,
          attempt_count,
          playtime_seconds,
          puzzle_date,
          played_at,
          ROW_NUMBER() OVER (
            PARTITION BY user_id
            ORDER BY attempt_count ASC, playtime_seconds ASC, played_at ASC, session_id ASC
          ) AS best_session_rank
        FROM game_sessions
        WHERE game_id = $1
          AND puzzle_date = $2
      ),
      ranked_sessions AS (
        SELECT
          session_id,
          game_id,
          user_id,
          attempt_count,
          playtime_seconds,
          puzzle_date,
          ROW_NUMBER() OVER (
            ORDER BY attempt_count ASC, playtime_seconds ASC, played_at ASC, user_id ASC
          ) AS rank
        FROM best_sessions
        WHERE best_session_rank = 1
      )
      SELECT
        session_id AS leaderboard_id,
        game_id,
        user_id,
        attempt_count AS score,
        rank,
        attempt_count,
        playtime_seconds,
        puzzle_date
      FROM ranked_sessions
      ORDER BY rank ASC, user_id ASC
      LIMIT 5;
    `,
    [WORDLE_GAME_ID, puzzleDate],
  );

  const rowsWithNames = await Promise.all(
    result.rows.map(async (row) => ({
      ...row,
      player_name: await getProfileName(row.user_id),
    })),
  );

  return {
    gameId: WORDLE_GAME_ID,
    puzzleDate,
    entries: rowsWithNames.map((row) => ({
      ...serializeLeaderboardEntry(row),
      playerName: row.player_name,
    })),
  };
}

async function getWordleHistoryByUser(userIdInput) {
  const userId = parsePositiveInteger(userIdInput, "user_id", { fallback: DEFAULT_USER_ID });
  const result = await pool.query(
    `
      SELECT session_id, game_id, user_id, score, playtime_seconds, played_at, attempt_count, puzzle_date
      FROM game_sessions
      WHERE game_id = $1
        AND user_id = $2
      ORDER BY puzzle_date DESC, played_at DESC, session_id DESC;
    `,
    [WORDLE_GAME_ID, userId],
  );

  return {
    gameId: WORDLE_GAME_ID,
    userId,
    sessions: result.rows.map(serializeSession),
  };
}

async function rebuildWordleLeaderboard(client, puzzleDateInput) {
  const puzzleDate = normalizePuzzleDate(puzzleDateInput);

  await client.query(
    `
      DELETE FROM leaderboard
      WHERE game_id = $1
        AND puzzle_date = $2;
    `,
    [WORDLE_GAME_ID, puzzleDate],
  );

  await client.query(
    `
      INSERT INTO leaderboard (
        game_id,
        user_id,
        score,
        rank,
        attempt_count,
        playtime_seconds,
        puzzle_date
      )
      WITH best_sessions AS (
        SELECT
          game_id,
          user_id,
          attempt_count,
          playtime_seconds,
          puzzle_date,
          played_at,
          ROW_NUMBER() OVER (
            PARTITION BY user_id
            ORDER BY attempt_count ASC, playtime_seconds ASC, played_at ASC, session_id ASC
          ) AS best_session_rank
        FROM game_sessions
        WHERE game_id = $1
          AND puzzle_date = $2
      ),
      ranked_sessions AS (
        SELECT
          game_id,
          user_id,
          attempt_count,
          playtime_seconds,
          puzzle_date,
          ROW_NUMBER() OVER (
            ORDER BY attempt_count ASC, playtime_seconds ASC, played_at ASC, user_id ASC
          ) AS rank
        FROM best_sessions
        WHERE best_session_rank = 1
      )
      SELECT
        game_id,
        user_id,
        attempt_count AS score,
        rank,
        attempt_count,
        playtime_seconds,
        puzzle_date
      FROM ranked_sessions;
    `,
    [WORDLE_GAME_ID, puzzleDate],
  );

  return getWordleLeaderboardByDate(puzzleDate);
}

async function saveWordleSession(payload) {
  const userId = parsePositiveInteger(payload.user_id, "user_id", {
    fallback: DEFAULT_USER_ID,
  });
  const attemptCount = parsePositiveInteger(payload.attempt_count, "attempt_count");
  const playtimeSeconds = parsePositiveInteger(payload.playtime_seconds, "playtime_seconds", {
    allowZero: true,
  });
  const puzzleDate = normalizePuzzleDate(payload.puzzle_date);
  const playedAt = normalizePlayedAt(payload.played_at);
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const insertResult = await client.query(
      `
        INSERT INTO game_sessions (
          game_id,
          user_id,
          score,
          playtime_seconds,
          played_at,
          attempt_count,
          puzzle_date
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING session_id, game_id, user_id, score, playtime_seconds, played_at, attempt_count, puzzle_date;
      `,
      [
        WORDLE_GAME_ID,
        userId,
        attemptCount,
        playtimeSeconds,
        playedAt,
        attemptCount,
        puzzleDate,
      ],
    );

    const leaderboard = await rebuildWordleLeaderboard(client, puzzleDate);

    await client.query("COMMIT");

    return {
      session: serializeSession(insertResult.rows[0]),
      leaderboard,
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

function buildDatabaseError(error) {
  if (error.code === "42501") {
    return "Database permission denied for offseason-service user";
  }

  if (error.code === "42703") {
    return "Wordle schema is missing required columns in offseason_db";
  }

  return error.message;
}

function asyncHandler(handler) {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (error) {
      console.error("offseason-service error:", error);
      res.status(500).json({
        status: "error",
        error: buildDatabaseError(error),
      });
    }
  };
}

app.get("/", (req, res) => {
  res.json({
    service: "offseason-service",
    module: "wordle",
    status: "ok",
    endpoints: [
      "/health",
      "/wordle/config",
      "/wordle/leaderboard",
      "/wordle/leaderboard/:date",
      "/wordle/history",
      "/wordle/history/:userId",
      "/wordle/session",
    ],
  });
});

app.get("/health", asyncHandler(async (req, res) => {
  const result = await pool.query("SELECT NOW() AS now");
  res.json({
    service: "offseason-service",
    module: "wordle",
    status: "ok",
    db: "connected",
    time: result.rows[0].now,
  });
}));

app.get("/wordle/config", asyncHandler(async (req, res) => {
  const config = await getWordleConfig();
  res.json(config);
}));

app.get("/wordle/leaderboard", asyncHandler(async (req, res) => {
  const config = await getWordleConfig();
  const leaderboard = await getWordleLeaderboardByDate(config.puzzleDate);
  res.json(leaderboard);
}));

app.get("/wordle/leaderboard/:date", asyncHandler(async (req, res) => {
  const leaderboard = await getWordleLeaderboardByDate(req.params.date);
  res.json(leaderboard);
}));

app.get("/wordle/history", asyncHandler(async (req, res) => {
  const history = await getWordleHistoryByUser(req.query.userId || DEFAULT_USER_ID);
  res.json(history);
}));

app.get("/wordle/history/:userId", asyncHandler(async (req, res) => {
  const history = await getWordleHistoryByUser(req.params.userId);
  res.json(history);
}));

app.post("/wordle/session", asyncHandler(async (req, res) => {
  const payload = {
    user_id: req.body.user_id,
    attempt_count: req.body.attempt_count,
    playtime_seconds: req.body.playtime_seconds,
    played_at: req.body.played_at,
    puzzle_date: req.body.puzzle_date,
  };

  const savedSession = await saveWordleSession(payload);
  res.status(201).json(savedSession);
}));

app.listen(PORT, () => {
  console.log(`offseason-service listening on port ${PORT}`);
});
