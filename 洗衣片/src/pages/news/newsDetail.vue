<template>
  <div>
    <div class="header">
      <span @click="btn"><van-icon name="arrow-left" color="#fff" class="icon"/></span>
      <p>详情</p>
    </div>
    <div class="list">
      <div class="content_top">
        <p>{{NotList.title}}</p>
        <span>{{NotList.create_time | formatDate}}</span>
      </div>
      <div class="content_info">
        <p v-html="NotList.desc">{{NotList.desc}}</p>
      </div>
      <div class="banner">
        <img :src="NotList.pic_url" alt />
      </div>
      <div class="content_bottom"></div>
      <div class="footer"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "newsDetail",
  data() {
    return {
      id: this.$route.query.id,
      NotList: ""
    };
  },
  created() {
    this.NotData();
  },
  methods: {
    btn() {
      this.$router.push({
        path: "/news/newsList",
        name: "newsList"
      });
    },
    NotData() {
      var url = "announce/details";
      this.$axios
        .post(url, {
          id: this.id
        })
        .then(res => {
          console.log(res);
          var that = this;
          if (res.data.status === 200) {
            that.NotList = res.data.date;
          } else {
            that.$toast(res.msg);
          }
        });
    }
  },
  filters: {
    // 日期格式化
    formatDate: function(time) {
      let date = new Date(time * 1000);
      let y = date.getFullYear();

      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;

      let d = date.getDate();
      d = d < 10 ? "0" + d : d;

      let h = date.getHours();
      h = h < 10 ? "0" + h : h;

      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;

      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;

      return y + "-" + MM + "-" + d;
    }
  }
};
</script>
<style scoped>
.header {
  width: 100%;
  background: url("/static/images/funs/banner_funs.png") no-repeat;
  background-size: 100% 100%;
  text-align: center;
  position: relative;
  padding-bottom: 148px;
}
.header p {
  text-align: center;
  font-size: 30px;
  color: #ffffff;
  position: absolute;
  top: 26px;
  left: 48%;
}
.list {
  background: #fff;
  width: 94%;
  margin: 0 auto;
  position: relative;
  top: -54px;
  border-radius: 22px;
}
.header span {
  position: absolute;
  left: 0;
  top: 26px;
  font-size: 30px;
  color: #fff;
}
.header span .icon{
   font-size:36px;
    font-weight:580;
    margin-left: 10px;
}
.content_top {
  width: 100%;
  text-align: center;
  padding-top: 30px;
  padding-bottom: 40px;
}
.content_top p {
  padding-bottom: 24px;
  font-size: 30px;
}
.content_info {
  width: 94%;
  margin: 0 auto;
  padding-bottom: 52px;
}
.content_info p {
  line-height: 36px;
}
.content_info p  >>>p span{
  display: block;
  font-size: 22px!important;
  width: 310px;
  height: 150px;
  margin:  0 0  0 350px;
  box-sizing: border-box;
  text-align: center;
}
.banner {
  width: 94%;
  margin: 0 auto;
  padding-bottom: 30px;
}
.banner img {
  width: 100%;
}
.content_bottom {
  width: 94%;
  margin: 0 auto;
}
.content_bottom p {
  line-height: 36px;
}
.footer {
  width: 94%;
  margin: 0 auto;
  margin-top: 218px;
}
.footer p {
  float: right;
}
</style>