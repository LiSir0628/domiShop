<template>
	<view class="container">
		<uni-nav-bar left-icon="back" @clickLeft="back" background-color="#ffffff" color="#000000" :fixed="true" title="Product details">
		</uni-nav-bar>

		<uni-swiper-dot class="uni-swiper-dot-box" :info="info" :current="current" mode="nav"
			:dots-styles="dotsStyles" field="content">
			<swiper class="swiper-box" @change="change" :current="swiperDotIndex">
				<swiper-item v-for="(item, index) in info" :key="index">
					<image class="banner" :src="item.url"></image>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
		
		<view class="priceTemplate">
			<view class="price"> 
				<text class="priceSpan">$</text>25632
			</view>
			<view class="profit">
				Estimated profit per unit:
				<text class="profitPrice">$5626</text>
			</view>
			<view class="rate">
				<image class="hotLogo" src="../../static/images/detail/icon02.png"></image>
				Commission rate: <text class="rateNum">35%</text>
			</view>
			<view class="totalSales">
				<view>Total sales: 562622</view>
				<view class="logoSubject">
					<image class="totalSalesLogo" src="../../static/images/detail/icon03.png"></image>
					<image class="totalSalesLogo" src="../../static/images/detail/icon04.png"></image>
				</view>
			</view>
			<view class="sample">
				<image class="menuLogo" src="../../static/images/detail/icon05.png"></image>
				<view class="priceContent">
					Sample request: 1. Number of followers 56263 2.Windotrtrtt...
				</view>
			</view>
		</view>
		
		<view class="liveTemplate">
			<view class="liveModular">
				<view class="liveSubject">
					<image class="starsLogo" src="../../static/images/detail/icon07.png"></image>
					<view class="liveTitle">Live benefits</view>
				</view>
				<view  class="logoSubject">
					<image class="totalSalesLogo" src="../../static/images/detail/icon03.png"></image>
					<image class="totalSalesLogo" src="../../static/images/detail/icon06.png"></image>
				</view>
			</view>
			<view class="liveContent">
				Price: 1.50 yuan per bag (bidding starts at 10 bag at 10 bags)，Price: 1.50 yuan per bag .
			</view>
		</view>
		
		<view class="sellTemplate">
			<view class="liveModular">
				<view class="liveSubject">
					<image class="starsLogo" src="../../static/images/detail/icon07.png"></image>
					<view class="liveTitle">Selling Point</view>
				</view>
				<view  class="logoSubject">
					<image class="totalSalesLogo" src="../../static/images/detail/icon03.png"></image>
				</view>
			</view>
			<view class="sellContent">
				<view>1. Chongqing Strength Factory, Douyin hotpot base</view>
				<view>2. Independent Small Packaging, 1 small bag 1 small</view>
				<view>3.the praise rate is above 92% , product quality is guaranteed</view>
				<view>
					4. the optimization of seasoning, craftsmanship quality, thicken
					pepper, spicy and addictive. The butter is rich and fragrant.
				</view>
				<view>
					5. a multi-purpose, can do hot pot, braised vegetables, Malatan
					INGREDIENTS: Butter, pepper, Douban, ginger, garlic, edibles
					seasoning, monosodium glutamate, rock sugar, spices
				</view>
			</view>
		</view>
		
		<view class="deliveryTemplate">
			<view class="liveModular">
				<view class="liveSubject">
					<image class="starsLogo" src="../../static/images/detail/icon07.png"></image>
					<view class="liveTitle">Delivery Logistics</view>
				</view>
				<view  class="logoSubject">
					<image class="totalSalesLogo" src="../../static/images/detail/icon03.png"></image>
				</view>
			</view>
			<view class="deliveryContent">
				<view class="deliveryList">
					<view class="deliveryTitle">Place of shipment</view>
					<view class="deliveryMsg">United Kingdom</view>
				</view>
				<view class="deliveryList">
					<view class="deliveryTitle">Delivery, express delivery</view>
					<view class="deliveryMsg">United Kingdom</view>
				</view>
				<view class="deliveryList">
					<view class="deliveryTitle">United Kingdom</view>
					<view class="deliveryMsg">Delivery in 48 hours</view>
				</view>
			</view>
		</view>
		
		<view class="detailTitle">
			<view class="underline"></view>
			Product details
			<view class="underline"></view>
		</view>
		
		<view class="spImages">
			<image class="spImage" mode="widthFix" src="../../static/images/detail/icon08.png"></image>
			<image class="spImage" mode="widthFix" src="../../static/images/detail/icon08.png"></image>
			<image class="spImage" mode="widthFix" src="../../static/images/detail/icon08.png"></image>
		</view>
		
		<view class="bottom">
			<image class="copyLogo" src="../../static/images/detail/icon03.png"></image>
			<view class="copy">Copy the link</view>
			<view class="add">Add a window</view>
			<view class="collection">Free sample collection</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: [{
						colorClass: '',
						url: '../../static/images/detail/icon08.png',
						content: ''
					},
					{
						colorClass: '',
						url: '../../static/images/detail/icon08.png',
						content: ''
					},
					{
						colorClass: '',
						url: '../../static/images/detail/icon08.png',
						content: ''
					}
				],

				current: 0,
				mode: 'default',
				dotsStyles: {},
				swiperDotIndex: 0
			}
		},
		mounted() {
			console.log(this.$store.state.accountName)
		},
		methods: {
			back() {
				window.history.go(-1)
			},
			change(e) {
				this.current = e.detail.current
				console.log(e)
			},
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

	.uni-swiper-dot-box {
		width: 750rpx;
		height: 750rpx
	}
	
	.swiper-box {
		width: 750rpx;
		height: 750rpx
	}
	
	.banner {
		width: 750rpx;
		height: 750rpx;
	}
	
	/deep/ .uni-swiper__dots-nav{
		background: none;
		justify-content: flex-end;
	}
	/deep/ .uni-swiper__dots-nav-item{
		width: 60rpx;
		height: 40rpx;
		line-height: 40rpx;
		background: #000000;
		opacity: 0.4;
		border-radius: 20rpx;
		
		text-align: center;
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #FFFFFF;
	}
	
	/* 价格展示模块 */
	.priceTemplate{
		padding: 30rpx 0 30rpx 30rpx;
		background: #ffffff;
	}
	.price{
		font-size: 46rpx;
		line-height: 28rpx;
		font-family: Arial;
		font-weight: bold;
		color: #FF3838;
	}
	.priceSpan{
		font-size: 24rpx;
		margin-right: 8rpx;
	}
	.profit{
		width: 392rpx;
		height: 48rpx;
		line-height: 48rpx;
		background: #FF3838;
		border-radius: 24rpx;
		
		font-size: 24rpx;
		font-family: Arial;
		color: #ffffff;
		text-align: center;
		margin-top: 21rpx;
	}
	.profitPrice{
		margin-left: 8rpx;
		font-size: 32rpx;
		color: #ffffff;
	}
	.rate{
		margin-top: 20rpx;
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #0B0B0B;
		line-height: 28rpx;
	}
	.hotLogo{
		width: 22rpx;
		height: 29rpx;
		margin-right: 8rpx;
	}
	.rateNum{
		margin-left: 4rpx;
		font-size: 32rpx;
	}
	.totalSales{
		font-size: 24rpx;
		line-height: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #333333;
		margin-top: 24rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.logoSubject{
		display: flex;
		align-items: center;
		margin-right: 30rpx;
	}
	.totalSalesLogo{
		width: 30rpx;
		height: 30rpx;
		margin-left: 18rpx;
		display: block;
	}
	.sample{
		width: 690rpx;
		height: 60rpx;
		background: rgba(40, 168, 151, 0.1);
		border-radius: 8rpx;
		margin-top: 25rpx;
		padding: 16rpx 20rpx 20rpx 20rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}
	.menuLogo{
		width: 24rpx;
		height: 24rpx;
	}
	.priceContent{
		width: 617rpx;
		font-size: 22rpx;
		font-family: Arial;
		font-weight: 400;
		color: #28A897;
		overflow: hidden;
		white-space: nowrap; 
		word-wrap: normal;  
		text-overflow: ellipsis;
		-o-text-overflow:ellipsis;
		margin-left: 10rpx;
	}
	
	/* 直播利益 */
	.liveTemplate,.sellTemplate,.deliveryTemplate{
		padding: 30rpx 0 30rpx 30rpx;
		background: #ffffff;
		margin-top: 20rpx;
	}
	.liveModular{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.liveSubject{
		display: flex;
		align-items: center;
	}
	.starsLogo{
		width: 24rpx;
		height: 24rpx;
	}
	.liveTitle{
		font-size: 24rpx;
		font-family: Arial;
		font-weight: bold;
		color: #0B0B0B;
		margin-left: 8rpx;
	}
	.liveContent{
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #333333;
		padding:44rpx 27rpx 0 30rpx;
		line-height: 40rpx;
	}
	/* 商品卖点 */
	.sellTemplate{
		
	}
	.sellContent{
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #333333;
		padding:44rpx 16rpx 0 30rpx;
		line-height: 40rpx;
	}
	/* 发货物流 */
	.deliveryTemplate{
		
	}
	.deliveryContent{
		padding: 14rpx 30rpx 0 30rpx;
	}
	.deliveryList{
		font-size: 24rpx;
		line-height: 24rpx;
		display: flex;
		margin-top: 30rpx;
	}
	.deliveryTitle{
		width: 280rpx;
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #333333;
	}
	.deliveryMsg{
		width: 320rpx;
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #FF7436;
		margin-left: 60rpx;
	}
	
	/* 标题线 */
	.detailTitle{
		width: 750rpx;
		height: 80rpx;
		line-height: 80rpx;
		background: #0B0B0B;
		font-size: 24rpx;
		font-family: Arial;
		font-weight: bold;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx;
		box-sizing: border-box;
		letter-spacing: 2rpx;
		margin-top: 20rpx;
	}
	.underline{
		width: 200rpx;
		height: 2rpx;
		background: #FFFFFF;
	}
	
	/* 商品图片展示 */
	.spImages{
		
	}
	.spImage{
		width: 100%;
		display: block;
	}
	
	
	/* 购物栏底部 */
	.bottom{
		width: 750rpx;
		height: 120rpx;
		background: #FFFFFF;
		border: 2rpx solid #CECECE;
		position: fixed;
		bottom: 0;
		padding: 24rpx 20rpx;
		box-sizing: border-box;
		
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.copyLogo{
		width: 20rpx;
		height: 20rpx;
	}
	.copy{
		font-size: 26rpx;
		font-family: Arial;
		font-weight: 400;
		color: #0B0B0B;
		margin-left: 8rpx;
	}
	.add{
		width: 202rpx;
		height: 72rpx;
		background: #0B0B0B;
		border-radius: 4rpx;
		font-size: 24rpx;
		font-family: Arial;
		font-weight: bold;
		color: #FFFFFF;
		text-align: center;
		line-height: 72rpx;
		margin-left: 16rpx;
	}
	.collection{
		width: 297rpx;
		height: 72rpx;
		background: #FF7436;
		border-radius: 4rpx;
		font-size: 24rpx;
		font-family: Arial;
		font-weight: bold;
		color: #FFFFFF;
		text-align: center;
		line-height: 72rpx;
		margin-left: 12rpx;
	}
	
</style>
