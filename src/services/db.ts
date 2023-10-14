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
      /**
       * Determines the pool's action when no connections are available and the limit has been reached.
       * If true, the pool will queue the connection request and call it when one becomes available. If false, the pool will immediately call back with an error.
       */
      waitForConnections: true,
      /**
       * The maximum number of connections to create at once.
       */
      connectionLimit: 100,
      /**
       * The maximum number of idle connections. (Default: same as connectionLimit)
       */
      maxIdle: 50,
      /**
       * The idle connections timeout, in milliseconds.
       */
      idleTimeout: 30000,
      queueLimit: 0,
      enableKeepAlive: true,
      /**
       * If keep-alive is enabled users can supply an initial delay.
       */
      keepAliveInitialDelay: 100,
    });
  }
  return pool.promise();
}
