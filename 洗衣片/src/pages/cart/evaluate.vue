<template>
  <div class="evaluate">
    <TopHeader custom-title="商品评价" custom-fixed>
      <i slot="backBtn" class="iconfont icon-fanhui" style="color:gray"></i>
    </TopHeader>
    <div class="sum">商品评价（{{num}}）</div>
    <ul class="e_num">
      <li v-for="(item,index) in NotListe" :key="index">
        <div>
          <img class="touxiang" :src="item.avatar" alt />
          <span>{{item.realname}}</span>
          <van-rate v-model="item.star_rating" size="12px" disabled-color="red" disabled />
          <p class="time">{{item.add_time | formatDate}}</p>
        </div>
        <p style="    margin: 10px 0;">{{item.content}}</p>
        <div style="margin-top: 10px;">
          <img v-image-preview v-for="(item1,index) in item.img" :key="index" :src="item1" alt />
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import TopHeader from "@/pages/common/header/TopHeader";
export default {
  data() {
    return {
      token: this.$store.getters.optuser.Authorization,
      page: 1,
      order: this.$route.query.id,
      NotListe: [],
      num: this.$route.query.num,
      moren: "默认昵称",
      upLoading: true,
    };
  },
  components: {
    TopHeader
  },
  created() {
    this.NoteData();
  },
  methods: {
    NoteData() {
      var url = "Goods/comment_list";
      let that = this;
      that.$axios
        .post(url, {
          goods_id: that.order,
          token: that.token,
          page: that.page,
          pageSize: 6
        })
        .then(res => {
          console.log(res, "123");
          if (res.data.status === 1) {
            that.NotListe = res.data.data;
            console.log(that.NotListe, "123456wqr");
            for (var a = 0; a < that.NotListe.length; a++) {
              if (that.NotListe[a].realname === null) {
                that.NotListe[a].realname = this.moren;
              }else{

              }
            }
          } else {
          }
        });

      window.onscroll = function() {
        // scrollTop 滚动条滚动时，距离顶部的距离
        var scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        // windowHeight 可视区的高度
        var windowHeight =
          document.documentElement.clientHeight || document.body.clientHeight;
        // scrollHeight 滚动条的总高度
        var scrollHeight =
          document.documentElement.scrollHeight || document.body.scrollHeight;
        // 滚动条到底部的条件
        if (scrollTop + windowHeight == scrollHeight) {
          if (that.upLoading === true) {
            // 加载数据
            that.upLoading = false;
            that.page++;
            console.log(that.page);
            that.$axios
              .post(url, {
                goods_id: that.order,
                token: that.token,
                page: that.page,
                pageSize: 6
              })
              .then(res => {
                if (res.data.status === 1) {
                  if (res.data.data.length > 0) {
                    for (var i = 0; i < res.data.data.length; i++) { 
                      that.NotListe.push(res.data.data[i]); 
                      if(that.NotListe[i].realname === null){
                           that.NotListe[i].realname = that.moren;
                      }     
                    }
                    console.log(that.NotListe,'wqert');
                    that.upLoading = true;
                  } else {
                    that.upLoading = false;
                  }
                } else {
                }
              });
          }
        }
      };
    },
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
  }
};
</script>
<style  scoped>
.evaluate {
  overflow: hidden;
}
.sum {
  margin-top: 100px;
  padding-left: 30px;
  font-size: 25px;
  line-height: 100px;
  height: 100px;
  width: 100%;
  border-top: 5px solid #f2f2f2;
}
.e_num {
  overflow: hidden;
}
.e_num li {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: space-around;
  padding: 50px 40px 10px 40px;
  background: #f2f2f2;
  margin-bottom: 10px;
}
.e_num li div {
  display: flex;
  align-items: center;
 
}
.e_num li div span {
  padding-left: 10px;
  padding: 0px 20px;
}
.e_num li div img {
  height: 100px;
  width: 100px;
   margin-left: 20px;
}
.time {
  padding-left: 120px;
}
.touxiang {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>