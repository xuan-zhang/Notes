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
+ `setState`
  + 调用此方法就会触发更新阶段钩子函数
  + 在周期函数中的使用
    + 在 `constructor`使用无效
    + 在 `getDerivedStateFromProps` 不能调用
    + 在 ~~`componentWillMount`~~ 中使用有效，但不一定会引起组件重新渲染
    + 在 ~~`componentWillReceiveProps`~~ 中可以使用
    + 不能在 `shouldComponentUpdate` ~~`componentWillUpdate`~~ 中调用，会引起死循环
    + 在 `render` 中使用会陷入死循环
    + 在 `componentDidUpdate` 中使用要特别注意判断，否则会陷入死循环
    + 在 `componentDidMount` 中可以使用，用于接口数据获取

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
+ `static getDerivedStateFromProps(nextProps, prevState):Partial<prevState> | null`
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
+ `static getDerivedStateFromProps(nextProps, prevState):Partial<prevState> | null`
  + 每次渲染之前都会调用, 不管造成重新渲染的原因是什么，不管初始挂载还是后面的更新都会调用
  + 需要在该方法中返回一个对象或null：如果返回的是对象，则会更新 state，如果返回的是null，则表示不更新。
  + 使用该方法的时候需要初始化 `state` ，否则在控制台中会出现警告信息，不能在该方法内部，调用 `this.state`
  + 无法在此函数内使用 `this`, 这里的 `this` 指向 `undefined`
+ `shouldComponentUpdate(nextProps, nextState, nextConext):boolean`
  + 每次调用 `setState` 都会触发，用于判断是否要重新渲染组件
    + 能过比较 `nextProps` `nextState` 及当前组件的 `this.props` `this.state` 的状态来判断是否重新渲染
    + 如果返回 `false` 后续周期函数不再触发
    + 不能使用 `setState`, 会死循环
    + 一般能过此函数进行性能优化
      + 父组件 `render` 会触发 子级组件 更新阶段
      + 可在些函数中中止不必要的更新，后台的 虚拟 DOM diff ...
+ ~~`componentWillUpdate()/UNSAFE_componentWillUpdate(nextProps, nextState, nextContext)`~~
  + 组件即将被更新时触发
  + `shouldComponentUpdate` 返回 `true` 或 调用 `forceUpdate` 之后调用
  + 不能在该钩子中使用 `setState`
+ `render()`
+ `getSnapshotBeforeUpdate(prevProps, prevState): any | null`
  + 返回值称为一个快照（snapshot），如果不需要 snapshot，则必须显示的返回 `null`
  + 返回值将作为 `componentDidUpdate()` 的第三个参数使用。所以这个函数必须要配合 `componentDidUpdate`() 一起使用
+ `componentDidUpdate(prevProps, prevState, snapShot)`
  + 组件更新之后调用
  + `props` `state` 中此钩子函数内已更改成最新, `this.props` 访问到的是新的 `props`
  + 钩子内 `setState` 有可能会触发重复渲染，需要自行判断，否则会进入死循环

### 卸载阶段

+ `componentWillUnmount()`
  + 组件卸载前调用
  + 进行一些清理工作
    + 去除定时器
    + 取消 Redux 订阅事件
    + 清除 componentDidMount 中手动创建的 DOM 元素
    + 去除可能的内存泄露
    + ...


