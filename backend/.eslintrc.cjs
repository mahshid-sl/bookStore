module.exports = {
  env: {
    node: true, // به ESLint می‌گوید که این یک محیط Node.js است
    commonjs: true,
    es2021: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    // می‌توانید قوانین را در اینجا اضافه یا لغو کنید
  },
};
