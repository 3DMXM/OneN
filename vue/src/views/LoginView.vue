<script setup>
import axios from 'axios'

</script>

<template>
    <div class="container-fluid">
        <div class="login">
            <h1>
                <a href="/">OneX</a>
            </h1>
            <div class="login-from">
                <div class="mdui-textfield">
                    <label for="username" class="mdui-textfield-label">用户名</label>
                    <input v-model="user_name" name="username" type="text" class="mdui-textfield-input" @keydown.enter="login">
                </div>
                <div class="mdui-textfield">
                    <label for="password" class="mdui-textfield-label">密码</label>
                    <input v-model="user_password" name="password" type="password" class="mdui-textfield-input" @keydown.enter="login">
                </div>
                
                <div class="mdui-textfield" style="text-align: right">
                    <div 
                        class="mdui-btn mdui-color-theme-accent mdui-ripple login-btn"
                        @click="login"
                        >登录</div>
                </div>
            </div>
            <div class="login-link">
                <div class="login-link-lift">
                    <a href="/">← 返回首页</a>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"LoginView",
    // data(){
    //     return{
    //         user_name:'',
    //         user_password:''
    //     }
    // },
    methods:{
        login(){
            let reqData = {
                username:this.user_name,
                password:this.user_password
            }
            axios.post(`${this.$store.state.api}/admin/Login`,reqData).then(res=>{
                if(res.data.code == 0){
                    layer.msg("登录成功！")
                    this.$router.push('/~admin/index')
                }else{
                    layer.msg(res.data.msg)
                }
            }).catch(err=>{
                layer.msg(err.message)
            })
        }
    },
    mounted(){
        // body 添加    class="login-bg"
        document.body.classList.add("mdui-theme-primary-blue-grey","mdui-theme-accent-blue","mdui-loaded")

        // 判断是否已经登录
        axios.post(`${this.$store.state.api}/admin/CheckUser`).then(res=>{
            if(res.data.code == "00"){
                this.$router.push('/~admin/index')
            }
        })
    },
    setup(){
        let username = "";
        let password = "";


        return {
            username, password
        }
    }
}
</script>

<style lang="less" scoped>
body,.login{
    height: 100%;
}
.login{
    width: 320px;
    background: rgba(0,0,0,.2);
    padding: 0 20px;
    top: 0;
    right: 15%;
    position: fixed;
    box-shadow: 0 0 5px 0 #333;
    overflow-y: auto;

    h1{
        margin-top: 50px;
        a{
            color: #fff;
            text-decoration: none;
        }
    }
   

    .login-from{
        padding: 24px;
        font-weight: 400;
        background: rgba(255,255,255,.2);
        border: 0;
        -moz-box-shadow: none;
        -webkit-box-shadow: none;
        box-shadow: #000 0 0 10px -1px;

        .mdui-textfield-label,.mdui-checkbox{
            color: white;
            text-shadow: -1px 1px 0 #000, 1px 1px 0 #000;
        }

    }
    .login-link{
        padding: 15px 10px;

        a{
            color: white;
        }
        a:hover{
            opacity: .7;
        }
        .login-link-lift{
            float: left;
        }
        .login-link-right{
            float: right;
        }
    }
    .login-link:after{
        display: table;
        clear: both;
        content: '';
    }

    .otherLogin{
        //height: 50px;
        &:after{
            content: " ";
            display: table;
            clear: both;
        }
        .otherLoginList{
            float: left;
            text-align: center;
            line-height: 30px;
            margin: 0 13px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: solid 1px #000;
            cursor: pointer;

            i{
                font-size: 30px;
                line-height: 1.5;
            }
        }
        .WeiBo {
            color: #f44c24;
            border-color: #f44c24
        }
        .QQ {
            color: #23b9e4;
            border-color: #23b9e4
        }
        .WeiXin {
            color: #51c332;
            border-color: #51c332
        }
    }
}

@media (max-width: 470px){
    .login{
        margin: auto;
        right: 0;
        left: 0;
    }
}
</style>