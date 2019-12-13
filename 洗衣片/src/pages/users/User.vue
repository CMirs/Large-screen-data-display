<template>
  <div id="user">
    <div class="banner_top">
      <div class="info_wrap">
        <router-link class="my_look" to="/users/personalData">
          <div class="portrait">
            <img class="touxiang" :src="userList.avatar" />
          </div>
        </router-link>
      </div>
      <div class="concent">
        <h2 style="color:#fff;">{{userList.realname}}</h2>
        <p style="color:#fff;">会员ID：{{userList.id}}</p>
        <div style="color:#fff;" class="name_info_in">
        <p v-if="userList.level === 0"></p>
        <p v-if="userList.level === 1">县级代理</p>
        <p v-if="userList.level === 2">市级代理</p>
        <p v-if="userList.level === 3">省级代理</p>
      </div>
      <div style="color:#fff;" class="name_info_info">
        <p>权益股东:
        <span v-if="userList.is_dividend === 0">否</span>
        <span v-if="userList.is_dividend != 0">第{{userList.dividend_id}}名</span>&nbsp;<span>权益值:{{userList.equity_value}}</span>
        </p>
      </div>
      </div>
      <div v-if="show" style="color:#fff;" class="name_info">
        <p v-if="userList.team_level === 0">普通会员</p>
        <p v-if="userList.team_level === 1">经理</p>
        <p v-if="userList.team_level === 2">总监</p>
        <p v-if="userList.team_level === 3">CEO</p>
      </div>
      <div v-if="isShow" style="color:#fff;" class="name_info">
         <p v-if="userList.is_laundry === 0">普通会员</p>
          <p v-if="userList.is_laundry === 1">合伙人</p>
      </div>
    </div>
    <div class="detailed">
      <div class="box_one">
        <h2>{{userList.remainder_money}}</h2>
        <p>余额</p>
      </div>
      <div class="box_one">
        <h2>{{userList.distribut_money}}</h2>
        <p>总收益</p>
      </div>
      <div class="box_one">
        <h2>{{userList.withdraw}}</h2>
        <p>已提现</p>
      </div>
    </div>
    <div class="order">
      <router-link to="/order/Order" class="order_info">
        <img src="/static/images/user/order.png" alt />
        <p style="color:#151515;">订单明细</p>
      </router-link>
      <router-link tag="div" to="/funs/Funs" class="order_info">
        <img src="/static/images/user/success.png" alt />
        <p>我的团队</p>
      </router-link>
      <router-link tag="div" to="/wallet/myWallet" class="order_info">
        <img src="/static/images/user/money.png" alt />
        <p>我的钱包</p>
      </router-link>
      <router-link tag="div" to="/users/share" class="order_info">
        <img src="/static/images/user/share.png" alt />
        <p>分享好友</p>
      </router-link>
    </div>
    <div class="ming_xi">
      <router-link tag="div" to="/users/reward" class="phone">
        <p>奖励明细</p>
        <p><van-icon name="arrow" /></p>
      </router-link>
       <div class="phone" @click="Coupon">
        <p>优惠券</p>
        <p><van-icon name="arrow" /></p>
      </div>
      <div class="phone">
        <p>手机号绑定</p>
        <p>{{userList.mobile}}</p>
      </div>
      <div class="phone" @click="agent">
        <p>区域代理申请</p>
        <p><van-icon name="arrow" /></p>
      </div>
      <div class="phone" @click="address">
        <p>收货地址</p>
        <p><van-icon name="arrow" /></p>
      </div>
      <div class="phone" @click="Notice">
        <p>公告信息</p>
        <p><van-icon name="arrow" /></p>
      </div>
      <div class="phone" @click="personalData_on">
        <p>个人资料</p>
        <p><van-icon name="arrow" /></p>
      </div>
      <div class="phone_one" @click="kefu">
        <p>联系客服</p>
        <p><van-icon name="arrow" /></p>
      </div>
    </div>
    <Navigate></Navigate>
  </div>
</template>
<script>
import Navigate from "@/pages/common/footer/Navigate";
import Vue from 'vue';
import { Toast } from 'vant';

