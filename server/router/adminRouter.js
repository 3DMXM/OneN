// 创建路由
const e = require('express');
const express = require('express');
const path = require('path')

const router = express.Router();

const user= require("../model/user");
const seo = require("../model/Seo");
const link = require("../model/Link");
const {site} = require("../model/config");
const {onedrive, cache} = require("../model/OneDrive");

// 定义中间件 权限验证
let auth = function(req,res,next){
    let {token} = req.cookies;
    user.CheckUser(token, function(err,result){
        if(!err && result.length > 0){
            next();
        }else{
            res.json({
                code:"99",
                msg:"无权限或,登录信息已过期！"
            })
        }
    })
}

// 登录
router.post("/admin/login",function(req,res){
    let {username,password} = req.body;
    user.Login(username,password,function(err,token){
        if(!err && token){
            // 将 token写入cookie
            res.cookie("token",token,{maxAge: 1000 * 60 * 60 * 24 * 7});
            res.json({
                code:"00",
                token: token
            });
        }else{
            console.log(`Login: ${err}`);
            res.json({
                code:"99",
                msg: "登录失败"
            });
        }
    })
})


// 检查用户登录
router.post("/admin/CheckUser",function(req,res){    
    let {token} = req.cookies;
    user.CheckUser(token, function(err, result){
        if(!err && result.length > 0){
            res.json({
                code: "00",
                msg: "用户已登录"
            })
        }else{
            res.json({
                code: "99",
                msg: "未登录"
            })
        }
    })
})



// 获取网站基础信息
router.post("/admin/GetSiteInfo", auth,function(req,res){
    let {token} = req.cookies;
    user.CheckUser(token, function(err, result){
        if(!err && result){
            // 连接数据库
            const connection = require("../model/MySql")();
            // 从数据库获取网站基础信息
            connection.query("select * from site_info",function(err,result){
                if(!err && result.length > 0){
                    res.json({
                        code: "00",
                        data: result[0]
                    })
                }
            })
        }else{
            res.json({
                code: "99",
                msg: "无权限,登录信息已过期！"
            })
        }
    })
})

// 保存网站基础信息
router.post("/admin/SaveData",auth, function(req,res){
    let {site_name, onedrive_root, cache_expire_time, password} = req.body;
    let {token} = req.cookies;

    // 连接数据库
    const connection = require("../model/MySql")();


    // 保存数据
    connection.query("update site_info set site_name = ?, onedrive_root = ?, cache_expire_time = ?",[site_name, onedrive_root, cache_expire_time],function(err,result){
        if(!err){
            if(password){
                // 修改密码
                user.ChangePassword(token,  password, function(err,result){
                    if(!err){
                        res.json({code: "00", msg: "保存成功"})
                    }else{
                        res.json({code: "99",msg: "保存失败"})
                    }
                })
            }else{
                console.log(result);
                res.json({code: "00",msg: "保存成功"})
            }
        }else{
            res.json({code: "99",msg: "保存失败"})
        }
    })

})

// 刷新目录缓存
router.post("/admin/RefreshCache",auth,function(req,res){
    let {path} = req.body;

    sitePath = site.root + path;
    // 移除path末尾的/
    if (sitePath.endsWith("/")) {
        sitePath = sitePath.substring(0, sitePath.length - 1);
    }

    cache.ClearFileList(sitePath,function(err,result){
        if(!err){
            res.json({code: "00",msg: "刷新成功"})
        }else{
            res.json({code: "99",msg: "刷新失败"})
        }
    })
})

// 获取文件显示设置
router.post("/admin/GetShowFile",auth,function(req,res){
    // 连接数据库
    const connection = require("../model/MySql")();
    // 从show_file表中获取文件显示设置
    connection.query("select * from show_file",function(err,result){
        if(!err && result.length > 0){
            res.json({
                code: "00",
                data: result[0]
            })
        }else{
            console.log(`/admin/GetShowFile-err: ${err}`);
            res.json({
                code: "99",
                msg: "获取失败"
            })
        }
    })
})

// 保存文件显示设置
router.post("/admin/SaveShowFile",auth,function(req,res){
    let {show_file} = req.body;
    // 连接数据库
    const connection = require("../model/MySql")();
    /**
     * 保存文件显示设置
     * show_image show_video show_audio show_code show_code2 show_doc
     */ 
    connection.query("update show_file set show_image = ?, show_video = ?, show_audio = ?, show_code = ?, show_code2 = ?, show_doc = ?",[show_file.show_image, show_file.show_video, show_file.show_audio, show_file.show_code, show_file.show_code2, show_file.show_doc],function(err,result){
        if(!err){
            res.json({code: "00",msg: "保存成功"})
        }else{
            console.log(`/admin/SaveShowFile-err:${err}`);
            res.json({code: "99",msg: "保存失败"})
        }
    })
})


// 获取Seo列表
router.post("/admin/GetSeoList",auth,function(req,res){
    seo.GetSeoList(function(err,result){
        if(!err && result.length > 0){
            res.json({
                code: "00",
                data: result
            })
        }else{
            res.json({
                code: "99",
                msg: "获取失败"
            })
        }
    })
})

// 添加Seo
router.post("/admin/AddSeo",auth,function(req,res){
    let seoData = req.body.seo;

    seo.AddSeo(seoData,function(err,result){
        if(!err){
            res.json({code: "00",msg: "添加成功"})
        }else{
            res.json({code: "99",msg: "添加失败"})
        }
    })    
})


// 编辑Seo
router.post("/admin/EditSeo",auth,function(req,res){
    let seoData = req.body.seo;

    seo.EditSeo(seoData,function(err,result){
        if(!err){
            res.json({code: "00",msg: "编辑成功"})
        }else{
            res.json({code: "99",msg: "编辑失败"})
        }
    })    
})

// 获取短链列表
router.post("/admin/GetLinkList",auth,function(req,res){
    link.GetLinkList(function(err,result){
        if(!err && result.length > 0){
            res.json({
                code: "00",
                data: result
            })
        }else{
            res.json({
                code: "99",
                msg: "获取失败"
            })
        }
    })
})

// 添加短链
router.post("/admin/AddLink",auth,function(req,res){
    let linkData = req.body.link;

    link.AddLink(linkData,function(err,result){
        if(!err){
            res.json({code: "00",msg: "添加成功"})
        }else{
            res.json({code: "99",msg: "添加失败"})
        }
    })
})

// 编辑短链
router.post("/admin/EditLink",auth,function(req,res){
    let linkData = req.body.link;

    link.EditLink(linkData,function(err,result){
        if(!err){
            res.json({code: "00",msg: "编辑成功"})
        }else{
            res.json({code: "99",msg: "编辑失败"})
        }
    })
})






module.exports = function(){
    return router;
}