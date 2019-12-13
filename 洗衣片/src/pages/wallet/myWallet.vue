<template>
  <div class="myWallet">
    <div class="top_content">
      <TopHeader custom-title="余额" custom-fixed class="TopHeader">
        <i slot="backBtn" class="iconfont icon-fanhui"></i>
      </TopHeader>
      <h3 class="Surplus">{{userList.remainder_money}}</h3>
      <div class="t_c_bottom">
        <router-link
          :to="{path:'/wallet/withdrawal',query:{remainder_money:userList.remainder_money,rate:userList.rate}}"
          class="tixian"
        >提现</router-link>
      </div>
    </div>
    <div>
      <div class="mingxi" style="margin-top: 47px;
    margin-bottom: 20px;" @click="tixian">
        <p style="padding-left: 10px;">提现明细</p>
        <p>
          <van-icon name="arrow" />
        </p>
      </div>
      <div class="mingxi" @click="zhangdan">
        <p style="padding-left: 10px;">账单明细</p>
        <p>
          <van-icon name="arrow" />
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import TopHeader from "../common/header/TopHeader.vue";
export default {
  data() {
    return {
      userList: [],
      token: this.$store.getters.optuser.Authorization
    };
  },
  name: "myWallet",
  components: {
    TopHeader
  },
  methods: {
    tixian() {
      this.$router.push({ path: "/wallet/cashOut", name: "cashOut" });
    },
    zhangdan() {
      this.$router.push({ path: "/wallet/zhangdan", name: "zhangdan" });
    },
    userData() {
      let url = "user/user_remainder";
      this.$axios
        .post(url, {
          token: this.token
        })
        .then(res => {
          console.log(res);
          var that = this;
          var item = res.data.data;
          this.$store.commit("hideLoading");
          if (res.data.status === 200) {
            that.userList = item;
          } else if (res.data.status === 999) {
            this.$store.commit("del_token"); //清除token;
            setTimeout(() => {
              this.$router.push("/Login");
            }, 1000);
          } else {
            that.$toast(res.data.msg);
          }
        });
    }
  },
  created() {
    this.userData();
  }
};
</script>
<style  scoped>
.myWallet {
  height: 100%;
  /* background: url("../../../static/images/wallet/16myWallet.jpg") no-repeat center center; */
  background-size: 100% 100%;
}
.myWallet .top_content {
  height: 360px;
  color: white;
  background: url("../../../static/images/wallet/myWallet.png") no-repeat center
    center;
  background-size: 100% 100%;
}
.top_content .TopHeader {
  height: 88px;
  width: 100%;
  color: white;
  background: transparent;
  font-size: 30px;
}
.top_content .Surplus {
  padding-top: 128px;
  font-size: 36px;
  height: 115px;
  text-align: center;
  line-height: 115px;
  letter-spacing: 3px;
}
.top_content .t_c_bottom {
  height: 118px;
  display: flex;
  justify-content: center;
}
.t_c_bottom .tixian {
  height: 60px;
  width: 200px;
  font-size: 36px;
  text-align: center;
  line-height: 60px;
  background: #fed300;
  color: #2b883a;
  border-radius: 30px;
}
.mingxi {
  width: 94%;
  display: flex;
  justify-content: space-between;
  border: 4px solid #f3f3f3;
  padding: 20px 0;
  margin: 0 auto;
  border-radius: 10px;
}
</style>