# let const var

> [这些前端基础题你能答对几道？(测试你的基础掌握,附答案解析)](https://juejin.cn/post/6844904184962105357)

## 1

```js
if (false) {
  var a = 1;
  let b = 2;
}
console.log(a);
console.log(b);
```

<details>
 <summary>解析</summary>
 <pre>
 <code>
undefined
VM368:6 Uncaught ReferenceError: b is not defined
</code>
</pre>
</details>

## 2

```js
var a = 1;
if (true) {
  console.log(a);
  let a = 2;
}
```

<details>
 <summary>解析</summary>
 <pre>
 <code>
  
VM90:3 Uncaught ReferenceError: Cannot access 'a' before initialization

let 声明的变量不会提升,并且会产生暂存死区。在 let 声明变量之前访问变量会抛出错误

 </code>
 </pre>
 </details>

## 3

> .运算符比 = 运算符高

```js
var a = { n: 1 };
var b = a;
a.x = a = { n: 2 };

console.log(a.n, b.n); // 2 1
console.log(a.x, b.x); // undefined {n: 2}
```

<details>
 <summary>解析</summary>
 <pre>
 <code>

var b = a,此时 a 和 b 指向同一个对象。

`.` 运算符比 `=` 运算符高,先计算 `a.x`, 此时

```js
b = {
  n: 1,
  x: undefined,
};
```

相当于给对象添加了 x 属性。

`a.x = a = {n:2};`

计算完 a.x,再计算 = ,赋值是从右向左,此时 a 指向一个新对象。

```js
a = {
  n: 2,
};
```

**a.x 已经执行过了,此时对象的 x 属性赋值为 a,此时**

```js
对象 = {
  n: 1,
  x: {
    n: 2,
  },
};
```

即:

```js
a = {
  n: 2,
};

b = {
  n: 1,
  x: {
    n: 2,
  },
};
```

</code>
</pre>
</details>

## 4

```js
console.log(c);
var c;
function c(a) {
  console.log(a);
  var a = 3;
  function a() {}
}
c(2);
```

<details>
 <summary>解析</summary>
 <pre>
 <code>
 变量提升也有优先级, 函数声明 > arguments > 变量声明
 function c()
 function a()
</code>
</pre>
</details>

## 5

```js
var c = 1;
function c(c) {
  console.log(c);
  var c = 3;
}
console.log(c);
c(2);
```

<details>
 <summary>解析</summary>
 <pre>
 <code>
1

TypeError: c is not a function
</code>

</pre>
</details>

## 6

```js
var name = "erdong";
(function() {
  if (typeof name === "undefined") {
    var name = "chen";
    console.log(name);
  } else {
    console.log(name);
  }
})();
```

<details>
 <summary>解析</summary>
 <pre>
 <code>
 chen

```js
var name = "erdong";
(function() {
  var name; // 变量name会提升到当前作用域顶部
  if (typeof name === "undefined") {
    name = "chen";
    console.log(name);
  } else {
    console.log(name);
  }
})();
```

</code>
</pre>
</details>

## 7

```js
var a = 10;  
function test() {  
    a = 100;  
    console.log(a);  
    console.log(this.a);  
    var a;  
    console.log(a); 
}
test();
```

<details>
 <summary>解析</summary>
 <pre>
 <code>
100
10
100
</code>
</pre>
</details>

## 8

```js
if (!('a' in window)) {
    var a = 1;
}
console.log(a);
```

<details>
 <summary>解析</summary>
 <pre>
 <code>
undefined
</code>
</pre>
</details>

## 9

```js
var a = 1;

function c(a, b) {
    console.log(a);
    a = 2;
    console.log(a);
}
c();

```


<details>
 <summary>解析</summary>
 <pre>
 <code>
undefined
2
</code>
</pre>
</details>

## 10

```js
var val=1;
var obj={
    val:2,
    del:function(){
        console.log(this);                    
        this.val*=2;
        console.log(val);
    }
}

obj.del();
```

<details>
 <summary>解析</summary>
 <pre>
 <code>
 obj
 1
</code>
</pre>
</details>

## 11

```js
var name = "erdong";
var object = {
    name: "chen",
    getNameFunc: function () {
        return function () {
            return this.name;
        }
    }
}
console.log(object.getNameFunc()());

```

<details>
 <summary>解析</summary>
 <pre>
 <code>
erdong
</code>
</pre>
</details>

## 12

```js
var name = "erdong";
var object = {
    name: "chen",
    getNameFunc: function () {
        var that = this;
        return function () {
            return that.name;
        }
    }
}
console.log(object.getNameFunc()());
```

<details>
 <summary>解析</summary>
 <pre>
 <code>
chen
</code>
</pre>
</details>

## 13

```js
(function() {
  var a = b = 3;
})();
console.log(typeof a === 'undefined');
console.log(typeof b === 'undefined');

```

<details>
 <summary>解析</summary>
 <pre>
 <code>
 true
 false
</code>
</pre>
</details>

## 14

```js
var a = 6;
setTimeout(function () {
    a = 666;
}, 0)
console.log(a);

```

<details>
 <summary>解析</summary>
 <pre>
 <code>
6
</code>
</pre>
</details>

## 15

```js
function fn1() {
    var a = 2;
    function fn2 () {
      a++;
      console.log(a);
    }
    return fn2;
}
var f = fn1();
f();
f();

```

<details>
 <summary>解析</summary>
 <pre>
 <code>
3
4
</code>
</pre>
</details>

## 16

```js
var a = (function(foo){
    console.log(foo.foo.bar)
    return typeof foo.bar;
})({foo:{bar:1}});

console.log(a);
```

<details>
 <summary>解析</summary>
 <pre>
 <code>
 1
undefined
</code>
</pre>
</details>

## 17

```js
function f(){
    return f;
}
console.log(new f() instanceof f);

function x() {

}
console.log(new x() instanceof x)
```

<details>
 <summary>解析</summary>
 <pre>
 <code>
false
true
由于构造函数f的返回值为f。因此new f()的值为f。所以console.log(new f() instanceof f)为console.log(f instanceof f),即 false。
</code>
</pre>
</details>

## 18


```js
function A () {
}
A.prototype.n = 1;

var b = new A();

A.prototype = {
    n: 2,
    m: 3
}
var c = new A();

console.log(b.n, b.m);
console.log(c.n, c.m);

```

<details>
 <summary>解析</summary>
 <pre>
 <code>
1 undefined
2 3
</code>
</pre>
</details>

## 19

```js
var F = function(){};
var O = {};
Object.prototype.a = function(){
    console.log('a')
}
Function.prototype.b = function(){
    console.log('b')
}
var f = new F();

F.a();  
F.b();  
O.a();
O.b(); 

```

<details>
 <summary>解析</summary>
 <pre>
 <code>
a
b
a
TypeError: O.b is not a function

F => F.__proto__ => Function.prototype => Function.prototype.__proto__ => Object.prototype
</code>
</pre>
</details>

## 20

```js
function Person() {
    getAge = function () {
        console.log(10)
    }
    return this;
}

Person.getAge = function () {
    console.log(20)
}

Person.prototype.getAge = function () {
    console.log(30)
}

var getAge = function () {
    console.log(40)
}

function getAge() {
    console.log(50)
}


Person.getAge();
getAge();
Person().getAge();
new Person.getAge();
getAge();
new Person().getAge();
```

<details>
 <summary>解析</summary>
 <pre>
 <code>
20
40
10
20
10
30
</code>
</pre>
</details>

## 21


```js
console.log(false.toString()); 
console.log([1, 2, 3].toString()); 
console.log(1.toString()); 
console.log(5..toString());

```

<details>
 <summary>解析</summary>
 <pre>
 <code>
 'false'
'1,2,3'
Uncaught SyntaxError: Invalid or unexpected token
'5'
当执行1.toString();时,由于`1.`也是有效数字,因此此时变成(1.)toString()。没有用.调用toString方法,因此抛出错误。
</code>
</pre>
</details>

## 22


```js
console.log(Array(3));

console.log(Array(2,3));

```

<details>
 <summary>解析</summary>
 <pre>
 <code>
[empty × 3] 

[2,3]
</code>
</pre>
</details>

## 23

```js
var a=[1, 2, 3];
console.log(a.join());

```

<details>
 <summary>解析</summary>
 <pre>
 <code>
1,2,3
</code>
</pre>
</details>

## 24

```js
var a = [3];
var b = [1];
console.log(a - b); 
```

<details>
 <summary>解析</summary>
 <pre>
 <code>
2
</code>
</pre>
</details>

