<script setup>
    import axios from "axios"
</script>
<template>
    <div class="Seo">
        <div class="mdui-typo">
            <h1>页面SEO设置</h1>
            <hr/>
            <div 
                class="mdui-btn mdui-color-theme-accent mdui-ripple" 
                @click="add"
                >添加新Seo</div>
            <hr>
            <!-- Seo列表 -->
            <div class="mdui-col-xs-12">
                <div class="mdui-table-fluid">
                    <table class="mdui-table mdui-table-hoverable">
                        <thead>
                            <tr>
                                <th>ID</th><th>路径</th><th>标题</th><th>关键词</th><th>介绍</th><th>点击量</th><th>编辑</th></tr>
                        </thead>
                        <tbody>
                            <tr 
                                v-for="item in seo_list" 
                                :key="item.id"
                                >
                                <td>{{item.id}}</td>
                                <td>{{item.seo_parent}}</td>
                                <td>{{item.seo_title}}</td>
                                <td>{{item.seo_keywords}}</td>
                                <td>{{item.seo_description}}</td>
                                <td>{{item.seo_click_cnt}}</td>                                
                                <td><button class='mdui-btn mdui-color-theme-accent mdui-ripple' @click="edit(item)">编辑</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <!-- 新建Seo窗口 -->
            <div class="add-seo" v-if="showAddWindow">
                <div class="add-seo-title">{{ editSeo.id ? "编辑SEO页面" : "新建SEO页面" }}</div>
                <div class="close-window" @click="showAddWindow = false"><i class="mdui-icon material-icons">clear</i></div>
                <div class="add-seo-content">
                    <div class="mdui-textfield">
                        <label for="seo_parent" class="mdui-textfield-label">路径</label>
                        <input v-model="editSeo.seo_parent" class="mdui-textfield-input" type="text"/>
                    </div>
                    <div class="mdui-textfield">
                        <label for="seo_title" class="mdui-textfield-label">标题</label>
                        <input v-model="editSeo.seo_title" class="mdui-textfield-input" type="text"/>
                    </div>
                    <div class="mdui-textfield">
                        <label for="seo_keywords" class="mdui-textfield-label">关键词</label>
                        <input v-model="editSeo.seo_keywords" class="mdui-textfield-input" type="text"/>
                    </div>
                    <div class="mdui-textfield">
                        <label for="seo_description" class="mdui-textfield-label">介绍</label>
                        <textarea v-model="editSeo.seo_description" class="mdui-textfield-input" rows="4" placeholder=""></textarea>
                    </div>
                    <div class="save-seo-actions">
                        <button class="mdui-btn mdui-color-theme-accent mdui-ripple" @click="SaveSeo">{{editSeo.id ? "保存":"添加"}}</button>
                        <button class="mdui-btn mdui-ripple" @click="showAddWindow = false">取消</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"Seo",
    data(){
        return {
            seo_list:[],
            showAddWindow: false,
            editSeo:{
                seo_parent:"",
                seo_title:"",
                seo_keywords:"",
                seo_description:"",
                seo_click_cnt:0
            }

        }
    },
    methods:{
        edit(seo){
            this.showAddWindow = true;
            this.editSeo = seo;
        },
        add(){
            this.showAddWindow = true;
            this.editSeo = {};
        },
        SaveSeo(){
           if (this.editSeo.id){
                // 如果有ID，则是修改
                axios.post(`${this.$store.state.api}/admin/EditSeo`,{seo:this.editSeo}).then(res=>{
                    if (res.data.code == 0){
                        this.showAddWindow = false;
                        this.getSeoList();
                    }
                })
            }else{
                // 没有ID，则是添加
                axios.post(`${this.$store.state.api}/admin/AddSeo`,{seo:this.editSeo}).then(res=>{
                    if (res.data.code == 0){
                        this.showAddWindow = false;
                        this.getSeoList();
                    }
                })
            }
        },
        getSeoList(){
            axios.post(`${this.$store.state.api}/admin/GetSeoList`).then(res=>{
                if(res.data.code == "00"){
                    this.seo_list = res.data.data;
                }else{
                    layer.msg(res.data.msg);
                }
            })
        }

    },
    mounted(){
        this.getSeoList();
    }
}
</script>

<style lang="less" scoped>
    .add-seo{
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
</style>