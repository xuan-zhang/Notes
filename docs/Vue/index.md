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
+ 匹配路由

  ```js
      const breadcrumb = this.$route?.meta?.breadcrumb;
      let matched
      if (Array.isArray(breadcrumb)) {
          matched = breadcrumb.map(item => this.$router.match(item)).filter(item => item.meta && item.meta.title)
      } else {
         matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      }
  ```

## 函数式组件

+ `<template functional>*******</template>`
+ 组件上的 attribute 都会被自动隐式解析为 prop
+ 无状态，无实例(没有`this`)
+ 组件需要的一切都是通过 `context` 参数传递

## 组件传参

+ props
+ attrs(props 中未定义 class style 除外)
+ $listeners(除 .native 修饰 的事件)
+ $emit
+ v-model
+ slot
+ $refs $root $parent $children
+ project inject
+ Vuex

## jsx

> [veu jsx](https://github.com/vuejs/jsx)

+ `v-model` 使用 `value onIput` 事件代替 或使用 `vModel_trim`

  ```jsx
    <el-input value={this.searchData[item.key]} onInput={this.setData.bind(this, item.key)} clearable size="small" />

    <el-input vModel_trim={this.text} />
  ```

+ slot

  ```jsx
    // 定义-使用：直接在 div 中插入 默认插槽
    <div>{this.$slots.default}</div>

    // 在 el-form-item 中插入作用域 header 并传入 user 数据
    <el-form-item>
        //使用： 使用 el-form-item 的 label 插槽
        <span class="aaa" slot="label">使用label</span>
        // 定义-使用：此处放置组件的 header
        {this.$scopedSlots.header({user: this.userInfo})}
    </el-form-item>

    // 使用 不是 jsx 中
    <Search>
        <template #header={user}>
            <div>这里是user内容 {{JSON.stringfy(user)}}</div>
        </template>
    </Search>

    // 使用作用域插槽 jsx 中
    <el-table data={[{ name: '张三', age: 2 }]}>
        <el-table-column label="姓名" prop="name" />
        <el-table-column label="年龄" scopedSlots={{default: ({ row }) => <div>{JSON.stringify(row)}</div>}}>
        </el-table-column>
    </el-table>
  ```
