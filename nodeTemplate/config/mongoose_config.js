// 数据库配置模块
// 引入 mongoose 模块
const mongoose = require('mongoose');

// 数据库连接配置
const DB_NAME = 'portal';

let dbUrl = 'mongodb://localhost:27017:/' + DB_NAME;
mongoose.connect(dbUrl); // 连接数据库
let db = mongoose.connection;

// 连接成功
db.on('connected',function () {
    console.log('Mongoose 链接成功： ' + dbUrl);
});

// 连接异常
db.on('error',function (err) {
    console.log('Mongoose 链接异常：'+ err);
});

// 连接断开
db.on('disconnected',function () {
    console.log('Mongoose 链接已断开');
});

module.exports = mongoose;