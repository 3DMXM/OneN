
// 引入mysql
const mysql = require("mysql");

const {MySqlConfig} = require("./config");


console.log(`使用配置文件:${MySqlConfig.configName}`);

let CMysql = MySqlConfig[MySqlConfig.configName];


// 配置数据库
let config = {
    host: CMysql.host,
    user: CMysql.user,
    password: CMysql.password,
    database: CMysql.database,
    timezone: CMysql.timezone,
}

// 连接数据库
let connection = mysql.createConnection(config);


// 默认暴露
module.exports = function(){
    return connection;
}