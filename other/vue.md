# Vue

## vuex

+ ![vuex](../assets/images/vuex.png)
+ vuex 是全局单例模式，组件共享状态抽离
+ Vuex 应用的核心就是 store（仓库), 你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地提交 (commit) `mutation`
+ `state` 状态
  + `this.$store.state.count`
  + `mapState`
    + 名称不同使用 对象， 相同使用 数组
    + `computed`
  + `state` 状态的改变 必须通过 `commit`提交 `mutationa`
  + `stroe.commit('increment')`
+ `mutations`
  + `Mutation` 必须是同步函数
  + `this.$store.commit('xxx')` 提交 `mutation`
  + `methods: { ...mapMutations(['increment'])`
+ `getters`
  + getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
  + `store.getters.doneTodos`
  + `computed` `mapGetters`
+ `action`
  + Action 提交的是 mutation，而不是直接变更状态。
  + Action 可以包含任意异步操作。
  + Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit 提交一个 mutation
  + `store.dispatch('increment')`

    ```js
    methods: {
      ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ```

  + 包含同步/异步操作，支持多个同名方法，按照注册的顺序依次触发
+ 模块
  + `namespaced: true` 命名空间
    + 所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名
    + `getters['account/isAdmin']`
+ 严格模式
  + `strict: process.env.NODE_ENV !== 'production'`
  + 在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误
  + 不要在发布环境下启用严格模式！

### 总结

+ 改变 `state` 的方法只能是写在 `mutations` 中的方法
+ 触发 `mutations` 的方法 只能是 `commit`， `commit`方法的实数是 `mutations` 中的方法名
+ 可以使用 `mapMutations` 语法糖触发 `mutations` 中的方法， 将 `this.add()` 映射为 `this.$store.commit('increment')`
+ `action` 可以触发 `commit`，触发 `action` 用 `dispatch`
+ `state` 中的所有状态改变都是 `commit` 一个 `mutation`

## VueRouter

+ `<router-link to="/foo">Go to Foo</router-link>`
+ `goback`

    ```js
    goBack () {
        window.history.length > 1
            ? this.$router.go(-1)
            : this.$router.push('/')
    }
    ```

+ 当 `<router-link>` 对应的路由匹配成功，将自动设置 `class` 属性值 `.router-link-active`
+ 动态路由匹配
  + 模式:  `/user/:username/post/:post_id`
  + 匹配路径: `/user/evan/post/123`
  + `$route.params`: `{ username: 'evan', post_id: 123 }`
  + 当使用路由参数时，例如从 `/user/foo` 导航到 `/user/bar`，原来的组件实例会被复用。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。不过，这也意味着组件的生命周期钩子不会再被调用。
  + 复用组件时，想对路由参数的变化作出响应的话，你可以简单地 `watch` (监测变化) `$route` 对象
  + 或者使用  `beforeRouteUpdate` 导航守卫：
+ 嵌套路由
+ 命名的路由: `router.push({ name: 'user', params: { userId: 123 }})`
+ 带查询参数，变成 `/register?plan=private`  `router.push({ path: 'register', query: { plan: 'private' }})`
+ 如果提供了 `path`，`params` 会被忽略
+ 需要提供路由的 `name` 或手写完整的带有参数的 `path`
+ `router.push`、 `router.replace` 和 `router.go` 效仿 `window.history.pushState`、 `window.history.replaceState` 和 `window.history.go`
+ `history` 模式: 服务器就不再返回 404 错误页面, 应该在 Vue 应用里面覆盖所有的路由情况，然后在给出一个 404 页面。

## Vue 权限管理方法

### 方案一

+ 公共部分，即所有人都能看到的路由
+ 动态加载部分, 依据权限动态生成
  + 本地保存完整路由信息，但并不立即初始化Vue应用，待用户登录拿到权限后，用菜单权限筛选出可用路由，再用可用路由初始化Vue应用。
  + 要将登录页独立出去做成一个单独的页面，登录后将用户数据保存在本地，再通过url跳转到Vue应用所在页面，Vue应用启动前通过本地用户数据完成路由筛选，然后初始化Vue应用

    ```js
    let user = sessionStorage.getItem('user');
    if (user) {
        user = JSON.parse(user);
        //筛选得到实际路由
        let fullPath = require('fullPath.js');
        let routes = filter(fullPath, user.menus);
        //创建路由对象
        let router = new Router({routes});
        //生成Vue实例
        new Vue({
            el: '#app',
            router,
            render: h => h(App)
        });
    }else{
        location.href = '/login/';
    }

    ```

+ `router.beforeEach`
  + 判断 `to.Path`, 路径是否需要权限
  + 获取用户 role 权限列表，对比路由
