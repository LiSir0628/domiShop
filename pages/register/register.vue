<template>
	<view class="container">
		<view class="hello">Hello!</view>
		<view class="des">Registration</view>
		<view class="content">
			<input class="account" v-model="account" placeholder="Please enter your account number" />
			<view class="codeText">
				<input class="code" v-model="code" placeholder="the authentication code" />
				<view class="codeBtn" @click="getCode">
					{{timeTitle}}
				</view>
			</view>
			<input class="password" v-model="passWord" placeholder="please set your password" />
		</view>
		<view class="prompt">
			<text class="label">*</text>
			<text>By registering, you agree to</text>
			<text class="underline">the Dome Service Agreement</text>
			<text>and</text>
			<text class="underline">privacy terms</text>
		</view>
		<view class="btn" @click="sumbit">
			<text>Sign up for an account</text>
			<image class="arrow" src="../../static/images/register/icon03.png"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				account: '',
				code: '',
				passWord: '',
				
				time: 59,
				setTime: null,
				timeTitle: "Verification Code",
				isSumbit: true,
			}
		},
		mounted() {
			//关闭计时器，避免重复调用
			clearInterval(this.setTime)
		},
		methods: {
			getCode(){
				if(!this.account){
					uni.showModal({
						title: 'TIP',
						content: "Please fill in the email address",
						confirmText: "confirm",
						showCancel: false,
					})
					return
				} else if(!this.isSumbit){
					return
				}
				
				this.isSumbit = false
				uni.showLoading({
					title: 'loading...',
					mask: true
				});
				this.$myRequest({
					method: 'POST',
					url: 'https://user.mini.zhishukongjian.com/emailcode',
					data:{
						email: this.account
					}
				})
				.then(res=>{
					if(res.data.code == 200){
						//验证码请求发出-开启计时器
						this.openTimer()
					} else {
						this.isSumbit = true
						uni.showModal({
							title: 'TIP',
							content: res.data.msg,
							confirmText: "confirm",
							showCancel: false,
						})
					}
					uni.hideLoading();
				})
				.catch(err=>{
					this.isSumbit = true
					uni.hideLoading();
					uni.showModal({
						title: 'TIP',
						content: "Network error, please try again later",
						confirmText: "confirm",
						//content: err,
						showCancel: false,
					})
				})
				
			},
			openTimer() {
				//避免计时器浪费1秒
				if (this.time == 59) this.timeTitle =  60 + "s"
				//计时器计算倒计时
				this.setTime = setInterval(()=>{
					if (this.time >= 0) {
						this.timeTitle =  this.time + "s"
						this.time = this.time - 1
						this.isSumbit = false
					} else{
						this.timeTitle = "Verification Code"
						this.time = 59
						this.isSumbit = true
						clearInterval(this.setTime);
					} 
				}, 1000);
			},
			sumbit() {
				if(!this.account){
					uni.showModal({
						title: 'TIP',
						content: "Please fill in the email address",
						confirmText: "confirm",
						showCancel: false,
					})
					return
				} else if(!this.passWord) {
					uni.showModal({
						title: 'TIP',
						content: "Please fill in the password",
						confirmText: "confirm",
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
					url: 'https://user.mini.zhishukongjian.com/sign',
					data:{
						email: this.account,
						code: this.code,
						password: this.passWord,
						invite: "",
						nickname: "",
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
							title: 'TIP',
							content: res.data.msg,
							confirmText: "confirm",
							showCancel: false,
						})
					}
				})
				.catch(err=>{
					uni.hideLoading();
					uni.showModal({
						title: 'TIP',
						content: "Network error, please try again later",
						confirmText: "confirm",
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
								confirmText: "confirm",
								showCancel: false,
							})
						}
					})
					.catch(err => {
						uni.hideLoading();
						uni.showModal({
							title: 'TIP',
							content: "Network error, please try again later",
							confirmText: "confirm",
							//content: err,
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
	
	/* 账号密码 */
	.content{
		padding: 278.5rpx 0.5rpx 0.5rpx 0.5rpx;
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
	.password{
		margin-top: 40rpx;
	}
	.codeText{
		width: 600rpx;
		margin-top: 41.5rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.code{
		width: 349rpx;
		height: 80rpx;
		padding: 27rpx 19rpx 34rpx 19rpx;
		background: #FFFFFF;
		border: 2rpx solid #999999;
		border-radius: 4rpx;
		box-sizing: border-box;
		font-size: 26rpx;
		font-family: Arial;
		font-weight: 400;
		color: #999999;
	}
	.codeBtn{
		width: 232rpx;
		height: 80rpx;
		background: #FF7436;
		border-radius: 4rpx;
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #FFFFFF;
		text-align: center;
		padding: 27rpx 0 34rpx 0;
		box-sizing: border-box;
		line-height: normal;
		/* line-height: 80rpx; */
	}
	/deep/ .uni-input-input{
		height: auto;
	}
	/* 提示语 */
	.prompt{
		width: 600rpx;
		font-size: 26rpx;
		padding: 24rpx 0 80rpx;
		color: #333333;
		line-height: normal;
		letter-spacing: 3rpx;
		
	}
	.label{
		font-size: 24rpx;
		color: #FF3838;
	}
	.underline{
		font-weight: bold;
		text-decoration: underline;
		margin: 0 12rpx;
		color: #0B0B0B;
		line-height: 40rpx;
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
