# 配置 Eslint  Prettier

> create react app 创建 typescript 项目

## Eslint

### 启用 eslint

+ 创建 `.env`
+ 添加变量 `EXTEND_ESLINT=true`
+ 创建 `.eslintrc.js`, 删除 `package.json` 中 `eslintConfig` 字段内容

### 安装包

+ ~~`eslint`~~: cli中自带无需添加
+ ~~`eslint-plugin-react`~~: cli中自带
+ `@typescript-eslint/parser`: 允许ESLint解析TypeScript代码的解析器
+ `@typescript-eslint/eslint-plugin`: 一个包含一堆特定于TypeScript的ESLint规则的插件

### 配置 `.eslintrc.js`

```js
module.exports = {
  parser: "@typescript-eslint/parser", // 指定 elsint 解析器
  parserOptions: {
    project: "./tsconfig.json", // 指定 tsconfig 配置
    ecmaVersion: 2020, // 允许 ES 2020 特性
    sourceType: "module", // 允许 import 导入
    ecmaFeatures: {
      jsx: true // 允许 jsx
    }
  },
  settings: {
    react: {
      version: "detect" // 指定 eslint-plugin-react 自动检测 react 使用版本
    }
  },
  extends: [
    "plugin:react/recommended", // 使用 @eslint-plugin-react 推荐规则
    "plugin:@typescript-eslint/recommended" //使用 @typescript-eslint/eslint-plugin 推荐规则

    //添加 prettier 配置
    "prettier/@typescript-eslint", // 使用 eslint-config-prettier 来禁用 @typescript-eslint/eslint-plugin 中的 规则，这此规则会与 prettier 冲突的规则
    "plugin:prettier/recommended" // 启用 eslint-plugin-prettier 和 eslint-config-prettier。这将以ESLint错误的形式显示pretertier错误。确保这始终是extends数组中的最后一个配置。
  ],
  rules: {
    // 自定义规则
  },
};

```

## Prettier

### 添加包

+ prettier
+ eslint-config-prettier
+ eslint-plugin-prettier

### 创建 `.prettierrc.js`

```js
module.exports = {
  semi: true,
  trailingComma: "all",
  singleQuote: true,
  printWidth: 120,
  tabWidth: 4
};
```

### 修改 `.eslintrc.js` 同上

### 在 package.json 中添加自动修复 eslint

```json

{
  "scripts": {
    "lint": "eslint '*/**/*.{js,ts,tsx}' --quiet --fix"
  }
}

```

## 提交 git 验证

### 安装包

+ lint-staged
+ husky

### 配置文件 `package.json`

```json
{
  "husky": {
      "hooks": {
          "pre-commit": "lint-staged"
      }
  },
  "lint-staged": {
      "*.{js,ts,tsx}": [
          "eslint --fix"
      ]
  }
}

```

## 配置参考

```js
// https://cn.eslint.org/docs/rules/
module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true
  },
  extends: [
    "plugin:react/recommended",
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended",
    "prettier/react",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended", // 这必须是最后一个配置项
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
      tsx: true
    }
  },
  settings: {
    react: {
      version: "detect" // Tells eslint-plugin-react to automatically detect the version of React to use
    }
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  // 自定义全局变量
  globals: {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  rules: {
    'max-len': 0,
    'camelcase': 1,
    'eqeqeq': 0, //强制全等
    'array-callback-return': 1,
    "arrow-parens": ["error", "as-needed"], // 箭头函数的参数可以不使用圆括号
    "no-unused-expressions": 0, // 允许使用未使用过的表达式，以此来支持a && a()的代码形式
    'no-use-before-define': 0,
    'no-restricted-syntax': 1,
    'no-shadow': [1, {  "allow": ["resolve", "reject", "done", "cb"] }], //
    'no-plusplus': 1,
    'no-underscore-dangle': 0, // 允许在标识符中使用下划线
    'import/extensions': 0, // 取消对文件扩展名的验证
    'import/prefer-default-export': 0,
    'prefer-rest-params': 1,
    'import/no-extraneous-dependencies': 1,
    "global-require": 0, // 取消对require的验证，使得可以使用require来加载图片的相对路径
    "import/no-unresolved": 0, // 取消自动解析路径，以此开启alias的别名路径设置
    "linebreak-style": 0, // 取消换行符\n或\r\n的验证
    'no-unused-vars': 1,
    'template-curly-spacing': 'off',
    'indent': 'off',
    'no-param-reassign': 0, // 禁止对 function 的参数进行重新赋值
    'no-nested-ternary': 0, // 禁止嵌套三元表达式
    'consistent-return': 0,
    'prefer-arrow-callback': 0,
    'prefer-const': 1,
    'func-names': 0,
    'no-else-return': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
};

```

```js

module.exports = {
  plugins: [
    "@typescript-eslint",
    "eslint-comments",
    "jest",
    "promise",
    "unicorn",
  ],
  extends: [
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:eslint-comments/recommended",
    "plugin:jest/recommended",
    "plugin:promise/recommended",
    "plugin:unicorn/recommended",
    "prettier",
    "prettier/react",
    "prettier/@typescript-eslint",
  ],
  env: {
    node: true,
    browser: true,
    jest: true,
  },
  rules: {
    // Too restrictive, writing ugly code to defend against a very unlikely scenario: https://eslint.org/docs/rules/no-prototype-builtins
    "no-prototype-builtins": "off",
    // https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html
    "import/prefer-default-export": "off",
    "import/no-default-export": "error",
    // Too restrictive: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
    "react/destructuring-assignment": "off",
    // No jsx extension: https://github.com/facebook/create-react-app/issues/87#issuecomment-234627904
    "react/jsx-filename-extension": "off",
    // Use function hoisting to improve code readability
    "no-use-before-define": [
      "error",
      { functions: false, classes: true, variables: true },
    ],
    // Makes no sense to allow type inferrence for expression parameters, but require typing the response
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      { allowExpressions: true, allowTypedFunctionExpressions: true },
    ],
    "@typescript-eslint/no-use-before-define": [
      "error",
      { functions: false, classes: true, variables: true, typedefs: true },
    ],
    // Common abbreviations are known and readable
    "unicorn/prevent-abbreviations": "off",
  },
}

```

## 参考文档

+ [Instantly share code, notes, and snippets.](https://gist.github.com/kuhelbeher/e65b3d6d6d84ebe3cda38ceef6fd9b40)
+ [Using ESLint and Prettier in a TypeScript Project](https://www.robertcooper.me/using-eslint-and-prettier-in-a-typescript-project)
