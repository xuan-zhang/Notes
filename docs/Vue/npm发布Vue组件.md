# 通用`Vue`组件发布至 npm

发布`vue`通用组件说明文档

## `package.json` 文档说明

+ `main`： 编译后的 `commonJS` 规范代码入口
+ `module`： 编译后的 `ES6模块` 规范代码入口
+ `files`:  配置发布包含文件
+ `scripts`:  添加 `"prepublishOnly": "npm run build"` 发布时自动打包
+ `repository`:  指定你的代码存放的地方
+ `publishConfig`: `npm public` 时配置集合，可配置 `tag`, `registry`和`access`
+ `private`:  设置为 `true` 时， 不发布

## `vue-sfc-rollup` 使用

> `vue-sfc-rollup`  用于发布Vue文件组件(库)至 npm 的模板 CLI 工具， 采用 rollup 打包

+ 全局使用

 ```bash
 # 全局安装
 npm install -g vue-sfc-rollup
 sfc-init
 ```

+ 使用 `npx` 本地调用

 ```bash
 # 无需安装，直接调用
 npx vue-sfc-rollup
 ```

+ 目录说明

```bash
.
├── build
│   └── rollup.config.js  # rollup 配置文件
├── package.json 
└── src
    ├── entry.js # rollup 打包入口文件
    └── test-vue.vue # 要发布的 vue 组件
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

+ 在当前文件夹下新建 `.npmrc` 文件，并添加 `registry=https://registry.npmjs.org/`，只作用于当前文件夹

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
    npm login --registry http://repository.npmjs.org/

    # 或添加用户
    npm adduser --registry http://repository.npmjs.org/

    # 输入账号密码
    Username: edpadmin
    Password: edpadmin
    Email: (this IS public) edpadmin@xmi01.com
    Logged in as edpadmin on http://repository.npmjs.org/
    ```

2. 发布

    ```bash
    # 已配置默认源
    npm publish

    # 指定发布源
    npm publish --registry http://repository.npmjs.org/

    # package.json 中指定
    "publishConfig": {
        "registry": http://repository.npmjs.org/
    },
    ```

## 弃用npm包

+ `npm-deprecate`
+ `npx force-unpublish package-name '原因描述'`

## 注意事项

+ 发布版本为使用 `bable` 转义后的 `ES5` 语法代码
+ 发布前注意先打包
+ 添加 `readme.md` 说明文档

## 参考

+ [vue-sfc-rollup](https://github.com/team-innovation/vue-sfc-rollup)
+ [Packaging-Components-for-npm](https://cn.vuejs.org/v2/cookbook/packaging-sfc-for-npm.html#Packaging-Components-for-npm)
