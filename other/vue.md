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
