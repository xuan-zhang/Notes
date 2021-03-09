# call, apply, bind 区别

首先说下前两者的区别。

`call` 和 `apply` 都是为了解决改变 `this` 的指向。作用都是相同的，只是传参的方式不同。

除了第一个参数外，`call` 可以接收一个参数列表，`apply` 只接受一个参数数组。

```js
let a = {
    value: 1
}
function getValue(name, age) {
    console.log(name)
    console.log(age)
    console.log(this.value)
}
getValue.call(a, 'yck', '24')
getValue.apply(a, ['yck', '24'])
```

## 模拟实现 call 和 apply

可以从以下几点来考虑如何实现

- 不传入第一个参数，那么默认为 `window`
- 改变了 this 指向，让新的对象可以执行该函数。那么思路是否可以变成给新的对象添加一个函数，然后在执行完以后删除？

```js
Function.prototype.myCall = function (context, ...args) {
  context = context || window;
  const fnSymbol = Symbol('fn')
  context[fnSymbols] = this
  const result = context[fnSymbols](...args)
  delete context[fnSymbols]
  return result
}
```

 以上就是 `call` 的思路，`apply` 的实现也类似

```js
Function.prototype.myApply = function (context, argsArray) {
  context = context || window;
  const fnSymbol = Symbol('fn')
  context[fnSymbol] = this
  const result = context[fnSymbol](...argsArray)
  delete context.fn
  return result
}
```

`bind` 和其他两个方法作用也是一致的，只是该方法会返回一个函数。并且我们可以通过 `bind` 实现柯里化。

同样的，也来模拟实现下 `bind`

```js
Function.prototype.myBind = function (context, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  const _this = this
  // 返回一个函数
  return function F(..._args) {
    // 因为返回了一个函数，我们可以 new F()，所以需要判断
    if (this instanceof F) {
      return new _this(...args, ...arguments)
    }
    return _this.apply(context, args.concat(_args))
  }
}
```

```js
Function.prototype.myBind = function(oThis){
    if(typeof this !== 'function'){
        throw new TypeError('被绑定的对象需要是函数')
    }
    var self = this
    var args = [].slice.call(arguments, 1)
    fBound = function(){ //this instanceof fBound === true时,说明返回的fBound被当做new的构造函数调用
        return self.apply(this instanceof fBound ? this : oThis, args.concat([].slice.call(arguments)))
    }
    var func = function(){}
    //维护原型关系
    if(this.prototype){
        func.prototype = this.prototype
    }
    //使fBound.prototype是func的实例，返回的fBound若作为new的构造函数，新对象的__proto__就是func的实例
    fBound.prototype = new func()
    return fBound
}

```
