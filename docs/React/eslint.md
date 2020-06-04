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

## 参考文档

+ [Instantly share code, notes, and snippets.](https://gist.github.com/kuhelbeher/e65b3d6d6d84ebe3cda38ceef6fd9b40)
+ [Using ESLint and Prettier in a TypeScript Project](https://www.robertcooper.me/using-eslint-and-prettier-in-a-typescript-project)
