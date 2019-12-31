<template>
  <div id="app">
    
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'app',
  components: {}
}
</script>

<style>
  *{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  #app{
    height: 100%;
  }
html,body{
    /*     b
    *1920宽：
    19.2px=1vw 
    100px约等于5.20833vw   */
    font-size: 5.20833vw;
    height: 100%;
}
a{
  text-decoration: none;
}
ul,li{
  list-style: none;
}
.purchase-scroll .dv-scroll-board .rows .row-item{
  font-size: .22rem!important;
}
.fruit-growers-scroll .dv-scroll-board .rows .row-item{
  font-size: .18rem!important;
}
</style>
