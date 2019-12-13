<template>
  <div class="body">
    <div class="dingdan">
      <div class="heade">
        <p @click="back">
          <van-icon name="arrow-left" class="icon" />
        </p>
        <p style="padding-left:40%;font-size:15px;">订单明细</p>
      </div>
      <div class="header_top">
        <p class="header" @click="quanbu">全部</p>
        <p class="header" @click="fukuan">待付款</p>
        <p class="header" @click="fahuo">待发货</p>
        <p class="header" @click="shouhuo">待收货</p>
        <p
          class="header"
          style="border-bottom: 2px solid #2b883a;color:#2b883a"
          @click="pingjia"
        >待评价</p>
      </div>
       <div style="margin-bottom: 49px;">
      <div v-for="(item,index) in NotList" :key="index" class="content">
        <div class="content_top">
          <p>{{item.add_time | formatDate}}</p>
          <p v-if="item.status===1">待付款</p>
          <p v-if="item.status===2">待发货</p>
          <p v-if="item.status===3">待收货</p>
          <p v-if="item.status===4">交易成功（待评价）</p>
          <p v-if="item.status===5">已取消</p>
          <p v-if="item.status===6">待退款</p>
          <p v-if="item.status===7">已退款</p>
          <p v-if="item.status===8">拒绝退款</p>
        </div>
        <div class="content_bottom" v-for="(item1,index) in NotiList" :key="index">
          <img :src="item1.img" alt />
          <div style="width: 70%;" class="right">
            <p>{{item1.goods_name}}</p>
            <div class="right_one">
              <p>{{item1.spec_key_name}}</p>
              <span>￥{{item.goods_price}}</span>
            </div>
            <h2>
              共 {{item.goods_num}}件商品 合计：￥
              <i style="color:#2b883a;">{{item.order_amount}}</i>
            </h2>
            <div class="btn">
              <router-link
                tag="p"
                :to="{path:'/order/LogisticsDetail',query:{order_id:item.order_id}}"
              >查看物流</router-link>
              <router-link
                tag="p"
                style="color:#2b883a;border:1px solid #2b883a;"
                :to="{path:'/order/Evaluate',query:{pay_type:item.pay_type,order_id:item.order_id,goods_id:item1.goods_id}}"
              >去评价</router-link>
            </div>
          </div>
        </div>
      </div>
       </div>
      <div class="wu" v-show="isShow">
        <img src="/static/images/order/wu.png" alt />
        <p style="margin-top: 10px;">暂无订单</p>
      </div>
    </div>
    <Navigate></Navigate>
  </div>
</template>
<script>
import Navigate from "@/pages/common/footer/Navigate";
export default {
  name: "Order4",
  components: {Navigate},
  data() {
    return {
      token: this.$store.getters.optuser.Authorization,
      page: 1,
      type: "dpj",
      NotList: [],
      NotiList: [],
      isShow: false,
      upLoading:false
    };
  },
  created() {
    this.NotData();
    this.$store.commit("showLoading");
  },
  methods: {
    quanbu() {
      this.$router.push({ path: "/order/Order", name: "Order" });
    },
    fukuan() {
      this.$router.push({ path: "/order/Order1", name: "Order1" });
    },
    fahuo() {
      this.$router.push({ path: "/order/Order2", name: "Order2" });
    },
    shouhuo() {
      this.$router.push({ path: "/order/Order3", name: "Order3" });
    },
    pingjia() {
      this.$router.push({ path: "/order/Order4", name: "Order4" });
    },
    back() {
      this.$router.push({ path: "/users/User", name: "User" });
    },
     NotData() {
      var url = "order/order_list";
       var that = this;
      this.$axios
        .post(url, {
          token: this.token,
          page: this.page,
          type: this.type,
          pageSize: 6
        })
        .then(res => {
          console.log(res);
         
          if (res.data.status === 200) {
            that.NotList = res.data.data;
            console.log(that.NotList,'adssadqweqwewqsdasd')
            this.$store.commit("hideLoading");
            if (that.NotList.length === 0) {
              this.isShow = true;
            } else {
              this.isShow = false;
            }
            for (var i = 0; i < that.NotList.length; i++) {
              that.NotiList = that.NotList[i].goods;
              console.log(that.NotiList,'asdqwewqew')
            }
          } else {
            that.$toast(res.msg);
          }
        });
      window.onscroll = function() {
        // scrollTop 滚动条滚动时，距离顶部的距离
        var scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        // windowHeight 可视区的高度
        var windowHeight =
          document.documentElement.clientHeight || document.body.clientHeight;
        // scrollHeight 滚动条的总高度
        var scrollHeight =
          document.documentElement.scrollHeight || document.body.scrollHeight;
        // 滚动条到底部的条件
        if (scrollTop + windowHeight == scrollHeight) {
          if (that.upLoading === true) {
            // 加载数据
            that.upLoading = false;
            that.page++;
            console.log(that.page);
            that.$axios
              .post(url, {
                type: that.type,
                token: that.token,
                page: that.page,
                pageSize: 6
              })
              .then(res => {
                if (res.data.status === 200) {
                  if (res.data.data.length > 0) {
                    for (var i = 0; i < res.data.data.length; i++) { 
                      that.NotList.push(res.data.data[i]); 
                    }
                    console.log(that.NotList,'wqert');
                    that.upLoading = true;
                  } else {
                    that.upLoading = false;
                  }
                } else {
                }
              });
          }
        }
      };
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

      return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
    }
  }
};
</script>
<style scoped>
.body {
  background: #f2f2f2;
  height: 100%;
}
.dingdan {
  background: #f2f2f2;
  padding-bottom: 120px;
}
.heade {
  display: flex;
  font-size: 20px;
  background: #fff;
  align-items: center;
  height: 88px;
  font-size: 15px;
  box-sizing: border-box;
  padding: 0 10px;
}
.heade p .icon{
  font-size:36px;
    font-weight:580;
}
.header_top {
  display: flex;
  justify-content: space-around;
  background: #fff;
  border-top: 2px solid #f2f2f2;
}
.header {
  line-height: 46px;
}
.content {
  width: 94%;
  margin: 0 auto;
  width: 94%;
  margin: 0 auto;
  border-radius: 20px;
  margin-top: 20px;
  background: #fff;
}
.content_top {
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #f2f2f2;
  width: 94%;
  margin: 0 auto;
  line-height: 60px;
}
.content_bottom {
  width: 94%;
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
.content_top p {
  color: #2b883a;
}
.content_top p:nth-child(1) {
  color: #000000;
}
.content_bottom img {
  display: block;
  width: 159px;
  height: 159px;
}
.right p {
  font-size: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.right_one {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.right h2 {
  font-size: 24px;
  margin-top: 70px;
  padding-bottom: 20px;
}
.btn {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}
.btn p {
  padding: 8px 18px;
  border: 2px solid #888888;
  border-radius: 20px;
  text-align: center;
  margin-right: 20px;
  color: #888888;
}
.wu img {
  margin: 0 auto;
  display: block;
  margin-top: 180px;
}
.wu {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>