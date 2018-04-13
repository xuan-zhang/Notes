# Vue 学习笔记

## 基本指令
0. v-: 值是 `单个 JavaScript 表达式`
1. v-if: 要不要创建 DOM， 可用在 `<template>` 节点中使用，浏览器不会渲染 `<template>` 标签，将里面的内容添加到页面中，做到一次控制多个*同级*标签
1. v-else-if: 否则, `if` `else` 之间的节点能复用的会复用，如果不想复用, 添加不同的 `key`(不是绑定`:key`，相同的`key`,也会复用)
1. v-else: 三个要 *同一级别* 连续, 如果 `v-if` 与 `v-else` 之间有其它标签，这之间的标签 *始终不显示*
2. v-show: 要不要添加 `display: none` 属性, 不能用于 `<template>` 元素，因为 `<templete>` 是 `HTML` 的标签,浏览器是不渲染它的，要求 *标签是要渲染在页面中的，之后添加隐藏属性*
3. v-for: 可以渲染 `Array | Object | number | string` 
    - `v-for="item in items"`
    - `v-for="(item, index) in Array"`
    - `v-for="(value,key,index) in Object`
    - 比 `v-if` 的优先级高
4. v-bind:key : `v-for` 循环时一般都要搭配一个 `key` , 循环时是按 `key` 识别`节点VNodes`的，如果 `key` 一样，会认为这个节点已经存在了，会用原来的节点，不会再创建一个新的
5. v-model: 用 `v-model` 绑定一个数据之前，要先在 data中声明出来 
6. v-once: 只渲染一次，后期数据再更改不再改变
7. v-text: `text` 方式解析数据 如直接`v-text="直接写文本"` 会提示你 `直接写文本` 这个变量未定义，报错
8. v-html： `html` 方式解析数据
9. v-bind: `:` 在当前节点上绑定属性，值是一个`单个 JavaScript 表达式` (变量)
    - 绑定一个属性，当这个变量值是 `false` `undefined` `null` 时时，这个属性不会出现在节点上，
    - 如`v-bind:id="variable"`  当`variable = 0` ---- `id = "0"` ； 当`variable = ""` --- `id` ; 当`variable = true` --- `id="true"` 
    - 如果绑定 `key`, key 不会在节点中显示, `key` 是 `Vue` 事先定义的
10. v-on: `@` 绑定事件
    - $event
    - 事件修饰符: 
    - `.stop`: `event.stopPropagation()`
    - `.event`: `event.preventDefault()`
    - `.capture`: 将事件定义为捕获流(默认是冒泡流)
    - `.self`: 只点到了自己
    - `.once`: 只触发一次
    - `.passive`: ?
11. v-pre: 原样输出
12. v-cloak： 渲染完成后才显示
## Vue 的参数
+ el: 挂载对象
+ data: Object | Function Vue实例数据对象
+ methods: 方法
+ computed: 计算属性
    - 计算的属性名，`fullName` 不能在 `data`  中事先声明，会报错(已有了，不用计算了)；
    - 但 `watch`  侦听的属性名必须要在 `data` 中事先声明(不存在，怎么侦听)；
    - `fullName: function(){}` , `fullName` 的值是个函数
    - 可以自定义`fullName` 的 `get` 与 `set` 方法，`fullName: {get(){},set(){}}` 这时`fullName`的值是个对象；
+ watch: 侦听器
    - 异步操作或开销较大
    
## 样式绑定
### class 类绑定
+ 对象形式：`:class="{类名: 是否显示改类}"`  可以 `:class="obj" obj = {类名1：是否显示，类名2：是否显示}`
+ 数组：`:class="['类名1'，'类名2'，变量3]"` 可以 `:class="arr"  arr = ['类名'，变量]`， 如果 `变量` 的值是 `Number(0 12) Boolean(true false) null undefined ""` 值时，不显示（无类名显示），字符串的 `"123"` 会显示 `calss="123"`
+ 组合： `:class="[{类名1：是否显示},'类名2',变量3]"`
+ 组件类与模板类会合并

### style 内联样式绑定
+ 对象： `:style={属性名1：'属性值', 属性名2：属性值变量，fontSize: fontSize + 'px'}` , 属性在JS 中操作，要用JS中规定的驼峰式命名,否则用字符串 `'font-size'`
+ 对象： `:style="obj"` `obj: {fontSize: fontSize + 'px', 'font-weight': 'bold'}`
+ 数组： `:style="[{fontSize:'10px'}, obj]"`  数组里的变量是一个对象

## 组件
+ `template`: 是 `HTML` 的一个标签，虽然 `IE` 未实现它，但不能用做组件名
+ 组件的声明要在调用之前，如在 `new Vue()` 代码之后 写全局注册的组件 `Vue.component()` 代码, 这里会报错说组件未注册（代码执行有个先后顺序）；
+ props: `支柱、支撑` 的意思, 组件上传递进来的数据放的位置,接口
+ is
+ 父子组件传参： `prop` 向下传递，事件向上传递 
    - camelCase: 因为 `-` 是运算符，不能用于 JS 命名，除非 `-` 是出现在字符串中的，不能出现在变量名中（`_` 不受限制，但`_` 有特殊用处，私有变量）;
    - 静态不用`:` , 传递的是字符串; 动态的用 `:`, 传递的是 `变量`；
    