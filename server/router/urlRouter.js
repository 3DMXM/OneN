// 创建路由
const express = require('express');
const router = express.Router();


let {token} = require("../model/config");
const link = require("../model/Link");
const {GetToken}  = require("../model/OneDrive/cache");


// 短链跳转
router.get("/s/:link",function(req,res){
    let short_link = req.params.link;
    link.GetLink(short_link,function(err,result){
        if(!err && result.length > 0){
            // 将click_cot +1
            link.ClickAdd(short_link,function(err,result){                
                console.log(`${short_link} 点击 +1`);
            })

            let {long_link} = result[0];
            res.redirect(long_link);           
        }else{
            res.sendStatus(404);
        }
    })
    
})


module.exports = function(){
    return router;
}