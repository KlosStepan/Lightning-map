export default [
    // ...js.configs.recommended etc above...
    {
        files: ["src/**/*.{ts,tsx,js,jsx}"],
        ignores: [
            "build/",
            "node_modules/",
            "src/App.test.tsx",
            "src/pages/UIKit.tsx",
        ],
        languageOptions: {
            parser: (await import("@typescript-eslint/parser")).default,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
                project: "./tsconfig.json",
            },
            globals: {
                process: "readonly",
            },
        },
        plugins: {
            "@typescript-eslint": (await import("@typescript-eslint/eslint-plugin")).default,
            react: (await import("eslint-plugin-react")).default,
            "react-hooks": (await import("eslint-plugin-react-hooks")).default,
        },
        rules: {
            // Let Prettier handle formatting; keep ESLint for logic issues.
            indent: "off",
            quotes: "off",
            semi: "off",

            // TS/React basics
            "@typescript-eslint/no-unused-vars": [
                "warn",
                { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
            ],
            "@typescript-eslint/no-explicit-any": "off",

            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off",

            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",
        },
        settings: {
            react: {
                version: "detect",
            },
        },
    },
];