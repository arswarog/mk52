import js from '@eslint/js';

import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tsEslint from 'typescript-eslint';

export default tsEslint.config(
    { ignores: ['dist'] },
    {
        extends: [
            js.configs.recommended,
            importPlugin.flatConfigs.recommended,
            importPlugin.flatConfigs.typescript,
            ...tsEslint.configs.recommended,
        ],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            react: reactPlugin,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    caughtErrorsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                },
            ],

            'import/order': [
                'error',
                {
                    pathGroups: [
                        {
                            pattern: 'react,bem-css-modules',
                            group: 'builtin',
                            position: 'before',
                        },
                        {
                            pattern: '@src/**',
                            group: 'internal',
                        },
                    ],

                    pathGroupsExcludedImportTypes: ['react'],
                    'newlines-between': 'always',
                    groups: ['builtin', 'external', 'internal', 'parent', ['sibling', 'index']],

                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true,
                    },
                },
            ],
            'import/no-unresolved': 'off',

            // Убирает лишние { } вокруг строковых пропсов и детей
            'react/jsx-curly-brace-presence': [
                'error',
                {
                    props: 'never',
                    children: 'never',
                },
            ],

            // Заставляет использовать двойные кавычки в JSX
            'jsx-quotes': ['error', 'prefer-double'],
        },
    },
    {
        plugins: { 'simple-import-sort': simpleImportSort },
        rules: {
            'simple-import-sort/imports': [
                'error',
                {
                    groups: [
                        ['^node:', '^react$', '^react-dom/', '^@eslint/', '^vitest/'], // builtin
                        ['^@?\\w'], // npm-пакеты
                        ['^@src/'], // внутренние scope-пакеты
                        ['^\\u0000'], // side-effect
                        ['^\\.\\.(?!/?$)'], // импорты из вышестоящих директорий
                        ['^\\./(?=.*/)(?!/?$)'], // импорты из текущей директории
                    ],
                },
            ],
            'simple-import-sort/exports': 'error',
            'import/order': 'off',
            'sort-imports': 'off',
        },
    },
    {
        plugins: { prettier: prettierPlugin },
        rules: {
            // выводить ошибку, если форматирование не по Prettier
            'prettier/prettier': ['error', { endOfLine: 'auto' }],
        },
    },
    prettierConfig,
);
