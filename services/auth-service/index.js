const express = require("express");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4001;

app.get("/health", (req, res) => {
  res.json({
    service: "auth-service",
    status: "ok"
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