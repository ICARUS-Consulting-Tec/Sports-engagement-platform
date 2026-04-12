const express = require("express");
const { Pool } = require("pg");
const {
  classicMatches,
  historyOverview,
  historyStats,
  legendaryPlayers,
  timelineEvents,
} = require("./historyData");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4007;

const pool = new Pool({
  connectionString: process.env.HISTORY_DB_URL,
});

app.get("/", (req, res) => {
  res.json({
    service: "history-service",
    status: "ok",
    endpoints: [
      "/health",
      "/overview",
      "/stats",
      "/timeline",
      "/timeline/:id",
      "/players",
      "/players/:id",
      "/matches",
      "/matches/:id",
    ],
  });
});

app.get("/health", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW() AS now");
    res.json({
      service: "history-service",
      status: "ok",
      db: "connected",
      time: result.rows[0].now,
    });
  } catch (error) {
    res.status(500).json({
      service: "history-service",
      status: "error",
      db: "disconnected",
      error: error.message,
    });
  }
});

app.get("/overview", (req, res) => {
  res.json(historyOverview);
});

app.get("/stats", (req, res) => {
  res.json(historyStats);
});

app.get("/timeline", (req, res) => {
  res.json(timelineEvents);
});

app.get("/timeline/:id", (req, res) => {
  const event = timelineEvents.find((item) => item.id === req.params.id);

  if (!event) {
    return res.status(404).json({
      error: "Timeline event not found",
    });
  }

  res.json(event);
});

app.get("/players", (req, res) => {
  res.json(legendaryPlayers);
});

app.get("/players/:id", (req, res) => {
  const player = legendaryPlayers.find((item) => item.id === req.params.id);

  if (!player) {
    return res.status(404).json({
      error: "Legendary player not found",
    });
  }

  res.json(player);
});

app.get("/matches", (req, res) => {
  res.json(classicMatches);
});

app.get("/matches/:id", (req, res) => {
  const match = classicMatches.find((item) => item.id === req.params.id);

  if (!match) {
    return res.status(404).json({
      error: "Classic match not found",
    });
  }

  res.json(match);
});

app.listen(PORT, () => {
  console.log(`history-service listening on port ${PORT}`);
});
