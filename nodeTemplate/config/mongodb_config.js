// 数据库配置模块
// 引入 mongodb 模块
const mon = require('mongodb');
const MongoClient = require('mongodb').MongoClient;

// 数据库连接配置
const DB_NAME = 'portal';

let dbUrl = 'mongodb://localhost:27017/' + DB_NAME;

function getDb(callback) {
    mon.connect(dbUrl, function (err, db) {
        if (err) {
            console.log("链接失败: " + err);
            return;
        }
        // 输出数据库操作对象
        console.log('链接成功');
        console.dir(db.collection);
        callback(db);
    })
}

module.exports = getDb;