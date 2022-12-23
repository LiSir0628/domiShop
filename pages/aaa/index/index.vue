<template>
	<view class="container">
		<view class="top">
			<view class="title-modular">
				<image class="logo" src="../../static/images/logo.png"></image>
				<view class="title">COURSES</view>
			</view>
			<view class="search-modular">
				<image class="search-logo" src="../../static/images//icon01.png" @click="getList"></image>
				<input class="search-input" v-model="keyword" placeholder="Search for a course"
					@confirm="getList" />
			</view>
			<view class="uni-margin-wrap">
				<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
					:duration="duration">
					<swiper-item v-for="item,index in banner" @click="goBanner(item)">
						<image style="width: 690rpx;" mode="widthFix" :src="item.image"></image>
					</swiper-item>
				</swiper>
			</view>
		</view>
		
		<!-- 这里是可滚动商品展示 -->
		<view class="recommend-modular">
			<view class="recommend-title">Recommended</view>
			<view class="recommend-more" @click="goMore">View more</view>
		</view>
		<scroll-view class="scroll-logo-list" scroll-x="true" @scroll="scroll" :show-scrollbar="false">
			<view class="logo-list">
				<view class="logo-list-other" v-for="item,index in spLists" @click="goDetail(item)">
					<image class="sp-logo" :src="item.full_pic_url"></image>
					<view class="sp-name">{{item.title}}</view>
					<view class="sp-des">{{item.description}}</view>
				</view>
				<view class="modular">0</view>
			</view>
		</scroll-view>
		
		<image class="des-logo" src="../../static/images/banner05.png"></image>
		
		<view class="bottom">
			<view class="bottom-list" v-for="item,index in bottomList" @click="goIndex(index)">
				<image class="bottom-logo" :style="item.styleClass" :src="item.image"></image>
				<view :class="{'bottom-nav-active': kindex == index}">{{item.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: "",
				
				banner: [],
				// banner: [{
				// 	id: 1,
				// 	name: "轮播图说明",
				// 	image: "../../static/images/banner02.png",
				// 	url: "/pages/register/register"
				// }, {
				// 	id: 2,
				// 	name: "轮播图说明",
				// 	image: "../../static/images/banner01.png",
				// 	url: "http://www.baidu.com"
				// }],
				indicatorDots: true,
				autoplay: true,
				interval: 60000,
				duration: 500,
				
				spLists: [],
				// spLists: [{
				// 	id: 1,
				// 	title: "kechenmingchekechenmingche",
				// 	description: "jianjie kehcengjiakecheng jiekecheng jianjie kehcengjiakecheng jiekecheng",
				// 	full_pic_url: "../../static/images/banner03.png"
				// },{
				// 	id: 2,
				// 	title: "kechenmingche",
				// 	description: "jianjie kehcengjiakecheng jiekecheng jianjie",
				// 	full_pic_url: "../../static/images/banner04.png"
				// }],
				
				kindex: 0,
				bottomList: [{
					id: 1,
					name: "Home",
					image: "../../static/images/icon02.png",
					url: "/pages/index/index",
					styleClass: {
						width: '53rpx',
						height: '53rpx'
					},
				}, {
					id: 2,
					name: "Me",
					image: "../../static/images/icon03.png",
					url: "/pages/user/user",
					styleClass: {
						width: '50rpx',
						height: '50rpx'
					},
				}]
			}
		},
		created() {
			this.bannerLists()
			this.getHttpLists()
		},
		onShow() {
			this.kindex = 0
		},
		methods: {
			getList() {
				// 搜索
				this.spLists = []
				this.getHttpLists()
			},
			bannerLists() {
				uni.showLoading({
					title: "loading...",
					mask: true
				});
				this.$myRequest({
					method: 'GET',
					url: 'banner',
					data: {}
				})
				.then(res => {
					uni.hideLoading();
					if (res.data.code == 200) {
						this.banner = res.data.data
						console.log(this.banner)
						this.$forceUpdate()
					} else {
						uni.showModal({
							title: "Tip",
							content: res.data.msg,
							confirmText: "confirm",
							showCancel: false,
						})
					}
				})
				.catch(err => {
					uni.hideLoading();
					uni.showModal({
						title: "Tip",
						content: "Network error, please try again later",
						confirmText: "confirm",
						showCancel: false,
					})
				})
			},
			getHttpLists() {
				uni.showLoading({
					title: "loading...",
					mask: true
				});
				this.$myRequest({
					method: 'GET',
					url: 'course',
					data: {
						category_id: "",
						keyword: this.keyword,
						page: 1,
						limit: 20,
					}
				})
				.then(res => {
					uni.hideLoading();
					if (res.data.code == 200) {
						this.spLists = res.data.data.lists
						this.$forceUpdate()
					} else {
						uni.showModal({
							title: "Tip",
							content: res.data.msg,
							confirmText: "confirm",
							showCancel: false,
						})
					}
				})
				.catch(err => {
					uni.hideLoading();
					uni.showModal({
						title: "Tip",
						content: "Network error, please try again later",
						confirmText: "confirm",
						showCancel: false,
					})
				})
			},
			goBanner(item) {
				if(item.url){
					if(item.url.indexOf("http") == -1){
						console.log("不存在http")
						uni.navigateTo({
							url: item.url
						});
					} else {
						console.log("存在http")
						window.location.href = item.url
					}
				}
			},
			scroll(e) {
				//this.scrollLeft = e.detail.scrollLeft
				// console.log(e)
				// console.log(this.scrollLeft)
			},
			goMore() {
				uni.navigateTo({
					url: "/pages/index/more"
				});
			},
			goDetail(item) {
				console.log(111)
				uni.navigateTo({
					url: "/pages/index/detail?id=" + item.id
				});
			},
			
			goIndex(index) {
				if (this.kindex == index) return
				if (!this.bottomList[index].url) return
				this.kindex = index
				uni.navigateTo({
					url: this.bottomList[index].url
				});
			},
		}
	}
