<template>
  <div style="padding-bottom: 120px;">
    <div class="header">
      <p>资讯</p>
    </div>
    <router-link :to="{path:'/news/newsDetail',query:{id:item.id}}" class="list" v-for="(item,index) in NotiList" :key="index">
        <div class="news">{{item.title}}</div>
        <div class="news_info">
            <p></p>
            <span><van-icon name="arrow"/></span>
        </div>
        <div class="news_info_two">
            <p>2018.10.01</p>
        </div>
    </router-link>
    <div class="wu" v-if="isShow" v-cloak>
        <img src="/static/images/order/wu.png" alt />
        <p style="margin-top: 10px;">暂无公告</p>
      </div>
    <Navigate></Navigate>
  </div>
</template>
<script>
import Navigate from "@/pages/common/footer/Navigate";
export default {
  name: "newsList",
  components: {
    Navigate
  },
  data(){
      return{
          token:this.$store.getters.optuser.Authorization,
          page:'',
          type:2,
          page_size:'',
          NotiList:[],
          isShow:false
      }
  },
  created(){
      this.NotiData()
  },
  methods:{
      //请求数据
      NotiData() {
            var url = "announce/get_list"
            this.$axios.post(url,{
                token:this.token,
                page:this.page,
                type:this.type,
                page_size:this.page_size
            })
            .then((res)=>{
                console.log(res)          
                var that = this
                if(res.data.status === 200){
                    that.NotiList = res.data.data.lists;
                    console.log(that.NotiList)
                    if(that.NotiList.length === 0){
                        this.isShow = true;
                    }
                }else{
                    that.$toast(res.msg)
                }
            })
        }
  }
};
</script>
<style scoped>
.header {
  width: 100%;
  background: url("/static/images/funs/banner_funs.png") no-repeat;
  background-size: 100% 100%;
  text-align: center;
  position: relative;
  padding-bottom: 148px;
}
.header p {
  text-align: center;
  font-size: 30px;
  color: #ffffff;
  position: absolute;
  top: 26px;
  left: 48%;
}
.list{
    background: #fff;
    width: 94%;
    margin: 0 auto;
    position: relative;
    top: -54px;
    border-radius: 22px;
    display: block;
}
.news{
    font-size: 30px;
    color: #151515;
    padding-top: 30px;
    /* margin-top: 15px; */
    padding-left: 20px;
}
.news_info{
    display: flex;
    justify-content: safe;
    justify-content: space-between;
    font-size: 24px;
    color: #606060;
    /* padding-left: 10px; */
    padding-right: 20px;
}
.news_info p{
    text-overflow: ellipsis;
    width: 476px;
    overflow: hidden;
    white-space: nowrap;
    padding-left: 20px;
}
.news_info_two{
    display: flex;
    justify-content: space-between;
    padding-bottom: 12px;
    padding-left: 20px;
    border-bottom: 2px solid #e6e6e6;
    padding-right: 20px;
}
.news_info_two p{
        color: #666666;
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
</style>