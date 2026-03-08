const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.MATCHES_DB_URL
});

async function migrate() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS matches_sync_log (
        id SERIAL PRIMARY KEY,
        source VARCHAR(100) NOT NULL,
        sync_date TIMESTAMP NOT NULL DEFAULT NOW(),
        status VARCHAR(50) NOT NULL
      );
    `);

    console.log("Migration completed");
  } catch (error) {
    console.error("Migration failed:", error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

migrate();