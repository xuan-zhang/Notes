# script 标签中 async 与 defer 的区别

+ ![加载与执行](../assets/images/asyncDefer.png)
+ ![加载与执行](../assets/images/asyncDefer2.png)

## 区别

+ 都是异步加载，不会阻止DOM解析
+ async: 加载完成之后就执行，执行时，阻止 DOM 解析
+ defer: 加载完成之后不立即执行，在文档解析完成之后,在 DOMContentLoaded 事件之前执行

## HTML 页面生命周期

> [参考：页面生命周期：DOMContentLoaded, load, beforeunload, unload](https://segmentfault.com/a/1190000011468675)

+ `DOMContentLoaded`
  + 浏览器已经完全加载了HTML，DOM树已经构建完毕，但是像是 `<img>` 和样式表等外部资源可能并没有下载完毕。
  + js可以访问所有DOM节点，初始化界面
  + document 对象触发 `document.addEventListener("DOMContentLoaded", ready);`
  + DOMContentLoaded需要等待脚本的执行，脚本又需要等待样式的加载
+ `load`
  + 浏览器已经加载了所有的资源（图像，样式表等）
  + 附加资源已经加载完毕，可以在此事件触发时获得图像的大小（如果没有被在HTML/CSS中指定）
  + window 触发
+ `beforeunload/unload`
  + 当用户离开页面的时候触发
  + 用户正在离开页面：可以询问用户是否保存了更改以及是否确定要离开页面。
  + window 触发

+ document.readyState属性给了我们加载的信息，有三个可能的值：
  + `loading` 加载 - document仍在加载。
  + `interactive` 互动 - 文档已经完成加载，文档已被解析，但是诸如图像，样式表和框架之类的子资源仍在加载。
  + `complete` - 文档和所有子资源已完成加载。状态表示 load 事件即将被触发。

+ readystatechange 是追踪页面加载的一个可选的方法
  + `document.addEventListener('readystatechange', () => console.log(document.readyState));`
  

## HTML5 标准 type 属性

对应值为 `module` 。让浏览器按照 ECMA Script 6 标准将文件当作模块进行解析，默认阻塞效果同 `defer`，也可以配合 `async` 在请求完成后立即执行。
