module.exports = {
  root: true,
  parserOptions: {
    extraFileExtensions: ['.vue'],
    parser: require.resolve('@typescript-eslint/parser'),
    project: './packages/ui/tsconfig.json',
    tsconfigRootDir: __dirname,
  },

  plugins: [
    // required to apply rules which need type information
    '@typescript-eslint',

    // https://eslint.vuejs.org/user-guide/#why-doesn-t-it-work-on-vue-files
    // required to lint *.vue files
    'vue',
    '@tanstack/query',
    // https://github.com/typescript-eslint/typescript-eslint/issues/389#issuecomment-509292674
    // Prettier has not been included as plugin to avoid performance impact
    // add it as an extension for your IDE
    'import',
    'unused-imports',
    'sonarjs',
    'promise',
  ],
  ignorePatterns: ['.eslintrc.js'],
  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true,
  },

  // Rules order is important, please avoid shuffling them
  extends: [
    // Base ESLint recommended rules
    'eslint:recommended',

    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#usage
    // ESLint typescript rules
    'plugin:@typescript-eslint/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    // Uncomment any of the lines below to choose desired strictness,
    // but leave only one uncommented!
    // See https://eslint.vuejs.org/rules/#available-rules
    // 'plugin:vue/vue3-essential', // Priority A: Essential (Error Prevention)
    // 'plugin:vue/vue3-strongly-recommended', // Priority B: Strongly Recommended (Improving Readability)
    'plugin:vue/vue3-recommended', // Priority C: Recommended (Minimizing Arbitrary Choices and Cognitive Overhead)
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:import/recommended',
    'plugin:sonarjs/recommended',
    'plugin:promise/recommended',
    'canonical',
    'canonical/prettier',
    'prettier',
  ],

  globals: {
    __QUASAR_SSR__: 'readonly',

    __QUASAR_SSR_CLIENT__: 'readonly',

    __QUASAR_SSR_PWA__: 'readonly',

    __QUASAR_SSR_SERVER__: 'readonly',

    __statics: 'readonly',

    Capacitor: 'readonly',

    chrome: 'readonly',
    // Google Analytics
    cordova: 'readonly',
    ga: 'readonly',
    process: 'readonly',
  },

  overrides: [
    {
      extends: ['canonical/typescript'],
      files: '*.ts',
      parserOptions: {
        project: './packages/ui/tsconfig.json',
      },
      rules: {
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/member-delimiter-style': [
          'warn',
          {
            multiline: {
              delimiter: 'none',
              requireLast: true,
            },
            multilineDetection: 'brackets',
            singleline: {
              delimiter: 'semi',
              requireLast: false,
            },
          },
        ],
        '@typescript-eslint/semi': 'off',
        '@typescript-eslint/space-before-function-paren': 'off',
        'canonical/filename-match-exported': 'off',
        'func-style': 'off',
      },
    },
    {
      extends: ['canonical/json'],
      files: '*.json',
    },
    {
      extends: ['canonical/yaml'],
      files: '*.yaml',
    },
  ],

  // https://eslint.vuejs.org/user-guide/#how-to-use-a-custom-parser
  // Must use parserOptions instead of "parser" to allow vue-eslint-parser to keep working
  // `parser: 'vue-eslint-parser'` is already included with any 'plugin:vue/**' config and should be omitted

  // add your custom rules here
  rules: {
    '@typescript-eslint/array-type': ['warn', { default: 'array-simple' }],

    '@typescript-eslint/consistent-indexed-object-style': 'warn',

    // this rule, if on, would require explicit return type on the `render` function
    '@typescript-eslint/explicit-function-return-type': 'off',

    '@typescript-eslint/member-ordering': 'warn',

    // in plain CommonJS modules, you can't use `import foo = require('foo')` to pass this rule, so it has to be disabled
    '@typescript-eslint/no-var-requires': 'off',

    '@typescript-eslint/semi': 'off',

    // '@typescript-eslint/no-floating-promises': 'warn',
    '@typescript-eslint/type-annotation-spacing': 'warn',

    'arrow-body-style': ['warn', 'as-needed'],

    curly: 'warn',

    'import/dynamic-import-chunkname': [
      'warn',
      {
        webpackChunknameFormat: '[a-zA-Z0-57-9-/_]+',
      },
    ],

    'import/extensions': ['warn', 'always', { js: 'never', ts: 'never' }],
    'import/newline-after-import': 'warn',
    'import/no-unresolved': 'warn',

    'import/no-unused-modules': [
      'off',
      {
        missingExports: true,
        unusedExports: true,
        // ignoreExports: [
        // '**/*.d.ts',
        // '**/babel.config.js',
        // '**/quasar.conf.js',
        // '**/*.vue',
        // '**/src/boot/*.ts',
        // '**/src/index.ts',
        // '**/router/index.ts',
        // '**/store/index.ts',
        // ],
      },
    ],

    'import/order': [
      'warn',
      {
        alphabetize: { order: 'asc' },
        groups: [
          'builtin',
          'external',
          'internal',
          'sibling',
          'parent',
          'index',
          'object',
          'type',
        ],
        'newlines-between': 'always',
        pathGroups: [
          {
            group: 'internal',
            pattern: '@/**',
          },
        ],
      },
    ],

    'no-console': 'warn',

    // allow debugger during development only
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    // The core 'no-unused-vars' rules (in the eslint:recommended ruleset)
    // does not work with type definitions
    'no-unused-vars': 'off',

    'prefer-arrow-callback': 'warn',

    'prefer-promise-reject-errors': 'off',

    quotes: ['warn', 'single', { avoidEscape: true }],

    'sonarjs/no-all-duplicated-branches': 'warn',
    'unicorn/filename-case': 'off',

    'unicorn/no-abusive-eslint-disable': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/no-unsafe-regex': 'warn',
    'unicorn/no-unused-properties': 'warn',
    'unicorn/numeric-separators-style': 'warn',
    'unicorn/prefer-node-protocol': 'off',
    'unicorn/prefer-replace-all': 'warn',
    'unused-imports/no-unused-imports': 'warn',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        args: 'after-used',
        argsIgnorePattern: '^_',
        vars: 'all',
        varsIgnorePattern: '^_',
      },
    ],
  },
  settings: {
    // 'import/internal-regex': '^@/',
    'import/resolver': {
      // alias: {
      //   map: [['@', '..']],
      //   extensions: ['.ts', '.js'],
      // },
      typescript: true,
    },
  },
}
