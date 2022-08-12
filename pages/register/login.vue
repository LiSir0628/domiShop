<template>
	<view class="container">
		<view class="hello">Hello!</view>
		<view class="des">Log in</view>
		<view class="mark">To access your account</view>
		<view class="content">
			<input class="account" v-model="account" placeholder="Please enter your account number" />
			<view class="passInput">
				<input :password="!isShowEye" class="password" v-model="passWord" placeholder="please set your password" />
				<image v-if="isShowEye" class="greyEye" src="../../static/images/register/icon07.png" @click="exhibition"></image>
				<image v-else class="greyNoEye" src="../../static/images/register/icon06.png" @click="exhibition"></image>
				<!-- <view class="eyeChoose">
					<image class="blackEye" src="../../static/images/register/icon04.png"></image>
					<image class="blackNoEye" src="../../static/images/register/icon05.png"></image>
					<image class="greyNoEye" src="../../static/images/register/icon06.png"></image>
				</view> -->
			</view>	
			<view class="prompt" @click="goRegister">
				Register now
			</view>
		</view>
		<view class="btn" @click="sumbit">
			<text>log in</text>
			<image class="arrow" src="../../static/images/register/icon03.png"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShowEye: false,
				account: '',
				code: '',
				passWord: '',
			}
		},
		mounted() {
			
		},
		methods: {
			exhibition() {
				this.isShowEye = !this.isShowEye

				// 如果是true为密码可见，false为密码不可见
			},
			goRegister() {
				uni.navigateTo({
					url: './register'
				});
			},
			sumbit() {
				if(!this.account){
					uni.showModal({
						title: 'TIP',
						content: "Please fill in the account",
						showCancel: false,
					})
					return
				} else if(!this.passWord) {
					uni.showModal({
						title: 'TIP',
						content: "Please fill in the password",
						showCancel: false,
					})
					return
				}
				
				uni.showLoading({
					title: 'loading...',
					mask: true
				});
				this.$myRequest({
					method: 'POST',
					url: 'https://user.mini.zhishukongjian.com/login',
					data:{
						email: this.account,
						code: this.code,
						password: this.passWord,
					}
				})
				.then(res=>{
					//uni.hideLoading();
					if(res.data.code == 200){
						console.log(res.data.data);
						uni.setStorageSync('token', res.data.data.token);
						this.getUserList()
					} else {
						uni.hideLoading();
						uni.showModal({
							title: 'TIP',
							content: res.data.msg,
							showCancel: false,
						})
					}
				})
				.catch(err=>{
					uni.hideLoading();
					uni.showModal({
						title: 'TIP',
						content: "Network error, please try again later",
						//content: err,
						showCancel: false,
					})
				})
			},
			getUserList() {
				uni.showLoading({
					title: 'loading...',
					mask: true
				});
				this.$myRequest({
						method: 'GET',
						url: 'https://user.mini.zhishukongjian.com/user',
						data: {}
					})
					.then(res => {
						uni.hideLoading();
						if (res.data.code == 200) {
							console.log(res.data.data)
							this.$store.commit('editDuomi', res.data.data)
							uni.setStorageSync('duomiList', res.data.data);
							//登录成功 跳转数据页。
							uni.switchTab({
								url: '/pages/index/index'
							});
						} else {
							uni.showModal({
								title: 'TIP',
								content: res.data.msg,
								showCancel: false,
							})
						}
					})
					.catch(err => {
						uni.hideLoading();
						uni.showModal({
							title: 'TIP',
							content: "Network error, please try again later",
							//content: err,
							showCancel: false,
						})
				})
			}
		}
	}
</script>

<style scoped>
	.container {
		padding: 0 76rpx 0 73rpx;
	}
	.hello{
		font-size: 40rpx;
		font-family: Arial;
		font-weight: bold;
		color: #0B0B0B;
		line-height: 40rpx;
		padding-top: 149rpx;
	}
	.des{
		font-size: 80rpx;
		font-family: Arial;
		font-weight: bold;
		color: #0B0B0B;
		line-height: 80rpx;
		padding-top: 29rpx;
	}
	
	.mark{
		font-size: 28rpx;
		font-family: Arial;
		font-weight: 400;
		color: #0B0B0B;
		margin-top: 55rpx;
		line-height: 24rpx;
		letter-spacing: 2rpx;
	}
	
	/* 账号密码 */
	.content{
		position: relative;
		padding: 200.5rpx 0.5rpx 0.5rpx 0.5rpx;
	}
	.account,.password{
		width: 600rpx;
		height: 80rpx;
		padding: 27.5rpx 21.5rpx 29.5rpx 21.5rpx;
		background: #FFFFFF;
		border: 2rpx solid #999999;
		border-radius: 4rpx;
		box-sizing: border-box;
		font-size: 26rpx;
		font-family: Arial;
		font-weight: 400;
		color: #999999;
	}
	.passInput{
		position: relative;
	}
	.password{
		margin-top: 40rpx;
	}
	.greyEye{
		width: 30rpx;
		height: 20rpx;
		position: absolute;
		top: 29.5rpx;
		right: 20.5rpx;
		bottom: 31.5rpx;
	}
	.greyNoEye{
		width: 30rpx;
		height: 25rpx;
		position: absolute;
		top: 27rpx;
		right: 20.5rpx;
		bottom: 31.5rpx;
	}
	.eyeChoose{
		width: 30rpx;
		position: absolute;
		top: 29.5rpx;
		right: -52rpx;
		display: flex;
		flex-wrap: wrap;
	}
	.blackEye{
		width: 30rpx;
		height: 20rpx;
	}
	.blackNoEye{
		width: 30rpx;
		height: 20rpx;
		margin-top: 8.5rpx;
	}
	/deep/ .uni-input-input{
		height: auto;
	}
	/* 提示 */
	.prompt{
		font-size: 26rpx;
		font-family: Arial;
		font-weight: bold;
		color: #333333;
		line-height: 18rpx;
		margin-top: 40.5rpx;
		text-align: right;
	}
	/* 按键 */
	.btn{
		width: 600rpx;
		height: 80rpx;
		line-height: 80rpx;
		background: #0B0B0B;
		border-radius: 4rpx;
		font-size: 26rpx;
		font-family: Arial;
		font-weight: bold;
		color: #FFFFFF;
		text-align: center;
		position: relative;
		letter-spacing: 2rpx;
		margin-top: 80.5rpx;
	}
	.arrow{
		position: absolute;
		width: 25rpx;
		height: 20rpx;
		top: 30.5rpx;
		bottom: 30.5rpx;
		right: 20.4rpx;
	}
</style>
