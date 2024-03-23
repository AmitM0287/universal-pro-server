module.exports = {
	'env': {
		'commonjs': true,
		'es2021': true,
		'node': true
	},
	'extends': 'eslint:recommended',
	'overrides': [
		{
			'env': {
				'node': true
			},
			'files': [
				'.eslintrc.{js,cjs}'
			],
			'parserOptions': {
				'sourceType': 'script'
			}
		}
	],
	'parserOptions': {
		'ecmaVersion': 'latest'
	},
	'rules': {
		indent: ['warn', 'tab'],
		quotes: ['warn', 'single'],
		semi: ['warn', 'always'],
		'linebreak-style': ['error', 'unix'],
		'comma-dangle': 'off',
		'no-cond-assign': ['error', 'always'],
		'no-console': 'off',
		'require-await': 'error',
		'no-unused-vars': ['warn', { 'args': 'after-used', 'vars': 'all', 'ignoreRestSiblings': false }],
		'no-undef': 'error',
		'no-dupe-keys': 'error',
		'no-dupe-args': 'error',
		'no-extra-semi': 'error',
		'no-extra-parens': ['error', 'all'],
		'no-unreachable': 'error',
		'no-unneeded-ternary': 'error',
		'no-useless-return': 'error',
		'no-var': 'error',
		'prefer-const': 'error',
		'prefer-arrow-callback': 'error',
		'arrow-spacing': 'error',
		'arrow-parens': ['error', 'always'],
		'arrow-body-style': 'error',
	}
};
