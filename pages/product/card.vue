<template>
	<view class="container">
		<uni-nav-bar left-icon="back" @clickLeft="back" :fixed="true" background-color="#ffffff" color="#000000" title="Live cell phone cards"></uni-nav-bar>
		<div v-if="!imgUrl" class="content" id="htmlCanvas" ref="imgCanvas">
			<view class="spMsg">
				<img class="spLogo" src="../../static/images/home/photo.png"/>
				<view class="spModular">
					<view class="spTitle">ZshangpinneirGDHASDI...</view>
					<view class="priceModular">
						<view class="discountPrice">Closing Price: $562</view>
						<view class="originalPrice">Original Price:$8569</view>
					</view>
				</view>
			</view>
			<view class="liveTemplate">
				<view class="liveModular">
					<view class="liveSubject">
						<image class="starsLogo" src="../../static/images/detail/icon07.png"></image>
						<view class="liveTitle">LIVE BENEFITS</view>
					</view>
					<!-- <view class="logoSubject">
						<image class="linkLogo" src="../../static/images/detail/icon03.png"></image>
						<image class="cardLogo" src="../../static/images/detail/icon06.png"></image>
					</view> -->
				</view>
				<view class="liveContent">
					Price: 1.50 yuan per bag (bidding starts at 10 bag at 10 bags)，Price: 1.50 yuan per bag .
				</view>
			</view>
			
			<view class="sellTemplate">
				<view class="liveModular">
					<view class="liveSubject">
						<image class="starsLogo" src="../../static/images/detail/icon07.png"></image>
						<view class="liveTitle">SELLING POINT</view>
					</view>
					<!-- <view class="logoSubject">
						<image class="linkLogo" src="../../static/images/detail/icon03.png"></image>
					</view> -->
				</view>
				<view class="sellContent">
					<view class="sellContentText">1. Chongqing Strength Factory, Douyin hotpot base</view>
					<view class="sellContentText">2. Independent Small Packaging, 1 small bag 1 small</view>
					<view class="sellContentText">3.the praise rate is above 92% , product quality is guaranteed</view>
					<view class="sellContentText">
						4. the optimization of seasoning, craftsmanship quality, thicken
						pepper, spicy and addictive. The butter is rich and fragrant.
					</view>
					<view class="sellContentText">
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
						<view class="liveTitle">DELIVERY LOGISTICS</view>
					</view>
					<!-- <view class="logoSubject">
						<image class="linkLogo" src="../../static/images/detail/icon03.png"></image>
					</view> -->
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
		</div>
		
		<image class="cardLogo" v-if="imgUrl" mode="widthFix" :src="imgUrl"></image>
		
		<view class="bottom">
			<view class="underline"></view>
			<view class="btn">Long press to save the picture</view>
			<view class="underline"></view>
			<!-- <view class="btn" @click="save">Long press to save the picture</view> -->
		</view>
		
		<my-popup ref="myPopup" :isSuccess="isSuccess" :text="text"></my-popup>
	</view>
</template>

<script>
	import html2canvas from "html2canvas"
	import myPopup from "../common/myPopup.vue"
	export default {
		data() {
			return {
				isSuccess: '',
				text: '',
				imgUrl:"", // 用于存储base64图片
			}
		},
		components: {
			myPopup
		},
		mounted() {
			setTimeout(()=>{
				this.save()
			},200)
		},
		methods: {
			back() {
				window.history.go(-1)
			},
			save() {
				html2canvas(this.$refs.imgCanvas,{
					backgroundColor: null,
					useCORS: true, // 如果截图的内容里有图片,可能会有跨域的情况,加上这个参数,解决文件跨域问题
					scale: window.devicePixelRatio,
					dpi: 300,
				}).then((canvas)=>{
					let url = canvas.toDataURL('image/png', 1.0)
					this.imgUrl = url					
				})
				return
				this.isSuccess = true
				this.text = 'Successfully saved to album'
				this.$refs.myPopup.open()
			}
		}
	}
