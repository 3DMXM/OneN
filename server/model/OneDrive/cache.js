const { request } = require("express");
const onedrive = require("./onedrive");

/**
 * 数据库缓存相关操作
 */
const {GetNowTime} = require("../model");

/**
 * 将token存储到数据库中
 * @param {String} accessToken 
 * @param {Array} scopes 
 * @param {time} expiresOn
 * @param {Function} callback
 */
 module.exports.SaveToken = function(accessToken, refreshToken, scopes, expiresOn, callback){
    // 引入数据库
    const connection = require("../MySql")();
    let time = GetNowTime();
    // 将 scopes 转换为字符串
    let scopesStr = scopes.join(" ");
    
    /**
     * 如果存在任意内容则更新，否则插入
     */
    let sql = `select * from token`;
    connection.query(sql, function(err, result){
        if(!err && result.length > 0){
            sql = `update token set accessToken = ?, scopes = ?, refreshToken = ?, time = ?, expiresOn = ? where id = 1`;
        }else{
            sql = `insert into token (accessToken, scopes, refreshToken, time, expiresOn) values (?,?,?,?,?)`;
        }
        connection.query(sql, [accessToken, scopesStr, refreshToken, time, expiresOn], function(err, result){
            if (err) console.log(`SaveToken: ${err}`);
            callback(err, result);
        });
    });
}

/**
 * 从数据库获取OneDrive的Token
 * @param {Function} callback 
 */
 module.exports.GetToken = function(callback){
    const connection = require("../MySql")();
    let sql = "select * from token";
    connection.query(sql, function(err, result){
        if(!err && result.length > 0 && result[0].refreshToken){
            try{
                // 通过expiresOn判断是否过期 expiresOn 为 1655114196 格式            
                let time = new Date().getTime();
                let expiresOn = result[0].expiresOn * 1000;
                let expiresOnTime = new Date(expiresOn);
                let expiresOnTime2 = new Date(expiresOnTime.getTime());
                console.log(time > expiresOnTime2);
                if(time > expiresOnTime2){
                    // 如果过期了 调用RefreshToken方法重新获取Token
                    onedrive.RefreshToken(result[0].refreshToken, function(err, jsonData){
                        // console.log(jsonData);
                        callback(err, jsonData);
                    })
                }else{
                    callback(null, result);
                }
            } catch(err2){
                console.log(`GetToken-code-err: ${err2}`);
                callback(err2, result);
            }
        }else{
            console.log(`GetToken: ${err}`);
            callback(err, []);
        }
    })
}

/**
 * 将文件列表写入到数据库
 * @param {Object} fileList 文件列表
 * @param {String} parent 父级目录
 * @param {Function} callback 回调
 */
module.exports.SaveFileList = function(fileList, parent, callback){
    // 引入数据库
    const connection = require("../MySql")();

    // 先清空 file_parent = parent 的数据
    let sql = `delete from file_items where file_parent = ?`;
    connection.query(sql, [parent], function(err, result){
        if(!err){
            // 批量插入 fileList
            /** 
             * fileList =[{
            *       file_fid: item.id,
                    file_parent: path,
                    file_name: item.name,
                    file_type: 'folder',
                    file_size: item.size,
                    file_downloadUrl: item['@microsoft.graph.downloadUrl'] || "",
                    childCount: item.folder || 0,
                    lastModifiedDateTime: item.lastModifiedDateTime,
                    file_up_time: GetNowTime(),  
                }]         
             */
            // 将 fileList 转换为数组
            let fileListArr = [];
            fileList.forEach(item => {
                fileListArr.push([item.file_fid, parent, item.file_name, item.file_type, item.file_size, item.file_downloadUrl, item.childCount, item.lastModifiedDateTime, GetNowTime()]);
            })
            

            let sql = `insert into file_items (file_fid, file_parent, file_name, file_type, file_size, file_downloadUrl, childCount, lastModifiedDateTime, file_up_time) values ?`;
            connection.query(sql, [fileListArr], function(err, result){
                if (err) console.log(`SaveFileList: ${err}`);
                callback(err, fileList);
            })
            
            

        }else{
            callback(err, result);
        }
    });
}

/**
 * 从数据库获取文件列表
 * @param {String} parent 
 * @param {Function} callback 
 */
