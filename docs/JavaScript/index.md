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

### `Crypto`

+ [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Crypto)
+ Crypto 接口提供了基本的加密功能，可用于当前的上下文中。它允许访问一个密码强度的随机数生成器和 cryptographic primitives。

### `URLSearchParams`

+ [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams)

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

+ 创建数组

```js
const a = Array(3) // [empty × 3]
a[0] === undefined // true
Array(2,3) // [2,3]

var a = [3];
var b = [1];
console.log(a - b); // 2

var a = [1,3]; // a.toString() === '1,3'
var b = [1]; // b.toString() === '1'
console.log(a - b); //NaN '1,3' - '1' === NaN
```

## DOM

+ [DOMParser 与 XMLSerializer](https://www.zhangxinxu.com/wordpress/2019/06/domparser-xmlserializer-api/)
  + [DOMParser](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMParser): 将存储在字符串中的 `XML` 或 `HTML` 源代码解析为一个 `DOM Document`
  + [XMLSerializer](https://developer.mozilla.org/zh-CN/docs/XMLSerializer): 提供 `serializeToString()` 方法来构建一个代表 `DOM` 树的 `XML` 字符串
    + `outerHTML` 只能作用在 `Element` 元素上，但是不能是其他节点类型，例如文本节点，注释节点之类。但是`serializeToString()`方法适用于任意节点类型
    + `serializeToString()` 方法会给根元素自动增加xmlns命名空间

## 编码

+ [escape()、encodeURI()、encodeURIComponent()](https://www.cnblogs.com/qiantuwuliang/archive/2009/07/19/1526687.html)

## 遍历

+ `for in`
  + 遍历对象上**除了Symbol以外的** **可枚举**属性
  + **包含原型链**上的属性。
+ `Object.keys()`
  + 返回对象**自身的**所有**可枚举**的属性的键名
  + 不包含原型链上的属性
  + 不包含 Symbol 属性
+ `JSON.stringify()`
  + 只串行化对象**自身的** **可枚举**的属性
  + 过滤掉 undefind
  + 不包含原型上属性
+ `Object.assign()`
  + 忽略enumerable为false的属性，只拷贝对象**自身的** **可枚举**的属性。
  + 不包含原型链上属性
+ `Object.getOwnPropertyNames(obj)`
  + 包含对象**自身的**所有属性
  + **不含 Symbol 属性**
  + **包括不可枚举属性**
  + 不包含原型链上的属性
+ `Object.getOwnPropertySymbols(obj)`
  + 包含对象**自身的**所有 Symbol 属性的键名
  + 不包含原型链上的属性
+ `Reflect.ownKeys(obj)`
  + 包含对象**自身的**所有键名
  + 包含Symbol
  + 包含不可枚举
  + **不含继承的（原型链上的方法）**
+ `...`
  + 用于取出参数对象的所有可遍历属性
  + 不包含原型链上属性
  + 不包含不可枚举属性
+ `for of`
  + 可以使用的范围包括: 数组、Set 和 Map 结构、某些类似数组的对象（比如arguments对象、DOM NodeList 对象）、Generator 对象，以及字符串
  + 部署了 Iterator 接口的对象
+ ES6 规定，所有 Class 的原型的方法都是不可枚举的

## 知识点

+ 在 **严格模式** 下，对未声明变量赋值，使用都报错，**非严格模式** 下，赋值不报错，直接使用报错

  ```js
    'use strict'
    b = 6 // Uncaught ReferenceError: b is not defined
    console.log(b)
  ```

  ```js
    b = 6
    console.log(b) // 6
  ```

  ```js
    console.log(b) // Uncaught ReferenceError: b is not defined
  ```

+ 优选级问题

  ```js
  var a = {n: 1}
  var b = a
  a.x = a = {n: 2} //. 优先级比 = 高， a.x 优先级高，先执行 a.x 之后再赋值

  console.log(a.n, b.n); // 2 1
  console.log(a.x, b.x); // undefined {n: 2}
  ```

+ 变量提升也有优先级, 函数声明 > arguments > 变量声明
+ 运算符优先级
  + `new Persion().getName()` === `(new Persion()).getName()`
  + `new Persion.getName()` === `new Persion.getName` === `new (Persion.getName)` !== `new (Persion.getName())`
+ 数字

```js
1.toString() // Uncaught SyntaxError: Invalid or unexpected token 因为 1. 会被认为一个数字 (1.)toString()
1..toString() // '1' (1.).toString()
1 .toSting() // '1'
(1).toString() // '1'
```

+ 作用域

> JavaScript采用的是 **词法作用域**, 它规定了函数内访问变量时,查找变量是从函数声明的位置向外层作用域中查找,而不是从调用函数的位置开始向上查找。

```js
var x = 1;
if(function f(){}){ // 此处 function f 不存在变量提升，也不向外暴露 f函数在外部是不存在的
    x += typeof f; // typeof f === undefined
}

console.log(x); // "1undefined"
```

+ `arguments`为类数组, 类型为 `object`
  + `typeof arguments === 'object'`

+ `0.1 + 0.2 === 0.30000000000000004`

### 浏览器版本获取

```js
function getBroswer(){
    var sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.match(/edge\/([\d.]+)/)) ? sys.edge = s[1] :
    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1] :
    (s = ua.match(/msie ([\d.]+)/)) ? sys.ie = s[1] :
    (s = ua.match(/firefox\/([\d.]+)/)) ? sys.firefox = s[1] :
    (s = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = s[1] :
    (s = ua.match(/opera.([\d.]+)/)) ? sys.opera = s[1] :
    (s = ua.match(/version\/([\d.]+).*safari/)) ? sys.safari = s[1] : 0;

    if (sys.edge) return { broswer : "Edge", version : sys.edge };
    if (sys.ie) return { broswer : "IE", version : sys.ie };
    if (sys.firefox) return { broswer : "Firefox", version : sys.firefox };
    if (sys.chrome) return { broswer : "Chrome", version : sys.chrome };
    if (sys.opera) return { broswer : "Opera", version : sys.opera };
    if (sys.safari) return { broswer : "Safari", version : sys.safari };

    return { broswer : "", version : "0" };
}
```
