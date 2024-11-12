/**
 * .eslint.js
 *
 * ESLint configuration file.
 */

module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/vue3-strongly-recommended',
        'eslint:recommended',
        '@vue/eslint-config-typescript',
    ],
    rules: {
      'vue/multi-word-component-names': 'off',
      'quotes': ['error', 'single'],
      'semi': ['error', 'never'],
      '@typescript-eslint/no-unused-vars': 'off',
    },
}
