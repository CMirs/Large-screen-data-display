<template>
  <div class="wit_wrap">
    <!-- 头部组件 -->
    <With-Header custom-title="账户提现" custom-fixed>
      <!-- 返回按钮 -->
      <i slot="backBtn" class="iconfont icon-fanhui" @click="back"></i>
    </With-Header>
    <div class="content">
      <div class="hd_wrap">
        <div
          class="back"
          style="background:url('../../../static/images/wallet/tixian_bj.png') no-repeat center center;
    background-size: 100% 100%"
        >
          <div class="k_box">
            <p class="can">余额</p>
            <div class="sum">
              <span>￥</span>
              <span>{{remainderMoney}}</span>
            </div>
          </div>
        </div>
        <!-- 提现方式 -->
        <div class="way_wrap">
          <h4>提现方式</h4>
          <!-- 选择方式 -->
          <div class="mode">
            <div
              class="wechat"
              v-for="(item,index) in pay"
              :key="index"
              :class="{on:payType==item.id}"
              @click="withType(index,item.id)"
            >
              <img :src="item.img" />
            </div>
          </div>
          <div class="play_wrap">
            <!-- 微信/支付宝-提现金额 -->
            <!-- <div class="sum_wrap" v-for="(list,index) in as" :key="index" v-show="cur===index"> -->
            <div class="sum_wrap">
              <h4>提现金额</h4>
              <div v-show="payInex===0">
                <div class="fee_wrap">
                  <div class="fee">
                    <span>{{alipayInfo.alipay_name}}</span>
                    <span>{{alipayInfo.alipay}}</span>
                  </div>
                  <div class="unit icon" @click="zfb_tx"></div>
                </div>
              </div>

              <div to="/wallet/bankCard" v-show="payInex===1">
                <div class="fee_wrap">
                  <div class="fee">
                    <span>{{bankInfo.bank_real_name}}</span>
                    <span>{{bankInfo.bank_card}}</span>
                  </div>
                  <div class="unit icon" @click="yhk_tx"></div>
                </div>
              </div>

              <div class="put">
                <span class="dollars">￥</span>
                <div class="inp">
                  <input
                    type="number"
                    oninput="if(value.length > 12)value = value.slice(0, 12)"
                    placeholder="请输入提现金额"
                    ref="money"
                    v-model.number="money"
                  />
                </div>
                <div class="all_btn" @click="all()">全部提现</div>
              </div>
              <!-- 手续费 -->
              <div class="fee_wrap">
                <div class="fee">
                  <span>手续费 ：</span>
                  <span>{{fee}}</span>
                </div>
                <div class="unit">元</div>
              </div>
              <!-- 实际到账 -->
              <div class="fee_wrap">
                <div class="fee">
                  <span>实际到账 ：</span>
                  <span>{{computeMoney}}</span>
                </div>
                <div class="unit">元</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 申请提现按钮 -->
        <div class="apply_btn" @click="saveWithdrawal()">提交申请</div>
      </div>
    </div>
  </div>
</template>

