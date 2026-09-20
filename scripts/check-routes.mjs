import { existsSync, readFileSync, statSync } from "node:fs";
import { extname, join } from "node:path";

const root = new URL("../dist/", import.meta.url).pathname;
const routes = [
  "/",
  "/bachelor/",
  "/enak/",
  "/web_eval/",
  "/energoplay/",
  "/edulab/",
  "/if24/",
  "/cv/",
  "/contact/",
  "/profile/",
  "/404.html",
];

function outputPath(pathname) {
  if (pathname === "/") return join(root, "index.html");
  if (pathname === "/404.html") return join(root, "404.html");
  if (extname(pathname)) return join(root, pathname.slice(1));
  return join(root, pathname.slice(1), "index.html");
}

const failures = [];

for (const route of routes) {
  const file = outputPath(route);
  if (!existsSync(file)) {
    failures.push(`Missing route: ${route} (${file})`);
    continue;
  }

  const html = readFileSync(file, "utf8");
  if (!html.includes("G-4SVEVVKG8L")) failures.push(`Analytics missing from ${route}`);
  if (!html.includes("Skip to content")) failures.push(`Skip link missing from ${route}`);

  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const value = match[1];
    if (!value.startsWith("/") || value.startsWith("//")) continue;
    const pathname = decodeURI(value.split(/[?#]/)[0]);
    if (!pathname) continue;
    const target = outputPath(pathname);
    if (!existsSync(target)) failures.push(`Broken local reference in ${route}: ${value}`);
    else if (statSync(target).isDirectory()) failures.push(`Reference resolves to a directory in ${route}: ${value}`);
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Verified ${routes.length} generated routes and their local references.`);
