import { BuildConfig } from "happywork-node-builder";

const config: BuildConfig = {
  input: "src/index.ts",
  output: {
    dir: "bin",
    file: "index.js",
    mini: true,
    format: "cjs",
    banner: "#!/usr/bin/env node"
  }
};

export default config;
