<template>
    <div>
            <div class="no_more">
            </div>
            <div class="end">
                <div class="user_bar">
                <ul>
                    <li>登录</li>
                    <li>注册</li>
                    <li>更多</li>
                    <li>反馈</li>
                </ul>
            </div>
            <div class="foot_msg">
            <div class="copyright">
                    <div class="copyright-txt">
                        <p>
                            <a href="//prom.m.gome.com.cn/html/prodhtml/topics/201812/3/channelTw6HXshUq5j.html">
                                互联网药品信息服务资格证编号(京)-经营性-2019-0025
                            </a>
                        </p>
                        <p>
                            <a href="//prom.m.gome.com.cn/html/prodhtml/topics/201812/3/channelQt9MEAQ72h1.html">
                                <span>经营证照</span>
                            </a>
                            <a href="//prom.m.gome.com.cn/html/prodhtml/topics/201812/3/channelvl0KiI8nHJW.html">
                                <span>增值电信业务经营许可证</span>
                            </a>
                            <a href="//prom.m.gome.com.cn/html/prodhtml/topics/201812/3/channel5GhXaKwneD1.html">
                                <span>出版物经营许可证</span>
                            </a>
                        </p>
                        <p><a href="//prom.m.gome.com.cn/html/prodhtml/topics/201812/3/channelXCl3KmZNlFr.html">网络文化经营许可证沪网文[2017]5537-436号</a></p>
                        <p>
                            <span>京公安网备11010502027062</span>
                            <span>沪B2-20120004号</span>
                        </p>
                        <p>沪ICP备11009419号</p>
                        <p>网络食品销售第三方平台提供者备案：沪网食备A0015号</p>
                    </div>
                    <p>copyright ©  2000-2019 gome.com.cn</p>
                    <p>客服热线：<a href="tel:4008-113-333">4008-113-333</a></p>
                </div>
            </div>
            </div>
            
    </div>

</template>
<script>
    export default {

    }
</script>
<style scoped>
    .no_more{
    height: .6135rem;
    width: 100%;
    background-image: url('../assets/img/tips2.png');
    background-size: cover;
    background-color: #f7f7f7;
    background-repeat: no-repeat;
    background-position: center;
    }
.end{
    height: 2.3rem;
    background: white;
}
.end .user_bar{
    height: .47rem;
    border-bottom: .01rem solid #e6e6e6;
}
.user_bar ul{
    display: flex;
  
    justify-content: space-around;
    width: 100%;
    height: 100%;
}
.user_bar ul li{
    font-size: .14rem;
    line-height: .47rem;
    width: 20%;
    margin-left: 0.3rem;
    position: relative;
}
.user_bar ul li::after{
    content: "|";
    color: #e6e6e6;
    position: absolute;
    right: 0;
}
.user_bar ul li:nth-of-type(4)::after{
    content:""   ;
    display: none;
}
.foot_msg {
    width: 100%;
    margin: auto;
    text-align: center;
}
.copyright {
    padding-bottom: .15rem;
    padding-top: .12rem;
} 
.copyright .copyright-txt {
    padding: 0 .1rem .05rem;
} 
.copyright .copyright-txt p {
    line-height: .15rem;
    margin-bottom: .05rem;
    font-size: .1rem;
    color: #7A7F85;
}
.copyright p a {
    color: #888;
}
.copyright p {
    line-height:.18rem;
    text-align: center;
    font-size: .1rem;
    color: #888;
    font-size:.11rem;
}
</style>