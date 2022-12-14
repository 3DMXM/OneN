<template>
    <header class="nav">
		<div class="navSize">
			<a href="/"><img class="avatar" src="/favicon.ico" /></a>
			<div class="navRight">
			    <li class="navli"><a href="https://www.aoe.top" target="_blank">博客</a></li>
			    <li class="navli"><a href="https://mod.3dmgame.com/u/9688990" target="_blank">Mod</a></li>
			    <li class="navli"><a href="https://wanwang.aliyun.com/nametrade/detail/online.html?domainName=aoe.top" target="_blank">买下我</a></li>				
			</div>
		</div>
	</header>
</template>

<script>
export default {
    name:"Header"
}
</script>

<style lang="less" scoped>
.nav{
	height: 56px;
	width: 100%;
	background:rgba(255,255,255,0.7);
	box-shadow: 0 2px 6px rgba(0,0,0,.05);

    .navSize{
        position: relative;
        height: 56px;
        max-width: 1100px;
        margin: 0 auto;

        /* 头像 */
        .avatar{
            position: absolute;
            top: 4px;
            left: 5%;
            width: 40px;
            height: 40px;
            border: 4px solid #ebe8e8;
            border-radius: 50%;
            transition: 1.2s;

            /* 头像动画 */

            &:hover{
                transform: rotate(360deg);
                -webkit-transform: rotate(360deg);
                -moz-transform: rotate(360deg);
                -o-transform: rotate(360deg);
                -ms-transform: rotate(360deg);
            }
        }
    }

    .navRight{
        position: absolute;
        top: 13px;
        right: 5%;
        background: rgba(255,255,255,0.9);
        border-radius: 5px;

        .navli{
            float: left;
            list-style: none;
            margin: 0 15px;
            line-height: 30px;

            a{
                font-size: 16px;
                color: #7e7e7e;
                transition: color 0.2s ease-out,border 0.2s ease-out,opacity 0.2s ease-out;
                text-decoration:none;

                &:hover{
                    color: #35B995;
                }
            }
        }
    }
}

</style>