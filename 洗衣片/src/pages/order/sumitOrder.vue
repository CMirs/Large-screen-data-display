<template>
  <div style="background: #f2f2f2;overflow:hidden">
    <TopHeader custom-title="提交订单" custom-fixed>
      <i slot="backBtn" class="iconfont icon-fanhui" @click="back"></i>
    </TopHeader>
    <div class="address" v-for="(Add_shuju,index) in Add_shuju" :key="index">
      <div class="dizhi" @click="checked_addr">
        <van-icon name="arrow" />
      </div>
      <span style="    padding-left: 20px;
    padding-top: 10px;">
        {{Add_shuju.consignee}}
        <a>{{Add_shuju.mobile}}</a>
      </span>
      <p style=" padding-left: 20px;">
        <van-icon name="location-o" />
        {{Add_shuju.address}}
      </p>
    </div>
    <div style="padding-top: 10px;" class="dindan">
      <div class="shop" v-for="(goods,idx) in data" :key="idx">
        <div class="urlImg">
          <img :src="goods.img" alt />
        </div>
        <div class="describe">
          <p>{{goods.goods_name}}</p>
          <span>{{goods.spec_key_name}}</span>
          <div class="num">
            <i>{{goods.goods_price}}</i>
            <span>X {{goods.goods_num}}</span>
          </div>
        </div>
      </div>
      <!-- <div class="shop">
        <div class="urlImg"></div>
        <div class="describe">
          <p>欧式陶瓷花瓶时尚简约家居摆件客厅饰品小清新桌面干花瓶鲜花花器</p>
          <span>颜色分类：墨绿色</span>
          <div class="num">
            <i>21.00</i>
            <span>*1</span>
          </div>
        </div>
      </div>-->
    </div>
    <div class="peison">
      <div class="yuan">
        <img src="../../../static/images/order/z-chengs.png" alt />
      </div>
      <p style="padding: 10px 0;
    padding-left: 10px;">快速配送</p>
      <span style="padding-left: 10px;
    margin-bottom: 10px;">工作日、双休日与节假日均可送货</span>
    </div>

    <div class="xinzeng" @click="youhui">
      <div class="youhui">
        <p style="padding: 10px 0;">可用优惠券</p>
        <p style="padding-right: 3px;">
          <van-icon name="arrow" />
        </p>
      </div>
    </div>

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
        <div class="liebiao" v-for="(good,index) in confond" :key="index">
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
              <p @click="lingqu(good,index)" class="dianji">点击使用</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="liuyan">
      <p>买家留言:</p>
      <input type="text" maxlength="50" class="shuru" placeholder="选填：对本次交易的说明，限50字" ref="wenben" />
    </div>
    <dl class="feiyon">
      <dd>
        <span style="padding-left:10px;">商品金额</span>
        <i style="padding-right:10px">{{total}}.00</i>
      </dd>
      <dd>
        <span style="padding-left:10px;">配送费用</span>
        <i style="padding-right:10px">包邮</i>
      </dd>
    </dl>
    <div class="zhifu">
      <van-radio-group v-model="radio">
        <van-cell-group>
          <van-cell title="余额支付" clickable @click="radio = '1'">
            <van-radio checked-color="#2b883a" slot="right-icon" name="1" />
          </van-cell>
          <!-- <van-cell title="微信支付" clickable @click="radio = '2'">
            <van-radio slot="right-icon" name="2" />
          </van-cell>
          <van-cell title="支付宝支付" clickable @click="radio = '3'">
            <van-radio slot="right-icon" name="3" />
          </van-cell>-->
        </van-cell-group>
      </van-radio-group>
    </div>
    <div class="comit">
      <div class="total">
        <span>应付金额:￥&nbsp;&nbsp;</span>
        <a>{{total}}.00</a>
      </div>
      <van-button
        style="border-radius:5px;background:#2b883a;border:0;"
        type="danger"
        @click="generate"
      >提交订单</van-button>
    </div>
  </div>
</template>

