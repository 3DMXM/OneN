
<script setup>
    import axios from "axios"
</script>
<template>
    <div class="Link">
        <div class="mdui-typo">
            <h1>短链设置</h1>
            <hr>
            <div class="mdui-btn mdui-color-theme-accent mdui-ripple" @click="add">新建短链</div>
            <hr>
        </div>
        <!--短链列表-->
        <div class="mdui-col-xs-12">
            <div class="mdui-table-fluid">
                <table class="mdui-table mdui-table-hoverable">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>短链</th>
                            <th>访问次数</th>
                            <th>跳转地址</th>
                            <th>编辑</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in link_list" :key="item.id">
                            <td>{{ item.id }}</td>
                            <td><a :href='`/s/${item.short_link}`'>/s/{{item.short_link}}</a></td>
                            <td>{{ item.click_cot }}</td>
                            <td><a :href='item.long_link' target='_blank'>{{item.long_link}}</a></td>
                            <td><div class="mdui-btn mdui-color-theme-accent mdui-ripple" @click="edit(item)">编辑</div></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- 添加短链窗口 -->
        <div class="add-link" v-if="showAddWindow">
            <div class="add-seo-title">{{ editLink.id ? "编辑短链" : "新建短链" }}</div>
            <div class="close-window" @click="showAddWindow = false"><i class="mdui-icon material-icons">clear</i></div>
            <div class="add-link-content">
                <div class="mdui-textfield">
                    <label for="seo_parent" class="mdui-textfield-label">本地短链</label>
                    <input v-model="editLink.short_link" class="mdui-textfield-input" type="text"/>
                    <div class="mdui-btn mdui-color-theme-accent mdui-ripple" @click="randomString">随机生成短链</div>
                </div>
                <div class="mdui-textfield">
                    <label for="seo_parent" class="mdui-textfield-label">跳转链接</label>
                    <input v-model="editLink.long_link" class="mdui-textfield-input" type="text"/>
                </div>
                <div class="mdui-dialog-actions">
                    <button class="mdui-btn mdui-color-theme-accent mdui-ripple" @click="save()">{{ editLink.id ? "保存" : "添加"}}</button>
                    <button class="mdui-btn mdui-ripple" @click="showAddWindow = false">取消</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'Link',
    data(){
        return {
            link_list:[],
            showAddWindow: false,
            editLink:{
                sc_string:'',
                sc_url:''
            }
        }
    },
    methods:{
        add(){
            this.showAddWindow = true;
            this.editLink = {};
        },
        edit(link){
            this.showAddWindow = true;
            this.editLink = link;
        },
        save(){
            if(this.editLink.id){
                axios.post(`${this.$store.state.api}/admin/EditLink`,{link:this.editLink}).then(res=>{
                    this.showAddWindow = false;
                    this.get_link_list();
                })
            }else{
                axios.post(`${this.$store.state.api}/admin/AddLink`,{link:this.editLink}).then(res=>{
                    this.showAddWindow = false;
                    this.get_link_list();
                })
            }

        },
        randomString(){
            // 生成随机字符串
            var str = "";
            var str_char = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefhijkmnprstuvwxyz2345678";
            for(var i=0;i<10;i++){
                str += str_char.charAt(Math.floor(Math.random() * str_char.length));
            }
            this.editLink.short_link = str;
        },
        get_link_list(){
            axios.post(`${this.$store.state.api}/admin/GetLinkList`).then(res=>{
                this.link_list = res.data.data;
            })
        }
    },
    mounted(){
        this.get_link_list();
    }
}
</script>

<style lang="less" scoped>
.add-link{
    position: fixed;        
    width: 900px;
    padding: 20px;
    background: rgba(0,0,0,1);
    z-index: 9999;
    display: block;
    // 窗口居中
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    .close-window{
        position: absolute;
        top: 0;
        right: 0;
        padding: 10px;
        cursor: pointer;
        transition: .5s;
        &:hover{
            opacity: .7;
        }
    }
}
a{
    color: aqua;
    &:hover{
        opacity: .7;
    }
}
</style>