<template>
  <div class>
    <div class="top_content">
      <TopHeader custom-title="账单明细" custom-fixed class="TopHeader">
        <i slot="backBtn" class="iconfont icon-fanhui"></i>
      </TopHeader>
    </div>
    <van-tabs class="chonggou" @click="onClick">
      <van-tab title="消费">
        <table class="cash_content" style="width: 100%;border-collapse:collapse;">
          <thead class="titles">
            <tr>
              <th>订单编号</th>
              <th>日期</th>
              <th>金额</th>
            </tr>
          </thead>
          <tbody class="shuju" border rules="none" cellspacing="0" align="center">
            <tr v-for="(item,index) in NotiList" :key="index">
              <td>
                {{item.source_id}}
                <br />
                {{item.note}}
              </td>
              <td>{{item.create_time}}</td>
              <td>{{item.balance}}</td>
            </tr>
          </tbody>
        </table>
      </van-tab>
      <van-tab title="赚取">
        <table class="cash_content" style="width: 100%;border-collapse:collapse;">
          <thead class="titles">
            <tr>
              <th>订单编号</th>
              <th>日期</th>
              <th>金额</th>
            </tr>
          </thead>
          <tbody class="shuju">
            <tr v-for="(item,index) in NotiList_one" :key="index">
              <td>
                {{item.source_id}}
                <br />
                {{item.note}}
              </td>
              <td>{{item.create_time}}</td>
              <td>{{item.balance}}</td>
            </tr>
          </tbody>
        </table>
      </van-tab>
    </van-tabs>

    <!-- <div>
      <ul class="title" >
        <li style="background:#7bafe2">消费</li>
        <li>赚取</li>
      </ul>
    </div>
    <div class="cash_content">
      <ul class="titles">
        <li>订单编号</li>
        <li>日期</li>
        <li>金额</li>
      </ul>
      
      <dl class="shuju">
        <dd>2019.8.16<br/>
        下单消费</dd>
        <dd>2019.8.16</dd>
        
        <dd>审核失败</dd>
      </dl>
      <dl class="shuju">
        <dd>2019.8.16</dd>
        <dd>2019.8.16</dd>
        
        <dd>审核失败</dd>
      </dl>
      <dl class="shuju">
        <dd>2019.8.16</dd>
        <dd>2019.8.16</dd>
      
        <dd>审核失败</dd>
      </dl>

    </div>-->
  </div>
</template>
<script>
import TopHeader from "../common/header/TopHeader.vue";
export default {
  name: "zhangdan",
  data() {
    return {
      token: this.$store.getters.optuser.Authorization,
      log_type: "1",
      log: "0",
      NotiList: [],
      NotiList_one: []
    };
  },
  components: {
    TopHeader
  },
  created() {
    this.NotiData();
    this.NotiData_one();
  },
  methods: {
    onClick(name, title) {
      // this.$toast(title);
    },
    NotiData() {
      var url = "user/remainder_list";
      this.$axios
        .post(url, {
          token: this.token,
          log_type: this.log
        })
        .then(res => {
          console.log(res);
          var that = this;
          if (res.data.status === 200) {
            that.NotiList = res.data.data.list;
          } else {
            that.$toast(res.msg);
          }
        });
    },
    NotiData_one() {
      var url = "user/remainder_list";
      this.$axios
        .post(url, {
          token: this.token,
          log_type: this.log_type
        })
        .then(res => {
          console.log(res);
          var that = this;
          if (res.data.status === 200) {
            that.NotiList_one = res.data.data.list;
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

      return y + "-" + MM + "-" + d + " " + h + "-" + m + "-" + s;
    }
  }
};
</script>
<style  scoped>
.title {
  /* background: #7bafe2; */
  height: 88px;
  text-align: center;
  padding-top: 88px;
  line-height: 88px;
  margin-bottom: 22px;
}
.title li {
  float: left;
  width: 50%;
  height: 100%;
}
.cash_content .titles {
  background: #7cb78e;
  line-height: 80px;
  text-align: center;
  /* display: flex;
  justify-content: space-around;
  align-items: center; */
}
/* .titles tr{
    height: 60px;
  
}
.titles tr th{
   
} */
.cash_content .shuju {
  height: 70px;
  text-align: center;
  background: #ecfcf1;
  /* padding-top: 88px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  */
}
.shuju tr {
  padding: 0;
}
.shuju tr td {
  padding: 0;
}
.shuju tr:nth-of-type(2n) {
  background: #bce0c7;
}

.chonggou {
  position: relative;
  top: 90px;
}
.wu {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.wu img {
  margin: 0 auto;
  display: block;
  margin-top: 180px;
}
/* .titles{
    display: flex;
    justify-content: space-around;
    text-align: center;
    line-height: 0.8rem;
} */
</style>