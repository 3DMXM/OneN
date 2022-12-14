/**
 * 短链相关操作
 */
const {GetNowTime} = require("./model");

/**
 * 获取短链列表
 * @param {*} callback 
 */
module.exports.GetLinkList = function(callback){
    // 连接到数据库
    const connection = require("./MySql")();
    // 从短链表中获取短链列表
    connection.query("select * from link",function(err,result){
        callback(err,result);
        if (err){
            console.log(`GetLinkList:${err}`);
        }
    })
}

/**
 * 通过短链获取长链
 * @param {String} short_link 
 * @param {Function} callback 
 */
module.exports.GetLink = function(short_link, callback){
    // 连接到数据库
    const connection = require("./MySql")();
    // 获取 short_link = short_link 的短链
    connection.query("select * from link where short_link = ?",[short_link],function(err,result){
        callback(err,result);
        if (err){
            console.log(`GetLink:${err}`);
        }
    })
}

/**
 * 添加短链
 * @param {Object} link 
 * @param {Function} callback 
 */
module.exports.AddLink = function(link, callback){
    // 连接到数据库
    const connection = require("./MySql")();
    /**
     * 插入短链
     * short_link, long_link, click_cot = 0
     */
    connection.query("insert into link(short_link, long_link, click_cot) values(?,?,?)",[link.short_link, link.long_link, 0],function(err,result){
        callback(err,result);
        if (err){
            console.log(`AddLink:${err}`);
        }
    })

}

module.exports.EditLink = function(link, callback){
    // 连接到数据库
    const connection = require("./MySql")();
    // 编辑 id = link.id 的短链
    let time = GetNowTime();
    connection.query("update link set short_link = ?, long_link = ?, click_cot = ? where id = ?",[link.short_link, link.long_link, link.click_cot, link.id],function(err,result){
        callback(err,result);
        if (err){
            console.log(`EditLink:${err}`);
        }
    })
}

module.exports.ClickAdd = function(short_link, callback){
    // 连接到数据库
    const connection = require("./MySql")();
    // 增加 click_cot +1
    connection.query("update link set click_cot = click_cot + 1 where short_link = ?",[short_link],function(err,result){
        callback(err,result);
        if (err){
            console.log(`ClickAdd:${err}`);
        }
    })
}