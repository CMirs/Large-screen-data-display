<template>
    <div class="header">
        <Data-Header custom-title="奖励明细" custom-fixed>
            <i slot="backBtn" class="iconfont icon-fanhui"></i>
            </Data-Header>
            <div class="detail"> 
                <p>订单</p>
                <p>用户金额</p>
                <p>描述</p>
            </div>
            <div class="detail"> 
                <p>123456</p>
                <p>￥174.5</p>
                <p>推荐奖励</p>
            </div>
    </div>
</template>
<script>
import DataHeader from "@/pages/common/header/TopHeader"
export default {
    name:'Success',
    components:{
        DataHeader
    }
}
</script>
<style scoped>
.header{
    width: 100%;
}
.detail{
    width: 100%;
    position: relative;
    top: 88px;
    left: 0;
    display: flex;
    justify-content: space-around;
    font-size: 30px;
    border-top: 2px solid #ededed;
    border-bottom: 2px solid #ededed;
    line-height: 60px;
}
</style>