<template>
  <div class="kefu"> 
    <TopHeader custom-title="联系客服" custom-fixed class="header" style="background: linear-gradient(90deg, #6eb92b, #2c883a);color:white">
      <i slot="backBtn" class="iconfont icon-fanhui"></i>
    </TopHeader>
    <div class="erweima">
      <img style="    width: 50%;" :src="NotiList.service_img" alt />
        <span>扫码二维码联系</span>
    </div>
     <span class="phone">联系电话：{{NotiList.phone}}</span>
  </div>
</template>
<script>
import TopHeader from "@/pages/common/header/TopHeader";
export default {
  name: "kefu",
  components: {
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
            var url = "user/contact_service"
            this.$axios.post(url,{
                token:this.token
            })
            .then((res)=>{
                console.log(res)          
                var that = this
                if(res.data.status === 200){
                    that.NotiList = res.data.data;
                    console.log(this.NotiList)
                }else{
                    that.$toast(res.msg)
                }
            })
        }
  }
};
</script>
<style scoped>
.kefu{
    height: 100%;
    z-index: 9899;
    background: linear-gradient(90deg, #6eb92b, #2c883a);
        display: flex;
    flex-direction: column;
    align-items: center;
 
}

.erweima {
  background: white;
  border-radius: 30px;
  height: 75%;
  margin-top: 88px;
  width: 88%;
  position: relative;
}
.erweima img {
  position: relative;
  top: 30%;
  margin: 0 auto;
  display: block;
}
.erweima span{
  display: block;
    position: absolute;
    left: 37%;
    bottom: 24%;
    opacity: .7; 
}
.phone{
    display: flex;
    height: 15%;
    width: 88%;
    background: white;
    border-radius: 30px;
    margin-top: 15px;
    /* text-align: center; */
    justify-content: center;
    align-items: center;
    font-size: 15px;
}
</style>