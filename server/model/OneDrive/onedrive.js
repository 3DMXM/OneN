/**
 * 封装OneDrive的API
 */

const config = require("../config");
const {SaveFileList, SaveToken, SaveFileData} = require("./cache");

const {GetNowTime} = require("../model");


/**
 * 获取refreshToken
 * @param {String} code 
 * @param {Function} callback 回调
 */
module.exports.GetRefreshToken = function(code, callback) {
    // 调用官方API
    const request = require("request");
    const url = "https://login.microsoftonline.com/common/oauth2/token";
    const options = {
        method: "POST",
        url: url,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        form: {
            grant_type: "authorization_code",
            client_id: config.token.clientId,
            client_secret: config.token.clientSecret,
            code: code,
            redirect_uri: config.token.redirectUri
        }
    };
    request(options, function (err, response, body) {
        if (!err) {
            let jsonData = JSON.parse(body);
            SaveToken(jsonData.access_token, jsonData.refresh_token, config.token.scopes, jsonData.expires_on, function(err, result){
                callback(err, result);
            })
        }else{
            console.log(`GetRefreshToken:${err}`);
            callback(err, null);
        }
    });
}

/**
 * 刷新token
 * @param {*} refreshToken 
 * @param {*} callback 
 */
module.exports.RefreshToken = function(refreshToken, callback) {
    // 调用官方API
    const request = require("request");
    const url = "https://login.microsoftonline.com/common/oauth2/token";
    const options = {
        method: "POST",
        url: url,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        form: {
            grant_type: "refresh_token",
            client_id: config.token.clientId,
            client_secret: config.token.clientSecret,
            refresh_token: refreshToken,
            redirect_uri: config.token.redirectUri,
        }
    };
    request(options, function (err, response, body) {
        if (!err) {
            let jsonData = JSON.parse(body);
            config.token.accessToken = jsonData.access_token;
            SaveToken(jsonData.access_token, jsonData.refresh_token, config.token.scopes, jsonData.expires_on, function(err2, result){
                callback(err2, [jsonData]);
            })
        }else{
            console.log(`RefreshToken:${err}`);
            callback(err, null);
        }
    })

}

/**
 * 列出 driveItem 的子项
 * @param {Object} path 路径
 * @param {Function} callback 回调
 */
module.exports.GetChildren = function (path, callback) {
    console.log(config.token);

    // 将 path 转换为url编码
    let  UrlPath = encodeURIComponent(path);
    // 调用官方API
    const request = require("request");
    const url = `https://graph.microsoft.com/v1.0/me/drive/root:${UrlPath}:/children?select=name,size,folder,@microsoft.graph.downloadUrl,lastModifiedDateTime,id`;
    const options = {
        method: "GET",
        url: url,
        headers: {
            "Authorization": `Bearer ${config.token.accessToken}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
    };
    console.log(`GetChildren请求:${url}`);
    request(options, function (err, response, body) {
        if (!err) {
            let jsonData = JSON.parse(body);
            let ChildrenList = jsonData.value;

            // 只需要取 name、size、id、folder.childCount、lastModifiedDateTime
            let Children = [];
            if (ChildrenList){
                ChildrenList.forEach(function (item) {
                    let ext = null;
                    if (!item.folder){
                        // 正则获取文件后缀 
                        let reg = /\.([^\.]+)$/;
                        ext = reg.exec(item.name);
                        if (ext){
                            ext = ext[1];
                        }else{
                            ext = "folder";
                        }               
                    }

                    let child = {
                        file_fid: item.id,
                        file_parent: path,
                        file_name: item.name,
                        file_type: ext || "folder",
                        file_size: item.size,
                        file_downloadUrl: item['@microsoft.graph.downloadUrl'] || "",
                        childCount: item.folder || 0,
                        lastModifiedDateTime: item.lastModifiedDateTime,
                        file_up_time: GetNowTime(),                    
                    }
                    if (item.folder){
                        child.childCount = item.folder.childCount;
                    }


                    Children.push(child);
                });
                console.log(ChildrenList);
                SaveFileList(Children, path, function(err, result){
                    callback(err, Children);
                })            
            }else{
                console.log(jsonData);
                callback(jsonData.error.message, Children);
            }            
        } else {
            callback(err, null);
        }
    })







}

module.exports.GetFileData = function (file_id, callback) {
    // 调用官方API
    const request = require("request");
    const url = `https://graph.microsoft.com/v1.0/me/drive/items/${file_id}/content`;
    const options = {
        method: "GET",
        url: url,
        headers: {
            "Authorization": `Bearer ${config.token.accessToken}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
    };
    console.log(`GetFileData请求:${url}`);
    request(options, function (err, response, body) {
        if (!err) {
            SaveFileData(file_id, body, function(err, result){
                callback(err, body);
            })
        } else {
            callback(err, null);
        }
    })

}