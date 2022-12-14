// 创建路由
const express = require('express');
const router = express.Router();

const { onedrive, cache } = require("../model/OneDrive");
const { site } = require("../model/config");

router.post('/api/GetItem', function (req, res) {

    const { path } = req.body;

    let sitePath = site.root + path;

    console.log(site.root);

    // 移除path末尾的/
    if (sitePath.endsWith("/")) {
        sitePath = sitePath.substring(0, sitePath.length - 1);
    }

    cache.GetFileList(sitePath, function (err, result) {
        // console.log(result);

        if (result && result.length > 0) {
            res.json({
                code: "00",
                msg: "获取成功",
                data: result,
                title: `${path} - ${site.name}`
            })
        } else {
            if (err) console.log(err);
            res.json({
                code: "99",
                msg: "获取失败",
                data: []
            })
        }
    })
});


router.post("/api/GetFileData", function (req, res) {
    let { file_id } = req.body;

    cache.GetFileData(file_id, function (err, body) {
        if (!err) {
            res.json({
                code: "00",
                msg: "获取成功",
                data: body
            })
        } else {
            res.json({
                code: "99",
                msg: "获取失败",
                data: []
            })
        }
    })
})






module.exports = function () {
    return router;
}