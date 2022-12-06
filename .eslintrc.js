module.exports = {
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './packages/ui/tsconfig.json',
  },
  extends: ['./node_modules/chetzof-lint-config/eslint/index.js'],
}
