import summary from "rollup-plugin-summary";
import { terser } from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import copy from "rollup-plugin-copy";

export default {
  input: "build/ms-store-badge.js",
  output: {
    file: "dist/badge/ms-store-badge.bundled.js",
    format: "esm",
  },
  onwarn(warning) {
    if (warning.code !== "THIS_IS_UNDEFINED") {
      console.error(`(!) ${warning.message}`);
    }
  },
  plugins: [
    replace({
      "Reflect.decorate": "undefined",

      // Mark us as production
      "window.__rollup_injected_env": '"prod"',

      delimiters: ["", ""],
      preventAssignment: true,
    }),
    copy({
      targets: [
        { src: "src/images", dest: "dist" },
        { src: "src/staticwebapp.config.json", dest: "dist" },
        { src: "src/iframe.html", dest: "dist" },
        { src: "src/9p1j8s7ccwwt_us_en-us.html", dest: "dist" },
        { src: "src/index.html", dest: "dist" }
      ]
    }),
    resolve(),
    terser({
      ecma: 2020,
      module: true,
      warnings: true,
      mangle: {
        properties: {
          regex: /^__/,
        },
      },
    }),
    summary(),
  ],
};
