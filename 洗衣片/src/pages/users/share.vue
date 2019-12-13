<template>
  <div class="body">
    <div class="header">
      <div class="back" @click="back">
        <p class="back_info"><van-icon name="arrow-left" color='#fff' class="icon"/></p>
      </div>
      <div class="header_top">
        <img :src="NotiList.avatar" alt />
        <p style="padding-top:16px;color:#fff">{{NotiList.realname}}</p>
        <p style="padding-top:16px;color:#fff">ID:{{NotiList.id}}</p>
      </div>
    </div>
    <div class="photo">
      <img :src="NotiList.qrcode" alt />
      <p style="text-align: center;">长按二维码保存</p>
      <p class="address">{{NotiList.reg_url}}</p>
      <div class="footer">
        <img
          ref="copy"
          class="lr back-confirm btn"
          :data-clipboard-text="NotiList.reg_url"
          @click="copy"
          id="copy_text"
          style="margin-top: 47px;"
          src="/static/images/home/btn.png"
          alt
        />
      </div>
    </div>
  </div>
</template>
<script>
import Clipboard from "clipboard";
export default {
  name: "share",
  data() {
    return {
      token: this.$store.getters.optuser.Authorization,
      NotiList: []
    };
  },
  created() {
    this.NotiData();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    NotiData() {
      var url = "user/sharePoster";
      this.$axios
        .post(url, {
          token: this.token
        })
        .then(res => {
          console.log(res);
          var that = this;
          if (res.data.status === 200) {
            that.NotiList = res.data.data;
            console.log(that.NotiList);
          } else {
            that.$toast(res.msg);
          }
        });
    },
    copy: function() {
      var _this = this;
      var clipboard = new Clipboard("#copy_text");

      clipboard.on("success", e => {
        alert("复制成功");
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        // 不支持复制
        Message({
          message: "该浏览器不支持自动复制",
          type: "warning"
        });
        // 释放内存
        clipboard.destroy();
      });
    }
  }
};
</script>
<style scoped>
.body {
  background: #f2f2f2;
      height: 100%;
}
.header {
  background: url("/static/images/home/share.png") no-repeat;
  background-size: 100% 100%;
  padding: 0 0 82px 0;
}
.header .back_info {
  font-size: 50px;
  color: #fff;
  
  padding: 10px 0 0 10px;
}
.back_info .icon{
   font-size:36px;
    font-weight:580;
}
.header_top img {
  display: block;
  width: 112px;
  height: 112px;
  border-radius: 50%;
  margin: 0 auto;
}
.header_top {
  display: flex;
  flex-direction: column;
  text-align: center;
  padding-top: 17px;
}
.photo {
  width: 100%;
}
.photo img {
  display: block;
  width: 50%;
  height: 50%;
  margin: 0 auto;
  position: relative;
  top: -52px;
}
.address {
  text-align: center;
  padding-top: 68px;
  display: block;
  margin: 0 auto;
  width: 98%;
}
.btn {
  text-align: center;
  padding: 13px 0 0 0;
}
.footer{
      background: #f2f2f2;
}
</style>