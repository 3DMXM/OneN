<script setup>
    import axios from "axios"
</script>
<template>
    <div class="Show">
        <div class="mdui-typo">
        <h1>显示设置</h1>
    </div>
    <div class="form" v-if="show_file">
        <div class="mdui-textfield">
            <label for="show_image" class="mdui-textfield-label">图片(image)</label>
            <input name="show_image" class="mdui-textfield-input" type="text" v-model="show_file['show_image']"/>
        </div>
        <div class="mdui-textfield">
            <label for="show_video" class="mdui-textfield-label">视频(video)</label>
            <input name="show_video" class="mdui-textfield-input" type="text" v-model="show_file['show_video']"/>
        </div>
        <div class="mdui-textfield">
            <label for="show_audio" class="mdui-textfield-label">音频播放(audio)</label>
            <input name="show_audio" class="mdui-textfield-input" type="text" v-model="show_file['show_audio']"/>
        </div>
        <div class="mdui-textfield">
            <label for="show_code" class="mdui-textfield-label">文本/代码(code)</label>
            <input name="show_code" class="mdui-textfield-input" type="text" v-model="show_file['show_code']"/>
        </div>
        <div class="mdui-textfield">
            <label for="show_code2" class="mdui-textfield-label">在线代码(code2)/可在线引用</label>
            <input name="show_code2" class="mdui-textfield-input" type="text" v-model="show_file['show_code2']"/>
        </div>
         <div class="mdui-textfield">
            <label for="show_doc" class="mdui-textfield-label">文档(doc)</label>
            <input name="show_doc" class="mdui-textfield-input" type="text" v-model="show_file['show_doc']"/>
        </div>


        <button 
            type="submit" 
            class="mdui-btn mdui-color-theme-accent mdui-ripple mdui-float-right"
            @click="Save"
            >
            <i class="mdui-icon material-icons">save</i> 保存
        </button>
    </div>
    </div>
</template>

<script>
export default {
    name:"Show",
    data(){
        return{
            show_file: null
        }
    },
    methods:{
        Save(){
            axios.post(`${this.$store.state.api}/admin/SaveShowFile`, {show_file: this.show_file}).then(res => {
                layer.msg(res.data.msg);
            });
        }
    },
    mounted(){
        axios.post(`${this.$store.state.api}/admin/GetShowFile`).then(res => {
            this.show_file = res.data.data;
        });
    },
}   
</script>

<style>

</style>