<script>
import TopHeader from "@/pages/common/header/TopHeader";
import Vue from 'vue';
import { Toast } from 'vant';

Vue.use(Toast);
export default {
  data() {
    return {
      // data: []对应上面数据渲染的data
      data: [],
      Add_shuju: [],
      checked: true,
      radio: "1",
      ishui: false,
      token:this.$store.getters.optuser.Authorization,
      confond:[],
      price:'',
      Note:[],
      coupon_id:'',
      price_one:''
    };
  },
  created() {
    this.NotData();
    
  },
  methods: {
     youhui(){
       this.ishui = true;
        var url = "Coupon/my_coupon";
      this.$axios
        .post(url, {
          token: this.token,
          type:1
        })
        .then(res => {
            //  this.$toast(res.data.msg);
            //  console.log(res.data.msg,'sdsasa')
            this.confond = res.data.data
            console.log(this.confond,'sdadqdwq')
            // console.log(res.data.data,'sdadasdsadsds')
            for(var i = 0;i<this.confond.length;i++){
              // this.price = this.confond[i].price;
              // this.Note.push(this.price)
              // console.log(this.Note,'sdasdsadsdsadsdasdasdsda')
            }
        });
    },
    lingqu(good,index) {
      this.ishui = false;
      // this.Note.splice(index,1)
      // console.log(good.price,"index")
      var s =good.price
      this.price = s
      var a = good.coupon_id
      this.coupon_id = a
      console.log(s,"price")
      this.$toast('使用成功');
    },
    quxiao() {
      this.ishui = false;
      
    },
    NotData() {
      // 获取token，cart——id
      var token = localStorage.getItem("Authorization");
      var cart_id = localStorage.getItem("cart_id");
      console.log(token, cart_id, "132");
      var url = "Order/temporary";
      this.$axios
        .post(url, {
          token: token,
          cart_id: cart_id
        })
        .then(res => {
          console.log(res);
          this.data = res.data.data.goods_res; //订单数据拿到的数据类型[{...}]
          this.Add_shuju = [res.data.data.addr_res]; //订单数据拿到的数据类型{...}，so需要外加[]处理
          this.coupon_one = res.data.data.coupon
          console.log(this.coupon_one,'123sde')
          console.log(this.Add_shuju, "Add_shuju");
      
          if (res.data.status === 200) {
            if (this.Add_shuju[0].address === "") {
              this.$toast("请先填写收货地址");
              var id = this.$route.query.id;
              console.log("id", id);
              setTimeout(() => {
                this.$router.push("/users/address/Address");
              }, 2500);
            }
            console.log(res.data.data.goods_res, "生成订单");
          } else {
            that.$toast(res.msg);
          }
          for(var a = 0;a<this.coupon_one.length;a++){
            if(this.coupon_one[a].is_big === 1){
              this.price = this.coupon_one[a].price
              this.coupon_id = this.coupon_one[a].coupon_id
              // console.log(this.price_one,'465469786')
            }
          }
        });
    },

    // 每次退出都清除一次选中的购物车id
    back() {
      window.localStorage.removeItem("cart_id");
    },
    // 改变地址
    checked_addr() {
      this.$router.push("/users/address/Address");
    },
    // 生成订单
    generate() {
      // 获取token，cart——id
      var token = localStorage.getItem("Authorization");
      var cart_id = localStorage.getItem("cart_id");
      //   确认支付方式
      //   console.log(this.radio)
      if (this.radio == 3) {
        this.radio == "支付宝";
      } else if (this.radio == 2) {
        this.radio == "微信";
      } else if (this.radio == 1) {
        this.radio == "余额";
      }
      // 文本
      // console.log(this.$refs.wenben.value);
      var wenben = this.$refs.wenben.value;
      var address_id = this.Add_shuju[0].address_id;
      console.log(address_id);
      var url = "Order/submitOrder";
      this.$axios
        .post(url, {
          token: token,
          cart_id: cart_id * 1,
          address_id: address_id,
          user_note: wenben,
          pay_type: this.radio * 1,
          coupon_id:this.coupon_id
        })
        .then(res => {
          console.log(res);
          if (res.data.status === 200) {
            console.log(res.data.data.order_sn);
            localStorage.setItem("order_sn", res.data.data.order_sn);
            localStorage.setItem("pay_type", this.radio * 1);
            localStorage.setItem("order_id", res.data.data.order_id);
            localStorage.setItem("order_amount", res.data.data.order_amount);
            this.$router.push("/order/payment");
          } else {
            that.$toast(res.msg);
          }
        });
    }
  },
  computed: {
    //   计算总价
    total() {
      let total = 0;
      this.data.forEach(goods => {
        total = goods.subtotal_price * 1-this.price;
        if(total<=0){
          total=0
        }
      });
      return total;
    }
  },
  components: {
    TopHeader
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
.address {
  /* box-sizing: border-box; */
  height: 150px;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  background: white;
  width: 94%;
  margin: 0 auto;
  margin-top: 100px;
}
.address span {
  color: #232326;
}
.address p {
  color: #3e3e40;
  display: block;
  width: 80%;
}
.address .dizhi {
  position: absolute;
  right: 20px;
  top: 55%;
  font-size: 30px;
}
.dindan .shop {
  height: 230px;
  width: 94%;
  background: #fff;
  display: flex;
  margin: 0 auto;
}
.shop .urlImg {
  height: 100%;
  /* width: 25%; */
  margin: 0 9px 0 0;
  /* background: red; */
}
.urlImg img {
  /* width: 100%; */
  height: 100%;
}
.shop .describe {
  height: 100%;
  width: 75%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.describe p {
  display: block;
  width: 68%;
  padding-top: 6px;
}
.describe span {
  margin: 10px 0;
  font-size: 14px;
  color: #3e3e40;
  display: block;
}
.describe .num {
  height: 25px;
  display: flex;
  justify-content: space-between;
}
.num i {
  color: #2b883a;
}
.num span {
  padding-right: 40px;
}
.peison {
  position: relative;
  padding: 10px 0;
  background: white;
  width: 94%;
  margin: 0 auto;
  margin-top: 20px;
}
.peison p {
  display: block;
  margin-bottom: 15px;
}
.peison span {
  font-size: 14px;
  opacity: 0.7;
}
.peison .yuan {
  position: absolute;
  right: 10px;
  top: 35%;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background: #2b883a;
}
.yuan img {
  height: 100%;
  width: 100%;
}

.liuyan {
  height: 250px;
  background: white;
  margin-bottom: 20px;
  width: 94%;
  margin: 0 auto;
  margin-top: 20px;
}
.liuyan p {
  display: block;
  height: 50px;
  line-height: 50px;
  padding-left: 10px;
}
.liuyan .shuru {
  background: #f2f2f2;
  height: 160px;
  width: 97%;
  margin: 10px 20px 10px 10px;
  box-sizing: border-box;
}
.feiyon {
  width: 94%;
  margin: 0 auto;
  height: 120px;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
.feiyon dd {
  display: flex;
  justify-content: space-between;
  width: 97%;
  align-items: center;
  color: gray;
  height: 50%;
}
.feiyon dd i {
  color: #2b883a;
}
.comit {
  height: 120px;
  width: 100%;
  background: white;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.comit .total {
  padding-right: 20px;
}
.total span {
}
.total a {
  color: #2b883a;
}
.zhifu {
  width: 94%;
  margin: 0 auto;
  margin-bottom: 20px;
}
.xinzeng {
  width: 94%;
  background: #fff;

  margin-bottom: 10px;
  margin: 0 auto;
  margin-top: 20px;
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
/* 弹窗上层背景 */
.tanchuang_info .top_tan_i{
    position: absolute;
    height: 58%;
    width: 100%;
}
.guding {
  margin: 0 auto;
  position: fixed;
  background: #fff;
  bottom: 0;
  left: 0;
  width: 100%;
 height: 42%;
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
</style>