// // eslint.config.mjs

// import path from 'path'
// import { fileURLToPath } from 'url'
// import eslintPluginPrettier from 'eslint-plugin-prettier'
// import typescriptEslintParser from '@typescript-eslint/parser'
// import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin'

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

// export default [
//   {
//     languageOptions: {
//       ecmaVersion: 'latest',
//       sourceType: 'module',
//       parser: typescriptEslintParser,
//     },
//     files: ['**/*.ts', '**/*.tsx'], // Specify the files ESLint should target
//     plugins: {
//       '@typescript-eslint': typescriptEslintPlugin,
//       prettier: eslintPluginPrettier,
//     },
//     rules: {
//       'prettier/prettier': [
//         'error',
//         {
//           printWidth: 80,
//           tabWidth: 2,
//           singleQuote: true,
//           trailingComma: 'all',
//           arrowParens: 'always',
//           semi: false,
//         },
//       ],
//     },
//     ignores: ['node_modules/**'], // Define ignored files or directories
//   },
//   {
//     files: ['**/*.js', '**/*.mjs'],
//     languageOptions: {
//       ecmaVersion: 'latest',
//       sourceType: 'module',
//     },
//     rules: {
//       // Define rules specifically for JavaScript files if needed
//     },
//   },
// ]
