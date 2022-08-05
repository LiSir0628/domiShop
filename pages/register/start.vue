<template>
	<view class="container">
		<image class="logo" src="../../static/images/register/icon08.png"></image>
		<!-- <view class="des">Tiktok third-party data analysis platform</view>
		<image class="banner" src="../../static/images/register/icon02.png"></image> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
			
			}
		},
		mounted() {
			setTimeout(()=>{
				uni.navigateTo({
					url: '/pages/product/options'
				});
			},2000)
		},
		methods: {
	
		}
	}
</script>

<style scoped>
	.container {
		text-align: center;
		padding-top: 319rpx;
	}
	.logo{
		width: 342rpx;
		height: 342rpx;
		margin: 0 auto;
		display: block;
	}
	.des{
		font-size: 20rpx;
		margin-top: 59rpx;
		font-family: Arial;
		font-weight: 400;
		color: #0B0B0B;
		line-height: 20rpx;
	}
	.banner{
		width: 750rpx;
		height: 449rpx;
		margin-top: 260rpx;
		display: block;
	}
</style>