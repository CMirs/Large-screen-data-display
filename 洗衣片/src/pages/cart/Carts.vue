<template>
  <div style="height:100%">
    <div class="cart_one" ref="one">
      <header>
        购物车
        <span @click="dels">管理</span>
      </header>
      <div class="container">
        <div class="c_content">
          <div class="shop" v-for="(good,idx) in data" :key="idx" >
            <div class="Checklist">
              <div class="L_anniu">
                <div
                  class="I_anniu"
                  @click="suan(good,idx)"
                  :style="{background: good.selected ? '#2b883a' : '0'}"
                ></div>
              </div>
            </div>

            <div class="shop_right">
              <div class="shopImg">
                <img :src="good.img" alt />
              </div>
              <div class="discribe">
                <div class="p ellipsis">
                  <p>{{good.goods_name}}</p>
                </div>
                <span>{{good.spec_key_name}}</span>
                <div class="price" >￥{{good.subtotal_price}}</div>
              </div>
              <div class="num">
                <span
                  @click="reduce(good, idx)"
                  :style="{ opcity:good.goods_num <= 1 ? '.3' :'1' }"
                >-</span>
                <input class="nums" type="text" v-model="good.goods_num" />
                <span @click="add(good, idx)" ref="jia">+</span>
              </div>
            </div>
          </div>
          <!-- <div class="shop">
        <div class="Checklist">
          <div class="L_anniu">
            <div class="I_anniu show"></div>
          </div>
        </div>

        <div class="shop_right">
          <div class="shopImg">
            <img src="../../../static/images/cart/cart02.jpg" alt />
          </div>
          <div class="discribe">
            <div class="p ellipsis">
              <p>洗衣片官网正品商品商品商品商品商品商品商品商品商品</p>
            </div>
            <span>商品规格</span>
            <div class="price" >￥888.00</div>
          </div>
          <div class="num">
            <span>-</span>
            <input class="nums" type="text" value />
            <span>+</span>
          </div>
        </div>
          </div>-->
          <div class="total">
            <div class="whole">
              <div class="L_anniu" style="margin:0 4px 0 22px;">
                <div
                  class="I_anniu show"
                  :style="{background:checked ? '#2b883a' : '#fff'}"
                  @click="quan"
                ></div>
              </div>
              <span>全选</span>
            </div>
            <div class="zoji">
              总计：
              <span style="color:#2b883a;" class="t_total">￥{{ total }}</span>
            </div>
            <div class="jiesuan">
              <van-button
                style="margin-top: 5px;background:#90a8c0;display:none;"
                size="small"
                @click="cancel"
                ref="quxiao"
              >取消</van-button>
              <div class="c_comit" ref="jiesuan" @click="jiesuan">结算</div>
              <div class="c_comit" ref="del" @click="shanchu" style="display:none">删除</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="cart_one" ref="kon" style="display:none">
      <header class="k_header">购物车</header>
      <div class="k_content">
        <div class="gobuy" @click="gobuy">去逛逛</div>

        <!-- <Tavigate></Tavigate> -->
      </div>
    </div>
    <Tavigate></Tavigate>
    <!-- <emptyCart ></emptyCart> -->
  </div>

</template>
<script>
import Tavigate from "@/pages/common/footer/Navigate";
import emptyCart from "@/pages/cart/Cart.vue";
import { Dialog, Toast } from "vant";

