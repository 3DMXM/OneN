<template>
    <div class="fotter">
	    <p>小莫网盘 @2020-{{year}} 如果网盘中有包含侵犯您权利的内容，请联系邮箱xm@xmsky.onmicrosoft.com</p>
	    <p>
	        <a href="https://www.aoe.top/notes/490" target="_blank">下载速度慢提速方案</a>|
	        <a href="https://www.aoe.top/notes/497" target="_blank">下载提示需要登录？</a>|
	        <a href="https://www.aoe.top/notes/511" target="_blank">下载完不会安装？</a>
	    </p>
	    <p><span class="buyMeCoffee-a" @click="buyMeCoffee">给小莫投食</span></p>
	    <p>CopyRight 2021-{{year}}  www.aoe.top All Right Reserved 湘ICP备2021011453号-1</p>
	    <div class="buyMeCoffee">
			<picture @click="buyMeCoffee">
				<source srcset="https://mod.3dmgame.com/static/upload/mod/202201/MOD61e506a426bd9.webp" type="image/webp">
				<img src="https://code.aoe.top/img/buyMeCoffee/buyMeCoffee.png" alt="给小莫投食">
			</picture>
		</div>
	</div>
</template>

<script>
export default {
    name:"Fotter",
    computed:{
        year(){
            let date =  new Date().getFullYear();
            return date
        }
    },
    methods:{
        buyMeCoffee(){
            layer.open({
                type:1,
                area:['300px', '400px'],
                title:'给小莫投食',
                resize:false,
                scrollbar:false,
                shadeClose : true,
                content:'<div class="donate-box"><div class="meta-pay text-center"><strong>小莫已经快要饿死了<br/>快来给小莫投喂点食物吧~</strong></div> ' + 
				'<div class="qr-pay text-center"><img class="pay-img" id="alipay_qr" src="https://code.aoe.top/img/buyMeCoffee/zfb.png">' +
				'<img class="pay-img d-none" id="wechat_qr" src="https://code.aoe.top/img/buyMeCoffee/wx.png"></div><div class="choose-pay text-center mt-2">' +
				'<input id="alipay" type="radio" name="pay-method" checked><label for="alipay" class="pay-button">' +
				'<img src="https://code.aoe.top/img/buyMeCoffee/alipay.png"></label>' +
				'<input id="wechatpay" type="radio" name="pay-method"><label for="wechatpay" class="pay-button">' +
				'<img src="https://code.aoe.top/img/buyMeCoffee/wechat.png"></label></div></div>'
            });
            $('.choose-pay input[type="radio"]').click(function(){
                var id= $(this).attr('id');
                if(id=='alipay'){$('.qr-pay #alipay_qr').removeClass('d-none');$('.qr-pay #wechat_qr').addClass('d-none')};
                if(id=='wechatpay'){$('.qr-pay #alipay_qr').addClass('d-none');$('.qr-pay #wechat_qr').removeClass('d-none')};
            });
        }
    }
}
</script>

<style scoped>
span.buyMeCoffee-a{
    cursor: pointer;
    color: #35B995;
}
</style>