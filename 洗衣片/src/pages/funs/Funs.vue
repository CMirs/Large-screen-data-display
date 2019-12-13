<template>
  <div>
    <div class="banner_top">
      <div class="back" @click="back_btn"><van-icon name="arrow-left" color="#fff" class="icon" /></div>
      <h2 class="mine_funs">我的团队</h2>
      <h1 class="funs_number">{{NotiList_en.allfans}}</h1>
      <div class="banner_concent">
        <p class="direct" @click="direct()">直推粉丝 （{{NotiList_en.push_member}}）</p>
        <p class="direct" @click="direct_two">其他会员 （{{NotiData_en.other_member}}）</p>
      </div>
      <div style="    display: flex;
    justify-content: space-between;
    width: 42%;
    margin: 0 auto;">
      <div class="arrow-up" v-show="unshow"></div>
       <div class="arrow-up-one" v-show="unshow_one"></div>
       </div>
    </div>

    <div class="banner_bottom" v-show="show">
      <div class="border_bottom">
        <div class="user_info">
          <h2>用户ID</h2>
          <h2>名称</h2>
          <h2>电话</h2>
          <h2>订单</h2>
        </div>
        <div class="user_info_two" v-for="(item,index) in NotiList" :key="index">
          <h2>{{item.id}}</h2>
          <h2 class="name_info">{{item.realname}}</h2>
          <h2>{{item.mobile}}</h2>
          <router-link tag="h2" class="find" :to="{path:'/funs/funsDetail',query:{id:item.id}}">查看</router-link>
        </div>
      <div class="wu" v-if="isShow">
        <img src="/static/images/order/wu.png" alt="">
          <p style="margin-top: 10px;">暂无信息</p>
      </div>
      </div>
      
    </div>
    <div class="banner_bottom" v-show="show_en">
      <div class="border_bottom">
        <div class="user_info">
          <h2>用户ID</h2>
          <h2>名称</h2>
          <h2>电话</h2>
          <h2>订单</h2>
        </div>
        <div class="user_info_two" v-for="(item1,index) in NotiList_en_en" :key="index">
          <h2>{{item1.id}}</h2>
          <h2 class="name_info">{{item1.realname}}</h2>
          <h2>{{item1.mobile}}</h2>
          <router-link tag="h2" :to="{path:'/funs/funsDetail',query:{id:item1.id}}" class="find">查看</router-link>
        </div>
         <div class="wu" v-if="isShow_one">
        <img src="/static/images/order/wu.png" alt="">
          <p style="margin-top: 10px;">暂无信息</p>
      </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Funs",
  components: {},
  data() {
    return {
      type: 1,
      token: this.$store.getters.optuser.Authorization,
      NotiList: [],
      NotiList_en:[],
      type_en:2,
      NotiList_en_en:[],
      show:true,
      show_en:false,
      unshow:true,
      unshow_one:false,
      isShow:false,
      isShow_one:false
    };
  },
  created() {
    this.NotiData();
    this.NotiData_en()
  },
  methods: {
    direct() {
      this.show=true
      this.show_en = false
      this.unshow = true
      this.unshow_one = false
    },
    direct_two() {
      this.show=false
      this.show_en = true
      this.unshow = false
      this.unshow_one = true
    },
    back_btn() {
      this.$router.push({ path: "/users/User", name: "User" });
    },
    NotiData() {
      var url = "user/team_list";
      this.$axios
        .post(url, {
          token: this.token,
          type: this.type
        })
        .then(res => {
          console.log(res);
          var that = this;
          if (res.data.status === 200) {
            that.NotiList = res.data.data.list;
            if (that.NotiList.length === 0) {
              this.isShow = true;
            }else{
              this.isShow = false;
            }
            that.NotiList_en = res.data.data
            console.log(that.NotiList_en,'123')
          } else {
            that.$toast(res.msg);
          }
        });
    },
    NotiData_en() {
      var url = "user/team_list";
      this.$axios
        .post(url, {
          token: this.token,
          type: this.type_en
        })
        .then(res => {
          console.log(res);
          var that = this;
          if (res.data.status === 200) {
            that.NotiData_en = res.data.data;
            
            that.NotiList_en_en = res.data.data.list;
            if (that.NotiList_en_en.length === 0) {
              this.isShow_one = true;
            }else{
              this.isShow_one = false;
            }
            console.log( that.NotiList_en_en)
          } else {
            that.$toast(res.msg);
          }
        });
    },
  }
};
</script>
<style scoped>
.banner_top {
  width: 100%;
  background: url("/static/images/public/banner_funss.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ffffff;
}
.mine_funs {
  margin-top: 60px;
}
.funs_number {
  margin-top: 10px;
}
.banner_concent {
  display: flex;
  justify-content: space-around;
  margin-top: 88px;
  width: 100%;
  margin-bottom: 46px;
  font-size: 30px;
}
.arrow-up {
  width: 0;
  height: 0;
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  border-bottom: 25px solid #fff;
  position: relative;
  left: -23%;
}
.arrow-up-one{
  width: 0;
  height: 0;
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  border-bottom: 25px solid #fff;
  position: relative;
  left: 103%;
}
.banner_bottom {
  width: 100%;
}
.border_bottom {
  width: 90%;
  margin: 0 auto;
  border: 2px solid #ebebeb;
  margin-top: 30px;
  /* height: 800px; */
  overflow: auto;
}
.user_info {
  width: 90%;
  border-bottom: 2px solid #e6e6e6;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
}
.user_info h2 {
  line-height: 40px;
  padding: 20px 0;
  font-size: 30px;
}
.user_info_two {
  width: 90%;
  border-bottom: 2px solid #e6e6e6;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
}
.user_info_two h2 {
  line-height: 40px;
  padding: 20px 0;
  font-size: 24px;
}
.find {
  color: #0079ff;
}
.name_info {
  margin-left: 3%;
}
.back {
  font-size: 50px;
  font-weight: 800;
  position: absolute;
  left: 5px;
  top: 5px;
}
.back .icon{
  font-size:36px;
    font-weight:580;
}
.wu{
      display: flex;
    flex-direction: column;
    align-items: center;
}
.wu img{
  display: block;
  margin: 0 auto;
      margin-top: 240px;
}
</style>