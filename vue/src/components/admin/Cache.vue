<script setup>
import axios from "axios"
import { ref, computed } from "vue"
import { useStore } from "vuex"

const store = useStore()

let cache_path = ref("");

let state_api = computed(() => store.state.api)

function Refresh() {
    var path = cache_path.value;
    if (!path == "") {
        axios.post(`${state_api.value}/admin/RefreshCache`, { path }).then(res => {
            layer.msg(res.data.msg);

            if (res.data.code == "00") {
                cache_path.value = ""
            }
        });

    } else {
        layer.msg("请输入需要清空缓存的目录")
    }
}

</script>

<template>
    <div class="Cache">
        <div class="mdui-typo">
            <h1>目录缓存</h1>
        </div>
        <div class="form">
            <div class="mdui-textfield">
                <h4>缓存目录</h4>
                <input class="mdui-textfield-input" type="text" v-model="cache_path"/>
            </div>
            <button 
                type="submit" 
                class="mdui-btn mdui-color-theme-accent mdui-ripple mdui-float-right"
                @click="Refresh"
                >
                <i class="mdui-icon material-icons">cached</i> 刷新缓存
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: "Cache",

    // setup(){
    //     let cache_path = "";

    //     return{
    //         cache_path
    //     }
    // }
}
</script>

<style>

</style>