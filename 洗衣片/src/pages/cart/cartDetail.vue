<template>
  <div class="header">
  <TopHeader custom-title="商品详情" custom-fixed class="TopHeader" style="background:none">
      <i slot="backBtn" class="iconfont icon-fanhui"></i>
    </TopHeader>
    <div class="banner">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item,index) in NotList.img" :key="index">
          <img :src="item.picture" alt />
        </van-swipe-item>
      </van-swipe>
    </div>
    <p class="price">
      {{NotList.price}}
      <span>￥{{NotList.original_price}}</span>
    </p>
    <div class="detail">
      <p>{{NotList.goods_name}}</p>
    </div>
    <!-- <p class="number">销量：{{NotList.number_sales}}</p> -->
    <div class="redio" style="display:flex;justify-content: space-between;" @click="to">
      <p style="padding-left: 20px;">配送：{{data_info}}</p>
      <p style="padding-right:20px;">
        <van-icon name="arrow" />
      </p>
    </div>
    <p class="yunfei">运费：{{NotList.shipping_price}}</p>
    <div class="redio_out" style="display:flex;justify-content: space-between;" @click="togo">
      <p style="padding-left: 20px;">规格</p>
      <p ref="guige" style="padding-right: 170px;">{{guige_text}}</p>
      <p style="padding-right:20px;">
        <van-icon name="arrow" />
      </p>
    </div>
    <div class="xinzeng" @click="youhui">
      <div class="youhui">
        <p style="padding: 10px 0;">可用优惠券</p>
        <p style="padding-right: 3px;">
          <van-icon name="arrow" />
        </p>
      </div>
    </div>
    <!-- 弹窗 -->
    <div v-if="kai" class="tanchuang">
      <div class="top_tan"  @click="guangbi"></div>
      <div class="bottom_info">
        <div class="top_info">
          <p style="padding-left:10px;">规格</p>
          <p @click="guangbi" style="padding-right:10px;">
            <van-icon name="cross" />
          </p>
        </div>
        <div style="display:flex">
          <p
            class="null_info"
            v-for="(item1,index) in NoteList"
            :key="index"
            v-on:click.stop="buttonActive(index,item1.attr_name)"
            v-bind:class="{ 'btnActive':index == current}"
            style="display:flex;margin-left: 10px;"
          >{{item1.attr_name}}</p>
        </div>
        <div class="number_two">
          <p style="padding-left: 10px;" class="goumai">购买数量</p>
          <div class="add">
            <p @click="jianshao">-</p>
            <p class="one">{{goos}}</p>
            <p @click="add_info">+</p>
          </div>
        </div>
        <p class="btn_info" @click="btn">确认</p>
      </div>
    </div>
    <!-- 优惠券弹窗 -->
    <div v-if="ishui" class="tanchuang_info">
      <div class="top_tan_i"  @click="quxiao"></div>
      <div class="guding">
        <div class="guding_top">
          <p style="padding-left:43%;">优惠券</p>
          <p @click="quxiao">
            <van-icon name="cross" />
          </p>
        </div>
        <div class="user">
          <p>可使用优惠券</p>
        </div>
        <div class="liebiao" v-for="(good,index) in coupon" :key="index">
          <div class="beijing">
            <p style="padding-top: 11px;">
              ￥
              <span style="font-size: 25px;">{{good.price}}</span>
            </p>
            <h4 style="padding: 10px 0;">优惠券</h4>
          </div>
          <div class="xiangqing">
            <p style="padding: 10px 0;
    padding-left: 10px;">{{good.title}}</p>
            <div class="shijian">
              <p>{{good.start_time | formatDate}}-{{good.end_time | formatDate}}</p>
              <p @click="lingqu(good,index)" class="dianji">点击领取</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="shangpin">
      <p style="padding-left: 20px;">商品评价（{{NotList.comment_count}}）</p>
      <router-link
        style="padding-right: 20px;"
        :to="{path:'/cart/evaluate',query:{id:id,num:NotList.comment_count}}"
      >
        查看全部
        <van-icon name="arrow" size="10" />
      </router-link>
    </div>
    <!-- 评价区 -->
    <div class="pingjiaqu" v-for="(item2,index) in NotListe" :key="index">
      <div class="neirong">
        <div class="neirong_info">
          <img class="touxiang" :src="item2.avatar" alt />
          <p style="padding:0px 10px;">{{item2.realname}}</p>
          <van-rate v-model="item2.star_rating" size="12px" disabled-color="red" disabled />
          <p class="time">{{item2.add_time | formatDate}}</p>
        </div>

        <p class="time_one">{{item2.content}}</p>
        <div class="qwer">
          <div class="time_two" v-for="(xiang,xiabiao) in  item2.img" :key="xiabiao">
            <img class="tupian" v-image-preview :src="xiang" alt />
          </div>
        </div>
      </div>
    </div>
    <!-- 
      
    -->
    <!-- 产品详情 -->
    <div class="tuwen" v-if="chanping_one">
      <p class="first" @click="first">图文详情</p>
      <p class="second" @click="second">产品参数</p>
    </div>
    <div v-if="open" class="zhanshi">
      <p v-html="NotList.content">{{NotList.content}}</p>
    </div>
    <div v-if="chanping" class="tuwen">
      <p class="first_one" @click="first">图文详情</p>
      <p class="second_one" @click="second">产品参数</p>
    </div>
    <div v-if="open_en" class="zhanshi">
      <p v-html="NotList.content_param">{{NotList.content_param}}</p>
    </div>
    <div class="cart">
      <p style="background:#6eb92b" @click="add">加入购物车</p>
      <p style="background:#2b883a" @click="gobuy">立即购买</p>
    </div>
  </div>
