<template>
  <div class="Coupon">
    <TopHeader custom-title="优惠券" custom-fixed class="TopHeader">
      <i slot="backBtn" class="iconfont icon-fanhui"></i>
    </TopHeader>
    <div class="C_content">
      <van-tabs v-model="activeName" type="line">
        <van-tab title="未使用" name="a">
            <ul class="youhui" v-for="(item,index) in notUse" :key="index">
                <li>
                    <div class="imgUrl"> <p>￥<span style="font-size:25px;">{{item.price}}</span></p> 
                    <span>优惠券</span></div>
                    <div class="right" ><p style="padding-right: 71px;">{{item.title}}</p>
                       <span>{{item.start_time | formatDate}}--{{item.end_time | formatDate}}</span>
                      
                    </div>
                </li>
            </ul>
        </van-tab>
        <van-tab title="已使用" name="b">
             <ul class="youhui" v-for="(item,index) in use" :key="index">
                <li>
                    <div class="imgUrl"> <p>￥<span style="font-size:25px;">{{item.price}}</span></p> 
                    <span>优惠券</span></div>
                    <div class="right" ><p style="padding-right: 49px;">{{item.title}}</p>
                         <span>{{item.start_time | formatDate}}--{{item.end_time | formatDate}}</span>
                      
                    </div>
                </li>
            </ul>
        </van-tab>
        <van-tab title="已过期" name="c">
             <ul class="youhui" v-for="(item,index) in used" :key="index">
                <li>
                    <div class="imgUrl"> <p>￥<span style="font-size:25px;">{{item.price}}</span></p> 
                    <span>优惠券</span></div>
                    <div class="right"><p  style="padding-right: 71px;">{{item.title}}</p>
                        <span>{{item.start_time | formatDate}}--{{item.end_time | formatDate}}</span>
                      
                    </div>
                </li>
            </ul>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import TopHeader from "../common/header/TopHeader.vue";
export default {
  name: "Coupon",
  data() {
    return {
      activeName: "a",
      notUse:[],
      use:[],
      used:[]
    };
  },
  created(){
      this.NotData();
      this.NotData_use()
      this.NotData_used()
  },
  computed:{
      

//           var t = 787986456465;  // 当参数为数字的时候，那么这个参数就是时间戳，被视为毫秒，创建一个距离1970年1月一日指定毫秒的时间日期对象。
// console.log(new Date(t)) 
      
  },
  components: {
    TopHeader
  },
  methods:{
    //   未使用
       NotData() {
      // 获取token，cart——id
      var token = localStorage.getItem("Authorization");
         var url = "Coupon/my_coupon";
      this.$axios
        .post(url, {
          token: token,
          type: 1
        })
        .then(res => {
          console.log(res);

          
          if (res.status === 200) {
              console.log(res.data.data,"youhui")
              this.notUse = res.data.data
          } else {
            // this.$toast(res.msg);
          }
        });
       },
    //    已使用
     NotData_use() {
      // 获取token，cart——id
      var token = localStorage.getItem("Authorization");
      var url = "Coupon/my_coupon";
      this.$axios
        .post(url, {
          token: token,
          type: 2
        })
        .then(res => {
          console.log(res);

          
          if (res.status === 200) {
              console.log(res.data.data,"youhui")
              this.use = res.data.data
          } else {
            // this.$toast(res.msg);
          }
        });
       },
    //    过期
       NotData_used() {
      // 获取token，cart——id
      var token = localStorage.getItem("Authorization");
      var url = "Coupon/my_coupon";
      this.$axios
        .post(url, {
          token: token,
          type: 3
        })
        .then(res => {
          console.log(res);
          if (res.status === 200) {
              console.log(res.data.data,"youhui")
              this.used = res.data.data
          } else {
            // this.$toast(res.msg);
          }
        });
       },
  },
  filters: {
        // 日期格式化
        formatDate: function (time) {
            let date = new Date(time*1000);
            let y = date.getFullYear();

            let MM = date.getMonth() + 1;
            MM = MM < 10 ? ('0' + MM) : MM;

            let d = date.getDate();
            d = d < 10 ? ('0' + d) : d;

            let h = date.getHours();
            h = h < 10 ? ('0' + h) : h;

            let m = date.getMinutes();
            m = m < 10 ? ('0' + m) : m;

            let s = date.getSeconds();
            s = s < 10 ? ('0' + s) : s;

            return y + '.' + MM + '.' + d ;
        }
    },
};
</script>
<style  scoped>
.Coupon{
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

}
.C_content{
    margin-top: 88px;
    width: 94%;
    
}
.C_content .youhui{

}
.C_content .youhui li{
    width: 100%;
    height: 200px;
    /* border: 1px solid red; */
    display:flex;
   
    margin-top: 20px; 
}
.C_content .youhui li .imgUrl{
    width: 40%;
    height: 100%;
    background: #2b883a;
        display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    font-size: 20px;
    color: #fff;
}
.C_content .youhui li .imgUrl p{
  font-size: 15px;
}
.C_content .youhui li .right{
    width: 60%;
    height: 100%;
     box-sizing: border-box;
     display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    position: relative;
}
.C_content .youhui li .right .del{
    position: absolute;
    right: 2%;
    top: 2%;
}
</style>