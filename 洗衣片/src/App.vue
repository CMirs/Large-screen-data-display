<template>
  <div id="app">
    <!-- <router-view v-if="isRouterAlive"></router-view> -->
	<router-view></router-view>
	<!-- loading 加载 -->
	<Loading v-if="isLoading"></Loading>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Loading from '@/pages/common/loading/Loading'

export default {
	name: 'App',
	// provide(){
	// 	return {
	// 		reload:this.reload
	// 	}
	// },
	// data(){
	// 	return{
	// 		isRouterAlive:true
	// 	}
		
	// },
	// methods:{
	// 	reload(){
	// 		this.isRoutweAlive = false
	// 		this.$nextTick(function(){
	// 			this.$isRouterAlive = true
	// 		})
	// 	}
		

	// },
	computed:{
		...mapState([
		'isLoading'
		])
  	},
	components:{
		Loading
	}
}
</script>

<style>
@import 'https://xiyipian.oss-cn-shenzhen.aliyuncs.com/Alibaba-PuHuiTi-Medium.otf';
html,body,#app{
      height: 100%;
	  font-family :"阿里巴巴普惠体"
}
@font-face {
	font-family: "阿里巴巴普惠体";
	src: url('https://xiyipian.oss-cn-shenzhen.aliyuncs.com/Alibaba-PuHuiTi-Medium.otf');
}
body{color: #151515}
	
body .height-88{width: 100%;
		height: 88px;}
		
		
.van-tab--active{
  background: #7cb78e;
}
.C_content .van-tab--active{
	background: none;
  border-bottom:5px solid green!important;
}
.van-tabs__line {
	display :none;
}

.van-tabs__content{
	border-top:10px solid #f2f2f2!important;

}
</style>
