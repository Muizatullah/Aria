// Finds imports whose capital letters don't match the real file on disk.
// Run from the project root:  node check-case.mjs
import fs from "node:fs";
import path from "node:path";

const SRC = "src";
const EXTS = ["", ".js", ".jsx", ".css", ".json", ".svg", ".png", ".jpg", ".jpeg", "/index.jsx", "/index.js"];

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });

// Does this exact-case path exist? Returns the real path if only the case differs.
function checkExact(target) {
  const abs = path.resolve(target);
  const { root } = path.parse(abs);
  const parts = abs.slice(root.length).split(path.sep).filter(Boolean);
  let current = root;
  for (const part of parts) {
    const names = fs.readdirSync(current);
    if (names.includes(part)) { current = path.join(current, part); continue; }
    const alt = names.find((n) => n.toLowerCase() === part.toLowerCase());
    return alt ? { ok: false, real: path.join(current, alt) } : { ok: false, real: null };
  }
  return { ok: true };
}

let problems = 0;
const importRe = /(?:import|export)[^'"]*?from\s*["'](\.[^"']+)["']|import\s*["'](\.[^"']+)["']/g;

for (const file of walk(SRC).filter((f) => /\.(jsx?|css)$/.test(f))) {
//   const text = fs.readFileSync(file, "utf8");
  const text = fs.readFileSync(file, "utf8")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "");
  for (const m of text.matchAll(importRe)) {
    const spec = m[1] || m[2];
    const base = path.resolve(path.dirname(file), spec);
    let found = false, hint = null;
    for (const ext of EXTS) {
      const r = checkExact(base + ext);
      if (r.ok) { found = true; break; }
      if (r.real && !hint) hint = r.real;
    }
    if (!found) {
      problems++;
      console.log(`\n${file}\n  imports: ${spec}\n  real:    ${hint ? path.relative(process.cwd(), hint) : "(no such file)"}`);
    }
  }
}
console.log(problems ? `\n${problems} import(s) to fix.` : "All import capitals match. Safe for Vercel.");