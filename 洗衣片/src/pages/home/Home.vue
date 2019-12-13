<template>
  <div class="body">
    <div class="top-bar">
      <div class="search" @click.stop="jumpTo('/search/Search')">
        <span class="search-icon"></span>
        <span class="text">搜索</span>
      </div>
    </div>
    <div id="home">
      <!-- 轮播图 -->
      <div class="banner">
        <van-swipe :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(item,index) in bannerData" :key="index" @change="cause1Change">
            <img :src="baseUrl+item.picture" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <!-- 分类 -->
      <div class="classification">
        <div class="classif_info">
          <ul class="money_info">
            <li class="seckill" @click="hongbao">
              <img src="/static/images/home/hongbao.png" />
              <p>红包</p>
            </li>
            <li class="seckill" @click="pintuan">
              <img src="/static/images/home/pintuan.png" />
              <p>拼团</p>
            </li>
            <li class="seckill" @click="miaosha">
              <img src="/static/images/home/miaosha.png" />
              <p>秒杀</p>
            </li>
            <li class="seckill" @click="dingdan">
              <img src="/static/images/home/dingdan.png" />
              <p>订单</p>
            </li>
          </ul>
          <ul class="money_info">
            <li class="seckill" @click="download">
              <img src="/static/images/home/APP.png" />
              <p>App下载</p>
            </li>
            <li class="seckill" @click="sucai">
              <img src="/static/images/home/sucai.png" />
              <p>素材区</p>
            </li>
            <li class="seckill" @click="fenlei">
              <img src="/static/images/home/fenlei.png" />
              <p>分类</p>
            </li>
            <li class="seckill" @click="fenxiang">
              <img src="/static/images/home/fenxiang.png" />
              <p>分享</p>
            </li>
          </ul>
        </div>
      </div>

      <!-- 公告 -->
      <div class="notice">
        <router-link
          class="length"
          :to="{path:'/notice/NoticeDetails',query:{id:noticeData.id}}"
          tag="div"
        >
          <van-notice-bar
            :text="noticeData.title"
            left-icon="volume-o"
            size="12"
            color="#000"
            background="#fff"
            style="padding: 5px 6px;"
          />
        </router-link>
        <router-link class="more" to="/notice/NoticeList" tag="div">更多</router-link>
      </div>
      <div class="footer">
        <router-link
          tag="div"
          :to="{path:'/cart/cartDetail',query:{id:goods_gift.goods_id}}"
          class="pinpai"
        >
          <p style="padding:10px 0;">礼包产品</p>
          <img :src="goods_gift.img" alt />
          <span style="padding-left: 10px;">{{goods_gift.goods_name}}</span>
          <h2 style="padding-left: 10px;">￥{{goods_gift.price}}</h2>
          <h3 style="padding-left: 10px;">原价:￥{{goods_gift.original_price}}</h3>
        </router-link>
        
        <div class="gushi">
          <p style="padding:10px 0;">品牌故事</p>
          <img :src="brand_story.pic_url" alt />
        </div>
      </div>
      <div class="btn">
        <router-link tag="p" :to="{path:'/cart/cartDetail',query:{id:goods_gift.goods_id}}">立即购买</router-link>
        <router-link tag="p" :to="{path:'/gushi/guShi',query:{id:brand_story.id}}">阅读文章</router-link>
      </div>
    </div>
    <Navigate></Navigate>
  </div>
