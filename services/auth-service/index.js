const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4001;

const pool = new Pool({
  connectionString: process.env.AUTH_DB_URL
});

app.get("/health", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW() AS now");
    res.json({
      service: "auth-service",
      status: "ok",
      db: "connected",
      time: result.rows[0].now
    });
  } catch (error) {
    res.status(500).json({
      service: "auth-service",
      status: "error",
      db: "disconnected",
      error: error.message
    });
  }
});

app.post("/register", (req, res) => {
  res.json({
    message: "register endpoint working"
  });
});

app.post("/login", (req, res) => {
  res.json({
    message: "login endpoint working"
  });
});

app.get("/", (req, res) => {
  res.json({
    message: "Auth service is running"
  });
});

app.listen(PORT, () => {
  console.log(`auth-service listening on port ${PORT}`);
});