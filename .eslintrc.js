module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
        'node': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module'
    },
    'plugins': [
        'react',
        '@typescript-eslint'
    ],
    'settings': {
        'react': {
            'version': 'detect'
        }
    },
    'rules': {
        'comma-dangle': ['error', {
            'arrays': 'never',
            'objects': 'never',
            'imports': 'never',
            'exports': 'never',
            'functions': 'never'
        }],
        'quotes': [2, 'single', { 'avoidEscape': true }],
        'no-multi-spaces': ['error'],
        'object-curly-spacing': ['error', 'always'],
        'array-bracket-spacing': ['error', 'never'],
        'no-unused-vars': ['error', { 'vars': 'all', 'args': 'after-used', 'ignoreRestSiblings': false }],
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-var-requires': 0
    }
}
