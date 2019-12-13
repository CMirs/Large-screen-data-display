import Vue from 'vue'
import Router from 'vue-router'
import { Dialog } from 'vant';



// 登录
import Login from '@/pages/login/Login'
//注册
import register from '@/pages/login/register'
//修改密码
import EditPassword from '@/pages/login/EditPassword'
//忘记密码
import Login_old from '@/pages/login/Login_old'
//首页
import Home from '@/pages/home/Home'
//公告详情
import NoticeDetails from '@/pages/notice/NoticeDetails'
//粉丝
import Funs from '@/pages/funs/Funs'
//用户
import Usar from '@/pages/users/User'
//订单详情
import Order from "@/pages/order/Order"

//奖励明细
import Success from '@/pages/users/success'
//个人资料
import personalData from '@/pages/users/personalData'
//优惠券
import Coupon from '@/pages/users/Coupon'
//代理
import Agent from '@/pages/users/agent'
//购物车
import Cart from '@/pages/cart/Carts'
import evaluate from '@/pages/cart/evaluate'
// 提交订单
import sumitOrder from '@/pages/order/sumitOrder' 
import OrderDetails from '@/pages/order/OrderDetails'
import shop_success from '@/pages/order/shop_success'
//搜索
import Search from '@/pages/search/Search'
//查看团队详情
import funsDetail from '@/pages/funs/funsDetail'
//文章详情
import newsDetail from '@/pages/news/newsDetail'
//奖励明细
import reward from '@/pages/users/reward'
//分享
import share from '@/pages/users/share'
//钱包
import myWallet from '@/pages/wallet/myWallet'
//钱包明细
import withdrawal from '@/pages/wallet/withdrawal'
//支付宝支付
import alipay from '@/pages/wallet/alipay'
// 支付
import payment from '@/pages/order/payment'
//账单明细
import cashOut from '@/pages/wallet/cashOut'
//账单明细
import zhangdan from '@/pages/wallet/zhangdan'
//修改用户名
import modifyUserName from '@/pages/users/modifyUserName'
// 地址模块
import Address from '@/pages/users/address/Address'
import AddAddress from '@/pages/users/address/AddAddress'
import EditAddress from '@/pages/users/address/EditAddress'
import SelectPoint from '@/pages/users/address/SelectPoint'


Vue.use(Router)

