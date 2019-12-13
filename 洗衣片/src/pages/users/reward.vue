<template>
    <div class="body">
        <TopHeader custom-title="奖励明细" custom-fixed class="header">
      <i slot="backBtn" class="iconfont icon-fanhui"></i>
    </TopHeader>
    <!-- <div class="describe">
        <p>订单编号</p>
        <p>用户金额</p>
        <p>描述</p>
    </div>
    <div v-for="(item,index) in NotiList" :key="index" class="mingxi">
        <p>{{item.source_id}}</p>
        <p style="margin-left:-13px">￥{{item.money}}</p>
        <p>{{item.note}}</p>
    </div> -->
     <table class="cash_content" style="    width: 100%;border-collapse:collapse">
            <thead class="title">
                <tr>
                <th>订单编号</th>
                <th>奖励金额</th>
                <th>描述</th>
                </tr>
            </thead>
            <tbody class="shuju">
              <tr  v-for="(item,index) in NotiList" :key="index"  >
                 <td>{{item.source_id}}</td>
                <td>￥{{item.money}}</td>
                <td>{{item.note}}</td>
              </tr>
            </tbody>
            
          </table>
    </div>
</template>
<script>
import TopHeader from "@/pages/common/header/TopHeader"
export default {
    name:'reward',
    components:{
        TopHeader
    },
    data(){
        return{
      token: this.$store.getters.optuser.Authorization,
            NotiList:[]
        }
    },
    created(){
        this.NotiData()
    },
    methods:{
           NotiData() {
            var url = "user/distribut_list"
            this.$axios.post(url,{
                token:this.token
            })
            .then((res)=>{
                console.log(res)          
                var that = this
                if(res.data.status === 200){
                    that.NotiList = res.data.data.data;
                    console.log(this.NotiList)
                }else{
                    that.$toast(res.msg)
                }
            })
        }
  }
    
}
</script>
<style scoped>
.body{
    background-color: #f2f2f2;
}
.header{
    background: #fff;
}
.describe{
    margin-top: 40px;
    display: flex;
    justify-content: space-around;
    font-size: 30px;
    background: #7bafe2;
    position: relative;
    top: 40px;
}
.describe p{
        padding: 16px 0;
}
.mingxi{
    display: flex;
    justify-content: space-around;
    position: relative;
    top: 40px;
    left: 0;
    font-size: 20px;
    background:#e8f1f9;
}
.mingxi p{
        padding: 16px 0;
}
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
.shuju tr{
    height: 60px;;
}
.shuju tr:nth-of-type(2n){
  background: #bce0c7;
}

</style>