module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true
  },
  extends: ["eslint:recommended", "plugin:unicorn/recommended"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {}
};
