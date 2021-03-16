# webpack

## webpack 优化

### CDN

1. 在模板 `index.html` 中引入 `vue`、`vuex`等常用插件

    ```html
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1">
        <meta name="renderer" content="webkit">
        <meta name="format-detection" content="telephone=no,email=no" />
        <meta http-equiv="Cache-Control" content="no-transform">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
        <link rel="icon" href="<%= BASE_URL %>favicon.ico">
        <link href="https://cdn.bootcss.com/element-ui/2.8.2/theme-chalk/index.css" rel="stylesheet">
        <title>Vue</title>
    </head>
    <body>
        <div id="app"></div>
        <!-- built files will be auto injected -->
        <script src="https://cdn.bootcss.com/vue/2.6.10/vue.min.js"></script>
        <script src="https://cdn.bootcss.com/vuex/3.1.0/vuex.min.js"></script>
        <script src="https://cdn.bootcss.com/vue-router/3.0.6/vue-router.min.js"></script>
        <script src="https://cdn.bootcss.com/element-ui/2.8.2/index.js"></script>
    </body>
    </html>
    ```

2. 修改配置文件 `vue.config.js` 配置 `externals`

    ```js
    module.exports = {
        publicPath: './',
        transpileDependencies: [
            'webpack-dev-server/client',
        ],
        configureWebpack: {
            externals: {
                vue: 'Vue',
                vuex: 'Vuex',
                'vue-router': 'VueRouter',
                'element-ui': 'ELEMENT',
            },
        },
    }

    ```

3. 修改引用配置
    + `src/router/index.js`

        ```js
          //  import Vue from 'vue'; // 注释掉
          import Router from 'vue-router';
          // Vue.use(Router); // 注释掉

        ```

    + `src/store/index.js`

        ```js
        // import Vue from 'vue'; // 注释
        import Vuex from 'vuex';
        // Vue.use(Vuex); 注释掉
        ```

    + `src/main.js`

        ```js
        // import ElementUI from 'element-ui';
        // import 'element-ui/lib/theme-chalk/index.css';
        import ELEMENT from 'element-ui';
        Vue.use(ELEMENT, { size: 'small', zIndex: 1000 });
        ```

4. 使用 CDN 后无法使用本地调试工具

    + 使用 `process.env.NODE_ENV === 'development'` 判断环境，修改以上配置文件

        ```js
        // src/main.js
        ...
        if (process.env.NODE_ENV === 'development') {
        require('element-ui/lib/theme-chalk/index.css')
        }
        ...

        // src/router/index.js
        import Vue from 'vue'
        import VueRouter from 'vue-router'

        if (process.env.NODE_ENV === 'development') {
        Vue.use(VueRouter)
        }
        ...

        // src/store/index.js
        import Vue from 'vue'
        import Vuex from 'vuex'

        if (process.env.NODE_ENV === 'development') {
        Vue.use(Vuex)
        }
        ...
        ```

    + 建立两个`index.dev.html` `index.pro.html`, 配置 `plugins > HtmlWebpackPlugin` 判断环境，自动加载

        ```js
        configureWebpack: {
            externals: {
                vue: 'Vue',
                vuex: 'Vuex',
                'vue-router': 'VueRouter',
                'element-ui': 'ELEMENT',
            },
            plugins: [ // 此处配置有问题 应使用 下面 chainWebpack 方法
                new HtmlWebpackPlugin({
                    filename: 'index.html',
                    template: process.env.NODE_ENV === 'production' ? 'public/index.pro.html' : 'public/index.dev.html',
                    templateParameters: { // 添加些配置，也可解决 BSASE_URL报错问题
                         BASE_URL: '/'
                    },
                    inject: true,
                    BASE_URL: '/', // 此时会报 BASE_URL undefined 错误，在此处添加BASE_URL，并修改 index.html 中的
                    // <link rel="icon" href="<%= BASE_URL %>favicon.ico">
                    // <link rel="icon" href="<%= htmlWebpackPlugin.options.AA %>favicon.ico">
                })
            ]
        },

         chainWebpack: config => {
            config.module
            .rule('svg')
            .exclude.add(resolve('src/assets/icons'))
            .end();

            config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/assets/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]',
            })
            .end();

            config.plugin('html').tap(options => { // 更改 html 模板
                options[0].template =  process.env.NODE_ENV === 'production' ? 'public/index.pro.html' : 'public/index.dev.html';
                return options;
            })
        },

        ```

### 提取公共模块

