<template>
  <div class="header">
    <div>
      <TopHeader custom-title="查看订单" custom-fixed>
        <i slot="backBtn" class="iconfont icon-fanhui"></i>
      </TopHeader>
    </div>
    <!-- <div class="dingdan">
      <p>下单时间</p>
      <p>订单编号</p>
      <p>金额</p>
    </div>
    <div v-for="(item,index) in NotiList" :key="index" class="dingdan_info">
      <p>{{item.add_time | formatDate}}</p>
      <p>{{item.order_sn}}</p>
      <p>{{item.total_amount}}</p>
    </div> -->
    <table style="width:100%;margin-top:12%;" >
        <thead>
            <tr class="dingdan">
                <th>下单时间</th>
                <th>订单编号</th>
                <th>金额</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item,index) in NotiList" :key="index" class="dingdan_info">
                <td>{{item.add_time | formatDate}}</td>
                <td>{{item.order_sn}}</td>
                <td>{{item.total_amount}}</td>
            </tr>
        </tbody>
    </table>
  </div>
</template>
<script>
import TopHeader from "@/pages/common/header/TopHeader";
export default {
  name: "funsDetail",
  components: {
    TopHeader
  },
  data() {
    return {
      page: 1,
      id: this.$route.query.id,
      NotiList: []
    };
  },
  methods: {
    NotiData() {
      var url = "user/fans_order";
      this.$axios
        .post(url, {
          page: this.page,
          id: this.id
        })
        .then(res => {
          console.log(res);
          var that = this;
          if (res.data.status === 200) {
            that.NotiList = res.data.data.data;
            console.log(that.NotiList);
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
  },
  created() {
    this.NotiData();
  }
};
</script>
<style scoped>
.dingdan {
  /* display: flex;
  justify-content: space-around;
  width: 100%;
  margin: 0 auto;
  padding-top: 98px; */
  background: #7cb78e;
}
.dingdan_info {
  /* display: flex;
  justify-content: space-around;
  width: 100%;
  margin: 0 auto;
  padding-top: 20px; */
  text-align: center;
  background: #ecfcf1;
}
.dingdan_info:nth-of-type(2n) {
    background: #bce0c7;
}
</style>