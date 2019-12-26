import Vue from 'vue'
import App from './App.vue'
// 引入ui框架
import echarts from 'echarts'
import china from './assets/map/china.json'
echarts.registerMap('china',china)
// 将自动注册所有组件为全局组件
import dataV from '@jiaminghi/data-view'

Vue.use(dataV) 


Vue.prototype.$echarts = echarts
echarts.registerMap('china', china)

Vue.config.productionTip = false

import VueRouter from "vue-router"
Vue.use(VueRouter)

import Vuex from "vuex"
Vue.use(Vuex)

import Home from './pages/Gome.vue'
// import Kind from './pages/Kind.vue'
// import Cart from './pages/Cart.vue'
// import youxuan from './pages/youxuan.vue'
// import My from './pages/My.vue'
// import reg from './pages/reg.vue'
// import login from './pages/login.vue'

const routes = [ {
  path: '/',
  redirect: '/home'
}, {
  path: '/home',
  component: Home,
      // children:[{
      //   path:'kind',
      //   name:'kind',
      //   component:Kind
      // },{
      //   path:'cart',
      //   name:'cart',
      //   component:Cart
      // },{
      //   path:'youxuan',
      //   name:'youxuan',
      //   component:youxuan
      // },{
      //   path:'my',
      //   name:'my',
      //   component:My
      // },{
      //   path:'home',
      //   name:'home',
      //   component:Home
      // }]
},
// ,{
//     path:"/kind",
//     name:"kind",
//     component:Kind
//   },{
//     path:'/cart',
//     name:'cart',
//     component:Cart
//   },{
//     path:'/youxuan',
//     name:'youxuan',
//     component:youxuan
//   },{
//     path:'/my',
//     name:'my',
//     component:My
//   },{
//     path:"/reg",
//     name:"reg",
//     component:reg
//   },{
//     path:'/login',
//     name:'login',
//     component:login
//   },
  {
    path:'/',
    name:'/home',
    component:Home
  }]

const store = new Vuex.Store({
    state:{
      navs:[{
        icon:"el-icon-s-home icfon",
        title:"首页",
        path:"gome"
   },{
        icon:"el-icon-menu icfon",
        title:"分类",
        path:"kind"
   },{
        icon:"el-icon-sunset icfon",
        title:"优选",
        path:"youxuan"
   },{
        icon:"el-icon-shopping-cart-full icfon",
        title:"购物车",
        path:"cart"
   },{
        icon:"el-icon-s-custom icfon",
        title:"我的",
        path:"my"
   }],
   nav:0
   },
   mutations:{
		editNav(state,data){
			state.nav = data;
		},
//		addGoods(state,data){
//			state.goods.push(data);
//		}
	},
	actions:{
		setNav(context,data){
			context.commit('editNav',data);
		},
//		setGoods(context,data){
//			context.commit('addGoods',data)
//		}
	},
	getters:{
		getNavs:state => {
			return state.navs;
		},
		getNav:state => {
			return state.nav;
		}
	}
})

const router = new VueRouter({
	routes
})
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
