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
