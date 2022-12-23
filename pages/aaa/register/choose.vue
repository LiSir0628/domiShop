<template>
	<view class="container">
		<view class="title">
			Log in <br/> for an account
		</view>
		<view class="btn-modular pink" @click="goLog">
			<image class="logo" src="../../static/images/register/icon01.png"></image>
			<view>Login Account</view>
		</view>
		<view class="btn-modular" @click="goRegister">
			<image class="logo02" src="../../static/images/register/icon01.png"></image>
			<view>Register an account</view>
		</view>
		
		<view class="des">No account, go register</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		created() {
			
		},
		methods: {
			goLog() {
				uni.navigateTo({
					url: '/pages/register/login'
				});
			},
			goRegister() {
				uni.navigateTo({
					url: '/pages/register/register'
				});
			},
		}
	}
</script>

<style scoped>
	.container {
		
	}
	.title{
		font-size: 64rpx;
		line-height: 100rpx;
		font-family: Inter-Bold;
		font-weight: bold;
		color: #212644;
		padding: 220rpx 78rpx 0;
		
	}
	.btn-modular{
		width: 660rpx;
		height: 96rpx;
		background: #212644;
		border-radius: 20rpx;
		
		display: flex;
		align-items: center;
		text-align: center;
		justify-content: center;
		
		font-size: 32rpx;
		font-family: Inter-SemiBold;
		font-weight: normal;
		color: #FFFFFF;
		margin:50rpx auto 0;
	}
	.pink{
		background: #E84678;
		margin-top: 270rpx;
	}
	.logo{
		width: 55rpx;
		height: 43rpx;
		margin-right: 24rpx;
	}
	.logo02{
		width: 39rpx;
		height: 58rpx;
		margin-right: 24rpx;
	}
	.des{
		font-size: 32rpx;
		font-family: Inter-Medium;
		font-weight: 500;
		color: #212644;
		text-align: center;
		
		position: absolute;
		left: 0;
		right: 0;
		bottom: 134rpx;
	}
</style>
