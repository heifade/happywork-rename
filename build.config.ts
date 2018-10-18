import { BuildConfig } from "happywork-node-builder";

export default {
  input: "src/index.ts",
  output: {
    dir: "bin",
    file: "index.js",
    mini: true,
    format: "cjs",
    banner: "#!/usr/bin/env node"
  }
} as BuildConfig;
