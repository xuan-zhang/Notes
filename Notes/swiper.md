# Swiper 笔记 [swiper3 API](http://www.swiper.com.cn/api/index.html)

## html 头结构
```html
<!DOCTYPE html>
<html lang="en" style="font-size: 16px;">

<head runat="server">
    <meta charset="UTF-8">
    <meta http-equiv="content-type" content="text/html;charset=utf-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="chrome=1,ie=edge">
    <meta name="renderer" content="webkit">
    <title>title</title>
    <meta name="author" content="author,email,address">
    <meta name="founder" content="" />
    <meta name="keywords" content="关键词" />
    <meta name="description" content="描述" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="format-detection" content="telephone=no,email=no" />
    <meta http-equiv="Cache-Control" content="no-siteapp,no-transform" />
    <!-- 浏览器自动转码 -->
    <meta name="robots" content="index,follow,noodp">
    <!-- 所有的搜索引擎 -->
    <link rel="icon" type="image/ico" href="icon/favicon.ico" />
    <!-- bootstrap 文件引入 -->
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link href="css/ie10-viewport-bug-workaround.css" rel="stylesheet">
    <link rel="stylesheet" href="css/font-awesome.min93e3.css">
    <link rel="stylesheet" href="css/swiper.min.css">
    <link rel="stylesheet" href="css/animate.min.css">
    <link rel="stylesheet" href="css/common.css">
    <link rel="stylesheet" href="css/index.css">
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    <script>
        (function (doc, win) {
            var docEl = doc.documentElement;
            if (!doc.addEventListener) return;
            var run = function () {
                var clientWidth = doc.documentElement.clientWidth;
                docEl.style.fontSize = 100 / 768 * clientWidth + "px";
            };
            var resizeEvt = "orientationchange" in window ? "orientationchange" : "resize";
            win.addEventListener(resizeEvt, run, false);
            doc.addEventListener("DOMContentLoaded", run, false);
        })(document, window);
    </script>
</head>
<script src="js/jquery.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/ie10-viewport-bug-workaround.js"></script>
<!-- 如果引用了 jquery swiper 可以引用下面 没有引用jquery 要引用完整 swiper.min.js  -->
<script src="js/swiper-3.4.2.jquery.min.js"></script>
<script src="js/common.js"></script>
```

## html 结构
```html
 <!-- 开关要引用 swiper.min.css -->
 <div class="swiper-container">
    <div class="swiper-wrapper">
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
    
    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
    
    <!-- 如果需要滚动条 -->
    <div class="swiper-scrollbar"></div>
</div>
<!-- 导航等组件可以放在container之外 -->




```
## css 样式
```css
.swiper-container {
    width: 600px;
    height: 300px;
}  
```

## js 代码
```js
var swiper4 = new Swiper('.swipercontianer', {
            paginationClickable: true,
            slidesPerView: 5,
            spaceBetween: 30,
            loop:true,
            breakpoints: {
                //当宽度小于等于640
                767: {
                    slidesPerView: 2
                },
                992: {
                    slidesPerView: 4
                },
                500: {
                    slidesPerView: 1
                }
            },
         // 如果需要分页器
           pagination: '.swiper-pagination',
    
         // 如果需要前进后退按钮
           nextButton: '.swiper-button-next',
           prevButton: '.swiper-button-prev',
    
         // 如果需要滚动条
           scrollbar: '.swiper-scrollbar',
        });

```


#### 注意:
+ 当使用 loop:true 这个属性时,swiper会将当前中的所有的slide节点复制两份, 即代码中同样的节点会有三个.
+ 当swiper-slide 中的个数变化时, 要使用 `myswiper.updata();` 方法.
+ 当swiper要删除不用时, 使用 `swiper.destory()` 方法.
+ swiper 给不同屏幕显示个数变化 使用 `breakpoints`  属性 ^这个属性只能在swiper3中有.
+ 一个页面中有多个swiper 时, js 中的类名要自定义.

