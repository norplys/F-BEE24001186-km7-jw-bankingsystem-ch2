/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ['build/*', 'coverage/*'] 
  },
  {
    rules: {
      "no-console": "error"
    },
  },
];
