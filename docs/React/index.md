# React

> [create-react-app](https://www.html.cn/create-react-app/docs/getting-started/)  
> [react](https://zh-hans.reactjs.org/)  
> [redux](https://redux.js.org/)  [redux中文文档](https://www.redux.org.cn/)  
> [reactnative](https://reactnative.dev/)  
> [react-router](http://react-guide.github.io/react-router-cn/docs/Introduction.html)  

## 组件

+ react 组件必须首字母大写
  + 组件大小写是为了区别通过HTML标签定义的JSX，大写的组件在定义时，其type会是React.Component类型，若是将组件名写成了小写，则定义时会将其当作HTML标签定义进行
+ 组件声明
  + 函数式定义的无状态组件
    + 一个函数式组件不能在另一个函数式组件内声明
  + ~~es5原生方式React.createClass定义的组件~~
  + es6形式的extends React.Component定义的组件

## 组件传参

+ props
+ 回调函数
+ 观察者模式
+ context
+ react-redux

## form

+ `<input type="text" value="haha">` 的 react 中 不能编辑 但在原生 html 中 可编辑， 如 `value={undefined}` 则可编辑

## API

### props

+ `static defaultProps`: 设置默认 `props`
  + 如同 vue 中的 props 里的 `default` 参数

## 生命周期

> `UNSAFE_` 周期会在 v17 版本之后删除

+ 旧版生命周期(v16.0前)
  + ![react生命周期旧](../assets/images/reactLifecycleOld.jpg)
  + ![react生命周期旧](../assets/images/reactLifecycleRunOld.png)
+ 新版生命周期(v16.3后)
  + ![生命周期](../assets/images/reactLifecycleNew.jpg)

### 初始化阶段

+ `constructor(props: Readonly<P>, context?: any)`
  + 只调用一次 `super` 必须在使用 `this` 语句之前调用
  + 参数: `props`
  + 作用
    + 初始化 `state`
    + ...

### 挂载阶段

+ ~~`componentWillMount()/UNSAFE_componentWillMount()?:void`~~
  + 组件挂载之前调用，只调用一次 使用 `contructor` 代替
  + 此时调用 `this.setState` 不一定会引起组件重新渲染
+ `render(): ReactNode`
  + 用来渲染DOM
  + 必须是纯函数
  + 返回 `JSX.Element`
  + 不要在 `render` 里面修改 `state`，会触发死循环导致栈溢出
+ `componentDidMount?(): void`
  + 组件挂载后调用， 只调用一次
  + 可以在这里使用 refs 获取真实 DOM
  + 可在此处发起 异步请求 并进行 `setSate`

### 更新阶段

> `setState` 引起的 `state` 更新  
> 父组件能过 `setState` 引起的 `props` 变化时，触发更新阶段  
> 父组件 `render` 触发时， 触发更新子组件更新阶段
> 更新后的 state 和 props 相对之前的无论是否变化，都会引起组件重新 render

+ ~~`componentWillReceiveProps()/UNSAFE_componentWillReceiveProps(nextProps, nextContext)`~~
  + `props` 变化与 父组件重新渲染时，都会触发
  + `nextProps` 变化之后的 `props` 参数
    + 在该函数内使用 `this.props` 返回的是未更新前的 `props`
    + 可以在此函数内使用 `setState`
+ `shouldComponentUpdate(nextProps, nextState, nextConext):boolean`
  + 每次调用 `setState` 都会触发，用于判断是否要重新渲染组件
    + 能过比较 `nextProps` `nextState` 及当前组件的 `this.props` `this.state` 的状态来判断是否重新渲染
    + 如果返回 `false` 后续周期函数不再触发
    + 一般能过此函数进行性能优化
      + 父组件 `render` 会触发 子级组件 更新阶段
+ ~~`componentWillUpdate()/UNSAFE_componentWillUpdate()`~~
+ `render()`
+ `componentDidUpdate()`

### 卸载阶段

+ `componentWillUnmount()`

+ `static getDerivedStateFromProps()`
+ `getSnapshotBeforeUpdate()`
