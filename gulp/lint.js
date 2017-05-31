'use strict';

const _ = require('lodash');
const eslint = require('gulp-eslint');
const recommendedRules = require('eslint/conf/eslint-recommended.js').rules;
const globule = require('globule');

const commonRules = {
  'array-bracket-spacing': ['error', 'never'],
  'array-callback-return': 'error',
  'arrow-body-style': ['error', 'as-needed'],
  'arrow-parens': 'error',
  'arrow-spacing': 'error',
  'block-spacing': 'error',
  'brace-style':  ['error', 'stroustrup'],
  'callback-return': 'error',
  'camelcase': 'error',
  'comma-dangle': 'error',
  'comma-spacing': 'error',
  'comma-style': 'error',
  'complexity': ['error', 20],
  'computed-property-spacing': 'error',
  'consistent-return': 'error',
  'curly': ['error', 'multi-line'],
  'default-case': 'error',
  'dot-location': ['error', 'property'],
  'dot-notation': 'error',
  'eol-last': 'error',
  'eqeqeq': 'error',
  'func-call-spacing': 'error',
  'func-name-matching': 'error',
  'generator-star-spacing': 'error',
  'global-require': 'error',
  'guard-for-in': 'off',
  'handle-callback-err': 'error',
  'indent': ['error', 2],
  'jsx-quotes': 'error',
  'key-spacing': ['error', { 'align': 'colon' }],
  'keyword-spacing': 'error',
  'lines-around-comment': 'error',
  'lines-around-directive': 'error',
  'max-depth': ['error', 4],
  'max-len': ['error', 120],
  'max-nested-callbacks': ['error', 4],
  'max-params': ['error', 3],
  'max-statements': ['error', 20],
  'max-statements-per-line':  ['error', { 'max': 1 }],
  'multiline-ternary': ['error', 'never'],
  'new-cap': 'error',
  'new-parens': 'error',
  'newline-after-var': 'error',
  'newline-before-return': 'error',
  'newline-per-chained-call': ['error', { 'ignoreChainWithDepth': 1 }],
  'no-alert': 'error',
  'no-array-constructor': 'error',
  'no-caller': 'error',
  'no-catch-shadow': 'error',
  'no-compare-neg-zero': 'error',
  'no-console': 'error',
  'no-else-return': 'error',
  'no-eval': 'error',
  'no-extend-native': 'error',
  'no-extra-bind': 'error',
  'no-extra-label': 'error',
  'no-floating-decimal': 'error',
  'no-implicit-coercion': 'error',
  'no-implied-eval': 'error',
  'no-invalid-this': 'error',
  'no-label-var': 'error',
  'no-lone-blocks': 'error',
  'no-lonely-if': 'error',
  'no-loop-func': 'error',
  'no-multi-spaces': ['error', { exceptions: { 'VariableDeclarator': true } }],
  'no-multi-str': 'error',
  'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0 }],
  'no-native-reassign': 'error',
  'no-unsafe-negation': 'error',
  'no-nested-ternary': 'error',
  'no-new': 'error',
  'no-new-func': 'error',
  'no-new-require': 'error',
  'no-new-wrappers': 'error',
  'no-process-exit': 'error',
  'no-proto': 'error',
  'no-return-assign': 'error',
  'no-return-await': 'error',
  'no-self-compare': 'error',
  'no-sequences': 'error',
  'no-shadow': 'error',
  'no-shadow-restricted-names': 'error',
  'no-sync': 'error',
  'no-tabs': 'error',
  'no-template-curly-in-string': 'error',
  'no-throw-literal': 'error',
  'no-trailing-spaces': 'error',
  'no-unmodified-loop-condition': 'error',
  'no-unneeded-ternary': 'error',
  'no-unused-expressions': 'error',
  'no-useless-computed-key': 'error',
  'no-useless-concat': 'error',
  'no-useless-constructor': 'error',
  'no-useless-escape': 'error',
  'no-useless-return': 'error',
  'no-var': 'error',
  'no-warning-comments': ['warn', { 'terms': ['todo', 'fixme'] }],
  'no-whitespace-before-property': 'error',
  'no-with': 'error',
  'nonblock-statement-body-position': ['error', 'beside'],
  'object-curly-spacing': ['error', 'always'],
  'object-property-newline': 'error',
  'operator-linebreak': ['error', 'before'],
  'prefer-arrow-callback': 'error',
  'prefer-const': 'error',
  'prefer-numeric-literals': 'error',
  'prefer-promise-reject-errors': 'error',
  'prefer-rest-params': 'error',
  'prefer-spread': 'error',
  'prefer-template': 'error',
  'quote-props': ['error', 'as-needed'],
  'quotes': ['error', 'single'],
  'rest-spread-spacing': ['error', 'never'],
  'semi': 'error',
  'semi-spacing': 'error',
  'sort-imports': 'error',
  'sort-vars': 'error',
  'space-before-blocks': 'error',
  'space-before-function-paren': ['error', 'never'],
  'space-in-parens': 'error',
  'space-infix-ops': 'error',
  'space-unary-ops': 'error',
  'spaced-comment': ['error', 'always'],
  'strict': 'error',
  'symbol-description': 'error',
  'template-curly-spacing': 'error',
  'template-tag-spacing': 'error',
  'wrap-iife': ['error', 'inside']
};
const mochaRules = {
  'max-nested-callbacks': ['error', 5],
  'no-unused-expressions': 'off',
  'prefer-arrow-callback': 'off',
  'mocha/handle-done-callback' : 'off',
  'mocha/max-top-level-suites' : 'error',
  'mocha/no-exclusive-tests' : 'error',
  'mocha/no-global-tests' : 'error',
  'mocha/no-hooks' : 'off',
  'mocha/no-hooks-for-single-case' : 'off',
  'mocha/no-identical-title' : 'warn',
  'mocha/no-mocha-arrows' : 'error',
  'mocha/no-nested-tests' : 'error',
  'mocha/no-pending-tests' : 'error',
  'mocha/no-return-and-callback' : 'error',
  'mocha/no-sibling-hooks' : 'off',
  'mocha/no-skipped-tests' : 'warn',
  'mocha/no-top-level-hooks' : 'error',
  'mocha/valid-suite-description' : 'off',
  'mocha/valid-test-description' : 'off'
};