</script>

<style scoped>
	.container {
		padding-bottom: 120rpx;
	}
	.title-modular{
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 30rpx 0 0;
		
		position: relative;
	}
	.logo{
		width: 48rpx;
		height: 40rpx;
		
		/* position: absolute;
		display: block;
		left: 0;
		right: 280rpx;
		margin: 0 auto;
		text-align: center; */
	}
	.title{
		font-size: 36rpx;
		font-family: Inter-Bold;
		font-weight: bold;
		color: #222222;
		text-align: center;
		margin-left: 12rpx;
	}
	
	/* 搜索框 */
	.search-modular {
		margin: 40rpx auto 30rpx;
		position: relative;
	}
	
	.search-logo {
		width: 32rpx;
		height: 32rpx;
		position: absolute;
		left: 60rpx;
		top: 0;
		bottom: 0;
		margin: auto;
		vertical-align: middle;
	}
	
	.search-input {
		width: 690rpx;
		height: 88rpx;
		box-sizing: border-box;
		background: #F5F5F5;
		border-radius: 60rpx;
		margin: 0 auto;
		padding: 0 80rpx;
	
		font-size: 28rpx;
		font-family: Inter-Regular;
		font-weight: 400;
		/* color: #999999; */
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
		min-height: 240rpx;
		padding: 0 30rpx 50rpx;
		background: #FFFFFF;
		border-radius: 24rpx;
	}
	
	.swiper {
		position: relative;
		height: 240rpx;
		border-radius: 24rpx;
	}
	
	.swiper-item {
		display: block;
		min-height: 240rpx;
		line-height: 240rpx;
		text-align: center;
	}
	
	uni-swiper-item{
		border-radius: 24rpx;
		overflow: hidden;
	}
	
	/deep/ uni-swiper .uni-swiper-dots-horizontal {
		bottom: 24rpx;
		line-height: 0rpx;
	}
	
	/deep/ uni-swiper .uni-swiper-dot {
		width: 32rpx;
		height: 8rpx;
		background: rgba(0, 0, 0, 0.4);
		border-radius: 4rpx;
	}
	
	/deep/ uni-swiper .uni-swiper-dot-active {
		width: 32rpx;
		height: 8rpx;
		background: #FFFFFF;
		border-radius: 4rpx;
	}
	
	/* 滚动 */
	.recommend-modular{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx;
	}
	.recommend-title{
		font-size: 36rpx;
		font-family: Inter-SemiBold;
		font-weight: normal;
		color: #222222;
	}
	.recommend-more{
		font-size: 32rpx;
		font-family: Inter-Medium;
		font-weight: 500;
		color: #E84678;
	}
	
	.scroll-logo-list {
		width: 750rpx;
		margin: 10rpx auto 0;
		/* margin: 0; */
		white-space: nowrap;
		border-radius: 24rpx;
	}
	
	/deep/ .uni-scroll-view{
		
	}
	
	.logo-list {
		display: flex;
		padding: 30rpx 30rpx 30rpx;
	}
	
	.logo-list-other {
		width: 100%;
		/* margin-right: 30rpx; */
		white-space: initial;
		margin-right: 20rpx;
		
		width: 440rpx;
		height: 386rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 30rpx 0rpx rgba(33,38,68,0.1);
		border-radius: 24rpx;
		
		box-sizing: border-box;
		position: relative;
	}
	.modular{
		width: 10rpx;
		height: 386rpx;
		opacity: 0;
	}
	
	.sp-logo{
		width: 440rpx;
		height: 200rpx;
		display: block;
		
		border-radius: 24rpx 24rpx 0rpx 0rpx;
	}
	
	.sp-name{
		font-size: 34rpx;
		line-height: 40rpx;
		font-family: Inter-Bold;
		font-weight: bold;
		color: #222222;
		padding: 16rpx 20rpx 0 20rpx;
		
		overflow: hidden;
		white-space: nowrap;
		word-wrap: normal;
		text-overflow: ellipsis;
		-o-text-overflow: ellipsis;
	}
	
	.sp-des{
		font-size: 32rpx;
		line-height: 36rpx;
		font-family: Inter-Medium;
		font-weight: 500;
		color: #999999;
		padding: 10rpx 20rpx 0 20rpx;
		
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
	
	.des-logo{
		width: 690rpx;
		height: 140rpx;
		border-radius: 24rpx;
		margin: 10rpx auto;
		display: block;
	}
	
	/* 底部 */
	.bottom {
		width: 750rpx;
		height: 100rpx;
		padding-top: 4rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-evenly;
		position: fixed;
		bottom: 0;
		background: #FFFFFF;
		border-top: 2rpx solid rgba(155, 155, 155, 0.1);
	
		font-size: 22rpx;
		font-family: Inter-Regular;
		font-weight: 400;
		color: #6A6A6C;
		z-index: 100;
	}
	
	.bottom-list {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}
	
	.bottom-logo {
		width: 50rpx;
		height: 50rpx;
		display: block;
	}
	
	.bottom-nav-active {
		color: #E84678;
	}
</style>
