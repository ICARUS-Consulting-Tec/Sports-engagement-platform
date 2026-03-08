const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4002;

const pool = new Pool({
  connectionString: process.env.MATCHES_DB_URL
});

app.get("/health", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW() AS now");
    res.json({
      service: "matches-service",
      status: "ok",
      db: "connected",
      time: result.rows[0].now
    });
  } catch (error) {
    res.status(500).json({
      service: "matches-service",
      status: "error",
      db: "disconnected",
      error: error.message
    });
  }
});

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM matches LIMIT 10");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

app.get("/:id", (req, res) => {
  res.json({
    message: `match ${req.params.id} endpoint working`
  });
});

app.listen(PORT, () => {
  console.log(`matches-service listening on port ${PORT}`);
});