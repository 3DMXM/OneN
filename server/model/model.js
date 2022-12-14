/*
* 一些常用的方法
*/

// 获取当前时间 格式为 yyyy-mm-dd hh:mm:ss
module.exports.GetNowTime = function(){
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    let time = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    return time;
}