+ webpack 4 最大的改动就是废除了 `CommonsChunkPlugin` 引入了 `optimization.splitChunks`。
+ `splitChunks`

    ```js
        config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent // 只打包初始时依赖的第三方
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })

        config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
    ```

## webpack 基础

+ 全局变量配置

 ```js
    // 创建一个在编译时可以配置的全局常量
    plugins: [
        new DefinePlugin(
            {
                'process.env': {
                    NODE_ENV: JSON.stringfy("development"),
                    VUE_APP_DOWNLOAD_FILE: '"http://192.168.1.199:7880/get"',
                    VUE_APP_UPLOAD_FILE: '"http://192.168.1.199:7880/hiddentrouble/upload/uploadfile.action"',
                    BASE_URL: '""'
                }
            }
        ),
    ]


  ```

+ 压缩

    ```js
    const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

    module.exports = {
        plugins: [
            new UglifyJsPlugin()
        ]
    }

    ```

+ require.context

  ```js
    // require.context(检索目录,是否检索子目录,文件匹配正则)
    const file = require.context('@/utils', false, /\.js$/)
    file.keys(); // ["./auth.js", "./debounce.js", "./index.js"]

    const req = require.context('./svg', false, /\.svg$/);
    const requireAll = requireContext => requireContext.keys().map(requireContext);
    requireAll(req);
  ```

+ html-webpack-plugin

  ```js
    const path = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    module.exports = {
        mode:'development', // 开发模式
        entry: path.resolve(__dirname,'../src/main.js'),    // 入口文件
        output: {
            filename: '[name].[hash:8].js',      // 打包后的文件名称
            path: path.resolve(__dirname,'../dist')  // 打包后的目录
        },
        plugins:[
            // 单入口配置
            new HtmlWebpackPlugin({
                template:path.resolve(__dirname,'../public/index.html')
            }),
            // 多入口配置
            new HtmlWebpackPlugin({
                template:path.resolve(__dirname,'../public/index.html'),
                filename:'index.html',
                chunks:['main'] // 与入口文件对应的模块名
            }),
            new HtmlWebpackPlugin({
                template:path.resolve(__dirname,'../public/header.html'),
                filename:'header.html',
                chunks:['header'] // 与入口文件对应的模块名
            }),
        ]
    }

  ```

+ clean-webpack-plugin
  + 清除 dist
  + `plugins:[new CleanWebpackPlugin()]`
+ 引入 css
  + `use:['style-loader','css-loader','postcss-loader','less-loader']`
+ mini-css-extract-plugin : 不将 css 打包到 js 中，并将 css 合并成一个单独的css 文件
  + 3.x使用 `extract-text-webpack-plugin`: 将css 单独打包出来，并形成对应的 css 文件

  ```js
    const MiniCssExtractPlugin = require("mini-css-extract-plugin");
    module.exports = {
        //...省略其他配置
        module: {
            rules: [
            {
                test: /\.less$/,
                use: [
                devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                'css-loader',
                'less-loader'
                ],
            }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "[name].[hash].css",
                chunkFilename: "[id].css",
            })
        ]
    }
  ```

+ file-loader 解析文件并移动到输出目录中
  + 默认情况下，生成的文件的文件名就是文件内容的 MD5 哈希值并会保留所引用资源的原始扩展名。
+ url-loader
  + 在文件大小（单位 byte）低于指定的限制时，可以返回一个 DataURL
+ webpack.DllPlugin 抽离第三方模块

  ```js
    // webpack.dll.config.js
    const path = require("path");
    const webpack = require("webpack");
    module.exports = {
        // 你想要打包的模块的数组
        entry: {
            vendor: ['vue','element-ui'] 
        },
        output: {
            path: path.resolve(__dirname, 'static/js'), // 打包后文件输出的位置
            filename: '[name].dll.js',
            library: '[name]_library' 
            // 这里需要和webpack.DllPlugin中的`name: '[name]_library',`保持一致。
        },
        plugins: [
            new webpack.DllPlugin({
                path: path.resolve(__dirname, '[name]-manifest.json'),
                name: '[name]_library',
                context: __dirname
            }),
            new CopyWebpackPlugin([ // 拷贝生成的文件到dist目录 这样每次不必手动去cv
                {from: 'static', to:'static'}
            ]),
        ]
    };

  ```

+ cache-loader 配置缓存
+ webpack-bundle-analyzer 分析包大小
+ externals
  + `externals: { jquery: 'jQuery' }`
  