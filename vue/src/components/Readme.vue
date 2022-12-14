<script setup>
import axios from "axios"
</script>
<template>
    <div class="nexmoe-item">
        <div class="mdui-typo" style="padding: 20px;">
            <div class="mdui-chip">
            <span class="mdui-chip-icon"><i class="mdui-icon material-icons">face</i></span>
            <span class="mdui-chip-title">README.md</span>
            </div>
            <div v-if="mdContent !== ''" class="show-readme" id="show_readme" v-html="mdContent"></div>		
            <div v-else  class="show-readme">
                <!-- 加载动画 -->
                <div class="vbox">
                    <div class="ball-clip">
                        <vue-loaders name="ball-clip-rotate-multiple" color="red" scale="4" />
                    </div>
                    <h3>正在读取README。。。</h3>
                </div>            
            </div>		
        </div>
    </div>
</template>

<script>
// import $ from "jquery"
// import 'github-markdown-css'
import {marked, Renderer} from "marked"


export default {
    name:"Readme",
    props:["readme"],
    data(){
        return{
            content:""
        }
    },
    computed:{
        mdContent(){
            // const marked = require("marked");
            // let htmlMD = marked(this.content);

            marked.setOptions({
                tables: true,
                breaks: true,
                smartypants: true
            })

            return  marked(this.content);

        }
    },
    watch:{
        readme:{
            immediate:true,
            handler(){
                let data = {
                    file_id: this.readme
                }
                // $.post(`${this.$store.state.api}/api/GetFileData`,data,(red)=>{
                //     // red = JSON.parse(red)

                //     this.content = red.content
                // })
                axios.post(`${this.$store.state.api}/api/GetFileData`, data).then(res => {
                    this.content = res.data.data
                })

            }
        }
    }
}
</script>

<style scoped>
.show-readme{
    padding-top: 20px;
}
</style>