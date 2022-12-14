<script setup >
import { defineAsyncComponent, ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import Header from '@/components/Header.vue'
import Fotter from '@/components/Fotter.vue'
import Navigation from '@/components/Navigation.vue'

const FileList = defineAsyncComponent(() => import('../components/FileList.vue')) //异步引入

const route = useRoute()

let path = computed(() => {
    return decodeURIComponent(route.params.path || '/');
})
let pathArr = computed(() => {
    let arr = path.value.split('/')
    arr.shift();
    return arr;
})
let pathList = computed(() => {
    /**
    * 解密url编码
    */
    let pathList = []
    let _pathArr = pathArr.value
    for (let i = 0; i < _pathArr.length; i++) {
        let name = decodeURIComponent(_pathArr[i])
        let path = "/" + _pathArr.slice(0, i + 1).join("/")
        pathList.push({
            name,
            path
        })
    }
    return pathList
})
let isChild = computed(() => {
    // console.log(this.pathList);
    return path.value !== "/"
})

</script>

<template>
    <div class="index">
        <Header />
        <div class="mdui-container">
            <Navigation :pathList="pathList" :isChild="isChild" />
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
}
</script>

<style scoped>

</style>