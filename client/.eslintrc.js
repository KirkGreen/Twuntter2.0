module.exports = {
    'env': {
        'browser': true,
        'es6': true,
    },
    'parser': 'babel-eslint',
    "extends": [
        "airbnb",
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly',
        "moment": true,
        "_": true,
        "CSSModule": true,
        "Streamy": true,
        "ReactClass": true,
    },
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 2018,
        'sourceType': 'module'
    },
    'plugins': [
        'react',
        "import",
        "react-hooks"
    ],
    "settings": {
        "react": {
            // default to "createReactClass"
            "pragma": "React", // Pragma to use, default to "React"
            "version": "detect", // React version. "detect" automatically picks the version you have installed.
            // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
            // default to latest and warns if missing
            // It will default to "detect" in the future
        }
    },
    'rules': {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "react/react-in-jsx-scope": "off",
        "semi": ["error", "always"],
        "quotes": ["error", "single"],
        "no-cond-assign": ["error", "always"],
        "eqeqeq": ["error", "always", {
            "null": "ignore"
        }],
        "react/no-string-refs": "off",
        "max-len": [1, 120],
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn"
    },
};