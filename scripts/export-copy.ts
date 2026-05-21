// Extracts all site copy from the real source modules and writes JSON.
// Run via: node --experimental-strip-types scripts/export-copy.ts <out.json>
import { CASE_STUDIES, LANDER, CONTACT } from "../src/content/portfolio.ts";
import { SITE } from "../src/config/site.ts";
import { writeFileSync } from "node:fs";

const out = process.argv[2];
if (!out) {
  console.error("usage: export-copy.ts <out.json>");
  process.exit(1);
}
writeFileSync(
  out,
  JSON.stringify({ SITE, LANDER, CONTACT, CASE_STUDIES }, null, 2),
);
console.error("wrote " + out);
