import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Sol Academy product shell", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Sol Academy/);
  assert.match(html, /Command center/);
  assert.match(html, /LOCAL MODE/);
  assert.match(html, /Loading your academy/);
  assert.doesNotMatch(html, /codex-preview/);
  assert.doesNotMatch(html, /react-loading-skeleton/);

  const academySource = await readFile(new URL("../app/AcademyApp.tsx", import.meta.url), "utf8");
  assert.match(academySource, /Read the chain/);
  assert.match(academySource, /DECISION STACK/);
});

test("ships the complete course corpus without private screenshot material", async () => {
  const [course, labs, app, page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/data/course.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/data/labs.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/AcademyApp.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  const moduleBlock = course.slice(course.indexOf("export const modules"), course.indexOf("export const diagnosticQuestions"));
  assert.equal((moduleBlock.match(/\n\s+number:\s\d+,/g) ?? []).length, 12);
  assert.ok((moduleBlock.match(/\n\s+quiz:\s\[/g) ?? []).length >= 12);
  assert.ok((labs.match(/\{ term:/g) ?? []).length >= 80);

  const drillBlock = labs.slice(labs.indexOf("export const drills"), labs.indexOf("export const historicalCases"));
  assert.ok((drillBlock.match(/\n\s+id:\s"/g) ?? []).length >= 6);
  const historyBlock = labs.slice(labs.indexOf("export const historicalCases"));
  assert.ok((historyBlock.match(/\n\s+id:\s"/g) ?? []).length >= 9);

  assert.match(app, /localStorage\.setItem\("sol-academy-progress-v1"/);
  assert.match(app, /function VodNotebook/);
  assert.match(app, /function Calculators/);
  assert.match(page, /<AcademyApp \/>/);
  assert.match(layout, /Sol Academy/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  const publicSurface = `${course}\n${labs}\n${app}`;
  assert.doesNotMatch(publicSurface, /codex-clipboard|AppData\\Local\\Temp/);
  await assert.rejects(access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)));
  await assert.rejects(access(new URL("../app/_sites-preview/preview.css", import.meta.url)));
});

test("all source-library links are valid absolute URLs", async () => {
  const course = await readFile(new URL("../app/data/course.ts", import.meta.url), "utf8");
  const sourceBlock = course.slice(course.indexOf("export const sources"), course.indexOf("export const sourceMap"));
  const urls = [...sourceBlock.matchAll(/url:\s"([^"]+)"/g)].map((match) => match[1]);
  assert.ok(urls.length >= 35);
  for (const url of urls) {
    const parsed = new URL(url);
    assert.match(parsed.protocol, /^https?:$/);
  }
});
