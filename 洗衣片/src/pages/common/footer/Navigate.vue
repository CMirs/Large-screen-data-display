<template>
     <div class="Navigate">
        <ul>
 			<li>
 				<router-link exact to="/Home">
                    <i class="home-icon"></i>
 					<span class="text">首页</span>
 				</router-link>
 			</li>
 			<li>
 				<router-link to="/news/newsList">
 					<i class="news-icon"></i>
 					<span class="text">资讯</span>
 				</router-link>
 			</li>
 			<li>
 				<router-link to="/cart/Cart">
 					<i class="cart-icon"></i>
 					<span class="text">购物车</span>	
 				</router-link>
 			</li>
			 <li>
 				<router-link to="/users/User">
 					<i class="user-icon"></i>
 					<span class="text">我的</span>	
 				</router-link>
 			</li>
 		</ul>
    </div>
</template>

<script>
    export default {
        name:'Navigate',
        data(){
            return{
                
            }
        }
        
    }
</script>

<style lang="stylus" scoped>
.Navigate
	width 100%
	height 98px
	border-top 1px solid #f8f2f2
	background #ffffff
	z-index 9
	position fixed
	left 0
	bottom 0
	border-top 1px solid #ccc
	ul
		display flex
		height inherit
		li
			width 33%
			a
				width 100%
				height 100%
				display flex
				flex-direction column
				align-items center 
				justify-content center
				i
					width 100%
					height 40px
					margin 7px 0
					display block
				.home-icon
					background url(/static/images/public/home_of.png) no-repeat center center
					background-size 42px 39px
				.news-icon
					background url(/static/images/home/news_info.png) no-repeat center center
					background-size 39px 39px
				.cart-icon
					background url(/static/images/home/cart.png) no-repeat center center
					background-size 39px 39px
				
				.user-icon
					background url(/static/images/public/mine.png) no-repeat center center
					background-size 34px 39px
				span
					font-size 26px;
					color #7f7f7f
				
			.router-link-exact-active
				.home-icon
					background url(/static/images/public/home.png) no-repeat center center
					background-size 42px 39px
				.news-icon
					background url(/static/images/home/news.png) no-repeat center center
					background-size 39px 39px
				.cart-icon
					background url(/static/images/home/cart_info.png) no-repeat center center
					background-size 39px 39px
				.user-icon
					background url(/static/images/public/mine_of.png) no-repeat center center
					background-size 34px 39px
				span
					color #2b883a	
</style>


