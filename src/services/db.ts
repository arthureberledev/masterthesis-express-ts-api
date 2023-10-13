import mysql from "mysql2";

import "dotenv/config";

if (
  !process.env.DB_HOST ||
  !process.env.DB_USER ||
  !process.env.DB_NAME ||
  !process.env.DB_PASS
) {
  throw new Error("Missing database configuration");
}

let pool: mysql.Pool | null = null;

export function getDbPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
      password: process.env.DB_PASS,
    });
  }
  return pool.promise();
}
