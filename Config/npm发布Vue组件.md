# npm 发布通用`Vue`组件

发布`vue`通用组件说明文档

## `package.json` 文档说明

+ `main`： 编译后的 `commonJS` 规范代码入口
+ `module`： 编译后的 `ES6模块` 规范代码入口
+ `files`: 配置发布包含文件
+ `scripts`: 添加 `"prepublishOnly": "npm run build"` 发布时自动打包
+ `repository`: 指定你的代码存放的地方
+ `publishConfig`: `npm public` 时配置集合，可配置 `tag`, `registry`和`access`
+ `private`: 设置为 `true` 时， 不发布

## `vue-sfc-rollup` 使用

> `vue-sfc-rollup` 将Vue单个文件组件（SFC）（或多个SFC的库）编译为可通过npm共享的表单提供最小的设置

+ 全局使用

```bash
# Install globally (recommended)
npm install -g vue-sfc-rollup
sfc-init
```

+ 使用 `npx` 本地调用

```bash
yarn add vue-src-rollup
# For immediate, no-install usage
npx vue-sfc-rollup
```

+ 目录

```bash
.
├── build
│   └── rollup.config.js
├── package.json
└── src
    ├── entry.js
    └── test-vue.vue
```

## npm 源

### `npm`, `yarn`查看源和换源

+ 全局配置

```bash
npm config get registry  # 查看npm当前镜像源

npm config set registry https://registry.npm.taobao.org/  # 设置npm镜像源为淘宝镜像

yarn config get registry  # 查看yarn当前镜像源

yarn config set registry https://registry.npm.taobao.org/  # 设置yarn镜像源为淘宝镜像
```

+ 在当前文件夹下新建 `.npmrc` 文件，并添加 `registry=https://registry.npmjs.org/`

+ 临时使用， 命令中添加 `--registry https://registry.npmjs.org/`

### 镜像源地址

```bash
# npm
https://registry.npmjs.org/

# taobao
https://registry.npm.taobao.org/

```

## 发布npm包

1. 登录

    ```bash
    # 已配置默认源
    npm login

    # 指定登录源
    npm login --registry http://0.0.0.0/repository/npm-all/

    # 输入账号密码
    Username: abc
    Password:
    Email: (this IS public)
    Logged in as abc on http://0.0.0.0/repository/npm-all/.

    ```

2. 发布

    ```bash
    # 已配置默认源
    npm publish

    # 指定发布源
    npm publish --registry http://0.0.0.0/repository/npm-all/

    # package.json 中指定
    "publishConfig": {
        "registry": "http://0.0.0.0/repository/npm-edp/"
    },
    ```

## 弃用npm包

+ `npm-deprecate`
+ `npx force-unpublish package-name '原因描述'`

## 注意事项

+ 发布版本为使用 `bable` 转义后的 `ES5` 语法代码
+ 发布前注意先打包

## 参考

+ [vue-sfc-rollup](https://github.com/team-innovation/vue-sfc-rollup)
+ [Packaging-Components-for-npm](https://cn.vuejs.org/v2/cookbook/packaging-sfc-for-npm.html#Packaging-Components-for-npm)
