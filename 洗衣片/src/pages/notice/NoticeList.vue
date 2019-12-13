<template>
    <div class="noticeList" style="background:url('../../../static/images/home/27_01.png') no-repeat;background-size: contain;">
        <!-- 头部组件 -->
		<TopHeader custom-title="公告列表" custom-fixed  style="background:none;color:white">
			<i slot="backBtn" class="iconfont icon-fanhui"></i>
		</TopHeader>
        <div class="content">
            <div class="notice-list">
                <ul>
                    <router-link :to="{path:'/notice/NoticeDetails',query:{id:item.id}}" tag="li" v-for="(item,index) in NotList" :key="index">
                        <h3>{{item.title}}</h3>
                        <span class="date">{{item.create_time | formatDate}}</span>
                    </router-link>
                </ul>
            </div>
        </div>

    </div>
</template>

<script>
// 公共头部
import TopHeader from "@/pages/common/header/TopHeader"
export default {
    name:'NoticeList',
    data(){
        return{
           NotList:[],
           type:'',
           token: this.$store.getters.optuser.Authorization,
           page:'',
           page_size:''
        }
    },
    mounted() {
        this.NotData()
    },
    methods:{
        NotData() {
            var url = "announce/get_list"
            this.$axios.post(url,{
                token:this.$store.getters.optuser.Authorization,
                type:1,
                page:this.page,
                page_size:this.page_size
            })
            .then((res)=>{
                console.log(res)                
                var that = this
                if(res.data.status === 200){
                    that.NotList = res.data.data.lists;
                    console.log(that.NotList)
                }else{
                    that.$toast(res.msg)
                }
            })
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

            return y + '-' + MM + '-' + d ;
        }
    },
    components:{
        TopHeader
    }
}
</script>

<style lang="stylus" scoped>
.noticeList
    padding-top 88px
    background-color #fff
    min-height 100vh
    .content
        padding-top 10px;
        display flex
        width 100%
        flex-direction column
        align-items center
        .notice-list
            width 94%
            background white
            border-radius 14px
            ul
                li
                    margin 12px 30px
                    font-size 28px
                    line-height 50px
                    border-bottom 1px solid #efefef
                    box-sizing border-box
                    border-bottom 1px solid gray
                    h3
                        display -webkit-box
                        overflow hidden
                        -webkit-line-clamp 2
                        -webkit-box-orient vertical
                        font-weight normal
                        
                    .date
                        display block
                        color #999999
                        font-size 24px
                        text-align right 


</style>


