<template>
	<view class="container">
		<view class="title">Order board</view>
		<view class="navbar">
			<scroll-view class="scroll-view_H" :scroll-left="scrollLeft" scroll-x="true" @scroll="scroll"
				:show-scrollbar="false">
				<view class="scroll-view-item_H" v-for="item,index in scrollList"
					:class="{'scroll-view-item-active':cindex == index}" @click="scrollTab(index)">{{item.name}}</view>
			</scroll-view>
		</view>

		<view class="banner">
			<!-- <image class="bannerLogo" src="../../static/images/home/icon04.png"></image> -->
			<view class="uni-margin-wrap">
				<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay"
					:interval="interval" :duration="duration">
					<swiper-item>
						<image class="bannerLogo" src="../../static/images/home/icon04.png"></image>
						<view class="swiperDataList">
							<view class="swiperData">
								<view class="swiperDataNum">$52563.23</view>
								<view class="swiperDataTitle">Total sales</view>
							</view>
							<view class="swiperData">
								<view class="swiperDataNum">$52563.23</view>
								<view class="swiperDataTitle">Effective sales</view>
							</view>
							<view class="swiperData">
								<view class="swiperDataNum">$52563.23</view>
								<view class="swiperDataTitle">Full Commission</view>
							</view>
						</view>
						<view class="swiperDataListBottom">
							<view class="swiperData">
								<view class="swiperDataNum">$52563.23</view>
								<view class="swiperDataTitle">Effective Commission</view>
							</view>
							<view class="swiperData">
								<view class="swiperDataNum">$52563.23</view>
								<view class="swiperDataTitle">Full Commission</view>
							</view>
							<view class="swiperData">
								<view class="swiperDataNum">$52563.23</view>
								<view class="swiperDataTitle">Effective Commission</view>
							</view>
						</view>
					</swiper-item>
					<swiper-item>
						<image class="bannerLogo" src="../../static/images/home/icon04.png"></image>
						<view class="swiperDataList">
							<view class="swiperData">
								<view class="swiperDataNum">10000</view>
								<view class="swiperDataTitle">All singular</view>
							</view>
							<view class="swiperData">
								<view class="swiperDataNum">10000</view>
								<view class="swiperDataTitle">Effective singular</view>
							</view>
							<view class="swiperData">
								<view class="swiperDataNum">10000</view>
								<view class="swiperDataTitle">Refund orders</view>
							</view>
						</view>
						<view class="swiperDataListBottom">
							<view class="swiperData">
								<view class="swiperDataNum">$52563.23</view>
								<view class="swiperDataTitle">Refund sales</view>
							</view>
							<view class="swiperData">
								<view class="swiperDataNum">$52563.23</view>
								<view class="swiperDataTitle">Refund Commission</view>
							</view>
							<view class="swiperData">
								<view class="swiperDataNum">10%</view>
								<view class="swiperDataTitle">Refund rate</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>

		<view class="rankModular">
			<view class="merchandise" v-for="item,index in rankList" @click="goData(index)">
				<view class="merchandiseTop">
					<image class="merchandiseLogo" :src="item.image"></image>
					<image class="arrowRight" src="../../static/images/home/icon05.png"></image>
				</view>
				<view class="merchandiseBottom">{{item.name}}</view>
			</view>
		</view>

		<view class="sortList">
			<view class="sort" @click="toggle('bottom')">
				<view class="sortText">{{orderState}}</view>
				<image class="arrowDown" src="../../static/images/home/icon12.png"></image>
			</view>
			<view class="sort" @click="goSwitch">
				<view class="sortText">{{accountName}}</view>
				<image class="arrowDown" src="../../static/images/home/icon12.png"></image>
			</view>
		</view>

		<view class="spList">
			<view class="sp">
				<view class="spTop">
					<image class="spLogo" src="../../static/images/home/photo.png"></image>
					<view class="spMsg">
						<view class="spDes">zhelishi shangpinneirongshangpinne shangpinneirongs,zhelishi
							shangpinneirongshangpinne shangpinneirongs</view>
						<view class="spOperation">
							<view class="state">order paid</view>
							<view class="time">10-18 16:05:20 payment</view>
						</view>
					</view>
				</view>
				<view class="spMiddle">
					<view class="spData">
						<view class="dataTitle">Amount of payment</view>
						<view class="dataNum">$52563.23</view>
					</view>
					<view class="spData">
						<view class="dataTitle">Commission ratio</view>
						<view class="dataNum">23%</view>
					</view>
					<view class="spData">
						<view class="dataTitle">Commission</view>
						<view class="dataNum">$256</view>
					</view>
				</view>
				<view class="spBottom">
					<image class="photo" src="../../static/images/home/photo.png"></image>
					<view class="name">zhanghaomingcheng</view>
				</view>
			</view>
			
			<view class="sp">
				<view class="spTop">
					<image class="spLogo" src="../../static/images/home/photo.png"></image>
					<view class="spMsg">
						<view class="spDes">zhelishi shangpinneirongshangpinne shangpinneirongs,zhelishi
							shangpinneirongshangpinne shangpinneirongs</view>
						<view class="spOperation">
							<view class="state">order paid</view>
							<view class="time">10-18 16:05:20 payment</view>
						</view>
					</view>
				</view>
				<view class="spMiddle">
					<view class="spData">
						<view class="dataTitle">Amount of payment</view>
						<view class="dataNum">$52563.23</view>
					</view>
					<view class="spData">
						<view class="dataTitle">Commission ratio</view>
						<view class="dataNum">23%</view>
					</view>
					<view class="spData">
						<view class="dataTitle">Commission</view>
						<view class="dataNum">$256</view>
					</view>
				</view>
				<view class="spBottom">
					<image class="photo" src="../../static/images/home/photo.png"></image>
					<view class="name">zhanghaomingcheng</view>
				</view>
			</view>
			<!-- <view class="noData">
				<image class="noDataLogo" src="../../static/images/common/icon01.png"></image>
				<view class="noDataText">It’s empty</view>
			</view> -->
		</view>

		<view class="suspension" @click="goAdministration">
			<image class="suspensionLogo" src="../../static/images/home/icon13.png"></image>
			<view class="suspensionText">
				TIKTOK administration
			</view>
		</view>
		
		<view>
			<!-- 普通弹窗 -->
			<uni-popup ref="popup" background-color="#fff">
				<view class="popup-content">
					<view class="popupChoose" v-for="item,index in orderStateList" :class="{'activePopupChoose': citem == index}" @click="getOrderState(index,item.name)">{{item.name}}</view>
					<view class="confirmed" @click="confirmed">Confirmed</view>
				</view>
			</uni-popup>
		</view>
		
		<view class="bottomNavigation">
			<view class="bottomNav">
				<!-- <image class="navLogo" src="../../static/images/home/icon06.png"></image> -->
				<image class="navLogo" src="../../static/images/home/icon07.png"></image>
				<view class="navActiveText">Order form</view>
			</view>
			<view class="bottomNav" @click="goOptions">
				<image class="navLogo" src="../../static/images/home/icon08.png"></image>
				<view class="navText">Options</view>
			</view>
			<view class="bottomNav">
				<image class="navLogo" src="../../static/images/home/icon14.png"></image>
				<view class="navText">Individuals</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cindex: 0,
				scrollLeft: 0,
				indicatorDots: true,
				autoplay: true,
				interval: 60000,
				duration: 500,
				scrollList: [{
					id: 1,
					name: 'Today'
				}, {
					id: 2,
					name: 'Yesterday'
				}, {
					id: 3,
					name: 'Nearly seven days'
				}, {
					id: 4,
					name: 'Nearly 30 days'
				}, {
					id: 5,
					name: 'Nearly 60 days'
				}],
				rankList: [{
					id: 1,
					name: 'Merchandise ranking',
					image: '../../static/images/home/icon11.png'
				}, {
					id: 2,
					name: 'Tik Tok Account ranking',
					image: '../../static/images/home/icon09.png'
				}, {
					id: 3,
					name: 'Membership ranking',
					image: '../../static/images/home/icon10.png'
				}],
				
				orderStateList: [{
					id: 1,
					name: 'Full state'
				},{
					id: 2,
					name: 'Order paid'
				},{
					id: 3,
					name: 'Refund/return of order'
				},{
					id: 4,
					name: 'Settled Account'
				}],
				
				citem: 0,
				prepareState: 'Full state',
				orderState: 'Full state',
				
				accountName: 'All of them'
			}
		},
		onReachBottom() {
			//上拉加载，请求记得限制。
			console.log("首页触底了,加载一下")
		},
		mounted() {
			// this.$refs.popup.open("bottom")
			// 返回不触发，进行触发
		},
		onShow() {
			if(this.accountName == this.$store.state.accountName){
				// 账号无修改，无需请求
			} else {
				// 账号修改，接口请求触发
				this.accountName = this.$store.state.accountName
			}
		},
		methods: {
			toggle(type) {
				// 获取选项索引
				for(let i in this.orderStateList){
					if(this.orderStateList[i].name == this.orderState){
						this.prepareState = this.orderState
						this.citem = i
					}
				}
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open(type)
			},
			scrollTab(index) {
				if (this.cindex == index) return
				this.cindex = index
			},
			scroll(e) {
				// this.scrollLeft = e.detail.scrollLeft
				// console.log(e)
				// console.log(this.scrollLeft)
			},
			
			getOrderState(index,name) {
				this.citem = index
				this.prepareState = name
				console.log(this.citem)
				console.log(this.prepareState)
			},
			confirmed(){
				if(this.orderState == this.prepareState){
					//相同状态,不再次触发接口请求
					this.$refs.popup.close()
				} else {
					this.orderState = this.prepareState
					this.$refs.popup.close()
				}
			},
			goData(id){
				let style = "";
				if(id == 0) style = 0
				if(id == 1) style = 1
				if(id == 2) style = 2
				uni.navigateTo({
					url: './dataRanking?style=' + style
				});
			},
			goSwitch() {
				uni.navigateTo({
					url: './switch'
				});
			},
			goAdministration() {
				uni.navigateTo({
					url: './administration'
				});
			},
			goOptions() {
				uni.navigateTo({
					url: './../product/options'
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
		background: #111111;
		line-height: normal;
		padding-bottom: 120rpx;
	}

	.title {
		margin: 0 auto;
		padding: 48rpx 0;
		text-align: center;
		font-size: 36rpx;
		font-family: Arial;
		font-weight: bold;
		color: #FFFFFF;
	}

	/* 滑动块 */
	.navbar {
		padding: 0rpx 0 25rpx 20rpx;
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
		color: #FFFFFF;
	}

	/deep/ ::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}

	/* 轮播图 */
	.banner {
		margin: 20rpx auto 0;
		text-align: center;
	}

	.uni-margin-wrap {
		width: 711rpx;
		height: 277rpx;
		margin: 0 auto;
	}

	.swiper {
		height: 277rpx;
		position: relative;
	}

	.swiper-item {
		display: block;
		height: 277rpx;
		line-height: 277rpx;
		text-align: center;
	}

	.bannerLogo {
		width: 711rpx;
		height: 277rpx;
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
	}

	.swiperDataList,
	.swiperDataListBottom {
		width: 710rpx;
		border-radius: 2rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;
		box-sizing: border-box;
		/* position: absolute;
		top: 0; */
	}

	.swiperData {
		width: 33.3%;
		text-align: center;
	}

	.swiperDataNum {
		font-size: 36rpx;
		line-height: 36rpx;
		font-family: DIN;
		font-weight: bold;
		color: #FFFFFF;
		margin-top: 44rpx;
	}

	.swiperDataTitle {
		font-size: 24rpx;
		line-height: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #F9F9F9;
		margin-top: 20rpx;
	}

	.swiperDataListBottom .swiperDataNum {
		margin-top: 30rpx;
	}

	/deep/ uni-swiper .uni-swiper-dots-horizontal {
		bottom: 17rpx;
	}

	/deep/ uni-swiper .uni-swiper-dot {
		width: 40rpx;
		height: 8rpx;
		background: rgba(247, 247, 247, 0.3);
		border-radius: 4rpx;
	}

	/deep/ uni-swiper .uni-swiper-dot-active {
		background-color: #FFFFFF !important;
		background: #FFFFFF !important;
	}

	/* 排行榜模块 */
	.rankModular {
		padding: 0 20rpx;
		margin-top: 29rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.merchandise {
		width: 223rpx;
		height: 175rpx;
		background: #262626;
		border-radius: 8rpx;
		padding: 20rpx 20rpx 18rpx 19rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		box-sizing: border-box;
	}

	.merchandiseTop {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.merchandiseLogo {
		width: 56rpx;
		height: 56rpx;
	}

	.arrowRight {
		width: 32rpx;
		height: 27rpx;
	}

	.merchandiseBottom {
		font-size: 24rpx;
		line-height: normal;
		font-family: Arial;
		font-weight: 400;
		color: #FFFFFF;
	}

	/* 分类排序 */
	.sortList {
		padding: 0 20rpx;
		margin: 40rpx auto;
		display: flex;
		align-items: center;
	}

	.sort {
		min-width: 180rpx;
		height: 48rpx;
		background: #111111;
		border: 2rpx solid #F7F7F7;
		border-radius: 8rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 20rpx;
		padding: 0 20rpx;
		box-sizing: border-box;
	}

	.sortText {
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #FFFFFF;
	}

	.arrowDown {
		width: 17rpx;
		height: 10rpx;
		margin-left: 10rpx;
	}

	/* 商品列表 */
	.spList {
		width: 710rpx;
		padding: 0 20rpx;
	}

	.sp {
		width: 710rpx;
		height: 400rpx;
		border-radius: 8rpx;
		background: #262626;
		margin-bottom: 20rpx;
	}

	.spTop {
		padding: 22rpx 20rpx 20rpx 20rpx;
		display: flex;
		justify-content: space-between;
	}

	.spLogo {
		width: 144rpx;
		height: 144rpx;
		background: #FFFFFF;
		border-radius: 8rpx;
	}

	.spMsg {
		width: 508rpx;
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
		justify-content: space-between;

	}

	.spDes {
		width: 508rpx;
		font-size: 28rpx;
		font-family: Arial;
		font-weight: bold;
		color: #FFFFFF;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.spOperation {
		width: 508rpx;
		display: flex;
		justify-content: space-between;
		align-items: end;
	}

	.state {
		width: 150rpx;
		height: 40rpx;
		background: rgba(40, 168, 151, 0.1);
		border-radius: 20rpx;
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #28A897;
		text-align: center;
		line-height: 40rpx;
	}

	.time {
		font-size: 24rpx;
		line-height: 40rpx;
		font-family: Arial;
		font-weight: 400;
		color: #FFFFFF;
	}

	.spMiddle {
		width: 710rpx;
		height: 109rpx;
		background: #333333;
		border-radius: 2rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx 54rpx;
		box-sizing: border-box;
	}

	.spData {
		text-align: center;
	}

	.dataTitle {
		font-size: 24rpx;
		line-height: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #CECECE;
	}

	.dataNum {
		font-size: 28rpx;
		line-height: 28rpx;
		font-family: DIN;
		font-weight: bold;
		color: #FFFFFF;
		margin-top: 18rpx;
	}



	.spBottom {
		width: 710rpx;
		height: 104rpx;
		display: flex;
		align-items: center;
		padding: 0 20rpx;
		box-sizing: border-box;
	}

	.photo {
		width: 64rpx;
		height: 64rpx;
		border-radius: 50%;
	}

	.name {
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #FFFFFF;
		margin-left: 12rpx;
	}
	
	.noData{
		text-align: center;
		margin-top: 122rpx;
	}
	.noDataLogo{
		width: 128rpx;
		height: 108rpx;
	}
	.noDataText{
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #999999;
		line-height: 24rpx;
		margin-top: 12rpx;
	}
	
	/* 悬浮框 */
	.suspension {
		width: 340rpx;
		height: 80rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 2rpx 13rpx 0px rgba(11, 11, 11, 0.35);
		border-radius: 40rpx 0px 0px 40rpx;
		display: flex;
		align-items: center;
		position: fixed;
		bottom: 170rpx;
		right: 0;
	}

	.suspensionLogo {
		width: 56rpx;
		height: 56rpx;
		margin: 0 10rpx 0 13rpx;
	}

	.suspensionText {
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #0B0B0B;
	}
	
	/* 下拉框弹窗 */
	.popup-content {
		width: 750rpx;
		height: 484rpx;
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
		background: #0B0B0B;
		bottom: 0;
		left: 0;	
		display: flex;
		/* align-items: center; */
		justify-content: space-around;
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
		color: #FFFFFF;
	}
</style>
