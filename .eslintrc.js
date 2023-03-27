module.exports = {
    env: {
        node: true,
        jest: true,
        es2021: true,
    },
    // root: true,
    extends: [
        "airbnb-base",
        "airbnb-typescript/base",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
    ],
    overrides: [],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "tsconfig.json",
        tsconfigRootDir: __dirname,
    },
    plugins: ["@typescript-eslint", "prettier"],
    ignorePatterns: ["node_modules", "lib", "dist", ".eslintrc.js"],
    rules: {
        "prettier/prettier": [
            "warn",
            {
                endOfLine: "auto",
            },
        ],
        "no-console": "off",
        "linebreak-style": "off",
        "no-nested-ternary": "off",
        radix: "off",
        "no-underscore-dangle": "off",
        "import/prefer-default-export": "off",
        "class-methods-use-this": "off",
        "@typescript-eslint/dot-notation": "off",
    },
}