export default {
  // inject:["reload"],
  name:'Carts',
  data() {
    return {
      menuTree:[],
      checked: false,
      data: [
        
        // {
        //   cart_id: 12,
        //   selected: 0,
        //   user_id: 50,
        //   groupon_id: 0,
        //   goods_id: 37,
        //   goods_sn: "",
        //   goods_name: "美的（Midea） 11",
        //   market_price: "2500.00",
        //   goods_price: "1999.00",
        //   member_goods_price: "1999.00",
        //   subtotal_price: "3998.00",
        //   sku_id: 20,
        //   goods_num: 2,
        //   spec_key_name: "规格:默认,颜色:阳光米",
        //   img: "goods/20190527155893788170725.png"
        // },
   
      ]
    };
  },
  created() {
    this.NotData();
  },
  computed: {
    // 动态计算价格改变
    total() {
      let total = 0;
      this.data.forEach(good => {
        if (good.selected) {
          total += +good.subtotal_price;
        }
      });
      return total.toFixed(2);
    }
  },
  name: "Cart",
  components: {
    Tavigate,
    emptyCart
  },
  methods: {
    NotData() {
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
            //  当购物车为空的时候显示去逛逛
            console.log(res.data.data);
            if (this.data.length===0) {
              this.$refs.one.style = "display:none";
              this.$refs.kon.style = "display:block";
            }
          } else {
            that.$toast(res.msg);
          }
        });
    },
    // 去逛逛
    gobuy(){
      this.$router.push("/Home");
    },
    // 减
    reduce(good, index) {
      console.log(good);
      // 单价
      // let dan = good.goods_price / good.goods_num;
      // console.log(dan);
      if (good.goods_num > 1) {
        good.goods_num--;
        good.subtotal_price = +good.subtotal_price - good.goods_price*1;

        // ajax
        // good.goods_price = +good.goods_price + dan; // 因为拿到的数据是字符串，所以需要加加号是转换为数字类型
        var token = localStorage.getItem("Authorization");
        console.log(token);
        var url = "Cart/addCart";
        this.$axios
          .post(url, {
            token: token,
            sku_id: good.sku_id,
            cart_number: good.goods_num
          })
          .then(res => {
            console.log(res);
            var that = this;
            if (res.data.status === 200) {
              console.log(res, "-success");
             
            } else {
              that.$toast(res.msg);
            }
          });
      }
    },
    // 加
    add(good, index) {
      // let dan =good.subtotal_price / good.goods_num;
     
      // console.log(dan,"danjia");
      good.goods_num++;
// console.log(good.goods_price);
      good.subtotal_price = +good.subtotal_price + good.goods_price*1; // 因为拿到的数据是字符串，所以需要加加号是转换为数字类型
      
      console.log(good.subtotal_price,"zojia")
      // sum.toFixed(2)
      // good.goods_price=sum
      var token = localStorage.getItem("Authorization");
      // console.log(token);
      var url = "Cart/addCart";
      this.$axios
        .post(url, {
          token: token,
          sku_id: good.sku_id,
          cart_number: good.goods_num
        })
        .then(res => {
          console.log(res);
          var that = this;
          if (res.data.status === 200) {
            console.log(res, "+success");
            // if (res.data.data.length === 0) {
            //   this.$refs.one.style = "display:none";
            //   this.$refs.empty.style = "display:block";
            // }
          } else {
            that.$toast(res.msg);
          }
        });
    },

    suan(good, index) {
      // 先判断状态，状态改变后再遍历选中状态
      if (good.selected) {
        console.log(good.selected);
        good.selected = 0;
      } else {
        console.log(good.selected);
        good.selected = 1;
      }
      let nums = 0;
      this.data.forEach((goods, index) => {
        if (+goods.selected) {
          nums++;
        }
      });
      if (nums === this.data.length) {
        this.checked = true;
      } else {
        this.checked = false;
      }
      console.log(nums, "nums");
    },
    quan() {
      this.data.forEach((good, index) => {
        console.log(good, "good");
        console.log(this.checked);
        good.selected = this.checked ? 0 : 1;
      });
      this.checked = !this.checked;
    },
    dels() {
      this.$refs.jiesuan.style = "display:none";
      this.$refs.del.style = "display:block";
      this.$refs.quxiao.style =
        "margin-top: 5px;background:#90a8c0;display:block";
    },
    cancel() {
      this.$refs.jiesuan.style = "display:block";
      this.$refs.del.style = "display:none";
      this.$refs.quxiao.style =
        "margin-top: 5px;background:#90a8c0;display:none";
    },
    jiesuan() {
      // 获取选中的商品
      let suanzho = [];
      this.data.forEach((good, index) => {
        // console.log(good.selected,"222")
        if (good.selected == 1) {
          console.log(good.cart_id, "id");
          suanzho.push(good.cart_id);
        }

        //
      });
      // 数组转化
      suanzho = suanzho.join(",");
      console.log(suanzho, "商品id");

      var storage = window.localStorage;
      storage.cart_id = suanzho;

      if (suanzho.length > 0) {
        const toast = Toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          loadingType: "spinner",
          message: "结算成功，正在跳转"
        });

        let second = 2;
        const timer = setInterval(() => {
          second--;
          if (second) {
            // toast.message = `倒计时 ${second} 秒`;
            this.$router.push("/order/sumitOrder");
          } else {
            clearInterval(timer);
            Toast.clear();
          }
        }, 1000);
      } else {
        Toast.success("请选着商品");
      }
    },
    shanchu() {
      Dialog.confirm({
      title: "温馨提示",
      message: "你确定要删除当前商品吗?"
    })
      .then(() => {
         // 获取选中的商品
      let suanzho = [];
      this.data.forEach((good, index) => {
        // console.log(good.selected,"222")
        if (good.selected == 1) {
          console.log(good.cart_id, "id");
          suanzho.push(good.cart_id);
        }
      });
      // 数组转化
      suanzho = suanzho.join(",");
      console.log(suanzho, "商品id");
      // 获取token
      var token = localStorage.getItem("Authorization");

      var url = "cart/delCart";
      this.$axios
        .post(url, {
          token: token,
          cart_id: suanzho
        })
        .then(res => {
          console.log(res);
          if (res.data.status === 200) {  
          
            Toast.success("操作成功");
            console.log(res, "操作成功");
              // 强制刷新
            location.reload();
          
          } else {
            Toast.success("删除失败");
          } 
        });
      })
      .catch(() => {
        // on cancel
      });
     
    }
  },
};
//
</script>
<style scoped>
.ellipsis {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

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

header span {
  font-size: 23px;
  position: absolute;
  right: 14px;
  color: #fed300;
}

.container {
  height: 100%;
  box-sizing: border-box;
  padding-top: 89px;
  /* padding-bottom:100px; */
}

.c_content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 180px;
}

