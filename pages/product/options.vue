<template>
	<view class="container">
		<view class="top">
			<view class="search">
				<image class="searchLogo" src="../../static/images/home/icon02.png" @click="search"></image>
				<input class="searchText" v-model="searchText" placeholder="Search for products you want" />
			</view>
		</view>
		<view class="navbar">
			<scroll-view class="scroll-view_H" :scroll-left="scrollLeft" scroll-x="true" @scroll="scroll"
				:show-scrollbar="false">
				<view class="scroll-view-item_H" v-for="item,index in category_lists"
					:class="{'scroll-view-item-active':cindex == index}" @click="scrollChoose(index)">
					{{item.name}}
					<view :class="{'underline': index == cindex}"></view>
				</view>
			</scroll-view>
		</view>
		<view class="uni-margin-wrap">
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
				:duration="duration">
				<swiper-item>
					<image style="width: 690rpx;" mode="widthFix" src="../../static/images/detail/icon11.png"></image>
				</swiper-item>
				<swiper-item>
					<image style="width: 690rpx;" mode="widthFix" src="../../static/images/detail/icon12.png"></image>
				</swiper-item>
			</swiper>
		</view>
		<view>
			<!-- 升降排序 -->
			<scroll-view class="tab" :class="{tabHeight: isShowTabHeight}" :scroll-left="scrollTabLeft" scroll-x="true" @scroll="scrollTab"
				:show-scrollbar="false">
				<view class="scroll-view-item_Tab" v-for="item,index in scrollTabList"
					:class="{'scroll-view-item-activeTab':citem == index}" @click="scrollChooseTab(index)">
						{{item.name}}
						<image class="sortLogo" v-if="item.rise" src="../../static/images/product/icon03.png"></image>
						<image class="sortLogo" v-else-if="item.drop" src="../../static/images/product/icon04.png"></image>
						<image class="sortLogo" v-else src="../../static/images/product/icon05.png"></image>
				</view>
				<view class="scroll-view-item_Tab" @click="toggle('bottom')">
					<view class="sortText">{{orderState}}</view>
					<image class="arrowDown" src="../../static/images/product/icon11.png"></image>
				</view>
			</scroll-view>
		</view>
		<view class="productList" :class="{productListHeight: isShowTabHeight}" v-if="product_lists.length > 0">
			<view class="product" v-for="item,index in product_lists" @click="goDetail(index)">
				<image class="productLogo" :src="item.image"></image>
				<view class="productMsg">
					<view class="productTitle">{{item.title}}</view>
					<view class="pricePlan">
						<view>Sales: <text class="sales">{{item.cumulative_sales}}</text></view>
						<view>Price: <text class="price">${{item.unit_price}}</text></view>
					</view>
					<view class="commission">High Commission: {{item.commission_ratio}}%</view>
					<view class="earnedMsg">
						<image class="priceLogo" src="../../static/images/product/icon06.png"></image>
						<text class="earned">Earned: ${{item.commission}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="productList" :class="{productListHeight: isShowTabHeight}" v-else>
			<view class="noData">
				<image class="noDataLogo" src="../../static/images/common/icon02.png"></image>
				<view class="noDataText">It's empty</view>
			</view>
		</view>
		
		<view>
			<!-- 普通弹窗 -->
			<uni-popup ref="popup" background-color="#fff">
				<view class="popup-content">
					<view class="popupChoose" v-for="item,index in orderStateList" :class="{'activePopupChoose': kindex == index}" @click="getOrderState(index,item.name)">{{item.name}}</view>
					<view class="confirmed" @click="confirmed">Cancels</view>
				</view>
			</uni-popup>
		</view>
		
		<view class="bottomNavigation">
			<view class="bottomNav" @click="goIndex">
				<!-- <image class="navLogo" src="../../static/images/home/icon06.png"></image> -->
				<image class="navLogo" src="../../static/images/product/icon01.png"></image>
				<view class="navText">Order form</view>
			</view>
			<view class="bottomNav">
				<image class="navLogo" src="../../static/images/product/icon02.png"></image>
				<view class="navActiveText">Options</view>
			</view>
			<view class="bottomNav" @click="goIndividuals">
				<image class="navLogo" src="../../static/images/product/icon10.png"></image>
				<view class="navText">Individuals</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchText: "",
				cindex: 0,
				scrollLeft: 0,
				category_lists: [{
					id: 1,
					name: 'All of it'
				}, {
					id: 2,
					name: 'Food and drink'
				}, {
					id: 3,
					name: 'SMART home'
				}, {
					id: 4,
					name: 'General merchandise'
				}, {
					id: 5,
					name: 'Beauty makeup'
				}, {
					id: 6,
					name: 'Beauty makeup'
				}],
				
				indicatorDots: true,
				autoplay: true,
				interval: 60000,
				duration: 500,
				
				citem: 0,
				scrollTabLeft: 0,
				scrollTabList: [{
					id: 1,
					name: 'Closing Price',
					rise: false,
					drop: false
				}, {
					id: 2,
					name: 'Commission ratio',
					rise: false,
					drop: false
				}, {
					id: 3,
					name: 'Amount of commission',
					rise: false,
					drop: false
				}],
				isShowTabHeight: false,
				
				orderStateList:[{
					id: 1,
					name: 'Total sales'
				},{
					id: 2,
					name: '24 hours'
				},{
					id: 3,
					name: 'Two hours'
				}],
				kindex: 0,
				prepareState: 'sales',
				orderState: 'sales',
				
				//productList:[],
				product_lists:[{
					id: 1,
					image: '../../static/images/home/photo.png',					title: 'zhelishi shangpinbiao tishangpin...',					cumulative_sales: 111, 					unit_price: 111,					commission_ratio: 1,					commission: 1,
				},{
					id: 2,
					image: '../../static/images/home/photo.png',					title: 'zhelishi shangpinbiao tishangpin...',					cumulative_sales: 52366, 					unit_price: 6525,					commission_ratio: 20,					commission: 21,
				},{
					id: 3,
					image: '../../static/images/home/photo.png',					title: 'zhelishi shangpinbiao tishangpin...',					cumulative_sales: 52366, 					unit_price: 6525,					commission_ratio: 20,					commission: 21,
				},{
					id: 4,
					image: '../../static/images/home/photo.png',					title: 'zhelishi shangpinbiao tishangpin...',					cumulative_sales: 52366, 					unit_price: 6525,					commission_ratio: 20,					commission: 21,
				},{
					id: 5,
					image: '../../static/images/home/photo.png',					title: 'zhelishi shangpinbiao tishangpin...',					cumulative_sales: 52366, 					unit_price: 6525,					commission_ratio: 20,					commission: 21,
				},{
					id: 6,
					image: '../../static/images/home/photo.png',					title: 'zhelishi shangpinbiao tishangpin...',					cumulative_sales: 52366, 					unit_price: 6525,					commission_ratio: 20,					commission: 21,
				}]
			}
		},
		onLoad(option) {

		},
		onReachBottom() {
			//上拉加载，请求记得限制。
			console.log("选品页触底了,加载一下")
		},
		mounted() {
			window.onscroll = (()=>{
				var scroll = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
				// console.log(scroll);
				if(scroll>=200){
					// 分类 固定展示
					this.isShowTabHeight = true
				} else {
					// 分类 不固定展示
					this.isShowTabHeight = false
				}
			})
		},
		methods: {
			goDetail(index) {
				uni.navigateTo({
					url: './detail?id=' + this.product_lists[index].id
				});
			},
			search() {
				console.log(this.searchText)
			},
			toggle(type) {
				// 获取选项索引
				for(let i in this.orderStateList){
					if(this.orderStateList[i].name == this.orderState){
						this.prepareState = this.orderState
						this.kindex = i
					}
				}
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open(type)
			},
			getOrderState(index,name) {
				this.kindex = index
				this.prepareState = name
				// 点击后直接赋值触发
				if(this.orderState == this.prepareState){
					//相同状态,不再次触发接口请求
					this.$refs.popup.close()
					console.log("我没请求")
				} else {
					//其他升降序全部关闭
					for(let i in this.scrollTabList){
						this.scrollTabList[i].rise = false
						this.scrollTabList[i].drop = false
					}		
					this.orderState = this.prepareState
					this.$refs.popup.close()
					console.log("我有请求")
				}
			},
			confirmed(){
				// 销售选择关闭
				this.$refs.popup.close()
				this.prepareState = "sales"
				this.orderState = "sales"
				this.kindex = 0
			},
			
			
			scrollChoose(index) {
				if (this.cindex == index) return
				this.cindex = index
				console.log(index)
				// this.$nextTick(()=>{
				// 	const that = this
				// 	let view = uni.createSelectorQuery().select(".scroll-view-item-active")
				// 	view.boundingClientRect(function(data) {
				// 		console.log(data)
				// 		that.scrollLeft = parseInt(data.left)
				// 	}).exec();
				// })
			},
			scroll(e) {
				// this.scrollLeft = e.detail.scrollLeft
				// console.log(e)
				// console.log(this.scrollLeft)
			},
			scrollChooseTab(index) {
				let oldCitem = this.citem
				this.citem = index
				// 首次点击为升序，再次点击为降序
				if(this.scrollTabList[index].rise == false){
					this.scrollTabList[index].rise = true
					this.scrollTabList[index].drop = false
				} else if(this.scrollTabList[index].rise){
					this.scrollTabList[index].rise = false
					this.scrollTabList[index].drop = true
				}
				//切换 分类点击，旧分类变为随机排序
				if(oldCitem != this.citem) this.scrollTabList[oldCitem].rise = false
				if(oldCitem != this.citem) this.scrollTabList[oldCitem].drop = false
				console.log(this.citem)
			},
			scrollTab(e) {
				
			},
			goIndex() {
				uni.navigateTo({
					url: './../index/index'
				});
			},
			goIndividuals() {
				uni.navigateTo({
					url: './../user/user'
				});
			}
			
		}
	}
