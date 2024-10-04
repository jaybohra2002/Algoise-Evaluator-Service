/* eslint-disable prettier/prettier */
module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser for TypeScript
  extends: [
    "plugin:@typescript-eslint/recommended", // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    "plugin:prettier/recommended", // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors
  ],
  parserOptions: {
    ecmaVersion: "latest", // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
  },
  env: {
    es6: true, // Enables ES6 global variables
    node: true, // Enables Node.js global variables and Node.js scoping
  },
  "plugins": ["simple-import-sort"],
  rules: {
    "no-var": "error", // Disallow the use of var, use let or const instead
    //semi: ["error", "always"], // Enforce semicolons at the end of statements
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error"
  },
};
