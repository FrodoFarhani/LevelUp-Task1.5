module.exports = {
	env: {
		es6: true,
		node: true
	},
	ignorePatterns: ["__tests__/**", "__mocks__/**"],
	extends: ["airbnb-typescript-prettier"],
	globals: {
		Atomics: "readonly",
		SharedArrayBuffer: "readonly"
	},
	parserOptions: {
		project: "tsconfig.json",
		sourceType: "module"
	},
	plugins: ["@typescript-eslint", "import"],
	rules: {
		"@typescript-eslint/interface-name-prefix": ["off"],
		"no-useless-constructor": ["off"],
		"class-methods-use-this": ["off"]
	},
	settings: {
		"import/resolver": {
			node: {
				extensions: [".js", ".jsx", ".ts", ".tsx"],
				moduleDirectory: ["node_modules", "src/"]
			}
		}
	}
};
