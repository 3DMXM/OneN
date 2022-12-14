// 引入express
const express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    process = require('node:process')



// 引入路由
const { initRouter, IndexRouter, ApiRouter, UrlRouter, AdminRouter } = require('./router/index')
const config = require('./model/config')
const { GetToken } = require('./model/OneDrive/cache')
let { init } = require('./model/init');

let token = config.token;

let parameter = process.argv.splice(2);

const hostname = 'localhost';
const port = parameter[0] || 3001;
config.MySqlConfig.configName = parameter[1] || "pan";

// 创建APP
const app = express()

app.use(bodyParser.json())
app.use(cookieParser())

// 隐藏X-Powered-By头
app.disable('x-powered-by')


// 配置程序根目录
app.use(express.static(__dirname + "/public"))


// 定义全局中间件,解决跨域请求问题
app.use(function (req, res, next) {
    // // 解决跨域问题

    // 如果访问的是 /init 直接放行
    console.log(req.url);
    if (req.url == '/init') {
        next();
        return;
    }

    init(next, res);

    // if (!config.init){


    // }else{
    //     next();
    // }
})


// 使用路由
app.use(initRouter());
app.use(IndexRouter());
app.use(ApiRouter());
app.use(UrlRouter());
app.use(AdminRouter());

// 适配前端路由
app.get('*', (req, res, next) => {

    res.set({
        'Content-Type': 'text/html; charset=utf-8'
    })
    res.sendFile(__dirname + '/public/index.html');
})

// 处理错误
process.on('uncaughtException', function (err) {
    //打印出错误
    console.log(err);
    //打印出错误的调用栈方便调试
    console.log(err.stack);
});



// 监听端口
app.listen(port, (err) => {
    if (!err) console.log(`服务器已在 http://${hostname}:${port}/ 上运行成功`);
    else console.log(err);
})