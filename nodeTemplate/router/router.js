/*
* 路由处理
* */
const model = require('../model/model');
const router = {};

// 首页
router.index = function (req, res) {
    res.render('index');
};

// 首页头部
router.header = function (req, res) {
    console.log(req);
    res.render('header');
};

// 用户信息
router.user = function (req, res) {
    console.log('接收到user请求');
    model.getuser(function (result) {
        res.json({'focus': result});
    })
};
module.exports = router;

