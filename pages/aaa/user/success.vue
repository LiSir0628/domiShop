<template>
	<view class="container">
		<uni-nav-bar fixed left-icon="back" @clickLeft="back" background-color="#ffffff" color="#000000" title="Payments">
		</uni-nav-bar>
		<image class="logo" src="../../static/images/user/icon05.png"></image>
		<view class="text">Successful payment</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goBack: 0,
			}
		},
		onShow() {
			this.goBack = parseInt(window.history.length) - parseInt(uni.getStorageSync('history_length'))
			console.log(this.goBack)
		},
		methods: {
			back() {
				//返回缓存地址的的页面
				//方法一
				if(this.goBack > 0){
					window.history.go(-this.goBack)
				} else {
					uni.redirectTo({
						url: "/pages/user/user"
					});
				}
				
				//方法二
				//location.replace("http://localhost:8080/pages/index/detail?id=1")
				
				//方法三
				// uni.redirectTo({
				// 	url: uni.getStorageSync('return_url')
				// });
			},
		}
	}
</script>

<style scoped>
	.container {
		
	}
	
	/deep/ .uni-navbar--border {
		border-bottom-color: white;
	}
	
	.logo{
		width: 176rpx;
		height: 176rpx;
		display: block;
		margin: 230rpx auto 0;
	}
	.text{
		font-size: 34rpx;
		font-family: Inter-Medium;
		font-weight: 500;
		color: #222222;
		margin-top: 36rpx;
		text-align: center;
	}
</style>