</template>
<script>
import TopHeader from "@/pages/common/header/TopHeader";
import { Sku } from "vant";
import Vue from "vue";
import { Toast } from "vant";

Vue.use(Toast);
export default {
  name: "cartDetail",
  components: {
    TopHeader
  },
  data() {
    return {
      value: 0,
      data_info: "",
      list: [],
      current: 0,
      delOrCopyShow: false,
      copyFinshShow: false,
      delLayerShow: false,
      chanping_one: true,
      chanping: false,
      goos: "1",
      kai: false,
      open: true,
      open_en: false,
      token: this.$store.getters.optuser.Authorization,
      id: this.$route.query.id,
      NotList: [],
      page: 1,
      NotListe: [],
      guige_text: "",
      xixi: "",
      NoteList: [],
      NotListe1: [],
      upLoading: true,
      arr: [],
      ssss: [],
      moren: "默认昵称",
      ishui: false,
      coupon:[],
      id_info:''
    };
  },
  created() {
    this.NotData();
    this.NoteData();
    this.peisong();
  },
  methods: {
    lingqu(good,index){
       var url = "Coupon/get_coupon";
      this.$axios
        .post(url, {
          token: this.token,
          coupon_id:good.coupon_id
        })
        .then(res => {
             this.$toast(res.data.msg);
             console.log(res.data.msg,'sdsasa')
        });
    },
    back() {
      this.$router.go(-1);
    },
    youhui() {
      this.ishui = true;
    },
    quxiao() {
      this.ishui = false;
    },
    // 立即购买
    gobuy() {
      var url = "Cart/addCart";
      if (this.guige_text === "") {
        this.$toast("请填写规格");
      } else {
        this.$axios
          .post(url, {
            cart_number: this.goos,
            token: this.token,
            sku_id: this.NoteList[0].sku_id
          })
          .then(res => {
            console.log(res);
            var that = this;
            if (res.data.status === 200) {
              // this.$router.push('/order/sumitOrder')
              // 获取token
              var token = localStorage.getItem("Authorization");
              console.log(token);
              var url = "cart/cartlist";
              this.$axios
                .post(url, {
                  token: token
                })
                .then(res => {
                  console.log(res);
                  this.data = res.data.data;
                  console.log(this.data, "567");
                  if (res.data.status === 200) {
                    console.log(res.data.data[0].cart_id, "liebian");
                    var cart_id = res.data.data[0].cart_id;
                    localStorage.setItem("cart_id", cart_id);
                    this.$router.push(
                      "/order/sumitOrder?id=" + this.$route.query.id
                    );
                  } else {
                    // that.$toast(res.msg);
                    console.log("获取购物车列表失败");
                  }
                });
            } else {
            }
          });
      }
    },
    buttonActive: function(index, val) {
      this.current = index;
      this.xixi = val;
      //alert(index);
      console.log(this.xixi, "123");
      this.delOrCopyShow = false; //点击完以后包含复制和删除选项的弹窗消失
      if (index === 0) {
        //通过判断index来指定要出现的layer
        this.copyFinshShow = true; //截图中红色框出现
      } else if (index === 1) {
        this.delLayerShow = true; //截图中灰色框出现
      }
    },
    to() {
      this.$router.push("/users/address/Address");
    },
    //地址
    peisong() {
      var url = "Address/addressList";
      this.$axios
        .post(url, {
          token: this.token
        })
        .then(res => {
          console.log(res, "123465");
          var that = this;
          if (res.data.status === 200) {
            that.NotListe1 = res.data.data;
            that.data_info =
              that.NotListe1[0].p_cn +
              that.NotListe1[0].c_cn +
              that.NotListe1[0].d_cn;
            console.log(that.data_info);
            console.log(that.NotListe1, "123");
          } else {
          }
        });
    },
    // 加入购物车add_cart
    add() {
      var url = "Cart/addCart";
      if (this.guige_text === "") {
        this.$toast("请填写规格");
      } else {
        this.$axios
          .post(url, {
            cart_number: this.goos,
            token: this.token,
            sku_id: this.NoteList[0].sku_id
          })
          .then(res => {
            console.log(res);
            var that = this;
            if (res.data.status === 200) {
              // this.$router.push('/cart/Cart')
              Toast.success("加入购物车成功");
            } else {
            }
          });
      }
    },
    first() {
      this.open = true;
      this.open_en = false;
      this.chanping_one = true;
      this.chanping = false;
    },
    second() {
      this.open = false;
      this.open_en = true;
      this.chanping_one = false;
      this.chanping = true;
    },
    NotData() {
      var url = "goods/goodsDetail";
      this.$axios
        .post(url, {
          goods_id: this.id,
          token: this.token
        })
        .then(res => {
          console.log(res, "66");
          var that = this;
          if (res.data.status === 200) {
            that.NotList = res.data.data;
            that.NoteList = res.data.data.productSku;
            that.coupon = res.data.data.coupon;
            console.log( that.coupon,'sadsadaddsa')
            that.xixi = that.NotList.spec.goods_sku[0].attr_name;
            that.guige_text = that.NotList.spec.goods_sku[0].attr_name;
            console.log(that.NoteList, "123");
            // 获取sku_id;
            // var sss=[]
            // console.log(that.NotList.spec.goods_sku[0].sku_id, "2655242");
            // console.log(that.NotList.spec.goods_sku[0].length, "length");
            // for(var i=0;that.NotList.spec.goods_sku.length;i++){
            //// sku.push(that.NotList.spec.goods_sku[i].sku_id)

            // }

            // console.log(sss, "333");
          } else {
            that.$toast(res.msg);
          }
        });
    },
    NoteData() {
      var url = "Goods/comment_list";
      let that = this;
      that.$axios
        .post(url, {
          goods_id: that.id,
          token: that.token,
          page: that.page,
          pageSize: 1
        })
        .then(res => {
          console.log(res, "123");
          if (res.data.status === 1) {
            that.NotListe = res.data.data;
            console.log(that.NotListe, "123456wqr");
            for (var a = 0; a < that.NotListe.length; a++) {
              if (that.NotListe[a].realname === null) {
                that.NotListe[a].realname = this.moren;
              }
            }
          } else {
          }
        });

      // window.onscroll = function() {
      //   // scrollTop 滚动条滚动时，距离顶部的距离
      //   var scrollTop =
      //     document.documentElement.scrollTop || document.body.scrollTop;
      //   // windowHeight 可视区的高度
      //   var windowHeight =
      //     document.documentElement.clientHeight || document.body.clientHeight;
      //   // scrollHeight 滚动条的总高度
      //   var scrollHeight =
      //     document.documentElement.scrollHeight || document.body.scrollHeight;
      //   // 滚动条到底部的条件
      //   if (scrollTop + windowHeight == scrollHeight) {
      //     if (that.upLoading === true) {
      //       // 加载数据
      //       that.upLoading = false;
      //       that.page++;
      //       console.log(that.page);
      //       that.$axios
      //         .post(url, {
      //           goods_id: that.id,
      //           token: that.token,
      //           page: that.page,
      //           pageSize: 3
      //         })
      //         .then(res => {
      //           if (res.data.status === 1) {
      //             if (res.data.data.length > 0) {
      //               for (var i = 0; i < res.data.data.length; i++) {

      //                 that.NotListe.push(res.data.data[i]);

      //               }
      //               console.log(that.NotListe,'wqert');
      //               that.upLoading = true;
      //             } else {
      //               that.upLoading = false;
      //             }
      //           } else {
      //           }
      //         });
      //     }
      //   }
      // };
    },

    togo() {
      this.kai = true;
    },
    guangbi() {
      this.kai = false;
    },
    btn() {
      this.kai = false;
      this.guige_text = this.xixi;
    },
    jianshao() {
      var val = parseInt(this.goos) - 1;
      if (val <= 1) {
        val = 1;
      }
      this.goos = val;
    },
    add_info() {
      var val = parseInt(this.goos) + 1;
      this.goos = val;
      console.log(this.goos);
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

      return y + "." + MM + "." + d;
    }
  }
};
</script>
<style scoped>
.toubu {
  display: flex;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  font-size: 30px;
  width: 100%;
  padding: 20px 0;
}
.toubu p:nth-of-type(2){
  padding-left:158px;
}
.header {
  background: #f2f2f2;
  overflow-x: hidden;
}
.qwer {
  display: flex;
  width: 90%;
  margin: 0 auto;
  padding-bottom: 30px;
  padding-top: 20px;
}
.banner {
  width: 100%;
  background: #f2f2f2;
}
.banner img {
  display: block;
  width: 100%;
  height: 770px;
  margin: 0 auto;
}
.price {
  width: 100%;
  margin: 0 auto;
  font-size: 30px;
  color: #6eb92b;
  padding: 20px 0;
  padding-left: 40px;
  background: #fff;
}
.price span {
  color: #a9a9a9;
  font-size: 24px;
  padding-left: 10px;
  text-decoration: line-through;
}
.detail {
  width: 100%;
  margin: 0 auto;
  font-size: 30px;
  padding-bottom: 68px;
  padding-left: 40px;
  background: #fff;
}
/* .number {
  width: 100%;
  margin: 0 auto;
  font-size: 30px;
  padding: 40px 0;
  padding-left: 40px;
  background: #fff;
  margin-top: 10px;
} */
.redio_out {
  line-height: 80px;
  color: 24px;
  border-bottom: 2px solid #ebebeb;
  width: 100%;
  margin: 0 auto;

  background: #fff;
  margin-top: 10px;
}
.redio {
  line-height: 80px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  background: #fff;
  margin-top: 10px;
}
.yunfei {
  width: 100%;
  margin: 0 auto;
  font-size: 30px;
  padding: 20px 0;
  padding-left: 40px;
  background: #fff;
  margin-top: 10px;
}
.bottom_info {
  height: 42%;
  margin: 0 auto;
  position: fixed;
  background: #fff;
  bottom: 0;
  left: 0px;
  width: 100%;
}
.top_info {
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
}
.number_two {
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  font-size: 30px;
}
.add {
  width: 168px;
  display: flex;
  justify-content: space-between;
  text-align: center;
  border: 2px solid #ebebeb;
  align-items: center;
  border-radius: 22px;
  margin-right: 20px;
}
.one {
  padding: 0 40px;
  border: 2px solid #ebebeb;
}
.tanchuang {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  z-index: 1111;
}
.btn_info {
  width: 80%;
  margin: 0 auto;
  text-align: center;
  background: #2b883a;
  padding: 20px 0;
  border-radius: 34px;
  margin-top: 220px;
  color: #fff;
  margin-bottom: 40px;
}
.cart {
  display: flex;
  position: fixed;
  width: 100%;
  bottom: 0;
  z-index: 100;
  justify-content: center;
  background: #fff;
}
.cart p {
  width: 33%;
  height: 70px;
  line-height: 70px;
  text-align: center;
  border-radius: 30px;
  /* padding:  0; */
  font-size: 24px;
  display: block;
  margin: 20px 10px;
  color: #fff;
}
.cart h3 {
  width: 50%;
  text-align: center;
  background: #f2f2;
  border-radius: 30px;
  padding: 20px 0;
  font-size: 24px;
}
.shangpin {
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 20px 0 20px 0;
  background: #fff;
  margin-top: 8px;
  font-size: 24px;
}
.touxiang {
  width: 50px;
  height: 50px;
}
.neirong_info {
  display: flex;
  text-align: center;
  align-items: center;
  width: 90%;
  margin: 0 auto;
  padding: 28px 0;
}
.neirong {
  width: 90%;
  margin: 0 auto;
  background: #f2f2f2;
}
.time {
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding-left: 60px;
}
.time_one {
  width: 90%;
  margin: 0 auto;
  padding: 10px 0;
}
.tupian {
  width: 100px;
  height: 100px;
  margin-left: 20px;
}
.time_two {
  width: 90%;
  margin: 0 auto;
}
.tuwen {
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 20px 0;
}
.zhanshi {
  padding-bottom: 128px;
  width: 90%;
  margin: 0 auto;
  padding-left: 20px;
}
/* .zhanshi >>>p ul li{
  
} */

