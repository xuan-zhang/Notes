# jQuery 笔记
# 目录
- [element](#element)
- [this](#this)
- [ajax](#ajax)
- [Jquery](#jquery)    
- [命名空间](#命名空间) 
- [鼠标滚轮方向](#鼠标滚轮方向) 
- [鼠标是否在盒子中](#鼠标是否在盒子中)
- [移动端touch兼容](#移动端touch兼容)
- [微信音乐自动播放](#微信音乐自动播放)
- [手机摇一摇](#手机摇一摇)
- [阻止事件冒泡与捕获](#阻止事件冒泡与捕获)
- [setTimeout](#settimeout)
- [正则](#正则)

## element
当一个元素删除的时候,清除绑定事件,再清空, $elements.unbind().empty();  

## this
+ 原型和构造函数中的this都指向new出来的对象
+ 谁最终调用函数，this指向谁。
> 1. this指向的永远只可能是对象！！！
> 2. this指向谁永远不取决于this写在哪，而是取决于函数在哪调用
> 3. this指向的对象，称之为函数的上下文context，也叫函数的调用者.
+ this指向的规律（与函数调用的方式息息相关）：this指向的情况，取决于函数调用方式有哪些，
> 1. 通过函数名()直接调用：this指向window
> 2. 通过对象.函数名()调用的:this指向这个对象
> 3. 函数通过数组的一个元素，通过数组下标调用的，this指向这个数组
> 4. 函数作为window内置函数的回调函数调用时，this指向window如setTimeout setInterval 等
> 5. 函数作为构造函数用new关键字调用时，this指向新new出的对象。



## ajax
#### 参数    
1. async: ajax请求是否是异步的,  `async: true` 默认值, 表示异步,   `async: false` 同步.  
2. 多个ajax请求, 取消异步方法  
  > 后执行的 ajax 放在前一个 ajax 完成后的回调函数中执行.
  > 将前一个 ajax 参数 async 设置成 false ` async: false`.  
3. beforeSend(XHR): 在发关之前执行, 可在此添加 loading 效果, 在success 或 error 后将 添加内容取消.如结合 layser.js    
#### 访问  
1. ajax 访问 json 格式数据, 设置 `dataType: 'json'` , 在 url 中添加地址即可得到 json 文件中的数据.
```js
  $.ajax(function(){
    ...
      type: "POST",
      dataType: "json",
      url: "./data.json?m=1&k=3",
      data: {foo1:"bar1",foo2:"bar2"},
      beforeSend: function(){
          lodingmask = layer.load(3, {
            shade: [0.1, '#fff'] //0.1透明度的白色背景
          });
      },
      success: function(data){
          layer.close(lodingmask);
      },
      error: function(){
          layer.close(lodingmask);
      },
      complete: function(XMLHttpRequest, textStatus){
       // 请求完成后回调函数 (请求成功或失败之后均调用)。
          layer.close(lodingmask);
          $.ajax();
      }
      
      ...
  });
```

## jquery  
#### 1  尺寸 
   + width()\height()   
     > `$(element).height();` 返回或设置 element 的高度, 是标签 content 中的 height （不包括内边距、边框或外边距）; 
     > `$(element).width();` 返回或设置 element 的宽度, 是标签 content 中的 width （不包括内边距、边框或外边距）;  
   + innerWidth()\innerHeight()    
     > `$(element).innerWidth();` 返回或设置元素的宽度（包括内边距）,  是标签 content + padding 的值;     
     > `$(element).innerHeight();` 返回或设置元素的高度（包括内边距）,   是标签 content + padding 的值;  
   + outerWidth()\outerHeight()    
     > `$(element).outWidth();` 返回或设置元素的宽度（包括内边距、边框和外边距）, 是标签 content + padding + border 的值;    ()
     > `$(element).outHeight();` 返回或设置元素的高度（包括内边距、边框和外边距）, 是标签 content + padding + border 的值;    
#### 2  位置    
  > `$(element).offset();` 返回或设置 element 元素相对于整个文档的偏移量. 坐标原点是整个body的左上角, 不是 client 浏览器窗口;
  > `$(element).positon();` 返回或设置 element 元素相对于父盒子的偏移位置, 坐标原点是 设置了 相对/绝对定位的交盒子, 如果没有父盒子设置定位, 效果等同于 `$(element).offset()`;  
  
#### 3  on 事件绑定  
  > `$(document).on(event, selector, data, fn);` 事件绑定在 document 上, 事件解发冒泡到 document, 之后与 selector 子选择器相比较, 如果匹配, 执行函数. 这样可以在目标元素未存在时, 加入事件.  

#### 4  js 操作 iframe  
  - getElementByIdx_x   
    ```js
      document.getElementByIdx_x=function(id){ 
          if(typeof id =='string') 
          return document.getElementById(id); 
          else 
          throw new error('please pass a string as a id!') 
      } 
    ```
   - contents()
       查找匹配元素内部所有的子节点（包括文本节点）。如果元素是一个iframe，则查找文档内容    
   - contentWindow
      contentWindow属性是指指定的frame或者iframe所在的window对象，在IE中iframe或者frame的contentWindow属性可以省略，但在Firefox中如果要对iframe对象进行编辑则，必须指定contentWindow属性，contentWindow属性支持所有主流浏览器。    
      
   - 在父窗口中获取iframe中的元素  
     ```` js 
      1. 
       格式：window.frames["iframe的name值"].document.getElementByIdx_x("iframe中控件的ID").click(); 
       实例：window.frames["ifm"].document.getElementByIdx_x("btnOk").click(); 
     2. 
        格式：
        var obj=document.getElementByIdx_x("iframe的name").contentWindow;
        var ifmObj=obj.document.getElementByIdx_x("iframe中控件的ID");
        ifmObj.click();
        实例：
        var obj=document.getElementByIdx_x("ifm").contentWindow;
        var ifmObj=obj.document.getElementByIdx_x("btnOk");
        ifmObj.click();
     3.  
        格式：$("#iframe的ID").contents().find("#iframe中的控件ID").click();//jquery 方法1
        实例：$("#ifm").contents().find("#btnOk").click();//jquery 方法1
     4.
        格式：$("#iframe中的控件ID",document.frames("frame的name").document).click();//jquery 方法2
        实例：$("#btnOk",document.frames("ifm").document).click();//jquery 方法2
      ```
    - 在iframe中获取父窗口的元素  
    
      ```js
      1.
        格式：window.parent.document.getElementByIdx_x("父窗口的元素ID").click();    
        实例：window.parent.document.getElementByIdx_x("btnOk").click();
      2.  
        格式：$('#父窗口中的元素ID', parent.document).click();
        实例：$('#btnOk', parent.document).click();
      ```
    
    - 注意  
      + iframe中的内容加载要慢于主页面加载, 即直接在 主页面js中操作 iframe 中的内容, 无效果.  
        * 解决方法1: 使用定时器, 延时绑定.  
        * 解决方法2: 将事件绑定在主页面事件A上, 点击A解发后, 再执行对 iframe 中节点的操作.  
        * 解决方法3: 将iframe中元素的事件写在iframe中.
        * 解决方法4: 将事件写在 `iframe.onload = function(){}` 中
      + 使用jquery 操作 iframe 时, 可以对 iframe 中的节点进行操作, 但在进行 iframe 页面 src 变更跳转时, 要在 *服务器*  环境下, 或在 *定时器* 中也可进行跳转. 但在本地环境下, 跳转无用.
      + iframe 中有自己的window对象, 这个window对象的 `window.parent.window` 或 `top` 是父级的window对象

```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Title</title>
      <script src="jquery.min.js"></script>
      <style>
          .left{
              float: left;
              width: 40%;
              height: 400px;
              border: 2px solid red;
          }
          .right{
              float: right;
              width: 40%;
              height: 400px;
              border: 2px solid green;
          }
          iframe{
              width: 100%;
              height: 100%;
              border: 3px solid mediumspringgreen;
          }
      </style>
  </head>
  <body>
      <h1>demo</h1>
      <div class="left">
          <iframe id="left" src="left.html" frameborder="1"></iframe>
      </div>
      <div class="right">
          <iframe id="right" src="right.html" frameborder="1"></iframe>
      </div>
  </body>
  <script>
      $(function () {
          $('#right').contents().find('a').on('click',function (event) {
              var e = event || window.event;
              e.preventDefault();
              console.log("未执行");
              // 直接绑定事件无效, 事件可绑定在 iframe 子标签中或延时, 因为代码执行与加载顺序问题, iframe 内容加载慢;
          });

          // 解决方法 1 主页面点击触发事件
          $('h1').click(function () {
              // 可操作内容,宽高
              $('#right').height(100); 
              $('#left').contents().find('p').html('事件执行'); // 执行

              // 可进行 iframe 子页面事件绑定
              $('#left').contents().find('p').on('click',function () {
                  console.log('OK,事件执行'); // 事件执行
                  $('#right').attr('src','link.html'); // js写法
                  $('#right')[0].setAttribute('src','link.html'); // 原生写法
              })

          });
           // 解决方法2 主页面对 iframe 子页面延时操作
          setTimeout(function () {
              $('#left').contents().find('p').html('执行'); // 事件执行
              $('#left').contents().find('p').on('click',function () {
                  console.log('执行'); // 事件执行
                  $('#right', parent.document).attr('src','link.html');
                  $('#right')[0].setAttribute('src','link.html');
              })
          }, 2000);

          // 解决方法3 写在 iframe 页面中 
              $('p').click(function () {
                  $('#right', parent.document).attr('src','link.html');
              });

      })
  </script>
  </html>

```
      
      
#### 5  each
  ```js
    $(selector).each(function(index, item){
      index -- 索引 0 1 2 
      item -- 对象 $obj
    });
    $.each(obj,function(index, item){
      obj -- $对象 或 数组
      index -- 索引 0 1 2 
      item -- 对象 $obj
    });
  ```

#### 6  data 
    - jquery 中的 `$(item).data(key, value)` 方法是向jquery对象中存入数据, 数据可以是任意类型. 
    - 注意, 当向查找到的多个节点存入对象数据时, 要使用遍历方法, 进行深度复制, 因对象是一种引用类型,否则是创建一个.
    - 存入数据的读取, 用 `$(item).data(key).value;` 或 `$(item).data(key)[value];` 方法.
    - 这与js 对象不同, 在`console.dir(item)` 中找不到对象的key值, 数据并没存在 js对象上, 而是存在jq对象上.

#### 7   jq 对象与 js 对象之间的转化  
```js
       // js ==> jq  
       DOM ==> $(DOM);
    
      // jq ==> js
       $(DOM) ==> $(DOM)[0];
       $(DOM) ==> $(DOM).get(0);
```
#### 8 extend 
```js
    // ==== 有源 =====
    // 初始化默认值   true 深度复制    {} 目的对象  options1 $.fn.obj.defaults  options2 默认值 "对象"  后面的源会覆盖前面的源, 默认值放在前面
    this.opts = $.extend(true, {}, options1, $.fn.obj.defaults, options2); // 对象值合并到 {} 后面的会覆盖前面的
    
    extend(dest,src1,src2,src3...);  //将src1,src2,src3...合并到dest中,返回值为合并后的dest
    var newSrc=$.extend({},src1,src2,src3...); //也就是将"{}"作为dest参数。
    
    var result=$.extend({},{name:"Tom",age:21},{name:"Jerry",sex:"Boy"}); // 结果 result={name:"Jerry",age:21,sex:"Boy"}
    
    $.extend(src); // 该方法就是将src合并到jquery的全局对象中去
    
    $.fn.extend(src); // 该方法将src合并到jquery的实例对象中去
    
    $.extend($.net,{hello:function(){alert('hello');} }); //在jquery全局对象中扩展一个net命名空间
    
    // 重载原型
    extend(boolean,dest,src1,src2,src3...);
    
    // true 深度拷贝
    var result=$.extend( true, {},  
        { name: "John", location: {city: "Boston",county:"USA"} }, 
        { last: "Resig", location: {state: "MA",county:"China"} } 
     );
     
     // 结果
     result={name:"John",last:"Resig",location:{city:"Boston",state:"MA",county:"China"}
     
     // false 
     var result=$.extend( false, {}, 
          { name: "John", location:{city: "Boston",county:"USA"} }, 
          { last: "Resig", location: {state: "MA",county:"China"} } 
      );
      
      // 结果
      result={name:"John",last:"Resig",location:{state:"MA",county:"China"}}  
```
#### 9 js动画重复问题

```js
$(this).filter(':not(:animated)').slideDown(200);
```


## 命名空间 
```js
// 方法一
  var com;    
  if(!com) com = {}; //第一级域名     
  com.ModuleClass = {}; //第二级域名     
  com.ModuleClass.函数名1=function(){     
      函数体；     
  }   
  com.ModuleClass.函数名2=function(){     
      函数体；     
  }
  
  // 方法二
  //1、命名空间注册工具类     
      var Namespace = new Object();     
      Namespace.register = function(path){     
          var arr = path.split(".");     
          var ns = "";     
          for(var i=0;i<arr.length;i++){     
              if(i>0) ns += ".";     
              ns += arr[i];     
              eval("if(typeof(" + ns + ") == 'undefined') " + ns + " = new Object();");     
          }     
      }     

      //2、注册命名空间 com.boohee.ui     
      Namespace.register("com.boohee.ui");     

      //3、使用命名空间     
      com.boohee.ui.TreeGrid = function(){     
          this.sayHello = function(name){     
              alert("Hello " + name);     
          }     
      }     
      var t = new com.boohee.ui.TreeGrid();     
      t.sayHello("uid");
      
      *** 构造命名空间 ***/
        /*
        * if (typeof(window.Com) == "undefined")//也可以使用：if (typeof(Com) == "undefined")
        {
        window.Com = {};//也可以使用：window.Com = new Object();
        }

        */
        //一级：BrcLib
        if(typeof(BrcLib) == "undefined")
        {
            BrcLib = new Object();
        }
        //二级：BrcLib.JavaScript
        if(typeof(BrcLib.JavaScript)=="undefined")
        {
            BrcLib.JavaScript = {};
        }
        //三级：BrcLib.JavaScript.File
        if(typeof(BrcLib.JavaScript.File)=="undefined")
        {
            BrcLib.JavaScript.File = {};
        }
        //三级：BrcLib.JavaScript.Message
        if(typeof(BrcLib.JavaScript.Message)=="undefined")
        {
            BrcLib.JavaScript.File = {};
        }

        //静态方法
        BrcLib.JavaScript.Message.ShowMessage = function(ms)
        {
        alert(ms);
        }

        //必须使用new后的方法
        BrcLib.JavaScript.Message.prototype.formatString = function(format)
        {
        //code
        }
```

## 鼠标滚轮方向 
```js
  var scrollFunc = function (e) {  

　　　　　　e = e || window.event;  

        　　　if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件               

            　　　　if (e.wheelDelta > 0) { //当滑轮向上滚动时  

                　　　　alert("滑轮向上滚动");  

            　　　　}  

            　　　　if (e.wheelDelta < 0) { //当滑轮向下滚动时  

                　　　　alert("滑轮向下滚动");  

            　　　}  

        　　　　} else if (e.detail) {  //Firefox滑轮事件  

            　　　　if (e.detail> 0) { //当滑轮向上滚动时  

                　　　　alert("滑轮向上滚动");  

            　　　　}  

           　　　　 if (e.detail< 0) { //当滑轮向下滚动时  

                　　　　alert("滑轮向下滚动");  

            　　　　}  

       　　　　 }  

    　　　　}  

    　　//给页面绑定滑轮滚动事件  

    　　if (document.addEventListener) {//firefox  

        　　document.addEventListener('DOMMouseScroll', scrollFunc, false);  

    　　}  

   　　 //滚动滑轮触发scrollFunc方法  //ie 谷歌  

　　　　window.onmousewheel = document.onmousewheel = scrollFunc;   
```

## 鼠标是否在盒子中 
```js
// 方法一
div.onmouseout=function(event){
    var div = document.getElementById("test");
    var x=event.clientX;
    var y=event.clientY;
    var divx1 = div.offsetLeft;
    var divy1 = div.offsetTop;
    var divx2 = div.offsetLeft + div.offsetWidth;
    var divy2 = div.offsetTop + div.offsetHeight;
    if( x < divx1 || x > divx2 || y < divy1 || y > divy2){
    //如果离开，则执行。。
}

// 方法二 
  // 通过mouseover，mouseout来触发事件，才判断鼠标是否在该区域。 但是这种方法的局限性就是，必须要触发mouseover，或mouseout，mouseleave事件才能知道。

// 方法三
  if(myDiv.contains(window.event.srcElement))
  if(myDiv.contains(鼠标位置的元素对象));
 // contains 如果A元素包含B元素，则返回true，否则false。唯一不支持这个方法的是IE的死对头firefox。
 

// 常用属性
/*
clientHeight     获取对象的高度，不计算任何边距、边框、滚动条，但包括该对象的补白。
clientLeft     获取    offsetLeft     属性和客户区域的实际左边之间的距离。
clientTop     获取    offsetTop     属性和客户区域的实际顶端之间的距离。
clientWidth     获取对象的宽度，不计算任何边距、边框、滚动条，但包括该对象的补白。
offsetHeight     获取对象相对于版面或由父坐标    offsetParent     属性指定的父坐标的高度。
offsetLeft     获取对象相对于版面或由    offsetParent     属性指定的父坐标的计算左侧位置。
offsetParent     获取定义对象    offsetTop     和    offsetLeft     属性的容器对象的引用。
offsetTop     获取对象相对于版面或由    offsetTop     属性指定的父坐标的计算顶端位置。
offsetWidth     获取对象相对于版面或由父坐标    offsetParent     属性指定的父坐标的宽度。
offsetX     设置或获取鼠标指针位置相对于触发事件的对象的    x     坐标。
offsetY     设置或获取鼠标指针位置相对于触发事件的对象的    y     坐标。
clientX,clientY   鼠标当前相对于网页的位置，当鼠标位于页面左上角时clientX=0, clientY=0
screenX, screenY是相对于用户显示器的位置

网页可见区域宽： document.body.clientWidth
网页可见区域高： document.body.clientHeight
网页可见区域宽： document.body.offsetWidth    (包括边线的宽)
网页可见区域高： document.body.offsetHeight   (包括边线的宽)
网页正文全文宽： document.body.scrollWidth
网页正文全文高： document.body.scrollHeight
网页被卷去的高： document.body.scrollTop
网页被卷去的左： document.body.scrollLeft
网页正文部分上： window.screenTop
网页正文部分左： window.screenLeft
屏幕分辨率的高： window.screen.height
屏幕分辨率的宽： window.screen.width
屏幕可用工作区高度： window.screen.availHeight
屏幕可用工作区宽度：window.screen.availWidth
*/
```

## 移动端touch兼容
```js
    var firstTouch = true;
        var hasTouch = 'ontouchstart' in window,
            startEvent = hasTouch ? 'touchstart' : 'mousedown',
            moveEvent = hasTouch ? 'touchmove' : 'mousemove',
            endEvent = hasTouch ? 'touchend' : 'mouseup',
            cancelEvent = hasTouch ? 'touchcancel' : 'mouseup';
        $('body').on(startEvent, function (e) {
            if (firstTouch) {
                firstTouch = false;
                document.getElementById('bgm').play();
            } else {
                return;
            }
        });


        $(".bgm-btn").on(startEvent, function (e) {
                e.preventDefault(); // 用于防止移动端click击穿
                e.stopPropagation();
                var dom = document.getElementById('bgm');
                if (dom.paused) {
                    dom.play();
                    $(".bgm-btn").removeClass("mute");
                } else {
                    dom.pause();
                    $(".bgm-btn").addClass("mute");
                }
            });


```

## 微信音乐自动播放
```js
    function audioAutoPlay(id){
        var audio = document.getElementById(id),
            play = function(){
                audio.play();
                document.removeEventListener("touchstart",play, false);
            };
        audio.play();
        document.addEventListener("WeixinJSBridgeReady", function () {
            play();
        }, false);
        document.addEventListener('YixinJSBridgeReady', function() {
            play();
        }, false);
        document.addEventListener("touchstart",play, false);
    }
    audioAutoPlay('Jaudio');
```

## 手机摇一摇
```js
/**
     * 移动端摇一摇
     * @params devicemotion 提供设备加速度信息
     */
    window.addEventListener('devicemotion', devicemotionHandler, false);

    var x,
        y,
        z,
        last_x,
        last_y,
        last_z,
        last_time = 0,
        SHAKE_SPEED = 4000;
   function devicemotionHandler (evet) {
       var acc = event.accelerationIncludingGravity,
           curTime = new Date().getTime(),
           diffTime = curTime - last_time;

        if (diffTime > 100) {
              last_time = curTime;

              x = acc.x;
              y = acc.y;
              z = acc.z;

              var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
              if (speed > SHAKE_SPEED) {
                document.getElementById("audio").play()
              }

              last_x = x;
              last_y = y;
              last_z = z;
        }
   }
```

## 阻止事件冒泡与捕获
```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        .outer{
            width: 500px;
            height: 500px;
            padding: 30px;
            border: 3px solid green;
        }

        .inner{
            width: 200px;
            height: 200px;
            background: red;
        }
    </style>
</head>
<body>
    <div class="outer" id="outer">
        <div class="inner" id="inner"></div>
    </div>

    <script>
        let outer = document.querySelector('#outer');
        let inner = document.querySelector('#inner');

        // false 冒泡流(默认)   true 捕获流

        // 阻止事件捕获
        outer.addEventListener('click', function (event) {
            let e = event || window.event;
            e.stopPropagation();
            console.log('outer click');
        },true); // 事件阻止在此层， 不再向下传递， 参数必须是true
        inner.addEventListener('click',function () {
            console.log('inner click');
        }, true);  // 参数true || false

        // 阻止事件冒泡
        outer.addEventListener('click',function () {
            console.log('outer click');
        }, false); //外层事件必须是冒泡流
        inner.addEventListener('click',function (event) {
            let e = event || window.event;
            e.stopPropagation();
            console.log('inner click');
        }, false); // 参数 true || false

    </script>
</body>
</html>
```

## setTimeout
  + `setTimeout` 生成时会产生 `Number` 类型的 ID, 用于 `clearTimeout` 时清除;
  + `setTimeout` 的执行时间是从当前函数的调用栈清空之后再执行, 即使设置 0s 后执行;
  + `setTimeout` 计时是函数执行到代码所在位置时开始;
   ```js
    for (var i=1; i<=5; i++) {

        (function(i) {
            setTimeout( function timer() {
                console.log(i);
            }, i*1000 );
        })(i)
    }
     // 结果:  1 2 3 4 5
  ```

## 正则
```js
    // 去除两端空格
    String.prototype.trim = function () {
        return this.replace(/(^\s*)|(\s*$)/gm, '');
    };
    // 姓名正则
        var reg = /^([a-zA-Z\u4e00-\u9fa5\·]{2,10})$/;

    // 拼音正则
        var reg = /^([a-zA-Z\s\·]{2,100})$/;
   
    // 证件号
        var regID = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
        var regPort = /^1[45][0-9]{7}|G[0-9]{8}|P[0-9]{7}|S[0-9]{7,8}|D[0-9]+$/;

    // 电话号码
        var reg = /^1\d{10}$/;

    // QQ
        var reg = /^[1-9][0-9]{4,14}$/;
    //    微信号
        var reg = /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/;
    // 视频格式
        var reg = /video\/[mp4]|[mov]|[avi]|[swf]|[rmvb]|[flv]|[wmv]|[quicktime]/i.test(file.type);
```
