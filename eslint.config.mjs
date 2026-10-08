import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // Distributable components must run outside Next.js, so they cannot use next/* APIs.
    files: ["src/registry/**"],
    rules: {
      "@next/next/no-img-element": "off",
      "no-restricted-imports": [
        "error",
        { patterns: [{ group: ["next", "next/*", "@/*"], message: "Registry components must stay framework-agnostic and use relative imports." }] },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
