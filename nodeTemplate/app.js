// express 加载
const express = require('express');
const app = express();

// post 配置
const bodyParser = require('body-parser');

// 加载路由模块
const router = require('./router/router');

// post 配置
app.use(bodyParser.urlencoded({extended:false}));

// 静态资源站
app.use(express.static('./public'));

// 模板库
app.set('views',__dirname + '/views');

// 使用html后缀模板
app.set('view engine','html');
app.engine('.html',require('ejs').__express);

// 路由监听
app.get('/',router.index);
app.get('/header', router.header);
app.post('/user',router.user);
app.listen(80);