# JavaScript 笔记

![http缓存](../assets/images/httpCache.jpg)

## 新特性

### ?. 可选链

+ babel plugins `@babel/plugin-proposal-optional-chaining`

```js
  const a = {}
  console.log(a?.b?.c) // undefined
  console.log(a?.b.c) // Error Cannot read property 'c' of undefined"
  
  const b = 7
  console.log(b?.c?.d) // undefined

```

### ?? 非undefined 非 null

```js
 undefined ?? 'default'  // 'default'
 null ?? 'default' // 'default'
```

### :: bind call

### func(x, ?) 柯里化

### # 私有关键词

## 模块化

1. [模块化基本写法](http://www.ruanyifeng.com/blog/2012/10/javascript_module.html)

    + 宽放大模块

     ```js
     var module1 = (function(mod) {
       // ....
       return mod;
     })(window.module1 || {});
     ```

    + 输入全局变量

     ```js
     var module1 = (function($, YAHOO) {
       //...
     })(jQuery, YAHOO);
     ```

2. AMD
    + 异步加载机制
    + 应用于 **_浏览器_** 端, `RequireJS`
    + 模块引入： `require([module], callback);`
    + 模块导出

3. CMD
   + 通用模块定义规范
   + [seaJS](https://seajs.github.io/seajs/docs/#intro)
4. CommonJS
   + 同步加载机制
   + 用于 **_服务器端_** 的 JS, node webpack 遵循此规范, **_浏览器不兼容_** CommonJS
   + `__dirname`: 代表当前模块文件所在的文件夹路径;
   + `__filename`: 代表当前模块文件所在的文件夹路径+文件名;
   + 导出模块： `module.exports= {}`
   + 加载模块： `const app = require('./app.js')`

5. ES6 Modules

## Web API

+ 创建一个新的空白的文档片段 [`DocumentFragment`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createDocumentFragment)

### `queueMicrotask(callback)`
  
+ 创建一个微任务
+ 类似如下方法

  ```js
  Promise.resolve().then(() => {
    console.log('queueMicrotask');
  })

  queueMicrotask(() => {
    console.log(`queueMicrotask`)
  })

  ```

### `requestAnimationFrame(callback)`

+ [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/window/requestAnimationFrame)
+ 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行
+ `window.cancelAnimationFrame()`

## Array

+ `flatMap`: 执行 `map` 再执行 `flat`(效果类似，not sure);

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

## DOM

+ [DOMParser 与 XMLSerializer](https://www.zhangxinxu.com/wordpress/2019/06/domparser-xmlserializer-api/)
  + [DOMParser](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMParser): 将存储在字符串中的 `XML` 或 `HTML` 源代码解析为一个 `DOM Document`
  + [XMLSerializer](https://developer.mozilla.org/zh-CN/docs/XMLSerializer): 提供 `serializeToString()` 方法来构建一个代表 `DOM` 树的 `XML` 字符串
    + `outerHTML` 只能作用在 `Element` 元素上，但是不能是其他节点类型，例如文本节点，注释节点之类。但是`serializeToString()`方法适用于任意节点类型
    + `serializeToString()` 方法会给根元素自动增加xmlns命名空间

## 编码

+ [escape()、encodeURI()、encodeURIComponent()](https://www.cnblogs.com/qiantuwuliang/archive/2009/07/19/1526687.html)

