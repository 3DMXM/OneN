const md5 = require('md5');

/**
 * 用户登录
 * @param {String} name 
 * @param {String} password 
 * @param {Function} collback 
 */
module.exports.Login = function(name,password, collback){
    // 连接数据库
    const connection = require("../MySql")();
    // 双重MD5加密password
    password = md5(md5(password));
    // 从数据库获取用户信息
    connection.query("select * from user where user_name = ? and user_password = ?",[name,password],function(err,result){
        if(!err && result.length > 0){
            // 生成token
            let token = md5(`${name}${password}${new Date().getTime()}`);
            // 将token写入数据库
            connection.query("update user set user_token = ? where user_name = ? and user_password = ?",[token,name,password],function(err,result2){
                if(!err){
                    collback(err, token);
                }
            })
        }else{
            console.log(`Login: ${err}`);
            collback(err, null);
        }
    })
}

/**
 * 登出
 * @param {String} token 
 * @param {Function} collback 
 */
module.exports.SignOut = function(token, collback){
    // 连接数据库
    const connection = require("../MySql")();
    // 清除token
    connection.query("update user set user_token = '' where user_token = ?",[token],function(err,result){
        if(!err){
            collback(err, result);
        }else{
            console.log(`SignOut: ${err}`);
            collback(err, null);
        }
    })
}

/**
 * 通过token判断用户是否登录
 * @param {String} token 
 * @param {Function} collback 
 */
module.exports.CheckUser = function(token, collback){
    // 连接数据库
    const connection = require("../MySql")();
    // 从数据库获取用户信息
    connection.query("select * from user where user_token = ?",[token],function(err,result){
        if(!err && result.length > 0){
            collback(err, result);
        }else{
            console.log(`CheckUser: ${err}`);
            collback(err, []);
        }
    })
}

/**
 * 修改用户密码
 * @param {*} roken 
 * @param {*} NewPassWord 
 * @param {*} collback 
 */
module.exports.ChangePassword = function(roken,NewPassWord, collback){
    // 连接数据库
    const connection = require("../MySql")();
    // 双重MD5加密password
    NewPassWord = md5(md5(NewPassWord));
    // 从数据库获取用户信息
    connection.query("update user set user_password = ? where user_token = ?",[NewPassWord,roken],function(err,result){
        if(!err){
            collback(err, result);
        }else{
            console.log(`ChangePassword: ${err}`);
            collback(err, null);
        }
    })
}