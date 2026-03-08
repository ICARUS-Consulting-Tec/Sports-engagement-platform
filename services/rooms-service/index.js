const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4003;

const pool = new Pool({
  connectionString: process.env.ROOMS_DB_URL
});

app.get("/health", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW() AS now");
    res.json({
      service: "rooms-service",
      status: "ok",
      db: "connected",
      time: result.rows[0].now
    });
  } catch (error) {
    res.status(500).json({
      service: "rooms-service",
      status: "error",
      db: "disconnected",
      error: error.message
    });
  }
});

app.post("/", (req, res) => {
  res.json({
    message: "create room endpoint working"
  });
});

app.get("/:id", (req, res) => {
  res.json({
    message: `room ${req.params.id} endpoint working`
  });
});

app.listen(PORT, () => {
  console.log(`rooms-service listening on port ${PORT}`);
});