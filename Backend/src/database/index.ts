import pg from "pg";
import { config } from "../config";

const pool = new pg.Pool({
  user: config.posgres_user,
  host: config.postgres_host,
  //@ts-ignore
  port: config.postgres_port!,
  database: config.postgres_database,
  password: config.postgres_password,
});

export { pool };
