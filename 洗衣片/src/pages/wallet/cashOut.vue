<template>
  <div class>
    <div class="top_content">
      <TopHeader custom-title="提现明细" custom-fixed class="TopHeader">
        <i slot="backBtn" class="iconfont icon-fanhui"></i>
      </TopHeader>
    </div>
           <table class="cash_content" style="    width: 100%;border-collapse:collapse">
            <thead class="title">
              <tr>
              <th>申请日期</th>
              <th>金额</th>
              <th>手续费</th>
              <th>审核状态</th>
            </tr>
            </thead>
            <tbody class="shuju">
              <tr  v-for="(item,index) in NotiList" :key="index">
                <td> {{item.createtime | formatDate}} </td>
                 <td>{{item.money}}</td>
                <td>{{item.taxfee}}</td>
                <td>{{item.status}}</td>
              </tr>
            </tbody>
            
          </table>
  </div>
</template>
<script>
import TopHeader from "../common/header/TopHeader.vue";
export default {
  data() {
    return {
      NotiList:[],
      token:this.$store.getters.optuser.Authorization,
      list:'待审核',
      list_info:'审核成功',
      list_info_en:'审核失败'
    };
  },
  name: "cashOut",
  created(){
    this.NotiData()
  },
  methods:{
           NotiData() {
            var url = "user/withdrawal_list"
            this.$axios.post(url,{
                token:this.token,
            })
            .then((res)=>{
                console.log(res)          
                var that = this
                if(res.data.status === 200){
                    that.NotiList = res.data.data.list;
                    for(var i = 0;i<this.NotiList.length;i++){
                      if(that.NotiList[i].status === 1){
                      this.NotiList[i].status = this.list
                    }else if(that.NotiList[i].status === 2){
                      this.NotiList.status[i] = this.list_info
                    }else{
                      this.NotiList[i].status = this.list_info_en
                    }
                    }
                }else{
                    that.$toast(res.msg)
                }
            })
        }
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

            return y + '-' + MM + '-' + d ;
        }
    },
  components: {
    TopHeader
  }
};
</script>
<style  scoped>
.cash_content {
  position: relative;
  top: 88px;
}
.cash_content .title {
 background: #7cb78e;
  height: 60px;
  text-align: center;
 
 
}
.title tr{
    height: 60px;
  
}
.title tr th{
   font-weight: 300;
}
.cash_content .shuju {
  height: 48px;
  text-align: center;
   background: #ecfcf1;
  /* padding-top: 88px; */

}

.shuju tr:nth-of-type(2n){
  background: #bce0c7;
}
/* .shuju dd:nth-child(1){
    margin-left: -16px;
}
.shuju dd:nth-child(2){
    margin-left: -30px;
}
.shuju dd:nth-child(4){
    margin-left: -14px;
} */
</style>