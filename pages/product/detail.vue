<template>
	<view class="container">
		<uni-nav-bar left-icon="back" @clickLeft="back" background-color="#ffffff" color="#000000"
			title="Product details">
		</uni-nav-bar>

		<uni-swiper-dot class="uni-swiper-dot-box" @clickItem=clickItem :info="info" :current="current" mode="nav"
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

		},
		methods: {
			back() {
				window.history.go(-1)
			},
			change(e) {
				this.current = e.detail.current
				console.log("切换" + e)
			},
			clickItem(e) {
				this.swiperDotIndex = e
				console.log(e)
			},
		}
	}
</script>

<style scoped>
	.container {
		
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
		padding: 30rpx;
	}
	.price{
		font-size: 46rpx;
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
</style>