const nodeRules = {};
const webRules = {
  'no-console': ['error', { allow: ['warn', 'error'] }]
};

const nodeFiles = [
  'server/**/*.js',
  'gulpfile.js',
  'gulp/**/*.js'
];
const serverTestFiles = [
  'server/test/**/*.js'
];
const webSrcFiles = [
  'web/js/**/*.js'
];
const webTestFiles = [
  'web/test/**/*.js'
];
const allFiles = globule.find(['**/*.js'], { ignore: ['node_modules/**']});

module.exports = (gulp) => {

  gulp.task('lint:continuous', () => {
    gulp.watch(allFiles, ['lint']);
  });

  gulp.task('lint', ['lint:web:src', 'lint:web:test', 'lint:node:src', 'lint:coverage']);

  gulp.task('lint:coverage', () => {
    /* eslint-disable no-console */
    const checkedFiles = globule.find(_.flatten([
      nodeFiles,
      serverTestFiles,
      webSrcFiles,
      webTestFiles
    ]));
    const generatedFiles = globule.find('web/dist/**/*');
    const uncheckedFiles = _.difference(allFiles, checkedFiles, generatedFiles);
    if (uncheckedFiles.length === 0) {
      console.log('All expected files are linted');
      return;
    }

    console.log(
      `These ${uncheckedFiles.length} files aren't checked by lint checker:
  ${uncheckedFiles.join('\n  ')}`);
  });

  gulp.task('lint:web:src', () => {
    gulp
      .src(webSrcFiles)
      .pipe(eslint({
        fix: true,
        rules: _.defaults(
          webRules,
          commonRules,
          recommendedRules
        ),
        globals: [
        ],
        envs: [
          'browser',
          'node',
          'es6'
        ]
      }))
      .pipe(eslint.formatEach('compact', process.stderr))
      .pipe(eslint.failAfterError());
  });

  gulp.task('lint:web:test', () => {
    gulp
      .src(webTestFiles)
      .pipe(eslint({
        fix: true,
        plugins: [
          'mocha'
        ],
        rules: _.defaults(
          mochaRules,
          nodeRules,
          commonRules,
          recommendedRules
        ),
        globals: [
          'expect'
        ],
        envs: [
          'node',
          'mocha',
          'es6'
        ]
      }))
      .pipe(eslint.formatEach('compact', process.stderr))
      .pipe(eslint.failAfterError());
  });

  gulp.task('lint:node:src', () => {
    gulp
      .src(nodeFiles)
      .pipe(eslint({
        fix: true,
        rules: _.defaults(
          nodeRules,
          commonRules,
          recommendedRules
        ),
        globals: [
        ],
        envs: [
          'node',
          'es6'
        ]
      }))
      .pipe(eslint.formatEach('compact', process.stderr))
      .pipe(eslint.failAfterError());
  });
};
