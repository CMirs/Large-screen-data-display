<template>
  <div class="agents-wrap">
    <!-- 头部组件 -->
    <TopHeader custom-title="申请代理" custom-fixed>
      <i slot="backBtn" class="iconfont icon-fanhui"></i>
    </TopHeader>
    <!-- CONTENT START -->
    <div class="content" style="border:1px solid #ebebeb">
      <div class="-code-list">
        <div class="redio">
          <p class="redio_info">一级CEO：{{userList.coe_num_1}}</p>
        </div>
        <div class="redio">
          <p class="redio_info">二级CEO：{{userList.coe_num_2}}</p>
        </div>
        <div class="redio">
          <p class="redio_info">CEO总人数：{{userList.ceo_num}}</p>
        </div>
        <div class="redio" style="display:flex;justify-content: space-between;" @click="to">
          <p class="redio_info">选择地址</p>
          <div v-for="(item,index) in list" :key="index">
            <p>{{item.name}}</p>
          </div>
          <p>
            <van-icon name="arrow" />
          </p>
        </div>
        <div>
          <van-area v-if="show" :area-list="Area" value="110101" @confirm="togo" @cancel="gogo" />
        </div>
        <van-dropdown-menu class="van-drop">
          <van-dropdown-item v-model="aValue" :options="option1" />
        </van-dropdown-menu>
      </div>
      <div class="btn" @click="getUserAgent">
        <p style="padding: 10px 0;">申请</p>
      </div>
    </div>
  </div>
</template>
<script>
import TopHeader from "@/pages/common/header/TopHeader";
import Area from "./area";
export default {
  name: "Agent",
  data() {
    return {
      list: [],
      show: false,
      Area,
      fileList: [],
      aValue: 1,
      userName: "",
      mobile: "",
      token: this.$store.getters.optuser.Authorization,
      option1: [

        { text: '特级城市', value: 4 },
        { text: '省会城市', value: 3 },
        { text: '县级城市', value: 2 },
        { text: '县', value: 1 },
      ],
      address_id: [],
      arr: "",
      userList: [],
      hu: "请填写正确的地址和代理区域"
    };
  },
  created() {
    // this.$store.commit("showLoading");
    this.userData();
  },
  methods: {
    to() {
      this.show = true;
    },
    togo(is) {
      this.list = is;
      console.log(this.list);

      for (var i = 0; i < this.list.length; i++) {
        this.address_id.push(this.list[i].code);
      }
      this.arr = this.address_id.join(",");
      console.log(this.arr);
      this.show = false;
    },
    gogo() {
      this.show = false;
    },
    getUserAgent() {
      var _that = this;
      _that.$axios
        .post("Distribution/application_regional_agent", {
          token: _that.token,
          code: _that.arr,
          area_type: _that.aValue
        })
        .then(res => {
          console.log(_that.option1.value);
          console.log(res);
          if (res.data.status == 200) {
            _that.$toast(res.data.msg);
            setTimeout(() => {
              _that.$router.push("/users/agent");
            }, 1000);
          } else {
            _that.$toast(res.data.msg);
            setTimeout(() => {
              _that.$router.push("/users/agent");
            }, 1000);
          }
        });
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
          if (res.data.data.status === -2) {
            res.data.data.msg = this.hu;
          }
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
    // btn(){
    //         var _that = this;
    //   _that.$axios
    //     .post("Distribution/application_regional_agent", {
    //       token: _that.token,
    //       code:_that.arr,
    //       area_type:_that.aValue

    //     })
    //     .then(res => {
    //       console.log(_that.option1.value)
    //       console.log(res)

    //       _that.$store.commit("hideLoading");
    //       if (list.status == 200) {

    //         for (var i in list.data) {
    //           newarrys.push({
    //             text: list.data[i].levelname,
    //             value: list.data[i].id
    //           });
    //         }
    //         _that.aValue = newarrys[0].value;
    //         _that.option1 = newarrys;
    //       } else if (list.status == 999) {
    //         _that.$store.commit("del_token"); //清除token
    //         setTimeout(() => {
    //           _that.$router.push("/Login");
    //         }, 1000);
    //       } else {
    //         _that.$toast(list.msg);
    //       }
    //     });
    // }
  },
  components: {
    TopHeader
  },
  watch: {
    aValue() {
      console.log(this.aValue);
    }
  }
};
</script>
<style lang="stylus" scoped>
.agents-wrap {
  width: 100%;
  height: 100%;

  .content {
    margin: 88px 0 0px;
    background: #fff;
    border-radius: 10px;
    text-align: center;
    margin-bottom: 20px;
    overflow: hidden;

    .btn {
      text-align: center;
      width: 79%;
      margin: 0 auto;
      background: #2b883a;
      border-radius: 44px;
      color: #fff;
      margin-bottom: 30px;
      margin-top: 20px;
    }

    .-code-list {
      padding: 25px 0 0;
      text-align: left;
      font-size: 26px;
      width: 90%;
      margin: 0 auto;

      .redio {
        line-height: 80px;
        color: 24px;
        border-bottom: 2px solid #ebebeb;
      }

      .attention {
        color: #f40808;
        font-size: 26px;
        line-height: 65px;
      }

      .van-dropdown-menu__item {
        width: 702px;
        position: relative;
        justify-content: flex-start;
      }

      .van-dropdown-menu__title {
        display: block;
        width: 94%;
        text-align: left;
        font-size: 28px;
      }

      .a-inp {
        width: 100%;
        height: 60px;
        font-size: 26px;
        margin-bottom: 12px;
      }

      .van-cell {
        text-align: left;
      }
    }

    .van-uploader__upload {
      margin: 70px auto;
      width: 370px;
      height: 370px;
    }

    .van-uploader__preview-image {
      width: 370px;
      height: 370px;
    }

    .van-uploader__preview-image img {
      display: block;
      max-width: 100%;
      height: 100%;
    }

    .van-uploader__upload-icon {
      color: #969799;
      font-size: 80px;
      font-weight: bold;
    }

    .van-uploader__upload-text {
      font-size: 30px;
    }

    .van-uploader__preview {
      margin: 0;
    }
  }

  .submit {
    position: fixed;
    bottom: 35px;
    left: 24px;
    width: 702px;
    height: 88px;
    background-color: #ff4d4d;
    border-radius: 44px;
    font-size: 30px;
    color: #fff;
    letter-spacing: 5px;
  }
}

.van-dropdown-menu__item >>> .van-dropdown-menu__title {
  width: 100%;
}
</style>
<style lang="stylus">
.agents-wrap {
  .van-drop {
    .van-dropdown-menu__item {
      .van-dropdown-menu__title {
        width: 100%;
        display: inline-block;

        &:after {
          right: 12px !important;
        }
      }
    }
  }

  .vmod-vat {
    padding: 160px 0 0;
    margin: 0 auto;
    width: 370px;
    box-sizing: border-box;

    .van-uploader {
      .van-uploader__preview-image {
        margin: 0 auto;
        width: 370px;
        height: 540px;
      }
    }
  }
}
</style>



