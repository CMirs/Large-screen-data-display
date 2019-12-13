<template>
  <div>
    <TopHeader custom-title="联系客服" custom-fixed class="header">
      <i slot="backBtn" class="iconfont icon-fanhui"></i>
    </TopHeader>
    <div class="ios">
      <img @click="tiaozhuan" src="/static/images/home/time.png" alt />
      <p>ios下载</p>
    </div>
    <div class="anzhuo">
      <img @click="anzhuo" src="/static/images/home/timg.png" alt />
      <p>安卓下载</p>
    </div>
  </div>
</template>
<script>
import TopHeader from "@/pages/common/header/TopHeader";
export default {
  name: "detail",
  components: {
    TopHeader
  },
  data() {
    return {
           token: this.$store.getters.optuser.Authorization,
           NotiList:[],
           ios:'',
           anio:''
    };
  },
  created(){
    this.NotiData()
  },
  methods: {
    tiaozhuan(){
      window.location.href= this.ios
    },
    anzhuo(){
      window.location.href= this.anio
    },
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
                  that.ios = 'http://'+ that.NotiList.ios_url
                  this.anio = 'http://'+ that.NotiList.android_url
                  console.log(that.ios)
                }else{
                    that.$toast(res.msg)
                }
            })
        }
  }
};
</script>
<style scoped>
.ios {
  display: flex;
  flex-direction: column;
  text-align: center;
  position: relative;
  top: 46px;
  width: 50%;
  margin: 0 auto;
  padding-top: 101px;
}
.ios img {
  width: 160px;
  display: block;
  margin: 0 auto;
}
.anzhuo {
  position: relative;
  top: 83px;
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
   padding-top: 101px;
}
.anzhuo img {
  width: 160px;
  display: block;
  margin: 0 auto;
}
</style>