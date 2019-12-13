<template>
  <div class="cart_one">
    <header class="k_header">购物车</header>
    <div class="k_content">
         <!-- <div class="gobuy" @click="gobuy()">去逛逛</div> -->
         <div class="fsdhf" @click="link()"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods:{
    link(){
      console.log(111)
    }
  },
  // name: "Cart",
  // methods:{
  //   gobuy(){
  //     console.log("444")
  //     this.$router.push("/Home")
  //   }
  // }
};
</script>
<style scoped>
.cart_one,
.k_content {
  height: 100%;
  font-size: 30px;
}
.k_header {
  font-size: 30px;
  height: 88px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #e6e6e6;
  position: fixed;
  top: 0;
  background: white;
  z-index: 20;
  width: 100%;
}
.k_content {
  background: url(../../../static/images/cart/cart01.png) no-repeat center
    center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
.k_content .gobuy {
  width: 300px;
  height: 88px;
  background: #2b883a;
  text-align: center;
  line-height: 88px;
  border-radius: 25px;
  color: white;
}
</style>