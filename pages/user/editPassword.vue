<template>
	<view class="container">
		<uni-nav-bar left-icon="back" @clickLeft="back" background-color="#ffffff" color="#000000" title="Change Login Password"></uni-nav-bar>
		<view class="example">
			<view class="modular">
				<input class="uni-input" v-model="email" placeholder="Please enter your email" />
			</view>
			<view class="modular">
				<input class="uni-input" v-model="code" placeholder="Please enter the verification code" />
				<view class="codeBtn" @click="getCode">
					{{timeTitle}}
				</view>
			</view>
			<view class="modular">
				<input class="uni-input" v-model="password" placeholder="Please enter the new password" />
			</view>
			<view class="modular">
				<input class="uni-input" v-model="confirm_password" placeholder="Please enter the confirmation password" />
			</view>
			<view class="btn" @click="submit">Confirmed</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				email: '',
				code: '',
				password: '',
				confirm_password: '',
				
				time: 59,
				setTime: null,
				timeTitle: "Verification Code",
				isSumbit: true,
			}
		},
		methods: {
			back() {
				window.history.go(-1)
			},
			getCode(){
				if(!this.email){
					uni.showModal({
						title: 'TIP',
						content: "Please enter your email",
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
						email: this.email
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
			
			submit() {
				if(!this.email){
					//未输入邮箱
					uni.showModal({
						title: 'TIP',
						content: 'Please enter your email',
						confirmText: "confirm",
						showCancel: false,
					})
					return
				} else if(!this.code){
					//未输入验证码
					uni.showModal({
						title: 'TIP',
						content: 'Please enter the verification code',
						confirmText: "confirm",
						showCancel: false,
					})
					return
				} else if(!this.password){
					//未输入密码
					uni.showModal({
						title: 'TIP',
						content: 'Please enter the new password',
						confirmText: "confirm",
						showCancel: false,
					})
					return
				} else if(!this.confirm_password){
					//未输入确认密码
					uni.showModal({
						title: 'TIP',
						content: 'Please enter the confirmation password',
						confirmText: "confirm",
						showCancel: false,
					})
					return
				} else if(this.password != this.confirm_password){
					//两次密码不一致
					uni.showModal({
						title: 'TIP',
						content: 'The two password inputs are inconsistent',
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
						url: 'https://user.mini.zhishukongjian.com/forgot',
						data: {
							email: this.email,
							password: this.password,
							code: this.code
						}
					})
					.then(res => {
						uni.hideLoading();
						if (res.data.code == 200) {
							uni.setStorageSync('token', res.data.data.token);
							uni.showModal({
								title: 'TIP',
								content: res.data.msg,
								confirmText: "confirm",
								showCancel: false,
								success: function (res) {
									if (res.confirm) {
										window.history.go(-1)
									}
								},
							})
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
		}
	}
</script>

<style scoped>
	.container {
		
	}
	.container {}
	
	.example {
		/* padding: 30rpx; */
		background-color: #fff;
	}
	
	.modular {
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 30rpx;
		background: rgb(247, 247, 247);
		border-bottom: 2rpx solid #ffffff;
		line-height: 26rpx;
	}
	
	.modularTitle {
		font-size: 26rpx;
		font-family: Arial;
		font-weight: bold;
		color: #0B0B0B;
	}
	
	.uni-input {
		width: 400rpx;
		font-size: 26rpx;
		font-family: Arial;
		font-weight: 400;
		color: #999999;
		text-align: left;
	}
	
	.codeBtn{
		/* width: 232rpx;
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
		line-height: normal; */
		
		font-size: 26rpx;
		font-family: Arial;
		font-weight: 400;
		color: #FF7436;
	}
	
	.btn {
		width: 670rpx;
		height: 80rpx;
		line-height: 80rpx;
		background: #FF7436;
		border-radius: 8rpx;
	
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #FFFFFF;
		text-align: center;
		position: fixed;
		bottom: 30rpx;
		left: 0;
		right: 0;
		margin: 0 auto;
	}
</style>
