const path = require("path");
const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT || 5432),
});

pool.query("SELECT 1", (error) => {
    if (error) {
        console.error("Database connection failed:", error.message);
        return;
    }

    console.log("Database is running");
});

module.exports = pool;