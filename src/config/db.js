import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: { encrypt: true },
  pool: { max: 10, min: 0, idleTimeoutMillis: 30000 }
};

export const getPool = async () => {
  if (!process.env.DB_SERVER) {
    throw new Error("Database configuration missing");
  }
  return await new sql.ConnectionPool(config).connect();
};

export { sql };
