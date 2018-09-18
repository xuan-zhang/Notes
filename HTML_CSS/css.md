# css

## 目录
 - [滚动条样式更改](#滚动条样式更改) 
 - [多选文本溢出省略](#多选文本溢出省略) 
 - [双击取消选种](#双击取消选种) 
 - [拨打电话](#拨打电话) 
 - [SASS](#sass)
 - [textarea](#textarea)
 - [去除移动端选种背景](#去除移动端选种背景)
 - [去除select默认样式](#去除select默认样式)
 - [placeholder样式重置](#placeholder样式重置)
 - [伪类的使用](#伪类的使用)
 - [flex中的多行文本上下居中](#flex中的多行文本上下居中)
 - [规范](#规范)

## 滚动条样式更改

#### IE下的滚动条样式
  - scrollbar-arrow-color: color; /三角箭头的颜色/  
  - scrollbar-face-color: color; /立体滚动条的颜色（包括箭头部分的背景色）/  
  - scrollbar-3dlight-color: color; /立体滚动条亮边的颜色/  
  - scrollbar-highlight-color: color; /滚动条的高亮颜色（左阴影？）/  
  - scrollbar-shadow-color: color; /立体滚动条阴影的颜色/  
  - scrollbar-darkshadow-color: color; /立体滚动条外阴影的颜色/  
  - scrollbar-track-color: color; /立体滚动条背景颜色/ 
  - scrollbar-base-color:color; /滚动条的基色/ 

#### webkit的自定义滚动条样式  
  - ::-webkit-scrollbar 滚动条整体部分  
  - ::-webkit-scrollbar-button 滚动条两端的按钮 
  - ::-webkit-scrollbar-track 外层轨道 
  - ::-webkit-scrollbar-track-piece 内层轨道，滚动条中间部分（除去） 
  - ::-webkit-scrollbar-thumb （拖动条？滑块？滚动条里面可以拖动的那个，肿么翻译好呢？） 
  - ::-webkit-scrollbar-corner 边角 
  - ::-webkit-resizer 定义右下角拖动块的样式 
```css
/* 滚动条部分 */
::-webkit-scrollbar {
    width:15px;
}

/* 轨道 */
::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
    -webkit-border-radius: 15px;
    border-radius: 15px;
}

/* 手柄 */
::-webkit-scrollbar-thumb {
    -webkit-border-radius: 15px;
    border-radius: 15px;
    background:rgba(200,200,200,0.7); 
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
}
/* 手柄激活态 */
::-webkit-scrollbar-thumb:window-inactive {
    background: rgba(200,200,200,0.4); 
}
```

## 多选文本溢出省略
[目录](#目录)
```css
 /* 一行文本溢出 */
 overflow: hidden;
 text-overflow: ellipsis;
 white-space: nowrap;
 
 /* 多行文本溢出 - webkit */
 display: -webkit-box;
 -webkit-box-orient: vertical;
 -webkit-line-clamp: 3;
 overflow: hidden;
 
 /* 多行文本溢出 line-heigt 多用 em */
 p{
  position: relative; 
  line-height: 2em;  
  max-height: 40px;
  overflow: hidden;
 }
 p::after{
  content: "..."; 
  position: absolute; 
  bottom: 0; 
  right: 0; 
  padding-left: 40px;
  background: -webkit-linear-gradient(left, transparent, #fff 55%);
  background: -o-linear-gradient(right, transparent, #fff 55%);
  background: -moz-linear-gradient(right, transparent, #fff 55%);
  background: linear-gradient(to right, transparent, #fff 55%);
 }
```

```js
 // 插件 [Clamp.js](https://github.com/josephschmitt/Clamp.js)
  var module = document.getElementById("clamp-this-module");
  $clamp(module, {clamp: 3});
  
  
 // 插件 [-jQuery.dotdotdot](https://github.com/BeSite/jQuery.dotdotdot)
  $(document).ready(function() {
    $("#wrapper").dotdotdot({
    //	configuration goes here
  });
});
```
## 双击取消选种
[目录](#目录)
```css
 div{
    -moz-user-select:none;/*火狐*/
    -webkit-user-select:none;/*webkit浏览器*/
    -ms-user-select:none;/*IE10*/
    -khtml-user-select:none;/*早期浏览器*/
    user-select:none;
 }
```

## 拨打电话
[目录](#目录)
```html
拨打电话/发送短息/邮箱
 <a href="tel:13764567708">移动WEB页面JS一键拨打号码咨询功能</a>
 <a href="sms:13764567708">移动WEB页面JS一键发送短信咨询功能</a>
 <a href="mailto:bd@pangxiekeji.com">bd@pangxiekeji.com</a>
 <a href="Mailto:ghsau@163.com?CC=ghsau@163.com&BCC=ghsau@163.com&Subject=Hello&Body=你好">给我发邮件</a>  
 参数说明：
        CC：抄送地址；

        BCC：密件抄送地址；

        Subject：主题；

        Body：邮件内容。

        注：多个邮件地址用";"隔开。


使用wtai协议进行拨打电话。
<a href="wtai://wp//mc;13764567708">拨打10086 </a>  
<a href="wtai://wp/ap;13764567708;">将10086存储至电话簿 </a>

手机端唤醒微信
<a href="weixin://">打开微信</a>

QQ:
<a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=892131064&site=qq&menu=yes"></a>

移动web页面自动探测电话号码
<meta name="format-detection" content="telephone=no">
<meta http-equiv="x-rim-auto-match" content="none">
````

## sass
[目录](#目录)
```css

compact 
 /*命令行内容*/
sass style.scss:style.css --style compact

/*编译过后样式*/
.box { width: 300px; height: 400px; }
.box-title { height: 30px; line-height: 30px; }

compressed
/*命令行内容*/
sass style.scss:style.css --style compressed

/*编译过后样式*/
.box{width:300px;height:400px}.box-title{height:30px;line-height:30px}

expanded
/*命令行内容*/
sass style.scss:style.css --style expanded

/*编译过后样式*/
.box {
  width: 300px;
  height: 400px;
}
.box-title {
  height: 30px;
  line-height: 30px;
}


nested
/*命令行内容*/
sass style.scss:style.css --style nested

/*编译过后样式*/
.box {
  width: 300px;
  height: 400px; }
  .box-title {
    height: 30px;
    line-height: 30px; }
```

## textarea
[目录](#目录)
```css
1：彻底禁用拖动（推荐）
resize: none;

2：只是固定大小，右下角的拖动图标仍在
width: 200px;
height: 100px;
max-width: 200px;
max-height: 100px;
```

## 去除移动端选种背景
[目录](#目录)
```css
body{ -webkit-tap-highlight-color:rgba(0,0,0,0); }

a:focus,
input:focus,
p:focus,
div:focus {
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-user-modify: read-write-plaintext-only;
}

/* 使用图片作为a标签的点击按钮时，当触发touchstart的时候，往往会有一个灰色的背景 */
a,a:hover,a:active,a:visited,a:link,a:focus{
    -webkit-tap-highlight-color:rgba(0,0,0,0);
    -webkit-tap-highlight-color: transparent;
    outline:none;
    background: none;
    text-decoration: none;
}

/* 取消a标签在移动端点击时的蓝色 */
-webkit-tap-highlight-color: rgba(255, 255, 255, 0);
-webkit-user-select: none;
-moz-user-focus: none;
-moz-user-select: none;
```

## 去除select默认样式
[目录](#目录)

```css
select {
/*Chrome和Firefox里面的边框是不一样的，所以复写了一下*/
border: solid 1px #000;
/*很关键：将默认的select选择框样式清除*/
appearance:none;
-moz-appearance:none;
-webkit-appearance:none;
/*将背景改为红色*/
background:red;
/*加padding防止文字覆盖*/
padding-right: 14px;
}
/*清除ie的默认选择框样式清除，隐藏下拉箭头*/
select::-ms-expand { display: none; }
```

## placeholder样式重置

```css
input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
color: #fff;
}
input:-moz-placeholder, textarea:-moz-placeholder {
color: #fff;
}
input::-moz-placeholder, textarea::-moz-placeholder {
color: #fff;
}
input:-ms-input-placeholder, textarea:-ms-input-placeholder {
color: #fff;
}
```

## 伪类的使用
```scss
ul{
  counter-reset: cont; // 定义一个计数器 cont 计数器从 0 开始
   li{
    counter-increment: cont; // cont 递增 1
    &::before{  
        content: "0"counter(item);  // 显示 01
    }
   }
}

```

```html
<p class="att" data-name="aaa">aaa</p>
<style>
    .att::before{
        content: attr(data-name); /* 显示 aaa*/
    }
</style>

```

## flex中的多行文本上下居中
+ 多行文本居中的方式
+ table-cell
+ line-height + padding
+ transform + position
+ button


```html
    <h2>多行文本</h2>
    <style>
      h2{
        display:flex;
        flex-direction: column;
        justify-content: center;
      }
    </style>
```


## 规范
[目录](#目录)

1. html
  1. html 属性顺序
     + `id`
     + `class`
     + `name`
     + `data-xxx`
     + `src for type href`
     + `title alt`
     + `aria-xxx role`
  2. html 嵌套规则
     + `h1~h6` 中不能嵌套 `div p ul ol`
     + `a` 中不能嵌套 `div`, 如果`a`的父级是`div`, 则可以嵌套 `div`
     + `p` 中不能嵌套 `<div>、<h1>~<h6>、<p>、<ul>/<ol>/<li>、<dl>/<dt>/<dd>、<form>等`
     + `a` 中不能嵌套交互元素, 如: `a， audio（如果设置了controls属性）， button， details， embed， iframe， img（如果设置了usemap属性）， input（如果type属性不为hidden状态）， keygen， label， menu（如果type属性为toolbar状态），object（如果设置了usemap属性）， select， textarea， video（如果设置了controls属性）`
     + 列表元素中不能嵌套非列表元素
     + `inline-Level` 元素，仅可以包含文本或其它 `inline-Level` 元素;
  3. head  
```html
      <!-- 中文 -->
      <html lang="zh-Hans">

      <!-- 简体中文 -->
      <html lang="zh-cmn-Hans">

      <!-- 繁体中文 -->
      <html lang="zh-cmn-Hant">

      <!-- English -->
      <html lang="en">

       <meta charset="utf-8">

       <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

        <!-- SEO -->
           <title>Style Guide</title>
           <meta name="keywords" content="your keywords">
           <meta name="description" content="不超过150个字符">
           <meta name="author" content="author,email address">
        <!-- ios图标 -->
          <link rel="apple-touch-icon" sizes="57x57" href="touch-icon-iphone.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="touch-icon-ipad.png" />
          <link rel="apple-touch-icon" sizes="114x114" href="touch-icon-iphone4.png" />
          <link rel="apple-touch-icon" sizes="144x144" href="apple-touch-icon-ipad3-144.png" />

          <!-- iPhone 和 iTouch，默认 57x57 像素，必须有 -->
          <link rel="apple-touch-icon-precomposed" href="/apple-touch-icon-57x57-precomposed.png">

          <!-- iPad，72x72 像素，可以没有，但推荐有 -->
          <link rel="apple-touch-icon-precomposed" href="/apple-touch-icon-72x72-precomposed.png" sizes="72x72">

          <!-- Retina iPhone 和 Retina iTouch，114x114 像素，可以没有，但推荐有 -->
          <link rel="apple-touch-icon-precomposed" href="/apple-touch-icon-114x114-precomposed.png" sizes="114x114">

          <!-- Retina iPad，144x144 像素，可以没有，但推荐有 -->
          <link rel="apple-touch-icon-precomposed" href="/apple-touch-icon-144x144-precomposed.png" sizes="144x144">
```
2. css
  + 页面中尽量不要引入超过两个样式表
  + 待办事项用 `todo` 注释, 尽量不用模块注释
  + 声明顺序
    - Positioning 定位
    ```css
     /* Positioning */
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 100;
    ```
    - Box model 盒模型
    ```css
    /* Box model */
      display: block;
      box-sizing: border-box;
      width: 100px;
      height: 100px;
      padding: 10px;
      border: 1px solid #e5e5e5;
      border-radius: 3px;
      margin: 10px;
      float: right;
      overflow: hidden;
    ```
    - Typographic 排版
    ```css
    /* Typographic */
      font: normal 13px "Helvetica Neue", sans-serif;
      line-height: 1.5;
      text-align: center;
    ```
    - Visual 视觉效果
    ```css
    /* Visual */
      background-color: #f5f5f5;
      color: #fff;
      opacity: .8;

    ```
    - 其它
    ```css
    /* Other */
      cursor: pointer;
    ```

3. js
  + 页面中保证只引入一个js文件
  + 在`script` 标签中添加 `async` 异步加载, 这样可以将 `script` 放在 `head` 标签中 `<script src="index.js" async></script>`
  + 注释
    - 函数注释
      ```js
      /**
       * 函数描述
       *
       * @param {string} p1 参数1的说明
       * @param {string} p2 参数2的说明，比较长
       *     那就换行了.
       * @param {number=} p3 参数3的说明（可选）
       * @return {Object} 返回值描述
       */
      ```
    - 文件注释
     ```
     /**
      * @fileoverview Description of file, its uses and information
      * about its dependencies.
      * @author user@meizu.com (Firstname Lastname)
      * Copyright 2009 Meizu Inc. All Rights Reserved.
      */
     ```
  + 命名
    -  变量, 使用 Camel 命名法。`var loadingModules = {};`
    - 私有属性、变量和方法以下划线 _ 开头。`var _privateMethod = {};`
    - 常量, 使用全部字母大写，单词间下划线分隔的命名方式。`var HTML_ENTITY = {};`
    - 函数, 使用 Camel 命名法。函数的参数, 使用 Camel 命名法。`function stringFormat(theBells) {}`
    - 类, 使用 Pascal 命名法 , 类的 方法 / 属性, 使用 Camel 命名法.
      ```js
      function TextNode(value, engine) {
          this.value = value;
          this.engine = engine;
      }

      TextNode.prototype.clone = function () {
          return this;
      };
      ```
    - 枚举变量 使用 Pascal 命名法。枚举的属性， 使用全部字母大写，单词间下划线分隔的命名方式。
      ```
      var TargetState = {
          READING: 1,
          READED: 2,
          APPLIED: 3,
          READY: 4
      };
      ```
    - 由多个单词组成的 缩写词，在命名中，根据当前命名法和出现的位置，所有字母的大小写与首字母的大小写保持一致。
    - 语法
      + 类名，使用名词。
      + 函数名，使用动宾短语。
      + boolean 类型的变量使用 is 或 has 开头。
      + Promise 对象用动宾短语的进行时表达。