.c_content .shop {
  box-sizing: border-box;
  width: 702px;
  height: 300px;
  border: 2px solid #eeeeee;
  margin-top: 30px;
  padding: 70px 0;
  display: flex;
  border-radius: 25px;
}

.shop .Checklist {
  width: 75px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.Checklist .L_anniu,
.total .whole .L_anniu {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 30px;
  border: 3px solid #eeeeee;
  border-radius: 50%;
}

.Checklist .L_anniu .I_anniu,
.total .whole .L_anniu .I_anniu {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 14px;
  width: 14px;
  border-radius: 50%;
}

.show {
  background: #2b883a;
}

.c_content .shop_right {
  position: relative;
  width: 633px;
  display: flex;
}

.shop_right .shopImg {
  width: 233px;
  height: 165px;
}

.shopImg img {
  height: 100%;
  width: 100%;
}

.shop_right .discribe {
  padding: 0 135px 0 20px;
  box-sizing: border-box;
  font-size: 24px;
  width: 400px;
  line-height: 40px;
}

.discribe > span {
  color: #666666;
}

.discribe .price {
  color: #2b883a;
}

.shop_right .num {
  position: absolute;
  right: 6px;
  bottom: -18px;
  width: 200px;
  height: 39px;
  border: 1px solid #e6e6e6;
  border-radius: 15px;
  box-sizing: border-box;
  display: flex;
}

.num span {
  display: block;
  width: 22%;
  text-align: center;
}

.num .nums {
  width: 56%;
  border-left: 1px solid #e6e6e6;
  border-right: 1px solid #e6e6e6;
  text-align: center;
}

.c_content .total {
  height: 100px;
  width: 100%;
  border-top: 1px solid #e6e6e6;
  border-bottom: 1px solid #e6e6e6;
  position: fixed;
  bottom: 99px;
  z-index: 33;
  background: white;
  display: flex;
  align-items: center;
  font-size: 24px;
}

.total .whole,
.total .zoji,
.total .jiesuan {
  width: 33.3%;
  display: flex;
}

.total .zoji {
}

.total .jiesuan {
  justify-content: center;
}

.jiesuan .c_comit {
  width: 185px;
  height: 80px;
  background: #2b883a;
  color: white;
  text-align: center;
  line-height: 80px;
  border-radius: 35px;
}
.cart_one,
.k_content {
  height: 100%;
  font-size: 30px;
}
.k_header {
  font-size: 30px;
  height: 88px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #e6e6e6;
  position: fixed;
  top: 0;
  background: white;
  z-index: 20;
  width: 100%;
}
.k_content {
  background: url(../../../static/images/cart/cart01.png) no-repeat center
    center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
.k_content .gobuy {
  width: 300px;
  height: 88px;
  background: #2b883a;;
  text-align: center;
  line-height: 88px;
  border-radius: 25px;
  color: white;
}
</style>