</template>
<script>
import Navigate from "@/pages/common/footer/Navigate";
import { jumpTo } from "../../../static/js/public";
import { Dialog } from "vant";
export default {
  name: "home",
  components: {
    Navigate
  },
  data() {
    return {
      baseUrl: "",
      bannerData: [],
      noticeData: [],
      goods_gift: "",
      brand_story: "",
      token: this.$store.getters.optuser.Authorization
    };
  },
  created() {
    this.requestData();
    this.cause1Change();
  },
  methods: {
    dingdan() {
      this.$router.push({ path: "order/Order", name: "Order" });
    },
    download() {
      this.$router.push({ path: "/download/detail", name: "detail" });
    },
    hongbao() {
      Dialog.alert({
        title: "",
        message: "暂未开放"
      }).then(() => {
        // on close
      });
    },
    pintuan() {
      Dialog.alert({
        title: "",
        message: "暂未开放"
      }).then(() => {
        // on close
      });
    },
    miaosha() {
      Dialog.alert({
        title: "",
        message: "暂未开放"
      }).then(() => {
        // on close
      });
    },
    sucai() {
      Dialog.alert({
        title: "",
        message: "暂未开放"
      }).then(() => {
        // on close
      });
    },
    fenlei() {
      Dialog.alert({
        title: "",
        message: "暂未开放"
      }).then(() => {
        // on close
      });
    },
    fenxiang() {
      this.$router.push({ path: "/users/share", name: "share" });
    },
    cause1Change(val) {
      console.log(123, val);
    },
    requestData() {
      let url = "index/index";
      this.$axios
        .post(url)
        .then(res => {
          console.log(res);
          if (res.data.status === 200) {
            this.bannerData = res.data.data.banners;
            this.noticeData = res.data.data.announce;
            this.goods_gift = res.data.data.goods_gift;
            this.brand_story = res.data.data.brand_story;
          } else if (res.data.status == 999) {
            this.$store.commit("del_token"); //清除token
            setTimeout(() => {
              this.$router.push("/Login");
            }, 1000);
          } else {
            this.$toast(res.data.msg);
          }
        })
        .catch(error => {
          alert("请求错误:" + error);
        });
    },
    /**
     * 路由跳转
     */
    jumpTo(path, name, id) {
      // 商品路由跳转
      if (path && name && id) {
        this.$router.push(path + "?" + name + "=" + id);
        return false;
      }
      // 跳转指定路由
      if (path && !name && !id) {
        this.$router.push(path);
        return false;
      }
      //后退
      else {
        this.$router.go(-1);
      }
    }

    // jumpTo(path,name,id){
    // 	jumpTo(path,name,id);
    // },
  },
  computed: {
    // 过滤公告列表
    filterNotice() {
      return this.noticeData.slice(0, 1);
    }
  }
};
</script>
<style scoped>
.body {
  background: #6eb92b;
  height: 100%;
  /* margin: 0 0 100px 0; */
}
.footer {
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-evenly;
  background: #6eb92b;
  box-sizing: border-box;
  margin-top: -8px;
}
.pinpai,
.gushi {
  width: 47%;
  background: #fff;
  border-radius: 12px;
}
.pinpai p {
  text-align: center;
}
.pinpai img {
  /* width: 86%;
     height: 162px; */
  transform: scale(0.8);
  margin: -30px 0 -30px 0;
}
.pinpai span {
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 168px;
}
.pinpai h2 {
  color: #6eb92b;
  font-size: 15px;
}
.pinpai h3 {
  text-decoration: line-through;
  font-size: 12px;
  margin-bottom: 5px;
}
/* {
  width: 45%;
  background: #fff;
    border-radius: 12px;
} */
.gushi p {
  text-align: center;
}
.gushi img {
  /* width: 86%;
  height: 270px; */
  transform: scale(0.8);
}
.btn {
  width: 100%;
  margin: 0 auto 100px auto;
  display: flex;
  justify-content: space-around;
  padding: 22px 0;
  background: #6eb92b;
}
.btn p {
  width: 312px;
  height: 76px;
  background: #fed300;
  border-radius: 38px;
  text-align: center;
  line-height: 76px;
  color: #2b883a;
}
#home {
  width: 100%;
  position: relative;
  left: 0;
  margin-top: 75px;
  float: left;
}

.banner {
  width: 100%;
  /* margin-top: 168px; */
  background: #fff;
}
img {
  display: block;
  width: 100%;
  margin: 0 auto;
  height: 354px;
}
.notice {
  position: relative;
  padding: 24px 0;
}
.notice .van-notice-bar {
  height: 40px;
}
.van-notice-bar >>> .van-icon {
  width: 23px;
  height: 34px;
  background: url("/static/images/home/notice-icon.png") no-repeat;
  background-size: 100%;
  margin-right: 20px;
}
.van-notice-bar >>> .van-icon-volume-o:before {
  content: "";
}
.van-notice-bar >>> .van-notice-bar__left-icon,
.van-notice-bar__right-icon {
  min-width: 33px;
}
.more {
  padding: 20px 3% 0 0px;
  position: absolute;
  right: 2%;
  top: 12%;
  color: #fff;
  line-height: 40px;
  color: #000;
}
.length {
  width: 95%;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 12px;
}
.introduce {
  width: 100%;
  margin-top: 42px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.introduce p {
  font-size: 34px;
  display: block;
  color: #000;
}
.left {
  display: block;
  width: 80px;
  height: 4px;
  background: #bfbfbf;
  position: relative;
  right: -20%;
}
.right {
  display: block;
  width: 80px;
  height: 4px;
  background: #bfbfbf;
  position: relative;
  left: -20%;
}
.shopDetail {
  width: 90%;
  border: 4px solid #ebebeb;
  margin: 0 auto;
  padding-bottom: 48px;
}
.shopDetail img {
  display: block;
  width: 100%;
  height: 527px;
}
.content {
  margin-top: 28px;
  font-size: 24px;
  text-decoration: underline;
}
.shopPrice {
  display: flex;
  margin-top: 20px;
  align-items: center;
}
.price {
  color: red;
  font-size: 30px;
}
.old_price {
  color: #666666;
  font-size: 24px;
  margin-left: 24px;
  text-decoration: line-through;
}
.submit {
  display: block;
  width: 90%;
  height: 88px;
  margin-top: 40px;
  background: linear-gradient(#cec8f5, #a1baeb, #80b1e3);
  margin-left: 24px;
  border-radius: 40px;
  border: none;
}
.classification {
  background: #fff;
}
.classif_info {
  width: 100%;
}
.money_info {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.seckill {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 0;
}
.seckill img {
  width: 94px;
  height: 94px;
  margin-bottom: 22px;
}
.top-bar {
  width: 100%;
  height: 76px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9;
}
.search {
  width: 89%;
  height: 60px;
  line-height: 60px;
  display: block;
  text-align: center;
  margin: 0 auto;
  background-color: #e5e5e5;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.search-icon {
  width: 26px;
  height: 24px;
  background: url(/static/images/home/search-icon.png) no-repeat;
  background-size: 100%;
  margin-right: 10px;
}
.text {
  color: #a7a7a7;
  font-size: 28px;
}
</style>