</script>

<style scoped>
	page {
		
	}
	
	.container {
		padding-bottom: 120rpx;
	}
	.content{
		/* max-height: 1130rpx; */
		margin: 20rpx 30rpx 20rpx;
		background: #F7F7F7;
		box-sizing: border-box;
		overflow: hidden;
		overflow-y: auto;
	}
	.content::-webkit-scrollbar {
	  display: none;
	}
	/* 商品详情 */
	.spMsg{
		background: #F7F7F7;
		padding: 20rpx 15rpx 40rpx 20rpx;
		display: flex;
	}
	.spLogo{
		width: 144rpx;
		height: 144rpx;
		display: block;
		border-radius: 8rpx;
	}
	.spModular{
		width: 484rpx;
		margin-left: 26rpx;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	}
	.spTitle{
		font-size: 28rpx;
		/* line-height: 30rpx; */
		font-family: Arial;
		font-weight: bold;
		color: #0B0B0B;
		
		overflow: hidden;
		white-space: nowrap;
		word-wrap: normal;
		text-overflow: ellipsis;
		-o-text-overflow: ellipsis;
	}
	.priceModular{
		width: 484rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.discountPrice{
		font-size: 26rpx;
		font-family: Arial;
		font-weight: 400;
		color: #FF7436
	}
	.originalPrice{
		font-size: 26rpx;
		font-family: Arial;
		font-weight: 400;
		color: #999999;
		text-decoration: line-through;
	}
	/* 直播利益 */
	.liveTemplate,
	.sellTemplate,
	.deliveryTemplate {
		padding: 20rpx 15rpx 20rpx 20rpx;
		background: #F7F7F7;
	}
	
	.liveModular {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.liveSubject {
		display: flex;
		align-items: center;
	}
	
	.starsLogo {
		width: 24rpx;
		height: 24rpx;
	}
	
	.liveTitle {
		font-size: 24rpx;
		font-family: Arial;
		font-weight: bold;
		color: #0B0B0B;
		margin-left: 8rpx;
	}
	
	.liveContent {
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #333333;
		padding: 16rpx 0 0 30rpx;
		line-height: 40rpx;
	}
	
	/* 商品卖点 */
	.sellTemplate {
		padding: 30rpx 15rpx 20rpx 20rpx;
	}
	
	
	.sellContent {
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #333333;
		padding: 16rpx 0 0 30rpx;
		line-height: 36rpx;
	}
	
	.sellContentText{
		margin-bottom: 10rpx;
	}
	
	/* 发货物流 */
	.deliveryTemplate {
		padding: 30rpx 0 20rpx 20rpx;
	}
	
	.deliveryContent {
		padding: 0 20rpx 0 30rpx;
	}
	
	.deliveryList {
		font-size: 24rpx;
		line-height: 24rpx;
		display: flex;
		margin-top: 20rpx;
		padding-bottom: 10rpx;
	}
	
	.deliveryTitle {
		width: 280rpx;
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #333333;
	}
	
	.deliveryMsg {
		width: 300rpx;
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #FF7436;
		margin-left: 40rpx;
	}
	/* 生成卡片样式 */
	 .cardLogo{
		width: 690rpx;
		margin: 20rpx 30rpx 20rpx;
	 }
	 
	/* 底部按钮 */
	.bottom{
		width: 100%;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		margin: 0 auto;
		padding: 25rpx 0;
		background: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.underline{
		width: 100rpx;
		height: 2rpx;
		background: #000000;
	}
	.btn{
		/* width: 670rpx; */
		height: 80rpx;
		line-height: 80rpx;
		/* color: #FFFFFF;
		background: #FF7436; */
		border-radius: 8rpx;
		
		font-size: 26rpx;
		font-family: Arial;
		color: #000000;
		font-weight: 400;
		text-align: center;
		
		margin: 0 20rpx;
	}
</style>
