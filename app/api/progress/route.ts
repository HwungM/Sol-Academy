import { getChatGPTUser } from "../../chatgpt-auth";
import { getProgressDb } from "../../../db";

export const dynamic = "force-dynamic";

const maxProgressBytes = 240_000;

type StoredProgressRow = {
  progress_json: string;
  revision: number;
  updated_at: string;
};

function noStoreJson(body: unknown, init?: ResponseInit) {
  const headers = new Headers(init?.headers);
  headers.set("Cache-Control", "private, no-store");
  return Response.json(body, { ...init, headers });
}

async function readProgress(userId: string) {
  return getProgressDb()
    .prepare("SELECT progress_json, revision, updated_at FROM course_progress WHERE user_id = ?1")
    .bind(userId)
    .first<StoredProgressRow>();
}

function parseStoredProgress(row: StoredProgressRow | null) {
  if (!row) return { progress: null, revision: 0, updatedAt: null };
  try {
    return { progress: JSON.parse(row.progress_json) as unknown, revision: row.revision, updatedAt: row.updated_at };
  } catch {
    throw new Error("Saved progress could not be read safely.");
  }
}

export async function GET() {
  const user = await getChatGPTUser();
  if (!user) return noStoreJson({ error: "Sign in with ChatGPT to sync progress." }, { status: 401 });

  try {
    return noStoreJson(parseStoredProgress(await readProgress(user.userId)));
  } catch {
    return noStoreJson({ error: "Cloud progress is temporarily unavailable." }, { status: 503 });
  }
}

export async function PUT(request: Request) {
  const user = await getChatGPTUser();
  if (!user) return noStoreJson({ error: "Sign in with ChatGPT to sync progress." }, { status: 401 });

  let payload: { progress?: unknown; baseRevision?: unknown };
  try {
    payload = await request.json() as { progress?: unknown; baseRevision?: unknown };
  } catch {
    return noStoreJson({ error: "Invalid progress payload." }, { status: 400 });
  }

  if (!payload.progress || typeof payload.progress !== "object" || Array.isArray(payload.progress)) {
    return noStoreJson({ error: "Progress must be an object." }, { status: 400 });
  }
  if (!Number.isInteger(payload.baseRevision) || Number(payload.baseRevision) < 0) {
    return noStoreJson({ error: "A valid base revision is required." }, { status: 400 });
  }

  const progressJson = JSON.stringify(payload.progress);
  if (new TextEncoder().encode(progressJson).byteLength > maxProgressBytes) {
    return noStoreJson({ error: "Progress data is too large to sync." }, { status: 413 });
  }

  const baseRevision = Number(payload.baseRevision);
  const db = getProgressDb();
  try {
    if (baseRevision === 0) {
      const insert = await db
        .prepare("INSERT OR IGNORE INTO course_progress (user_id, progress_json, revision, updated_at) VALUES (?1, ?2, 1, CURRENT_TIMESTAMP)")
        .bind(user.userId, progressJson)
        .run();
      if ((insert.meta.changes ?? 0) > 0) {
        return noStoreJson({ revision: 1, updatedAt: new Date().toISOString() });
      }
    } else {
      const update = await db
        .prepare("UPDATE course_progress SET progress_json = ?1, revision = revision + 1, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?2 AND revision = ?3")
        .bind(progressJson, user.userId, baseRevision)
        .run();
      if ((update.meta.changes ?? 0) > 0) {
        const saved = await readProgress(user.userId);
        return noStoreJson({ revision: saved?.revision ?? baseRevision + 1, updatedAt: saved?.updated_at ?? new Date().toISOString() });
      }
    }

    const current = parseStoredProgress(await readProgress(user.userId));
    return noStoreJson({ error: "Progress changed on another device.", ...current }, { status: 409 });
  } catch {
    return noStoreJson({ error: "Cloud progress is temporarily unavailable." }, { status: 503 });
  }
}
