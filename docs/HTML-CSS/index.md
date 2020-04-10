# HTML CSS

## 响应式网站字体大小设置 rem 方式

```js
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if (clientWidth >= 750) {
                docEl.style.fontSize = '100px';
            } else {
                docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
            }
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
```

## HTML 自定义属性

+ 以 `data-*` 开始, 可以在 DOM `dataset[*]` 对象中获取
+ 不以 `data-` 开头，不会在 `dataset` 对象中

  ```html
    <p data-dimg="111" data-my-img="222" data-55-img="444" data-v-12="555" img="333" id="dp"></p>
    <script>
        dp.dataset.dimg // 111
        dp.dataset.myImg // 222
        dp.dataset['55Img'] // 444
        dp.dataset['v-12'] // 555
        dp.dataset.img // undeinfed
        dp.getAttribute('img') // 333

    </script>
  ```

+ img 标签 src 属性
  + 以 `img.getAttribute('src')` 获取原始值 `/a.png`
  + 以 `img.src` 获取，获取绝对路径，`https://www.**.com/a.png`
