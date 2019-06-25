# JS 笔记

## 目录

- [模块化](#模块化)

## 模块化

1. [模块化基本写法](http://www.ruanyifeng.com/blog/2012/10/javascript_module.html)

   - 宽放大模块

     ```js
     var module1 = (function(mod) {
       // ....
       return mod;
     })(window.module1 || {});
     ```

   - 输入全局变量

     ```js
     var module1 = (function($, YAHOO) {
       //...
     })(jQuery, YAHOO);
     ```

2. AMD
   - 异步加载机制
   - 应用于 **_浏览器_** 端, `RequireJS`
   - 模块引入： `require([module], callback);`
   - 模块导出：
3. CMD
   - 通用模块定义规范
   - [seaJS](https://seajs.github.io/seajs/docs/#intro)
4. CommonJS

   - 同步加载机制
   - 用于 **_服务器端_** 的 JS, node webpack 遵循此规范, **_浏览器不兼容_** CommonJS
   - `__dirname`: 代表当前模块文件所在的文件夹路径;
   - `__filename`: 代表当前模块文件所在的文件夹路径+文件名;
   - 导出模块： `module.exports= {}`
   - 加载模块： `const app = require('./app.js')`

5. ES6 Modules

## Web API

- 创建一个新的空白的文档片段 [`DocumentFragment`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createDocumentFragment)

## Array

- `flatMap`: 执行 `map` 再执行 `flat`;

  ```js
  let arr = [1,2,[1,2, [1,2,3]]];
  arr.flat();// [1,2,1,2,[1,2,3]]
  arr.flat(2); // [1, 2, 1, 2, 1, 2, 3]
  arr.map(item => item*4); // [4, 8, NaN]
  // 此乘法 先执行 map 就相当于执行了flat;
  arr.flat().map(item=>item*4); // [4, 8, 4, 8, NaN]
  arr.map(item=>item*4).flat(); // [4, 8, NaN]
  arr.flatMap(item => item * 4); // [4, 8, NaN]

  arr = ["今天天气不错", "", "早上好"];
  arr.map(s=> s.split('')); // [["今","天","天","气","不","错"],[],["早","上","好"]]
  arr.map(item=>item.split('')).flat(); // ["今", "天", "天", "气", "不", "错", "早", "上", "好"]
  arr.flatMap(item=>item.split('')); //["今", "天", "天", "气", "不", "错", "早", "上", "好"]
  ```
