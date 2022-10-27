module.exports = {
  extends: '../../config/.eslintrc',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname
  },
  rules: {
    "@typescript-eslint/no-namespace": "off"
  }
};
