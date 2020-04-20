# Vue 笔记

## provide/inject

+ `provide: object | () => Object`, 对象状态不参访问组件中的 `this`
+ `inject: (key of privedeObject)[]` 如 `inject: ['key1', 'key2']`
+ `provide` 和 `inject` 绑定并不是可响应的。这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的属性还是可响应的

```js
 // 父组件 FatherComponent.vue
 export default {
     data() {
         return {
             element: null,
         }
     },
     provide: {
         activeElement: this.element // 错误 this == null
         activeElenent: 'test Value' // 可以
     },
     provide() {
         return {
             rootComponent: this, // this 当前组件 FatherComponent
             activeElement: this.element, // 注意：this.element = b 时，子组件中的 activeElement 还是 null
         }
     }
 }


 // 子组件 ChildComponent.vue
 export default {
     inject: ['rootComponent', 'activeElement'],
     computed: {
         element() {
             return this.activeElement // 此时 elemnt 不会随 父组件更新而更新
         }，
         element() {
             return this.rootComponent.element; // 此 element 会同父组件更新
         }
     }
 }

```

## 事件

+ `v-on` 绑定方法，无 `()`, 如：`<button @click="demo" />`, `demo` 会默认接收 `event` 对象做为第一个参数，也可用 `$event` 声明传入 `event` 对象, 可在 `event.target` 获取 DOM

## img 图片加载失败处理

+ 方法一: 图片加载失败后，替换 `src` `.once` 控制 `error` 只执行一次，防止备用图片也不存在情况无限循环

    ```vue
    <template>
        <img src="/a.png" :alt="item.name" @error.once="imgError">
    </template>
    <script>
        export default {
            methods: {
                imgError(event) {
                    console.log('imgError 执行');
                    event.target.src = '/b.png';
                },
            },
        };
    </script>
    ```

+ 方法二

  ```js
    import Vue from 'vue';

    import backImg from '@/assets/error-img.svg';

    /**
    * img 图片加载失败，替换为备选图片
    * v-img="imgPath" 备选图片地址，不传采用默认值
    * v-img.first 先用备选图片，当指定图片加载完成后再替换回来
    */

    Vue.directive('img', {
        bind(el, binding) {
            const imgUrl = binding.value || backImg; // 备选图片
            const useBackImg = url => {
            el.setAttribute('src', url);
            el.removeEventListener('error', useBackImg); // 只设置一次备选图片，阻止备选图片也加载失败死循环
            };

            if (binding.modifiers.first) { // 采用备选图片先显示方式
            const primUrl = el.getAttribute('src');
            el.setAttribute('src', imgUrl);
            let img = new Image();
            img.src = primUrl;
            img.onload = function () {
                el.setAttribute('src', primUrl); // 原图片加载完成，切的成原图片
                el.addEventListener('error', useBackImg.bind(null, imgUrl));
                img = null;
            };
            img.onerror = function () { // 原图片加载失败，直接使用备选图片
                img = null;
            };
            } else { // 原图片不显示
            el.addEventListener('error', useBackImg.bind(null, imgUrl));
            }
        },
    });
  ```

## VueRouter

+ 在 `router` 中 配置 `props: true` 参数，可以在 props 中接收 `route.params` 参数
+ `props` 参数可以是 函数，自定义返回值

## 函数式组件

+ `<template functional>*******</template>`
+ 组件上的 attribute 都会被自动隐式解析为 prop
+ 无状态，无实例(没有`this`)
+ 组件需要的一切都是通过 `context` 参数传递
