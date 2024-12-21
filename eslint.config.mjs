import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ["node_modules", "dist"],
    rules: {
      "no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "warn", // Avoid using `any`
      "@typescript-eslint/explicit-function-return-type": "off", // Flexible function return types
      "@typescript-eslint/no-empty-function": "warn", // Prevent empty functions
      "no-console": "warn", // Warn on console logs
    },
  },
];