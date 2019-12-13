<template>
    <div class="noticeDetails">
        <div class="header">
        <!-- 头部组件 -->
		<!-- <TopHeader custom-title="公告详情" custom-fixed style="background: linear-gradient(90deg, #6eb92b, #2c883a);color:white">
			<i slot="backBtn" class="iconfont icon-fanhui"></i>
		</TopHeader> -->
            <div class="tit">
                <span @click="btn"><van-icon name="arrow-left" color="#fff" class="icon"/></span>
                <p>公告详情</p>
            </div>
        </div>
        
        <div class="content">
            <div>
                <h1>{{NotiList.title}}</h1>
                <!-- <p>{{NotiList.desc}}</p> -->
                <div v-html="NotiList.desc" class="ttt"></div>
            </div>
        </div>

    </div>
</template>

<script>
// 公共头部
import TopHeader from "@/pages/common/header/TopHeader"
export default {
    name:'NoticeDetails',
    data(){
       return{
           announceId:this.$route.query.id,
           token:this.$store.getters.optuser.Authorization,
           NotiList:[],
        }
    },
    mounted() {
        this.NotiData()
    },
    methods:{
        btn() {
            this.$router.go(-1)
        },
        NotiData() {
            var url = "announce/details"
            this.$axios.post(url,{
                token:this.token,
                id:this.announceId,
            })
            .then((res)=>{
                console.log(res)          
                var that = this
                if(res.data.status === 200){
                    that.NotiList = res.data.date;
                }else{
                    that.$toast(res.msg)
                }
            })
        },
    },
    components:{
        TopHeader
    }
}
</script>

<style lang="stylus" scoped>
.header{
    background:url('../../../static/images/home/27_01.png')no-repeat center center; 
    background-size: cover;
    height: 160px;
    width: 100%;
}
.header .tit{
    display:flex;
    align-items:center;
    color:#fff;
    position:relative;
    height 88px
    line-height:88px;
    padding 0 20px
    font-size: 30px;
} 
.tit span{
    display flex;
    align-items :center;
}
.tit span .icon{
    margin-top:-2px;
    font-size:36px;
    font-weight:580;
}
.header .tit p {
  text-align: center;
 
  position: absolute;
  left: 42%;
}

.noticeDetails
    background-color #fff
    min-height 100vh
    position relative
    display flex
    flex-direction column
    align-items center
    background #f2f2f2
    .content
        width 80%
        position absolute
        top 8%
        background white
        border-radius 3%
        padding 20px
        h1
            text-align center
            font-size 32px
            font-weight normal
            line-height 60px
        .ttt
            line-height 40px
            font-size 26px
            letter-spacing 2px
            display flex
            justify-content center
</style>