</script>

<style scoped>
	page {
		width: 100%;
		height: 100%;
	}
	
	.container {
		width: 100%;
		min-height: 100%;
		background: #F7F7F7;
		line-height: normal;
		padding-bottom: 120rpx;
	}

	.top {
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: #FFFFFF;
		z-index: 101;
		padding-bottom: 20rpx;
	}

	.search {
		width: 690rpx;
		height: 80rpx;
		background: #F7F7F7;
		border-radius: 40rpx;
		margin: 17rpx 30rpx 0 30rpx;
		display: flex;
		align-items: center;
	}

	.searchLogo {
		width: 32rpx;
		height: 32rpx;
		margin: 0 10rpx 0 40rpx;
	}

	.searchText {
		width: 580rpx;
		height: 80rpx;
		font-size: 26rpx;
		font-family: Arial;
		font-weight: 400;
		color: #666666;
		line-height: 80rpx;
	}
	
	/* 滑动块 */
	.navbar {
		padding: 8rpx 0 20rpx 30rpx;
		margin-top: 116rpx;
		background: #FFFFFF;
	}
	
	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}
	
	.scroll-view-item {
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
		font-size: 36rpx;
	}
	
	.scroll-view-item_H {
		display: inline-block;
		text-align: center;
		font-size: 28rpx;
		font-family: Arial;
		font-weight: 400;
		color: #999999;
		line-height: normal;
		margin-right: 62rpx;
	}
	
	.scroll-view-item-active {
		font-size: 32rpx;
		font-family: Arial;
		font-weight: bold;
		color: #0B0B0B;
	}
	
	.underline{
		width: 40rpx;
		height: 8rpx;
		background: #FF7436;
		border-radius: 4rpx;
		margin: 20rpx auto 0;
	}
	
	/deep/ ::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}

	/* 轮播图 */
	.uni-margin-wrap {
		width: 690rpx;
		min-height: 260rpx;
		padding: 0 30rpx 30rpx;
		background: #FFFFFF;
		border-radius: 8rpx;
	}

	.swiper {
		height: 260rpx;
		position: relative;
		border-radius: 4px;
	}

	.swiper-item {
		display: block;
		min-height: 260rpx;
		line-height: 260rpx;
		text-align: center;
	}

	/deep/ uni-swiper .uni-swiper-dots-horizontal {
		bottom: 17rpx;
	}

	/deep/ uni-swiper .uni-swiper-dot {
		width: 20rpx;
		height: 8rpx;
		background: #FFFFFF;
		border-radius: 4rpx;
	}

	/deep/ uni-swiper .uni-swiper-dot-active {
		width: 20rpx;
		height: 8rpx;
		background: #000000;
		opacity: 0.4;
		border-radius: 4rpx;
	}
	
	/* 分类 */
	.tab{
		width: 100%;
		padding: 24rpx 0 24rpx 30rpx;
		box-sizing: border-box;
		background: #F7F7F7;
		white-space: nowrap;
	}
	.tabHeight{
		position: fixed;
		top: 112rpx;
		z-index: 100;
	}
	.scroll-view-item_Tab {
		display: inline-block;
		text-align: center;
		font-size: 26rpx;
		font-family: Arial;
		font-weight: 400;
		color: #0B0B0B;
		line-height: normal;
		margin-right: 40rpx;
		/* font-size: 28rpx;
		font-family: Arial;
		font-weight: 400;
		color: #999999;
		line-height: normal;
		margin-right: 62rpx; */
	}
	
	.scroll-view-item-activeTab {
		/* font-size: 32rpx;
		font-family: Arial;
		font-weight: bold;
		color: #0B0B0B; */
	}
	
	.sortLogo{
		width: 18rpx;
		height: 18rpx;
		margin-left: 8rpx;
	}
	
	.sortText {
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		display: inline-block;
	}
	
	.arrowDown {
		width: 15rpx;
		height: 9rpx;
		margin: 0 0 2rpx 8rpx;
		/* margin-left: 8rpx; */
		vertical-align: middle;
		display: inline-block;
	}
	
	/* 商品展示列表 */
	.productListHeight{
		margin-top: 86rpx;
	}
	.productList{
		width: 100%;
		/* height: 2000rpx; */
		padding: 0 30rpx;
		/* background: #cecece; */
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.product{
		width: 335rpx;
		/* height: 593rpx; */
		background: #ffffff;
		margin-bottom: 19rpx;
		border-bottom-left-radius: 8rpx;
		border-bottom-right-radius: 8rpx;
	}
	.productLogo{
		width: 335rpx;
		height: 335rpx;
		border-top-left-radius: 8rpx;
		border-top-right-radius: 8rpx;
		display: block;
	}
	.productMsg{
		padding: 16rpx 11rpx 17rpx;
		border-bottom-left-radius: 8rpx;
		border-bottom-right-radius: 8rpx;
	}
	.productTitle{
		font-size: 28rpx;
		font-family: Arial;
		font-weight: bold;
		color: #0B0B0B;
		letter-spacing: 1rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}	.pricePlan{
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #666666;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 22rpx;
	}	.sales{
		color: #0B0B0B;
		font-weight: bold;
	}	.price{
		color: #0B0B0B;
		font-weight: bold;
	}	.commission{
		width: 280rpx;
		height: 40rpx;
		background: rgba(255, 116, 54, 0.1);
		border-radius: 20rpx;
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #FF7436;
		text-align: center;
		line-height: 40rpx;
		margin-top: 19rpx;
	}
	.earnedMsg{
		margin-top: 17rpx;
	}
	.priceLogo{
		width: 22rpx;
		height: 22rpx;
	}
	.earned{
		font-size: 28rpx;
		font-family: Arial;
		font-weight: bold;
		color: #FF3838;
		margin-left: 8rpx;
	}
	
	/* 下拉框弹窗 */
	.popup-content {
		width: 750rpx;
		height: 405rpx;
		/* display: flex;
		align-items: center;
		justify-content: center; */
		background-color: #fff;
		box-sizing: border-box;
		text-align: center;
		position: relative;
	}
	.popupChoose{
		width: 750rpx;
		height: 78rpx;
		line-height: 78rpx;		
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #999999;
		border-bottom: 2rpx solid #F7F7F7;
	}
	.popupChoose:nth-last-child(2){
		border-bottom: none;
	}
	.activePopupChoose{
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #111111;
	}
	.confirmed{
		width: 670rpx;
		height: 80rpx;
		background: #FF7436;
		border-radius: 8rpx;
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 80rpx;
		position: absolute;
		left: 0;
		right: 0;
		margin: 0 auto;
		bottom: 37rpx;
	}
	
	/* 底部导航 */
	.bottomNavigation{
		position: fixed;
		width: 750rpx;
		height: 97rpx;
		background: #FEFEFE;
		bottom: 0;
		left: 0;	
		display: flex;
		/* align-items: center; */
		justify-content: space-around;
		border-top: 2rpx solid #f7f7f7;
	}
	.bottomNav{
		width: 33.3%;
		text-align: center;
	}
	.navLogo{
		width: 42rpx;
		height: 42rpx;
		display: block;
		margin: 13rpx auto 0;
	}
	.navText,.navActiveText{
		font-size: 20rpx;
		line-height: 20rpx;
		font-family: Arial;
		font-weight: 400;
		color: #999999;
		margin-top: 11rpx;
	}
	.navActiveText{
		color: #0B0B0B;
	}
	
	/* 无数据展示 */
	.noData{
		text-align: center;
		margin: 200rpx auto 0;
	}
	.noDataLogo{
		width: 188rpx;
		height: 158rpx;
	}
	.noDataText{
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #CECECE;
		line-height: 24rpx;
		margin-top: 12rpx;
	}
</style>
