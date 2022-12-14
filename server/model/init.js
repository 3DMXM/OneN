/**
 * 入口函数
 */

let config = require("./config");
let { GetToken } = require("./OneDrive/cache");


module.exports.init = function (next, res) {
    let token = config.token;
    /**
     * 初始化token
     * 判断accessToken是否存在，如果不存在，则调用GetToken方法获取token
     * 判断expiresOn是否过期，如果过期，则调用GetToken方法获取token
     */
    // console.log(`token.expiresOn * 1000: ${token.expiresOn * 1000} - now Time: ${new Date().getTime()}`);
    if (!token.accessToken || (token.expiresOn && (token.expiresOn * 1000 < new Date().getTime()))) {
        GetToken(function (err, result) {
            if (!err && result.length > 0) {
                token.accessToken = result[0].accessToken;
                token.refreshToken = result[0].refreshToken;
                token.expiresOn = result[0].expiresOn;
                // next();
            } else {
                console.log("未授权,需求先授权", err);
                // 跳转到 /init 路由
                res.redirect("/init");
                // next();
            }
        })
    }

    if (!config.init) {
        // 初始化网站配置
        if (!config.site.root) {
            // 连接数据库
            const connection = require("../model/MySql")();
            // 从数据库获取网站基础信息
            connection.query("select * from site_info", function (err, result) {
                if (!err && result.length > 0) {
                    config.site.root = result[0].onedrive_root;
                    config.site.name = result[0].site_name;
                } else {
                    // root: "Games"
                    config.site.root = "/public";
                    config.site.name = "OneX";
                }
                // next();
            })
        }
    }

    config.init = true;

    next();


}