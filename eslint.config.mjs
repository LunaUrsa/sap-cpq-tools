import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import react from "eslint-plugin-react";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import reactHooks from "eslint-plugin-react-hooks";
// import _import from "eslint-plugin-import";
import importX from "eslint-plugin-import-x"
import jsxA11Y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-plugin-prettier";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [{
    ignores: [
      "**/watch.js",
      "dist/**/*",
      "**/dist",
      "**/node_modules",
      "**/tailwind.config.js",
    ],
  }, ...fixupConfigRules(compat.extends(
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react-hooks/recommended",
      "plugin:import/recommended",
      "plugin:jsx-a11y/recommended",
      "plugin:import-x/recommended",
      "prettier"
    )), {
    plugins: {
      react: fixupPluginRules(react),
      "@typescript-eslint": fixupPluginRules(typescriptEslint),
      "react-hooks": fixupPluginRules(reactHooks),
      // import: fixupPluginRules(_import),
      "import-x": fixupPluginRules(importX),
      "jsx-a11y": fixupPluginRules(jsxA11Y),
      prettier,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        chrome: "readonly",
      },

      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: [
          "./tsconfig.json",
        //   "./pages/content/tsconfig.json",
        //   "./pages/content-ui/tsconfig.json",
        //   "./pages/devtools/tsconfig.json",
        //   "./pages/devtools-panel/tsconfig.json",
        //   "./pages/newtab/tsconfig.json",
        //   "./pages/options/tsconfig.json",
        //   "./pages/popup/tsconfig.json",
        //   "./pages/sidepanel/tsconfig.json",
        //   "./chrome_extension/tsconfig.json",
        //   "./packages/hmr/tsconfig.build.json",
        ]
      },
    },

    settings: {
      react: {
        version: "detect",
      },
      "import/parsers": {
        // espree: [".js", ".cjs", ".mjs", ".jsx"],
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: [
            "./tsconfig.json",
            // "./pages/content/tsconfig.json",
            // "./pages/content-ui/tsconfig.json",
            // "./pages/devtools/tsconfig.json",
            // "./pages/devtools-panel/tsconfig.json",
            // "./pages/newtab/tsconfig.json",
            // "./pages/options/tsconfig.json",
            // "./pages/popup/tsconfig.json",
            // "./pages/sidepanel/tsconfig.json",
            // "./chrome_extension/tsconfig.json",
            // "./packages/hmr/tsconfig.build.json",
          ]
        },
      },
      "import-x/resolver": {
        typescript: true,
        node: true,
      },
    },

    rules: {
      "react/react-in-jsx-scope": "off",
      "import/no-unresolved": "off",
      "react/prop-types": "off",
    },

    files: [
      "**/*.ts",
      "**/*.tsx",
      "**/*.js",
      "**/*.jsx",
    ],
  },
];
