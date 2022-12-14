<template>
    <div class="mc-drawer mdui-drawer" id="main-drawer">
        <div class="mdui-list">
            <router-link 
                class="mdui-list-item"
                v-for="(item, index) in drawerList"
                :key="index"
                :to="item.url"
                >
                <i class="mdui-list-item-icon mdui-icon material-icons">{{item.icon}}</i>
                <div class="mdui-list-item-content">{{item.name}}</div>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name:"AdminDrawer",
    data(){
        return{
            drawerList:[
                {
                    name:"基础设置",
                    icon:"",
                    url:"/~admin/index"
                },
                {
                    name:"目录缓存",
                    icon:"",
                    url:"/~admin/cache"
                },
                {
                    name:"显示设置",
                    icon:"",
                    url:"/~admin/show"
                },
                {
                    name:"路径SEO设置",
                    icon:"grain",
                    url:"/~admin/SEO"
                },
                {
                    name:"短链设置",
                    icon:"grain",
                    url:"/~admin/Link"
                }
            ]
        }
    }
}
</script>

<style>

</style>