<script setup>
import { RouterLink, RouterView } from 'vue-router'
import "vue-loaders/dist/vue-loaders.css"
import axios from "axios"
import { defineEmits } from "vue"

import moment from "moment"

import Readme from "@/components/Readme.vue"
import GoogleAd from "@/components/GoogleAd.vue"


// 正常显示 文件图标
function file_ico(item) {
    item = item.toLowerCase();
    var index = item.lastIndexOf(".");
    var suffix = item.substr(index + 1);

    if (['bmp', 'jpg', 'jpeg', 'png', 'gif'].indexOf(suffix) > 0) {
        return "image";
    } else if (['mp4', 'mkv', 'webm', 'avi', 'mpg', 'mpeg', 'rm', 'rmvb', 'mov', 'wmv', 'mkv', 'asf'].indexOf(suffix) > 0) {
        return "ondemand_video";
    } else if (['ogg', 'mp3', 'wav', 'flac'].indexOf(suffix) > 0) {
        return "audiotrack";
    }

    return "insert_drive_file";
}


// 序列化文件大小
function human_filesize(filesize) {
    if (null == filesize || filesize == '') {
        return "0 Bytes";
    }
    var unitArr = new Array("Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB");
    var index = 0;
    var srcsize = parseFloat(filesize);
    index = Math.floor(Math.log(srcsize) / Math.log(1024));
    var size = srcsize / Math.pow(1024, index);
    size = size.toFixed(2);//保留的小数位数
    return size + unitArr[index];
}

// 序列化时间 格式化为：yyyy-MM-dd HH:mm:ss
// time 格式为2021-06-05T16:27:28Z
function dateFormat(time) {
    return moment(time).format("YYYY-MM-DD HH:mm:ss");
}

</script>

<template>
    <div class="nexmoe-item">
        <GoogleAd />
        <div class="mdui-row">
            <ul class="mdui-list">
                <li class="mdui-list-item th">
                    <div class="mdui-col-xs-12 mdui-col-sm-6">文件名 <i
                            class="mdui-icon material-icons icon-sort">expand_more</i></div>
                    <div class="mdui-col-sm-2 mdui-text-right">修改时间 <i
                            class="mdui-icon material-icons icon-sort">expand_more</i></div>
                    <div class="mdui-col-sm-2 mdui-text-right">大小 <i
                            class="mdui-icon material-icons icon-sort">expand_more</i></div>
                    <div class="mdui-col-sm-2 mdui-text-right">操作 <i
                            class="mdui-icon material-icons icon-sort">expand_more</i></div>
                </li>
                <template v-if="path != '/'">
                    <li class="mdui-list-item mdui-ripple">
                        <RouterLink :to="parent">
                            <div class="mdui-col-xs-12 mdui-col-sm-7">
                                <i class="mdui-icon material-icons">arrow_upward</i>
                                ..
                            </div>
                            <div class="mdui-col-sm-3 mdui-text-right"></div>
                            <div class="mdui-col-sm-2 mdui-text-right"></div>
                        </RouterLink>
                    </li>
                </template>
                <template v-if="FileList.length > 0">
                    <template v-for="f in FileList" :key="f.file_fid">
                        <li v-if="f.file_type == 'folder'" class="mdui-list-item mdui-ripple">
                            <RouterLink :to="f.file_path">
                                <div class="mdui-col-xs-12 mdui-col-sm-6 mdui-text-truncate">
                                    <i class="mdui-icon material-icons">folder_open</i>
                                    <span>{{ f.file_name }}</span>
                                </div>

                                <div class="mdui-col-sm-2 mdui-text-right">{{ f.lastModifiedDateTime }}</div>
                                <div class="mdui-col-sm-2 mdui-text-right">{{ human_filesize(f.file_size) }}</div>
                                <div class="mdui-col-sm-2 mdui-text-right">
                                    <i v-if="f.file_type !== 'folder'"
                                        class="mdui-icon material-icons icon-sort">file_download</i>
                                </div>
                            </RouterLink>
                        </li>
                        <li v-else class="mdui-list-item mdui-ripple">
                            <a :href="f.file_downloadUrl" target="_blank">
                                <div class="mdui-col-xs-12 mdui-col-sm-6 mdui-text-truncate">
                                    <i class="mdui-icon material-icons">{{ file_ico(f.file_type) }}</i>
                                    <span>{{ f.file_name }}</span>
                                </div>

                                <div class="mdui-col-sm-2 mdui-text-right">{{ f.lastModifiedDateTime }}</div>
                                <div class="mdui-col-sm-2 mdui-text-right">{{ human_filesize(f.file_size) }}</div>
                                <div class="mdui-col-sm-2 mdui-text-right">
                                    <i v-if="f.file_type !== 'folder'"
                                        class="mdui-icon material-icons icon-sort">file_download</i>
                                </div>
                            </a>
                        </li>
                    </template>
                </template>
                <template v-else>
                    <!-- 加载动画 -->
                    <div class="vbox">
                        <div class="ball-clip">
                            <vue-loaders name="ball-clip-rotate-multiple" color="red" scale="4" />
                        </div>
                        <h3>文件获取中。。。</h3>
                    </div>
                </template>
            </ul>
        </div>
    </div>

    <Readme v-if="haveReadme && readme != ''" :readme="readme" />
</template>

<script>

export default {
    name: "FileList",
    props: ['path'],
    data() {
        return {
            FileList: [],
            haveReadme: false,
            readme: ""
        }
    },
    computed: {
        // 父级目录
        parent() {
            var path = this.path;
            var arr = path.split("/");
            arr.pop();
            var parent = arr.join("/");
            if (parent == "") {
                parent = "/";
            }
            return parent;
        }
    },
    methods: {
        remove(arr, val) {
            var index = arr.indexOf(val);
            if (index > -1) {
                arr.splice(index, 1);
            }
        }
    },
    watch: {
        path: {
            immediate: true,
            handler() {
                // let main = mainData();
                let data = {
                    path: this.path
                }
                this.FileListv = [];
                this.haveReadme = false;
                // 使用 axios post 请求 /api/GetItem
                axios.post(`${this.$store.state.api}/api/GetItem`, data).then(res => {
                    if (res.data.code == "00") {
                        let list = res.data.data;

                        list.forEach(item => {
                            item.file_path = `${this.path}/${item.file_name}`;
                            // 移除 item.file_path 中的双斜杠 和尾部斜杠
                            item.file_path = item.file_path.replace(/\/\//g, "/");
                            item.file_path = item.file_path.replace(/\/$/g, "");
                            // 将 item.file_path 转换为 url编码
                            // item.file_path = encodeURIComponent(item.file_path);

                            if (item.file_name == "README.md") {
                                this.haveReadme = true;
                                this.remove(list, item);
                                this.readme = item.file_fid;
                            }
                        })

                        // 修改网站title
                        document.title = res.data.title;

                        this.FileList = list;
                    }

                }).catch(err => {
                    console.log(err);
                })
            }
        }
    }

}
</script>

<style lang="less">
/* @import url("loaders.css"); */

.vbox {
    .ball-clip {
        width: 100%;
        height: 200px;
        text-align: center;
        line-height: 200px;
    }

    h3 {
        text-align: center;
    }

}
</style>