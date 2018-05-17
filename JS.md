# JS 笔记

## 目录
+ [模块化](#模块化)

## 模块化
1. [模块化基本写法](http://www.ruanyifeng.com/blog/2012/10/javascript_module.html)
    + 宽放大模块
        ```js
            var module1 = ( function (mod){
            
            　　　　//...
            
            　　　　return mod;
            
            　　})(window.module1 || {});
        ```
    + 输入全局变量
        ```js
            var module1 = (function ($, YAHOO) {
            
            　　　　//...
            
            　　})(jQuery, YAHOO);
        ```
2. AMD
    + 异步加载机制
    + 应用于 ***浏览器*** 端, `RequireJS`
    + 模块引入： `require([module], callback);`
    + 模块导出：
3. CMD
    + 通用模块定义规范
    + [seaJS](https://seajs.github.io/seajs/docs/#intro)
4. CommonJS
    + 同步加载机制
    + 用于 ***服务器端*** 的 JS, node webpack 遵循此规范, ***浏览器不兼容*** CommonJS
    + `__dirname`: 代表当前模块文件所在的文件夹路径;
    + `__filename`: 代表当前模块文件所在的文件夹路径+文件名;
    + 导出模块： `module.exports= {}`
    + 加载模块： `const app = require('./app.js')`
    
5. ES6 Modules

## Web API 

+ 创建一个新的空白的文档片段  [`DocumentFragment`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createDocumentFragment)