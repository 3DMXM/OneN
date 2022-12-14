// 创建路由
const express = require('express');
const router = express.Router();


let {token} = require("../model/config");
const {GetToken}  = require("../model/OneDrive/cache");





module.exports = function(){
    return router;
}