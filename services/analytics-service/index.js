const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4004;

const pool = new Pool({
  connectionString: process.env.ANALYTICS_DB_URL
});

app.get("/health", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW() AS now");
    res.json({
      service: "analytics-service",
      status: "ok",
      db: "connected",
      time: result.rows[0].now
    });
  } catch (error) {
    res.status(500).json({
      service: "analytics-service",
      status: "error",
      db: "disconnected",
      error: error.message
    });
  }
});

app.post("/event", (req, res) => {
  res.json({
    message: "analytics event endpoint working"
  });
});

app.listen(PORT, () => {
  console.log(`analytics-service listening on port ${PORT}`);
});