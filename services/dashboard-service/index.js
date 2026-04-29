const express = require("express");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4015;
const PROFILE_SERVICE_URL =
  process.env.PROFILE_SERVICE_URL || "http://icarus-profile:4006";

async function fetchJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

app.get("/", (req, res) => {
  res.json({
    service: "dashboard-service",
    status: "ok",
    endpoints: ["/health", "/stats/members-per-month"],
  });
});

app.get("/health", (req, res) => {
  res.json({
    service: "dashboard-service",
    status: "ok",
    profileServiceUrl: PROFILE_SERVICE_URL,
  });
});

app.get("/stats/members-per-month", async (req, res) => {
  try {
    const membersPerMonth = await fetchJson(
      `${PROFILE_SERVICE_URL}/stats/members-per-month`,
    );

    res.json({
      service: "dashboard-service",
      source: "profile-service",
      data: membersPerMonth,
    });
  } catch (error) {
    console.error("dashboard-service members-per-month lookup failed:", error);
    res.status(502).json({
      service: "dashboard-service",
      status: "error",
      error: "Unable to fetch members-per-month data",
      details: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`dashboard-service listening on port ${PORT}`);
});
