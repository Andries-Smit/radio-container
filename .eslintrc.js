module.exports = {
    extends: "./node_modules/@mendix/pluggable-widgets-tools/configs/eslint.ts.base.json",
    "plugins": [
        "react-hooks"
      ],
      "rules": {
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn"
      }
};
