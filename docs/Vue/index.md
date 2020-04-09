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
