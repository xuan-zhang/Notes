# vue

##  vue-cli 的安装与使用
+ cnpm install vue-cli -g
+ vue init webpack Vue-project
+ cnpm install 

## 安装 element-ui
+ npm i element-ui -S
+ 全部引入
    - 修改 `mian.js` 文件, 添加
        ```js
            import ElementUI from 'element-ui';
            import 'element-ui/lib/theme-chalk/index.css';

            Vue.use(ElementUI);
        ```
+ 按需引入
    - 