Vue.use(Toast); 
export default {
  name: "User",
  components: {
    Navigate
  },
  data() {
    return {
      personalList: [],
      userList: [],
      kong:0,
      show:true,
      isShow:false
    };
  },
  created() {
    this.userData();
    this.personalData();
    // this.ceshi()
  },
  methods: {
    // ceshi
    // ceshi(){
    //   var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJEQyIsImlhdCI6MTU2ODk2MzI4NywiZXhwIjoxNTY4OTYzMjg4LCJ1c2VyX2lkIjoyODkyNTB9.P4OhQY3p09V57XGYCCH3Sve9xcMhiTGQIg6qyuC-08o";
    //   localStorage.setItem("Authorization",token)
    // },
    // 优惠券
    Coupon(){
      this.$router.push({ path: "/users/Coupon", name: "Coupon" });
    },
    kefu() {
      this.$router.push({ path: "/users/kefu", name: "kefu" });
    },
    agent() {
      this.$router.push({ path: "/users/agent", name: "Agent" });
    },
    Notice() {
      this.$router.push({ path: "/notice/NoticeList", name: "NoticeList" });
    },
    personalData_on() {
      this.$router.push({ path: "/users/personalData", name: "personalData" });
    },
    address(){
      this.$router.push({path:"/users/address/Address",name:"Address"});
    },
    userData() {
      let url = "user/user_info";
      this.$axios
        .post(url, {
          token: this.$store.getters.optuser.Authorization
        })
        .then(res => {
          console.log(res);
          var that = this;
          var item = res.data.data;
          this.$store.commit("hideLoading");
          if (res.data.status === 200) {
            that.userList = item;
            if(that.userList.withdraw === null ){
              that.userList.withdraw = this.kong
            }if(that.userList.is_laundry === that.userList.team_level){
              that.show = true;
              that.isShow = false;
            }if(that.userList.is_laundry > that.userList.team_level){
              that.show = false;
              that.isShow = true;
            }if(that.userList.is_laundry < that.userList.team_level){
              that.show = true;
              that.isShow = false;
            }
          } else if (res.data.status === 999) {
            this.$store.commit("del_token"); //清除token;
            setTimeout(() => {
              this.$router.push("/Login");
            }, 1000);
          } else {
            that.$toast('用户已过期，请重新登陆');
          }
        });
    },
    personalData() {
      let url = "user/personal";
      this.$axios
        .post(url, {
          token: this.$store.getters.optuser.Authorization
        })
        .then(res => {
          console.log(res);
          var that = this;
          var item = res.data.data;
          if (res.data.status === 200) {
            that.personalList = item;
            console.log(that.personalList);
          } else {
            // that.$toast(res.msg);
          }
        });
    }
  }
};
</script>
<style scoped>
body {
  background-color: red !important;
}
#user {
  height: 100%;
  padding-bottom: 140px;
}
.banner_top {
  width: 100%;
  background: url("/static/images/funs/banner_funs.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  position: relative;
  height: 220px;
}
.info_wrap {
  padding: 0 0 0 24px;
}
.touxiang {
  display: block;
  width: 112px;
  height: 112px;
  border-radius: 50%;
}
.concent {
  display: inline-block;
  vertical-align: middle;
  margin-top: -2%;
  margin-left: 16px;
}
.name_info p {
  padding: 16px 24px;
  border-left: 2px solid #6eb92b;
  border-radius: 37% 0 0 37%;
  background: #6eb92b;
  color: #fff;
}
.name_info {
  position: absolute;
  right: 0;
  top: 43%;
}
.detailed {
  width: 90%;
  height: 142px;
  margin: 0 auto;
  display: flex;
  border: 2px solid #ededed;
  border-radius: 8px;
  box-shadow: 1px 1px 2px #ededed;
  align-items: center;
  justify-content: space-around;
  position: relative;
  top: -36px;
  left: 0;
  background: #fff;
}
.box_one {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.order {
  width: 90%;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
}
.order_info img {
  width: 94px;
  height: 94px;
}
.order_info {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.order_info p {
  margin-top: 16px;
}
.ming_xi {
  width: 90%;
  border: 2px solid #e6e6e6;
  margin: 0 auto 100px auto;
  margin-top: 38px;
}
.phone {
  width: 85%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #e6e6e6;
}
.phone_one{
    width: 85%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.phone_one p{
    line-height: 80px;
  font-size: 24px;
  color: #757575;
}
.phone p {
  line-height: 80px;
  font-size: 24px;
  color: #757575;
}
</style>