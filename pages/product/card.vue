<template>
	<view class="container">
		<uni-nav-bar left-icon="back" @clickLeft="back" :fixed="true" background-color="#ffffff" color="#000000" :title="$t('card.Live_cell_phone_cards')"></uni-nav-bar>
		<div v-if="!imgUrl" class="content" id="htmlCanvas" ref="imgCanvas">
			<view class="spMsg">
				<img v-if="spLogo" class="spLogo" :src="spLogo"/>
				<img v-else class="spLogo" src="../../static/images/product/icon18.png"></img>
				<view class="spModular">
					<view class="spTitle">{{title}}</view>
					<view class="priceModular">
						<view class="discountPrice">{{ $t('card.Closing_Price') }}: <!-- $562 -->{{commission}}</view>
						<view class="originalPrice">{{ $t('card.Original_Price') }}:<!-- $8569 -->{{unit_price}}</view>
					</view>
				</view>
			</view>
			<view class="liveTemplate">
				<view class="liveModular">
					<view class="liveSubject">
						<image class="starsLogo" src="../../static/images/detail/icon07.png"></image>
						<view class="liveTitle">{{ $t('card.LIVE_BENEFITS') }}</view>
					</view>
					<!-- <view class="logoSubject">
						<image class="linkLogo" src="../../static/images/detail/icon03.png"></image>
						<image class="cardLogo" src="../../static/images/detail/icon06.png"></image>
					</view> -->
				</view>
				<view class="liveContent" v-html="benefits">
					<!-- Price: 1.50 yuan per bag (bidding starts at 10 bag at 10 bags)，Price: 1.50 yuan per bag . -->
				</view>
			</view>
			
			<view class="sellTemplate">
				<view class="liveModular">
					<view class="liveSubject">
						<image class="starsLogo" src="../../static/images/detail/icon07.png"></image>
						<view class="liveTitle">{{ $t('card.SELLING_POINT') }}</view>
					</view>
					<!-- <view class="logoSubject">
						<image class="linkLogo" src="../../static/images/detail/icon03.png"></image>
					</view> -->
				</view>
				<view class="sellContent" v-html="selling_point">
					<!-- <view class="sellContentText">1. Chongqing Strength Factory, Douyin hotpot base</view>
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
					</view> -->
				</view>
			</view>
			
			<view class="deliveryTemplate">
				<view class="liveModular">
					<view class="liveSubject">
						<image class="starsLogo" src="../../static/images/detail/icon07.png"></image>
						<view class="liveTitle">{{ $t('card.DELIVERY_LOGISTICS') }}</view>
					</view>
					<!-- <view class="logoSubject">
						<image class="linkLogo" src="../../static/images/detail/icon03.png"></image>
					</view> -->
				</view>
				<view class="deliveryContent">
					<!-- <view class="deliveryList">
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
					</view> -->
					<view class="deliveryList">
						<view class="deliveryTitle">{{ $t('card.shipment') }}</view>
						<view class="deliveryMsg">{{delivery_place}}</view>
					</view>
					<view class="deliveryList">
						<view class="deliveryTitle">{{ $t('card.express_delivery') }}</view>
						<view class="deliveryMsg">{{express_company}}</view>
					</view>
					<view class="deliveryList">
						<view class="deliveryTitle">{{ $t('card.Delivery_Time') }}</view>
						<view class="deliveryMsg">{{delivery_time}}</view>
					</view>
				</view>
			</view>
		</div>
		
		<image class="cardLogo" v-if="imgUrl" mode="widthFix" :src="imgUrl"></image>
		
		<view class="bottom">
			<view class="underline"></view>
			<view class="btn">{{ $t('card.Long') }}</view>
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
				
				id: "",
				title: "ZshangpinneirGDHASDIZ",
				banner:[],
				spLogo: "",
				
				left_icon: "货币图标-左边",
				right_icon: "货币图标-右边",
				unit_price: "",
				commission: "",
				commission_ratio: "",
				cumulative_sales: "",
				
				benefits: "",
				selling_point: "",
				delivery_place: "",
				express_company: "",
				delivery_time: "",
				
			}
		},
		components: {
			myPopup
		},
		onLoad(option) {
			//如果参数有值，渠道入口-请求
			//如果首页、分类特殊值有值-请求（不与上方同时触发）
			if (option.id) this.id = option.id
			this.getHttpLists()
		},
		mounted() {
			// setTimeout(()=>{
			// 	this.save()
			// },200)
		},
		methods: {
			getHttpLists() {
				uni.showLoading({
					title: this.$t('common').loading + '...',
					mask: true
				});
				this.$myRequest({
						method: 'GET',
						url: 'api/tiktok/product/detail',
						data: {
							id: this.id
						}
					})
					.then(res => {
						uni.hideLoading();
						if (res.data.code == 200) {
							console.log(res.data.data)
							let obj = res.data.data;
							
							this.title = obj.title ? obj.title : this.title
							this.banner = obj.banner
							if(this.banner.length > 0){
								console.log("有轮播图")
								this.spLogo = this.banner[0]
							}
							this.left_icon = obj.left_icon
							this.right_icon = obj.right_icon
							this.unit_price = obj.unit_price
							this.commission = obj.commission
							this.commission_ratio = obj.commission_ratio
							this.cumulative_sales = obj.cumulative_sales

							this.benefits = obj.benefits
							this.selling_point = obj.selling_point
							this.delivery_place = obj.delivery_place
							this.express_company = obj.express_company
							this.delivery_time = obj.delivery_time
							
							// setTimeout(()=>{
							// 	this.save()
							// },200)
							
						} else {
							uni.showModal({
								title: this.$t('common').Tip,
								content: res.data.msg,
								confirmText: this.$t('common').confirm,
								showCancel: false,
							})
						}
					})
					.catch(err => {
						uni.hideLoading();
						uni.showModal({
							title: this.$t('common').Tip,
							content: this.$t('common').Network,
							confirmText: this.$t('common').confirm,
							//content: err,
							showCancel: false,
						})
				})
			},
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
		flex-direction: column;
		justify-content: space-between;
		/* align-items: center; */
	}
	.spTitle{
		font-size: 28rpx;
		/* line-height: 30rpx; */
		font-family: Arial;
		font-weight: bold;
		color: #0B0B0B;
		
		/* overflow: hidden;
		white-space: nowrap;
		word-wrap: normal;
		text-overflow: ellipsis;
		-o-text-overflow: ellipsis; */
	}
	.priceModular{
		width: 484rpx;
		display: flex;
		flex-wrap: wrap;
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
