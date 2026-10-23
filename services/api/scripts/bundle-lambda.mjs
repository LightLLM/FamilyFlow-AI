import * as esbuild from "esbuild";
import { cpSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = join(root, "../..");
const outDir = join(root, "dist");

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

await esbuild.build({
  entryPoints: [join(root, "src/lambda.ts")],
  bundle: true,
  platform: "node",
  target: "node22",
  format: "cjs",
  outfile: join(outDir, "lambda.js"),
  sourcemap: true,
  external: ["@aws-sdk/*"],
  logLevel: "info",
});

mkdirSync(join(outDir, "curated-missions"), { recursive: true });
cpSync(
  join(repoRoot, "curated-missions/library.json"),
  join(outDir, "curated-missions/library.json"),
);

console.log("Lambda bundle ready:", outDir);
