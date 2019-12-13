<template>
  <div>
    <div class="completionpay">
      <div class="maleri30">
          <div class="logo">
            <p @click="back"><van-icon name="arrow-left" class="icon"/></p>
          </div>
        <div class="heses" v-for="(i,idx) in success" :key="idx">
          <div class="zbzim">
            <img src="../../../static/images/order/sbzf.png" />
          </div>
          <p class="success">
            <span>订单提交成功，我们将在第一时间给你发货！</span>
          </p>
          <p class="ddnum">
            <span>订单号：</span>
            <span>{{i.order_sn}}</span>
          </p>
          <p class="ddnum">
            <span>您支付的金额为：</span>
            <span class="red">{{i.order_amount}}</span>
            <span>元</span>
          </p>
          <p class="ddnum">
            <span>请你保持手机畅通，等待收货。</span>
          </p>
          <div class="ddxq-succ" style="color: #7cb364;font-size:12px">
            <a @click="details()">订单详情</a>
          </div>
        </div>
      </div>
    </div>
    <Navigate></Navigate>
  </div>
</template>
<script>
import Navigate from "@/pages/common/footer/Navigate";
export default {
  daata(){
    return{
      success:[],
    }
  },
  components:{
Navigate
  },
  created(){
    this.success()
  },
  methods:{
    success(){
       var order_amount = localStorage.getItem("order_amount");
      var order_sn = localStorage.getItem("order_sn");
      //  var order_id = localStorage.getItem("order_id");
      this.success =[{order_amount:order_amount,order_sn:order_sn}]
    },
    details(i,idx){
      this.$router.push("/order/OrderDetails")
    },
    back(){
      this.$router.push("/home/Home")
    }
  }
};
</script>
<style  scoped>
.maleri30 {
  margin: 20px;
  cursor: pointer;
}
.logo p .icon{
    margin-top:-2px;
    font-size:36px;
    font-weight:580;
}
.completionpay .llog {
  padding: 10px 0;
}
.completionpay .llog img {
  width: 200px;
  height: 100%;
}
.completionpay .heses {
  border-top: 2px solid #009323;
  text-align: center;
}
.heses {
  width: 100%;
  height: 600px;
  background-color: #f1f8ee;
}
.completionpay .heses .zbzim {
  text-align: center;
  padding:25px 0;
}
.completionpay .heses .zbzim img {
  width: 100px      ;
  height: 80px;
}
.completionpay .heses .success {
  color: #7cb364;
  text-align: center;
}
.completionpay .heses p {
  font-size: 24px;
  line-height: 2;
}
</style>