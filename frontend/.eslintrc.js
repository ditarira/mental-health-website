module.exports = {
  extends: ['react-app', 'react-app/jest'],
  rules: {
    // Turn off problematic rules for build
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'react-hooks/exhaustive-deps': 'warn'
  }
};
