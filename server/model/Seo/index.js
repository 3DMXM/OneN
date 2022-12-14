/**
 * Seo相关操作
 */
const {GetNowTime} = require('../model')

/**
 * 获取SEO列表
 * @param {Function} callback 
 */
module.exports.GetSeoList = function(callback){
    // 连接数据库    
    const connection = require("../MySql")();
    // 从seo表中获取seo列表
    connection.query("select * from seo",function(err,result){
        callback(err,result);
        if (err){
            console.log(`GetSeoList:${err}`);
        }
    })
}

/**
 * 添加Seo
 * @param {Object} seo 
 * @param {Function} callback 
 */
module.exports.AddSeo = function(seo,callback){
    // 连接数据库    
    const connection = require("../MySql")();
    /**
     * 添加seo
     * seo_parent
     * seo_title
     * seo_keywords
     * seo_description
     * seo_click_cnt = 0
     * seo_time = now()
     */
    let time = GetNowTime();
    connection.query("insert into seo (seo_parent,seo_title,seo_keywords,seo_description,seo_click_cnt,seo_time) values (?,?,?,?,?,?)",[seo.seo_parent,seo.seo_title,seo.seo_keywords,seo.seo_description,0,time],function(err,result){
        callback(err,result);
        if (err){
            console.log(`AddSeo:${err}`);
        }
    })
}

/**
 * 编辑SEO
 * @param {Object} seo 
 * @param {Function} callback 
 */
module.exports.EditSeo = function(seo,callback){
    // 连接数据库    
    const connection = require("../MySql")();
    // 编辑 id = seo.id 的seo
    let time = GetNowTime();
    connection.query("update seo set seo_parent = ?,seo_title = ?,seo_keywords = ?,seo_description = ?, seo_time = ? where id = ?",[seo.seo_parent,seo.seo_title,seo.seo_keywords,seo.seo_description,time,seo.id],function(err,result){
        callback(err,result);
        if (err){
            console.log(`EditSeo:${err}`);
        }
    })
}