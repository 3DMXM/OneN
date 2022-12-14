<script setup>
import {defineAsyncComponent} from 'vue' 

import Header from '@/components/Header.vue'
import Fotter from '@/components/Fotter.vue'
import Navigation from '@/components/Navigation.vue'
import GoogleAd from "../components/GoogleAd.vue"


const FileList = defineAsyncComponent(()=>import('../components/FileList.vue')) //异步引入



</script>

<template>
    <div class="index">
        <Header />
        <div class="mdui-container">
            <Navigation :pathList="pathList" :isChild="isChild" />
            <!-- <GoogleAd /> -->
            <GoogleAd />
            <Suspense>
                <template v-slot:default>
                    <FileList :path="path" />
                </template>
                <template v-slot:fallback>
                    <h3>文件加载中...</h3>
                </template>
            </Suspense>
        </div>
        <Fotter />
    </div>
</template>

<script>
import { useRouter, RouterView, RouterLink } from 'vue-router';

export default {
    name: "IndexView",
    computed:{
        path(){
            // 解密url编码
            return decodeURIComponent(this.$route.path);
        },
        pathArr(){
            /**
             * 将 /mod/GTA5 解析为 [mod, GTA5]
             */
            var path = this.path;
            var arr = path.split("/");
            arr.shift();
            return arr;

        },
        pathList(){
            /**
             * 解密url编码
             */ 
            let pathList = []
            let pathArr = this.pathArr
            for(let i=0;i<pathArr.length;i++){
                let name = decodeURIComponent(pathArr[i])
                let path = "/" + pathArr.slice(0,i+1).join("/")
                pathList.push({
                    name,
                    path
                })
            }
            return pathList




            // let arr = []
            // let navsPath = "/"
            // this.pathArr.forEach((value)=>{
            //     // console.log("pathArr",pathArr);
            //     if (navsPath == "/"){
            //         navsPath = `${navsPath}${value}`
            //     }else{
            //         navsPath = `${navsPath}/${value}`
            //     }        
            //     arr.push({
            //         name:value,
            //         path: navsPath
            //     })
                
            // })
            // return arr;

        },
        isChild(){
            // console.log(this.pathList);
             return this.path !== "/" 
        }
    }
}
</script>

<style scoped>

</style>