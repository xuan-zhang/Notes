/*
* 数据处理
* */
const getDb = require('../config/mongodb_config');

const model = {};

model.getuser = function (callback) {
    getDb(function (db) {
        db.collection('user').find().toArray(function (err, docs) {
            if(err){
                console.log('err: '+ err);
            }
            console.log(docs);
            callback(docs[0].username);
        });
    })
};

module.exports = model;