const router= new Router({
	mode: 'history',
	routes: [
		/**
		 * 登录
		 */
		{
			path: '/Login',
			name: 'Login',
			component:() => import('@/pages/login/Login'),
			meta:{requireAuth:true}
		},
		// 地址
		{
			path: '/users/address/Address',
			name: 'Address',
			component:() => import('@/pages/users/address/Address'),
			meta:{requireAuth:true}
		},
		{
			path: '/users/address/AddAddress',
			name: 'AddAddress',
			component:() => import('@/pages/users/address/AddAddress'),
			meta:{requireAuth:true}
		},
		{
			path: '/users/address/EditAddress',
			name: 'EditAddress',
			component:() => import('@/pages/users/address/EditAddress'),
			meta:{requireAuth:true}
		},
		{
			path: '/users/address/SelectPoint',
			name: 'SelectPoint',
			component:() => import('@/pages/users/address/SelectPoint'),
			meta:{requireAuth:true}
		},

		//注册
		{
			path: '/login/register',
			name: 'register',
			component:() => import('@/pages/login/register'),
			// meta:{requireAuth:true}
		},
		//修改密码
		{
			path: '/EditPassword',
			name: 'EditPassword',
			component:() => import('@/pages/login/EditPassword'),
			
		},
		//修改成功
		{
			path: '/Login_old',
			name: 'Login_old',
			component:() => import('@/pages/login/Login_old'),
			meta:{requireAuth:true}
		},
		//首页
		{
			path: '/Home',
			name: 'Home',
			component:() => import('@/pages/home/Home'),
			// component: (resolve) => require(['@/pages/home/Home'],resolve),
			// meta:{requireAuth:true}
		},
		//公告详情
		{
			path: '/notice/NoticeDetails',
			name: 'NoticeDetails',
			component:() => import('@/pages/notice/NoticeDetails'),
			meta:{requireAuth:true}
		},
		//公告列表
		{
			path: '/notice/NoticeList',
			name: 'NoticeList',
			component:() => import('@/pages/notice/NoticeList'),
			meta:{requireAuth:true}
		},
		//粉丝
		{
			path:'/funs/Funs',
			name:'Funs',
			component:() => import('@/pages/funs/Funs'),
			meta:{requireAuth:true}
		},
		//用户
		{
			path:'/users/User',
			name:'User',
			component:() => import('@/pages/users/User'),
			meta:{requireAuth:true}
		},
		//订单明细

		//奖励明细
		{
			path:'/users/success',
			name:'success',
			component:() => import('@/pages/users/success'),
			meta:{requireAuth:true}
		},
		//奖励明细
		{
			path:'/users/personalData',
			name:'personalData',
			component:() => import('@/pages/users/personalData'),
			meta:{requireAuth:true}
		},
		//区域代理
		{
			path:'/users/agent',
			name:'Agent',
			component:() => import('@/pages/users/agent'),
			meta:{requireAuth:true}
		},
		//购物车
		{
			path:'/cart/Cart',
			name:'Cart',
			component:() => import('@/pages/cart/Carts'),
			meta:{requireAuth:true}
		},
		// evaluate
		{
			path:'/cart/evaluate',
			name:'evaluate',
			component:() => import('@/pages/cart/evaluate'),
			meta:{requireAuth:true}
		},
		// 提交订单
		{
			path:'/order/sumitOrder',
			name:'sumitOrder',
			component:() => import('@/pages//order/sumitOrder'),
			meta:{requireAuth:true}
		},
		// 生成订单
		{	path:'/order/OrderDetails',
			name:'OrderDetails',
			component:() => import('@/pages//order/OrderDetails'),
			meta:{requireAuth:true}
		},
		// 支付
		{
			path:'/order/payment',
			name:'payment',
			component:() => import('@/pages/order/payment'),
			meta:{requireAuth:true}
		},
		// 购买成功
		{
			path:'/order/shop_success',
			name:'shop_success',
			component:() => import('@/pages//order/shop_success'),
			meta:{requireAuth:true}
		},
		{
			path:'/search/Search',
			name:'Search',
			component:() => import('@/pages/search/Search'),
			meta:{requireAuth:true}
		},
		//团队查看订单
		{
			path:'/funs/funsDetail'	,
			name:'funsDetail',
			component:()=>import('@/pages/funs/funsDetail'),
			meta:{requireAuth:true}
		},
		//资讯
		{
			path:'/news/newsList'	,
			name:'newsList',
			component:()=>import('@/pages/news/newsList'),
			meta:{requireAuth:true}
		},
		{
			path:'/news/newsDetail',
			name:'newsDetail',
			component:()=>import('@/pages/news/newsDetail'),
			meta:{requireAuth:true}
		},
		//奖励明细
		{
			path:'/users/reward',
			name:'reward',
			component:()=>import('@/pages/users/reward'),
			meta:{requireAuth:true}
		},
		// 优惠券
		{
			path:'/users/Coupon',
			name:'Coupon',
			component:()=>import('@/pages/users/Coupon'),
			meta:{requireAuth:true}
		},
		//分享
		{
			path:'/users/share',
			name:'share',
			component:()=>import('@/pages/users/share'),
			meta:{requireAuth:true}
		},
		// 钱包
		{
			path:'/wallet/myWallet',
			name:'myWallet',
			component:()=>import('@/pages/wallet/myWallet'),
			meta:{requireAuth:true}
		},
		{
			path:'/wallet/withdrawal',
			name:'withdrawal',
			component:()=>import('@/pages/wallet/withdrawal'),
			meta:{requireAuth:true}
		},
		{
			path:'/wallet/alipay',
			name:'alipay',
			component:()=>import('@/pages/wallet/alipay'),
			meta:{requireAuth:true}
		},
		{
			path:'/wallet/cashOut',
			name:'cashOut',
			component:()=>import('@/pages/wallet/cashOut'),
			meta:{requireAuth:true}
		},
		{
			path:'/wallet/zhangdan',
			name:'zhangdan',
			component:()=>import('@/pages/wallet/zhangdan'),
			meta:{requireAuth:true}
		},
		{
			path:'/users/modifyUserName',
			name:'modifyUserName',
			component:()=>import('@/pages/users/modifyUserName'),
			meta:{requireAuth:true}
		},
		{
			path:'/wallet/bankCard',
			name:'bankCard',
			component:()=>import('@/pages/wallet/bankCard'),
			meta:{requireAuth:true}
		},
		{
			path:'/users/kefu',
			name:'kefu',
			component:()=>import('@/pages/users/kefu'),
			meta:{requireAuth:true}
		},
		{
			path:'/download/detail',
			name:'detail',
			component:()=>import('@/pages/download/detail'),
			meta:{requireAuth:true}
		},
		{
			path:'/order/Order',
			name:'Order',
			component:()=>import('@/pages/order/Order'),
			meta:{requireAuth:true}
		},
		{
			path:'/order/Order1',
			name:'Order1',
			component:()=>import('@/pages/order/Order1'),
			meta:{requireAuth:true}
		},
		{
			path:'/order/Order2',
			name:'Order2',
			component:()=>import('@/pages/order/Order2'),
			meta:{requireAuth:true}
		},
		{
				path:'/order/Order3',
				name:'Order3',
				component:()=>import('@/pages/order/Order3'),
				meta:{requireAuth:true}
		},
		{
			path:'/order/Order4',
			name:'Order4',
			component:()=>import('@/pages/order/Order4'),
			meta:{requireAuth:true}
		},
		{
			path:'/gushi/guShi',
			name:'guShi',
			component:()=>import('@/pages/gushi/guShi'),
			meta:{requireAuth:true}
		},
		{
			path:'/cart/cartDetail',
			name:'cartDetail',
			component:()=>import('@/pages/cart/cartDetail'),
			meta:{requireAuth:true}
		},
		{
			path:'/login/Ediptpaypassword',
			name:'Ediptpaypassword',
			component:()=>import('@/pages/login/Ediptpaypassword'),
			meta:{requireAuth:true}
		},
		{
			path:'/order/LogisticsDetail',
			name:'LogisticsDetail',
			component:()=>import('@/pages/order/LogisticsDetail'),
			meta:{requireAuth:true}
		},
		{
			path:'/order/Evaluate',
			name:'Evaluate',
			component:()=>import('@/pages/order/Evaluate'),
			meta:{requireAuth:true}
		},
		//重定向 
		{
			path: '*',
			redirect: '/Login'
		}
		
	]
})

router.afterEach(() => {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
  })
//
//注册全局钩子函数
router.beforeEach((to,from,next) =>{
	if(to.matched.some(r => r.meta.requireAuth)){	//当前页面是否需要登录
		if(to.path === '/Login' || to.path ==='/Register'){
			next()
		}else{
			let token =localStorage.getItem('Authorization');
			if(token === null || token === ''){		//判断是否有token
				Dialog.confirm({
					message: '亲，还没有登录哦!'
				}).then(() =>{
					next('/Login');
				})
				next('/Login');
			}else{
				next()
			}
		}
	}else{
		next()
	}
})

export default router