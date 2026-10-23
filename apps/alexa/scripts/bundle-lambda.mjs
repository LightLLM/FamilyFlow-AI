import * as esbuild from "esbuild";
import { mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "dist");

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

await esbuild.build({
  entryPoints: [join(root, "src/handlers.ts")],
  bundle: true,
  platform: "node",
  target: "node22",
  format: "cjs",
  outfile: join(outDir, "index.js"),
  sourcemap: true,
  logLevel: "info",
});

console.log("Alexa Lambda bundle ready:", outDir);