.first {
  padding: 20px 0;
  border-bottom: 4px solid red;
}
.second {
  padding: 20px 0;
}
.first_one {
  padding: 20px 0;
}
.second_one {
  padding: 20px 0;
  border-bottom: 4px solid red;
}
.null_info {
  background: #f2f2f2;
  display: inline-block;
  padding: 10px;
  color: #000;
  margin: 10px 0;
}
.btnActive {
  background-color: #2b883a;
  border-radius: 12px;
  color: #fff;
}
.pingjiaqu {
  padding-bottom: 40px;
  border-bottom: 10px solid #fff;
}
.xinzeng {
  width: 100%;
  background: #fff;
  margin-top: 10px;
  margin-bottom: 10px;
}
.youhui {
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;
  align-items: center;
}
.tanchuang_info {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  z-index: 1111;
}
.guding {
  height: 42%;
  margin: 0 auto;
  position: fixed;
  background: #fff;
  bottom: 0;
  left: 0;
  width: 100%;
}
.guding_top {
  display: flex;
  width: 90%;
  margin: 0 auto;
  justify-content: space-between;
  padding: 20px 0;
  font-size: 30px;
}
.user {
  width: 98%;
  margin: 0 auto;
  padding-bottom: 20px;
}
.liebiao {
  width: 98%;
  margin: 0 auto;
  display: flex;
  margin-bottom: 20px;
}
.beijing {
  width: 40%;
  text-align: center;
  background: #2b883a;
  color: #fff;
}
.xiangqing {
  width: 60%;
}
.shijian {
  display: flex;
  justify-content: space-between;
  width: 92%;
  padding-top: 40px;
  padding-left: 20px;
  align-items: center;
}
.dianji {
  background: #2b883a;
  border-radius: 24px;
  padding: 10px;
  color: #fff;
}

/* 弹窗上层背景 */
.tanchuang .top_tan,.tanchuang_info .top_tan_i{
    position: absolute;
    height: 58%;
    width: 100%;
}

</style>