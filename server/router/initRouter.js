// 创建路由
const express = require('express');
const router = express.Router();


let {token} = require("../model/config");


const {pca,onedrive}  = require("../model/OneDrive");

router.get("/init",function(req,res){
    
    if (token.accessToken && token.refreshToken) {
        res.json({
            code:200,
            msg:"已经初始化",            
        })
    }else{
        const authCodeUrlParameters = {
            scopes: token.scopes,
            redirectUri: token.redirectUri,
        };
        
        // 使用pca获取授权代码
        pca.getAuthCodeUrl(authCodeUrlParameters).then((response) => {
            res.redirect(response);
        });
    }
})


router.get("/init/redirect",function(req,res){
    
    onedrive.GetRefreshToken(req.query.code,function(err,result){
        if (!err){
            res.json(result)
        }else{
            res.json(err)
        }
    })

})




module.exports = function(){
    return router;
}