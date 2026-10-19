import { cpSync, readdirSync, rmSync, writeFileSync } from "node:fs";
// GitHub Pages publishes main / (root) for this repository.
// Replace only paths emitted by the static export; keep editable source intact.
for (const entry of readdirSync("out", { withFileTypes: true })) {
  const destination = entry.name;
  rmSync(destination, { recursive: true, force: true });
  cpSync(`out/${entry.name}`, destination, { recursive: true });
}
writeFileSync(".nojekyll", "");
console.log("GitHub Pages output is ready at the repository root.");
