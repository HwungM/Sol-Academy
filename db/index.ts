import { env } from "cloudflare:workers";

export function getProgressDb(): D1Database {
  if (!env.DB) {
    throw new Error("Cloud progress is temporarily unavailable.");
  }
  return env.DB;
}
