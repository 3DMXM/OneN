<script setup>
import axios from "axios"


</script>

<template>
    <div class="mdui-container-fluid">
    <div class="mdui-typo">
        <h1>基本设置</h1>
    </div>
    <div class="form" v-if="site_info">
        <div class="mdui-textfield">
            <h4>网站名称</h4>
            <input class="mdui-textfield-input" type="text" name="site_name" v-model="site_info.site_name"/>
        </div>
        <div class="mdui-textfield">
            <h4>OneDrive起始目录(空为根目录)<small>例：仅共享public目录 /public</small></h4>
            <input class="mdui-textfield-input" type="text" name="onedrive_root" v-model="site_info.onedrive_root"/>
        </div>
        <div class="mdui-textfield">
            <h4>缓存过期时间(秒)</h4>
            <input class="mdui-textfield-input" type="text" name="cache_expire_time" v-model="site_info.cache_expire_time"/>
        </div>
        <div class="mdui-textfield">
            <h4>修改后台密码（不改请留空</h4>
            <input class="mdui-textfield-input" type="password" name="password" v-model="site_info.password"/>
        </div>
        <button type="button" class="mdui-btn mdui-color-theme-accent mdui-ripple mdui-float-right" @click="SaveData">
            <i class="mdui-icon material-icons">save</i> 保存
        </button>
    </div>
        
</div>
</template>

<script>
export default {
    name:"AdminIndex",
    data(){
        return{
            site_info:null
        }
    },
    methods:{
        SaveData(){
            let reqData = {
                site_name:this.site_info.site_name,
                onedrive_root:this.site_info.onedrive_root,
                cache_expire_time:this.site_info.cache_expire_time,
                password:this.site_info.password
            }
            axios.post(`${this.$store.state.api}/admin/SaveData`,reqData).then(res=>{
                if(res.data.code == 0){
                    layer.msg("保存成功！")
                }else{
                    layer.msg(res.data.msg)
                }
            })
        }
    },
    mounted(){
        // post 请求后端接口获取数据
        axios.post(`${this.$store.state.api}/admin/GetSiteInfo`).then(res=>{
            this.site_info = res.data.data
        }).catch(err=>{
            layer.msg(err.message)
        })
    }
}
</script>

<style>

</style>