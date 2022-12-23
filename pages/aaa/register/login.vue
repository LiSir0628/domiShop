<template>
	<view class="container">
		<uni-nav-bar fixed left-icon="back" @clickLeft="back" background-color="#ffffff" color="#000000" title="">
		</uni-nav-bar>
		
		<view class="title">
			Log in <br/> for an account
		</view>
		
		<view class="input-modualr">
			<view class="input-title">Account</view>
			<input v-model="account" placeholder-class="placeholder-class" class="input-text" placeholder="Enter your account"/>
		</view>
		<view class="input-modualr">
			<view class="input-title">Password</view>
			<input :password="true" v-model="password" placeholder-class="placeholder-class" class="input-text" placeholder="Enter your password"/>
		</view>
		
		<view class="btn-modular" @click="sumbit">
			Log in
		</view>
		
		<view class="forget-modualr">
			<view class="forget" @click="forget">Forgot password?</view>
			<view class="log" @click="register">register</view>
		</view>
		
		<view class="read-nav">
			<checkbox :checked="is_default" color="#ffffff" @click="switchChange" />
			<view class="read-text">Agree to Privacy Policy and User Manual</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				account: "",
				password: "",
				is_default: false,
			}
		},
		onLoad(option) {
			if(uni.getStorageSync('token') && uni.getStorageSync('coursesUserList')){
				//已登录 跳转首页。
				uni.navigateTo({
					url: '/pages/index/index'
				});
			}
		},
		mounted() {
			
		},
		methods: {
			back() {
				window.history.go(-1)
			},
			
			forget() {
				uni.navigateTo({
					url: '/pages/register/forget'
				});
			},
			register() {				
				uni.navigateTo({
					url: '/pages/register/register'
				});
			},
			
			sumbit() {
				if(!this.account){
					uni.showModal({
						title: "Tip",
						content: "Please enter your account",
						confirmText: "confirm",
						showCancel: false,
					})
					return
				} else if(!this.password) {
					uni.showModal({
						title: "Tip",
						content: "Please enter your password",
						confirmText: "confirm",
						showCancel: false,
					})
					return
				} else if(!this.is_default){
					uni.showModal({
						title: "Tip",
						content: "Please agree to the Privacy Policy and User Manual",
						confirmText: "confirm",
						showCancel: false,
					})
					return
				}
				
				uni.showLoading({
					title: "loading...",
					mask: true
				});
				this.$myRequest({
					method: 'POST',
					url: 'login',
					data:{
						email: this.account,
						password: this.password,
						code: "",
					}
				})
				.then(res=>{
					uni.hideLoading();
					if(res.data.code == 200){
						console.log(res.data.data);
						uni.setStorageSync('token', res.data.data.token);
						this.getUserList()
					} else {
						uni.showModal({
							title: "Tip",
							content: res.data.msg,
							confirmText: "confirm",
							showCancel: false,
						})
					}
				})
				.catch(err=>{
					uni.hideLoading();
					uni.showModal({
						title: "Tip",
						content: "Network error, please try again later",
						confirmText: "confirm",
						showCancel: false,
					})
				})
				
			},
			getUserList() {
				uni.showLoading({
					title: "loading...",
					mask: true
				});
				this.$myRequest({
					method: 'GET',
					url: 'user',
					data: {}
				})
				.then(res => {
					uni.hideLoading();
					if (res.data.code == 200) {
						if(res.data.data.avatar && res.data.data.avatar.indexOf("?") == -1) {
							// 不存在?
							res.data.data.avatar = res.data.data.avatar + "?timestamp=" + Math.random()
						} else if(res.data.data.avatar && res.data.data.avatar.indexOf("?") != -1){
							// 存在?
							res.data.data.avatar = res.data.data.avatar + "&timestamp=" + Math.random()
						}
						console.log(res.data.data)
						uni.setStorageSync('coursesUserList', res.data.data);
						
						//登录成功 跳转首页。
						uni.navigateTo({
							url: '/pages/index/index'
						});
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
			onUnload() {
				//页面销毁、清除定时器
				clearInterval(this.setTime);
			},
			onBeforeUnload() {
				//页面销毁、清除定时器
				clearInterval(this.setTime);
			},
			
			
			switchChange(){
				this.is_default = !this.is_default
				console.log(this.is_default)
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
	
	.title{
		font-size: 64rpx;
		line-height: 100rpx;
		font-family: Inter-Bold;
		font-weight: bold;
		color: #212644;
		padding: 62rpx 48rpx 0;
		
	}
	
	.input-modualr{
		padding: 10rpx 40rpx 0 48rpx;
		margin-top: 38rpx;
	}
	
	.input-title{
		font-size: 32rpx;
		font-family: Inter-Medium;
		font-weight: 500;
		color: #222222;
	}
	
	.input-text{
		width: 660rpx;
		height: 96rpx;
		background: #EAEAEA;
		border-radius: 20rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		margin-top: 24rpx;
		
		font-size: 32rpx;
		font-family: Inter-Regular;
		font-weight: 400;
	}
	
	.code-modular{
		margin-top: 24rpx;
	}
	
	.input-code{
		width: 393rpx;
		height: 96rpx;
		background: #EAEAEA;
		border-radius: 20rpx;
		padding: 0 26rpx 0 30rpx;
		box-sizing: border-box;
		
		font-size: 32rpx;
		font-family: Inter-Regular;
		font-weight: 400;
	}
	
	.placeholder-class{
		font-size: 32rpx;
		font-family: Inter-Regular;
		font-weight: 400;
		color: #999999;
	}
	
	.code-modular{
		display: flex;
		align-items: center;
		justify-content: space-between
	}
	
	.code-btn{
		width: 247rpx;
		height: 96rpx;
		line-height: 96rpx;
		text-align: center;
		background: #E84678;
		border-radius: 20rpx;
		
		font-size: 32rpx;
		font-family: Inter-SemiBold;
		font-weight: normal;
		color: #FFFFFF;
	}
	
	.btn-modular{
		width: 660rpx;
		height: 96rpx;
		background: #E84678;
		border-radius: 20rpx;
		
		display: flex;
		align-items: center;
		text-align: center;
		justify-content: center;
		
		font-size: 32rpx;
		font-family: Inter-SemiBold;
		font-weight: normal;
		color: #FFFFFF;
		margin:80rpx auto 0;
	}
	
	.forget-modualr{
		display: flex;
		justify-content: space-between;
		margin-top: 28rpx;
		padding: 0 58rpx;
	}
	
	.forget{
		font-size: 30rpx;
		font-family: Inter-SemiBold;
		font-weight: normal;
		color: #222222;
	}
	
	.log{
		font-size: 30rpx;
		font-family: Inter-SemiBold;
		font-weight: normal;
		color: #E84678;
	}

	.read-nav{
		margin: 80rpx auto 0;
		bottom: 54rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.read-text{
		font-size: 28rpx;
		font-family: Inter-Medium;
		font-weight: 500;
		color: #212644;
		text-align: center;
	}
	/* /deep/ .uni-checkbox-wrapper{
		width: 32rpx;
		height: 32rpx;
	} */
	/deep/ .uni-checkbox-input{
		width: 32rpx;
		height: 32rpx;
		opacity: 1;
		border: 2rpx solid #999999;
		border-radius: 50%;
		margin-top: -4rpx;
	}
	/deep/ .uni-checkbox-input-checked{
		background: #E84678;
	}
	/deep/ .uni-checkbox-input.uni-checkbox-input-checked:before{
		font-size: 24rpx !important;
	}
	
</style>
