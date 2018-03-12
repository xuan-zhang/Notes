// 去除两端空格
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/gm, '');
};

// 单位名称
function departmentname(obj) {
    var res = obj.value.trim();
    var reg = /[a-zA-Z0-9\u4e00-\u9fa5\·]{2,}/;
    var bool = reg.test(res);
    if (bool) {
        obj.value = res;
    } else {
        obj.value = "";
        layer.msg('您输入单位名称!', {
            time: 1000
        });
    }


}



//  通信地址
function departmentaddress(obj) {
    if (obj.value.trim().length < 3) {
        layer.msg('请输入通信地址！', {
            time: 1000
        });
    }
}


//  单位性质
function departmenttype(obj) {
    if (obj.value.trim() == "") {
        layer.msg('请输入您的单位性质!', {
            time: 1000
        });
    }
}


// 邮政编码
function postcode(obj) {
    var res = obj.value.trim();
    var reg = /^[1-9][0-9]{5}$/;
    var bool = reg.test(res);
    if (bool) {
        obj.value = res;
    } else {
        obj.value = "";
        layer.msg('您输入的邮政编码不正确，请重新输入!', {
            time: 1000
        });
    }
}

// 教师数量
function teachercount(obj) {
    var res = obj.value.trim();
    var reg = /^[0-9]+$/;
    var bool = reg.test(res);
    if (bool) {
        obj.value = res;
    } else {
        obj.value = "";
        layer.msg('您输入的教师人数不正确，请重新输入！', {
            time: 1000
        });
    }
}

// 学校名称
function schoolname(obj) {
    var res = obj.value.trim();
    var reg = /[a-zA-Z0-9\u4e00-\u9fa5\·]{2,}/;
    var bool = reg.test(res);
    if (bool) {
        obj.value = res;
    } else {
        obj.value = "";
        layer.msg('学校名称不能为空，请重新输入!', {
            time: 1000
        });
    }
}


// 学生人数
function studentcount(obj) {
    var res = obj.value.trim();
    var reg = /^[0-9]+$/;
    var bool = reg.test(res);
    if (bool) {
        obj.value = res;
    } else {
        obj.value = "";
        layer.msg('您输入的学生人数不正确，请重新输入！', {
            time: 1000
        });
    }
}

// 单位简介
function departmentdesc(obj) {
    if (obj.value.trim() == "") {
        layer.msg('请输入单位简介！', {
            time: 1000
        });
    }
}

// 邮件
function email(obj) {
    var res = obj.value.trim();
    var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    var bool = reg.test(res);
    if (bool) {
        obj.value = res;
    } else {
        obj.value = "";
        layer.msg('您输入的邮件格式不正确，请重新输入！', {
            time: 1000
        });
    }

}

// 人名
function names(obj) {
    var res = obj.value.trim();
    var reg = /^[a-zA-Z\u4e00-\u9fa5\·]+$/;
    var bool = reg.test(res);
    if (bool) {
        obj.value = res;
    } else {
        obj.value = "";
        layer.msg('您输入名称有误，请重新输入!', {
            time: 1000
        });
    }
}

// 职务
function duty(obj) {
    var res = obj.value.trim();
    var reg = /^[a-zA-Z\u4e00-\u9fa5\·]+$/;
    var bool = reg.test(res);
    if (bool) {
        obj.value = res;
    } else {
        obj.value = "";
        layer.msg('您输入职务信息!', {
            time: 1000
        });
    }
}

// 座机号码

function telephone(obj) {
    var res = obj.value.trim();
    var reg = /^0\d{2,3}-[1-9]\d{6,7}$/;
    var bool = reg.test(res);
    if (bool) {
        obj.value = res;
    } else {
        obj.value = "";
        layer.msg('您输入的座机号号码格式不正确，请重新输入!', {
            time: 1000
        });
    }
}

// 手机号码
function mobile(obj) {
    var res = obj.value.trim();
    var reg = /^1\d{10}$/;
    var bool = reg.test(res);
    if (bool) {
        obj.value = res;
    } else {
        obj.value = "";
        layer.msg('您输入的手机号码格式不正确，请重新输入!', {
            time: 1000
        });
    }
}

// 推广计划
function campaigns(obj) {
    if (obj.value.trim() == "") {
        layer.msg('请输入推广计划！', {
            time: 1000
        });
    }
}

// 拼音正则
function regspell(obj) {
    var res = obj.value.trim();
    var reg = /^([a-zA-Z\s\·]{2,100})$/;
    var bool = reg.test(res);
    if (bool) {
        obj.value = res;
    } else {
        obj.value = "";
        layer.msg('您输入的拼音有误, 请重新输入!', { time: 1000 })
    }
}

// 报考级别
function levelspell(obj) {
    var res = obj.value.trim();
    if (res == "") {
        layer.msg('请输入报考级别!', { time: 1000 });
    }
}

 // 证件号
 function cardnumbers(obj) {
    var res = obj.value.trim();
    var regID = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
    var regPort = /^1[45][0-9]{7}|G[0-9]{8}|P[0-9]{7}|S[0-9]{7,8}|D[0-9]+$/;
    var bool = true;
    switch ($('#idType').val()){
        case "identity":
            bool =regID.test(res);
            break;
        case "passport":
            bool=regPort.test(res);
            break;
        default: 
            bool= Boolean(res);
    }
    if (bool) {
        obj.value = res;
    } else {
        obj.value = "";
        layer.msg('您输入的证件号有误, 请重新输入!', {time: 1000})
    }
}


// QQ
function qqNumber(obj) {
    var res = obj.value.trim();
    var reg = /^[1-9][0-9]{4,14}$/;
    var bool = reg.test(res);
    if (bool) {
        obj.value = res;
    } else {
        obj.value = "";
        layer.msg('您输入的QQ号码有误, 请重新输入!', {time: 1000})
    }
}



//    微信号
function wechatNumber(obj) {
    var res = obj.value.trim();
    var reg = /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/;
    var bool = reg.test(res);
    if (bool) {
        obj.value = res;
    } else {
        obj.value = "";
        layer.msg('您输入的微信号码有误, 请重新输入!', {time: 1000})
    }
}