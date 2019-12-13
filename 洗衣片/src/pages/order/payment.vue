<template>
  <div>
         <header><van-icon name="arrow-left" @click="back" class="icon"/>
        支付，提交订单
        
      </header>
    <ul class="order" v-for="(item,idx) in shuju" :key="idx">
      <li>
        <span>订单号</span>
        <a>{{item.order_sn}}</a>
      </li>
      <li>
        <span>订单金额</span>
        <a>￥ {{item.zojia}}</a>
      </li>
      <li>支付方式</li>
      <li>
        <span>
          <van-icon name="gold-coin-o" style="    font-size: 20px;" />
          {{pay_type}}支付
        </span>
        <a>
          <img style="    background: #2b883a;
    border-radius: 50%;" src="../../../static/images/order/z-chengs.png" alt />
        </a>
      </li>
      <li @click="mima" v-show="mishow">
        <input type="password" placeholder="请输入密码" v-model="i_input" class="psw_input" minlength="6"  maxlength="6"/>
        <div v-show="ishw" @click="shezhi">无密码，请设置密码</div>
      </li>
    </ul>
    <van-button type="danger" style="width:100%;margin-top: 24px;background:#2b883a;border:0" @click="tijiao">立即支付</van-button>
  </div>
</template>
<script>
import TopHeader from "@/pages/common/header/TopHeader";
// 提示框
import Vue from "vue";
import { Toast } from "vant";

Vue.use(Toast);
export default {
  data() {
    return {
      shuju: [],
      mishow: false,
      ishw: false,
      i_input: ""
    };
  },

  created() {
    this.NotData();
  },
  computed: {
    pay_type() {
      let pay_type = "";
      this.shuju.forEach(shuju => {
        if (shuju.pay_type == 1) {
          pay_type = "余额";
        } else if (shuju.pay_type == 2) {
          pay_type = "微信";
        } else if (shuju.pay_type == 3) {
          pay_type = "支付宝";
        }
      });
      return pay_type;
    }
  },
  methods: {
        // 返回到代付款页面
    back(){
      this.$router.push("/order/Order1")
    },
    // 设置密码}
    shezhi() {
      this.$router.push("/login/Ediptpaypassword");
    },
    // 点击输入框检查是否设有密码
    mima() {
      // 获取token
      var token = localStorage.getItem("Authorization");
      console.log(token);
      var url = "user/personal";
      this.$axios
        .post(url, {
          token: token
        })
        .then(res => {
          console.log(res);
          if (res.data.status === 200) {
            //
            console.log(res.data.data.pwd, "mima");
            if (res.data.data.pwd === null) {
              //  this.$router.push({path:'/login/Ediptpaypassword',name:'Ediptpaypassword'})
              //  this.$refs.shezhi.style="display:block"
              //  console.log(this.$refs.shezhi.style,"666")
              this.ishw = true;
            }
          } else {
            this.$toast(res.msg);
          }
        });
    },
    NotData() {
      // 获取token
      var token = localStorage.getItem("Authorization");
      var pay_type = localStorage.getItem("pay_type");
      var order_id = localStorage.getItem("order_id");
      var order_amount = localStorage.getItem("order_amount");
      var order_sn = localStorage.getItem("order_sn");

      console.log(token);
      let shuju = [
        {
          order_id: order_id,
          zojia: order_amount,
          pay_type: pay_type,
          order_sn: order_sn
        }
      ];
      if (shuju[0].pay_type == 1) {
        this.mishow = true;
      }
      console.log(shuju);
      this.shuju = shuju;
      console.log(this.shuju, "520");
    },
    tijiao() {
      // 当有密码时才能点击
      var psw = this.i_input;
      psw = psw.replace(/(^\s*)|(\s*$)/g, ""); //去除空格;

      if (!psw == "" || !psw == undefined || !psw == null) {
        // 获取token
        var token = localStorage.getItem("Authorization");
        var pay_type = localStorage.getItem("pay_type");
        var order_id = localStorage.getItem("order_id");

        console.log(psw, "555");
        var url = "pay/payment";
        this.$axios
          .post(url, {
            token: token,
            order_id: order_id,
            pay_type: pay_type,
            pwd: psw
          })
          .then(res => {
            console.log(res);
            this.data = res.data.data;
            console.log(this.data.data, "567");
            if (res.data.status === 200) {
              console.log("ok");
              localStorage.removeItem("pay_type");
              this.$router.push("/order/shop_success");
            } else  if(res.data.status === 308){


              Toast.success("余额不足，交易失败");
              // that.$toast(res.msg);
            } else {
               Toast.success("密码错误，请重新输入");
            }
          });
      }else{
        Toast.success('请输入密码');
      }
    }
  }
};
</script>
<style  scoped>
header {
  font-size: 30px;
  height: 88px;
  width: 100%;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #e6e6e6;
  position: fixed;
  top: 0;
  background: white;
  z-index: 20;
}
header .icon{
   font-size:36px;
    font-weight:580;
   position: absolute;
    left: 1.3%;
    top:25%
}
header span {
  font-size: 23px;
  position: absolute;
  right: 14px;
  color: #7bafe2;
}
.order {
  margin-top: 100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.order li {
  width: 97%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: black;
  font-weight: 600;
  border-bottom: 10px solid #bdc5ae3d;
  font-size: 30px;
}
.order li span {
  font-size: 30px;
  font-weight: 600;
  color: black;
}
.order li a {
  font-weight: 500;
  color: #2b883a;
  font-size: 30px;
}
.order li:nth-child(3),
.order li:nth-child(4) {
  border: transparent;
}
.order li:nth-child(4) span {
  color: gray;
  font-size: 13px;
  display: flex;
}
.order li:nth-child(4) a {
  display: block;
  height: 50px;
  width: 50px;
  border-radius: 25px;
  background: red;
}
.order li:nth-child(4) a img {
  height: 100%;
  width: 100%;
}
.order li:nth-child(5) {
  /* height: auto;; */
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.order li:nth-child(5) .psw_input {
  width: 100%;
  height: 100%;
  padding-left: 20px;
}
.order li:nth-child(5) div {
  color: red;
  /* display: none; */
}
</style>