const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4009;

const pool = new Pool({
  connectionString: process.env.CARDS_DB_URL
});

// ─── Health Check ────────────────────────────────────────────
app.get("/health", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW() AS now");
    res.json({
      service: "cards-service",
      status: "ok",
      db: "connected",
      time: result.rows[0].now
    });
  } catch (error) {
    res.status(500).json({
      service: "cards-service",
      status: "error",
      db: "disconnected",
      error: error.message
    });
  }
});

// ─── GET /roster ─────────────────────────────────────────────
// Returns all cards with athlete info. If user_id is provided
// as a query param, includes whether each card is unlocked.
app.get("/roster", async (req, res) => {
  try {
    const userId = req.query.user_id ? req.query.user_id : null;

    let query;
    let params = [];

    if (userId) {
      query = `
        SELECT
          c.card_id,
          c.card_image,
          c.rarity,
          a.athlete_id,
          a.espn_athlete_id,
          a.display_name,
          a.position,
          a.jersey_num,
          a.headshot_url,
          a.age,
          a.weight,
          a.height,
          CASE WHEN uc.id IS NOT NULL THEN TRUE ELSE FALSE END AS unlocked
        FROM cards c
        JOIN athletes a ON c.athlete_id = a.athlete_id
        LEFT JOIN user_cards uc ON uc.card_id = c.card_id AND uc.user_id = $1
        WHERE a.athlete_status = TRUE
        ORDER BY a.display_name
      `;
      params = [userId];
    } else {
      query = `
        SELECT
          c.card_id,
          c.card_image,
          c.rarity,
          a.athlete_id,
          a.espn_athlete_id,
          a.display_name,
          a.position,
          a.jersey_num,
          a.headshot_url,
          a.age,
          a.weight,
          a.height,
          FALSE AS unlocked
        FROM cards c
        JOIN athletes a ON c.athlete_id = a.athlete_id
        WHERE a.athlete_status = TRUE
        ORDER BY a.display_name
      `;
    }

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ─── GET /roster/:athleteId ──────────────────────────────────
// Returns a single athlete's card with full statistics.
app.get("/roster/:athleteId", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT
        c.card_id,
        c.card_image,
        c.rarity,
        a.athlete_id,
        a.espn_athlete_id,
        a.display_name,
        a.position,
        a.jersey_num,
        a.headshot_url,
        a.age,
        a.weight,
        a.height,
        a.debut_year,
        s.passes,
        s.p_yards,
        s.r_yards,
        s.interceptions,
        s.touchdowns,
        s.games_played
      FROM cards c
      JOIN athletes a ON c.athlete_id = a.athlete_id
      LEFT JOIN athlete_statistics s ON s.athlete_id = a.athlete_id
      WHERE a.athlete_id = $1`,
      [req.params.athleteId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Athlete not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ─── POST /pack/open ─────────────────────────────────────────
// Opens a card pack for a user. Unlocks random cards they
// don't already own: 3 common + 1 rare/elite + chance for titan.
app.post("/pack/open", async (req, res) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ error: "user_id is required" });
    }

    // Check packs remaining
    const packResult = await pool.query(
      `SELECT packs_remaining FROM user_packs WHERE user_id = $1`,
      [user_id]
    );

    let packsRemaining = 12; // default for new users
    if (packResult.rows.length > 0) {
      packsRemaining = packResult.rows[0].packs_remaining;
    }

    if (packsRemaining <= 0) {
      return res.status(400).json({ error: "No packs remaining" });
    }

    // Get cards the user doesn't own yet
    const lockedCards = await pool.query(
      `SELECT c.card_id, c.rarity, a.display_name, a.position, a.jersey_num
       FROM cards c
       JOIN athletes a ON c.athlete_id = a.athlete_id
       WHERE c.card_id NOT IN (
         SELECT card_id FROM user_cards WHERE user_id = $1
       )
       AND a.athlete_status = TRUE`,
      [user_id]
    );

    if (lockedCards.rows.length === 0) {
      return res.status(400).json({ error: "All cards already unlocked" });
    }

    // Separate by rarity
    const commons = lockedCards.rows.filter(c => c.rarity === "common");
    const rares = lockedCards.rows.filter(c => c.rarity === "rare");
    const elites = lockedCards.rows.filter(c => c.rarity === "elite");
    const titans = lockedCards.rows.filter(c => c.rarity === "titan");

    const unlockedCards = [];

    // Pick up to 3 common cards
    const shuffledCommons = commons.sort(() => Math.random() - 0.5);
    for (let i = 0; i < Math.min(3, shuffledCommons.length); i++) {
      unlockedCards.push(shuffledCommons[i]);
    }

    // Pick 1 rare or elite card
    const rarePool = [...rares, ...elites].sort(() => Math.random() - 0.5);
    if (rarePool.length > 0) {
      unlockedCards.push(rarePool[0]);
    }

    // 20% chance for a titan card
    if (Math.random() < 0.2 && titans.length > 0) {
      const titanCard = titans[Math.floor(Math.random() * titans.length)];
      unlockedCards.push(titanCard);
    }

    // Insert unlocked cards into user_cards
    for (const card of unlockedCards) {
      await pool.query(
        `INSERT INTO user_cards (user_id, card_id)
         VALUES ($1, $2)
         ON CONFLICT (user_id, card_id) DO NOTHING`,
        [user_id, card.card_id]
      );
    }

    // Update packs remaining
    await pool.query(
      `INSERT INTO user_packs (user_id, packs_remaining)
       VALUES ($1, $2)
       ON CONFLICT (user_id) DO UPDATE SET
         packs_remaining = user_packs.packs_remaining - 1`,
      [user_id, 11] // 12 - 1 = 11 for new users
    );

    // Get updated pack count
    const updatedPacks = await pool.query(
      `SELECT packs_remaining FROM user_packs WHERE user_id = $1`,
      [user_id]
    );

    res.json({
      cards_unlocked: unlockedCards,
      packs_remaining: updatedPacks.rows[0].packs_remaining
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ─── GET /collection/:userId ─────────────────────────────────
// Returns collection stats for a user.
app.get("/collection/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const totalCards = await pool.query(
      `SELECT COUNT(*) AS total FROM cards c
       JOIN athletes a ON c.athlete_id = a.athlete_id
       WHERE a.athlete_status = TRUE`
    );

    const unlockedCards = await pool.query(
      `SELECT COUNT(*) AS unlocked FROM user_cards WHERE user_id = $1`,
      [userId]
    );

    const packsResult = await pool.query(
      `SELECT packs_remaining FROM user_packs WHERE user_id = $1`,
      [userId]
    );

    const total = parseInt(totalCards.rows[0].total);
    const unlocked = parseInt(unlockedCards.rows[0].unlocked);
    const packs = packsResult.rows.length > 0
      ? packsResult.rows[0].packs_remaining
      : 12;

    res.json({
      total_cards: total,
      unlocked_cards: unlocked,
      progress_percentage: total > 0 ? Math.round((unlocked / total) * 100) : 0,
      packs_remaining: packs
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`cards-service listening on port ${PORT}`);
});
