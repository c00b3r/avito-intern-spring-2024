module.exports = {
  parser: "@typescript-eslint/parser",
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "node_modules/"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "@typescript-eslint", "react", "react-compiler"],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "@typescript-eslint/no-explicit-any": "error",
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "prettier/prettier": "error",
    "react-compiler/react-compiler": "error",
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off",
  },
};