module.exports.GetFileList = function(parent, callback){

    // 引入数据库
    const connection = require("../MySql")();

    // 查询 file_parent = parent 的数据
    let where = `where file_parent = '${parent}'`;
    let sql = `select * from file_items ${where}`;
    connection.query(sql, function(err, result){

        if(result.length > 0){
            // 通过 file_up_time 判断是否过期 过期时间 2小时
            let time = new Date();
            let expiresOn = result[0].file_up_time;
            let expiresOnTime = new Date(expiresOn);
            let expiresOnTime2 = new Date(expiresOnTime.getTime() + 1 * 60 * 60 * 1000);
            console.log(`检查过期:time:${time} - expiresOnTime2 ${expiresOnTime2},结果：${time > expiresOnTime2}`);
            if(time > expiresOnTime2){
                console.log(`GetFileList:数据过期，重新获取. time:${time} - expiresOnTime:${expiresOnTime2}`);
                // 如果过期了 调用GetChildren方法重新获取文件列表                
                onedrive.GetChildren(parent, function(err, ChildrenList){                
                    // 返回新获取的文件列表
                    callback(err, ChildrenList);
                })
            }else{
                callback(err, result);
            }
        }else{
            onedrive.GetChildren(parent, function(err, ChildrenList){
                callback(err, ChildrenList);
            })
        }        
    })

}

/**
 * 清空数据库中的文件列表
 * @param {String} parent 
 * @param {Function} callback 
 */
module.exports.ClearFileList = function(parent, callback){
    // 引入数据库
    const connection = require("../MySql")();

    // 清空 file_parent = parent 的数据
    let sql = `delete from file_items where file_parent = ?`;
    connection.query(sql, [parent], function(err, result){
        if(!err){
            callback(null, result);
        }else{
            console.log(`ClearFileList: ${err}`);
            callback(err, result);
        }
    })
}





/**
 * 储存文件数据到数据库
 * @param {*} file_id 
 * @param {*} data 
 * @param {*} callback 
 */
module.exports.SaveFileData = function(file_id, data, callback){
    // 引入数据库
    const connection = require("../MySql")();

    /**
     * 更新file_data表,通过 file_id 判断,如果存在则更新，不存在则插入
     * file_data.file_fid = file_fid
     * file_data.file_data = data
     * file_data.file_time = GetNowTime()
     */
    let sql = `select * from file_data where file_fid = ?`;
    connection.query(sql, [file_id], function(err, result){
        if(result.length > 0){
            // 更新
            let sql = `update file_data set file_data = ?, file_time = ? where file_fid = ?`;
            connection.query(sql, [data, GetNowTime(), file_id], function(err, result){
                if(err) console.log(`SaveFile: ${err}`);
                callback(err, result);
            })
        }else{
            // 插入
            let sql = `insert into file_data (file_fid, file_data, file_time) values (?, ?, ?)`;
            connection.query(sql, [file_id, data, GetNowTime()], function(err, result){
                if(err) console.log(`SaveFile: ${err}`);
                callback(err, result);
            })
        }
    })
    

}

/**
 * 从数据库读取文件数据
 * @param {*} file_id 
 * @param {*} callback 
 */
module.exports.GetFileData = function(file_id, callback){
    // 引入数据库
    const connection = require("../MySql")();

    let sql = `select * from file_data where file_fid = ?`;
    connection.query(sql, [file_id], function(err, result){
        if(result.length > 0){
            // 通过 file_time 判断是否过期 过期时间 2小时
            let time = GetNowTime();
            let expiresOn = result[0].file_time;
            let expiresOnTime = new Date(expiresOn);
            let expiresOnTime2 = new Date(expiresOnTime.getTime() + 2 * 60 * 60 * 1000);
            if(time > expiresOnTime2){
                console.log(`GetFileData:数据过期，重新获取. time:${time} - expiresOnTime:${expiresOnTime2}`);
                // 如果过期了 调用GetChildren方法重新获取文件列表
                onedrive.GetFileData(file_id, function(err, data){
                    // 返回新获取的文件列表
                    callback(err, data);
                })
            }else{
                callback(err, result[0].file_data);
            }
        }else{
            onedrive.GetFileData(file_id, function(err, data){
                callback(err, data);
            })
            
        }
    })
}