<script>
import WithHeader from "@/pages/common/header/TopHeader";
import { Toast } from "vant";
export default {
  name: "withdrawal",
  components: {
    WithHeader
  },
  data() {
    return {
      pay: [
        { id: 1, img: "/static/images/user/zfb.png" },
        { id: 2, img: "/static/images/user/yhk.png" }
      ],
      as: [{ id: 1, num: 0, mas: 92.2 }, { id: 2, num: 0, mas: 92.2 }],
      alipayInfo: {},
      bankInfo: {},
      money: "",
      payType: 1,
      payInex: 0,
      // tMoney:'',
      // alipayInfo:[],
      remainderMoney: this.$route.query.remainder_money,
      rate: this.$route.query.rate,
      fee: 0,
      //默认选中第一个
      cur: 0
    };
  },
  created() {
    this.$store.commit("showLoading");
    this.getUserAlipayInfo();
    // 获取sessionStorage的支付状态值，修改默认选中状态，用于修改支付方式回退默认选中
    if(sessionStorage.getItem("payType")){
         this.payType=sessionStorage.getItem("payType")
    this.payInex=sessionStorage.getItem("payInex")*1
    //      console.log(this.payType, "pty");
    //   console.log(this.payInex, "ptn");
    }
//    
  },
  computed: {
    computeMoney() {
      var fee = this.money * this.rate;
      this.fee = fee.toFixed(2);
      var tMoney = new Number(this.money - fee);
      return tMoney.toFixed(2);
    }
  },
  methods: {
    //   back
    back(){
        // 再次回退清除sessionStorage
         sessionStorage.clear();

    },
    // yhk_tx
    yhk_tx() {
        // 当点击修改时保存当前选中状态
    //   console.log(this.payType, "pty");
    //   console.log(this.payInex, "ptn");
      sessionStorage.setItem("payType", this.payType);
      sessionStorage.setItem("payInex", this.payInex);
      this.$router.push("/wallet/bankCard")
    },
    // zfb_tx
    zfb_tx() {
        // 当点击修改时保存当前选中状态 
    //   console.log(this.payType, "pty");
    //   console.log(this.payInex, "ptn");
      sessionStorage.setItem("payType", this.payType);
      sessionStorage.setItem("payInex", this.payInex);
      this.$router.push("/wallet/alipay")
    },
    withType(index, id) {
      this.payType = id;
      console.log(this.payType, "paytype");
      this.payInex = index;
      console.log(this.payInex, "payinex");
    },
    saveWithdrawal() {
      var url = "user/withdrawal";
      this.$axios
        .post(url, {
          // 传给后台的参数
          token: this.$store.getters.optuser.Authorization,
          money: this.computeMoney,
          withdraw_type: this.payType
        })
        .then(res => {
          var list = res.data;
          if (list.status == 200) {
            this.$toast(res.data.msg);
            setTimeout(() => {
              this.$router.push("/User");
            }, 1000);
          } else if (res.data.status == 999) {
            this.$store.commit("del_token"); //清除token
          } else {
            this.$toast(res.data.msg);
          }
        });
    },
    getUserAlipayInfo() {
      var url = "user/zfb_info";
      this.$axios
        .post(url, {
          token: this.$store.getters.optuser.Authorization
        })
        .then(res => {
          var list = res.data;
          console.log(list.data);
          if (list.status == 200) {
            this.alipayInfo = list.data;
            this.bankInfo = list.data;
            this.$store.commit("hideLoading");
            // if(this.alipayInfo.length<1){
            //     this.$router.push({
            //         path: '/user/alipay',
            //         name: 'alipay',
            //     })
            // }
          } else if (res.data.status == 999) {
            this.$store.commit("del_token"); //清除token
          } else {
            this.$toast(res.data.msg);
          }
        });
    },
    // 全部提现 
    all() {
      this.money = this.remainderMoney;
    }
  }
};
</script>

<style lang="stylus" scoped>
.wit_wrap {
  width: 100%;
  height: 100%;

  .content {
    padding: 88px 0 0;

    .hd_wrap {
      margin: 21px 24px 30px;
    }

    .back {
      padding: 90px 0;
      width: 100%;
    }

    .k_box {
      text-align: center;
      line-height: 55px;

      .sum {
        font-size: 36px;
        color: #fff;
      }

      .can {
        font-size: 30px;
        color: white;
      }
    }

    .way_wrap {
      h4 {
        margin: 26px 0 26px;
        color: #151515;
        font-size: 26px;
        line-height: 65px;
      }

      .mode {
        font-size: 0;
      }

      .mode img {
        margin: 0 auto;
        display: block;
        max-width: 100%;
      }

      .mode .wechat {
        margin: 0 37px 0 0;
      }

      .mode .wechat, .alipay {
        display: inline-block;
        vertical-align: middle;
        width: 58px;
        height: 58px;
      }

      .mode .on {
        width: 80px;
        height: 80px;
      }

      .sum_wrap {
        .sum_wrap, .put {
          padding: 22px 0;
          border-bottom: 1.1px solid #e6e6e6;
        }

        .dollars {
          font-size: 30px;
          line-height: 50px;
          font-weight: 600;
        }

        .put .inp, .all_btn {
          display: inline-block;
          vertical-align: top;
          font-size: 24px;
          color: #151515;
        }

        .inp input {
          width: 560px;
          height: 45px;
          font-size: 26px;
          color: #151515;

          .inp input::-webkit-input-placeholder {
            font-size: 26px;
            color: #717171;
          }
        }

        .all_btn {
          float: right;
          line-height: 45px;
        }

        .fee_wrap {
          padding: 22px 0;
          line-height: 45px;
          border-bottom: 1.1px solid #e6e6e6;
        }

        .fee_wrap .fee, .unit {
          display: inline-block;
          vertical-align: top;
          font-size: 26px;
          color: #151515;
        }

        .unit {
          float: right;
        }

        .icon {
          margin: 16px 0 0;
          width: 25px;
          height: 25px;
          background: url('/static/images/user/address/address-edit-icon.png') no-repeat;
          background-size: 100% 100%;
        }
      }
    }

    .apply_btn {
      margin: 50px auto 45px;
      width: 702px;
      height: 88px;
      background: #2b883a;
      border-radius: 44px;
      font-size: 30px;
      color: #fff;
      text-align: center;
      line-height: 88px;
      letter-spacing: 4px;
    }
  }
}
</style>