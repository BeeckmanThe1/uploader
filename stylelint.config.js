module.exports = {
  extends: ['stylelint-config-standard-scss'],
  plugins: ['stylelint-scss'],
  rules: {
    'no-descending-specificity': null,
    'block-no-empty': null,
    'max-line-length': null,
    'alpha-value-notation': 'number',
    'scss/at-mixin-pattern': null,
    'scss/no-global-function-names': null,
    'scss/at-import-partial-extension': null,
    'scss/at-import-no-partial-leading-underscore': null,
    'scss/operator-no-unspaced': null,
    'scss/dollar-variable-pattern': null,
    'string-quotes': 'single',
    'comment-empty-line-before': [
      'always',
      {
        ignore: ['stylelint-commands', 'after-comment']
      }
    ],
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['/^mgx/']
      }
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'export']
      }
    ],
    'selector-class-pattern': '^[a-z0-9]+(-[a-z0-9]+)*$',
    'max-empty-lines': 1,
    'declaration-block-no-redundant-longhand-properties': [
      true,
      {
        ignoreShorthands: ['/flex/']
      }
    ]
  }
}