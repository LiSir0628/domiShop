<template>
	<view class="container">
		<uni-nav-bar left-icon="back" @clickLeft="back" background-color="#ffffff" color="#000000" :title="$t('editEmail.Change_Login_mailbox')"></uni-nav-bar>
		<view class="example">
			<view class="modular">
				<input class="uni-input" v-model="email" :placeholder="$t('editEmail.email')" />
			</view>
			<view class="modular">
				<input class="uni-input" v-model="code" :placeholder="$t('editEmail.enter_the_verification_code')" />
				<view class="codeBtn" @click="getCode">
					{{timeTitle}}
				</view>
			</view>
			<view class="modular">
				<input class="uni-input" v-model="password" :placeholder="$t('editEmail.password')" />
			</view>
			<view class="modular">
				<input class="uni-input" v-model="new_email" :placeholder="$t('editEmail.new_mailbox')" />
			</view>
			<view class="btn" @click="submit">{{ $t('editEmail.Confirmed') }}</view>
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
				new_email: '',
				
				time: 59,
				setTime: null,
				timeTitle: this.$t('editEmail').Verification_Code,
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
						title: this.$t('common').Tip,
						content: this.$t('editEmail').email,
						confirmText: this.$t('common').confirm,
						showCancel: false,
					})
					return
				} else if(!this.isSumbit){
					return
				}
				
				this.isSumbit = false
				uni.showLoading({
					title: this.$t('common').loading + '...',
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
							title: this.$t('common').Tip,
							content: res.data.msg,
							confirmText: this.$t('common').confirm,
							showCancel: false,
						})
					}
					uni.hideLoading();
				})
				.catch(err=>{
					this.isSumbit = true
					uni.hideLoading();
					uni.showModal({
						title: this.$t('common').Tip,
						content: this.$t('common').Network,
						confirmText: this.$t('common').confirm,
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
						this.timeTitle = this.$t('editEmail').Verification_Code
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
						title: this.$t('common').Tip,
						content: this.$t('editEmail').email,
						confirmText: this.$t('common').confirm,
						showCancel: false,
					})
					return
				} else if(!this.code){
					//未输入验证码
					uni.showModal({
						title: this.$t('common').Tip,
						content: this.$t('editEmail').enter_the_verification_code,
						confirmText: this.$t('common').confirm,
						showCancel: false,
					})
					return
				} else if(!this.password){
					//未输入密码
					uni.showModal({
						title: this.$t('common').Tip,
						content: this.$t('editEmail').password,
						confirmText: this.$t('common').confirm,
						showCancel: false,
					})
					return
				} else if(!this.new_email){
					//未输入新邮箱
					uni.showModal({
						title: this.$t('common').Tip,
						content: this.$t('editEmail').new_mailbox,
						confirmText: this.$t('common').confirm,
						showCancel: false,
					})
					return
				}
				uni.showLoading({
					title: this.$t('common').loading + '...',
					mask: true
				});
				this.$myRequest({
						method: 'POST',
						url: 'https://user.mini.zhishukongjian.com/user/editerbatch',
						data: {
							// email: this.email,
							mail: this.new_email,
							mailcode: this.code,
							password: this.password,
						}
					})
					.then(res => {
						uni.hideLoading();
						if (res.data.code == 200) {
							this.$store.commit('editEmail', this.new_email)
							uni.setStorageSync('duomiList', this.$store.state.duomiList);
							uni.showModal({
								title: this.$t('common').Tip,
								content: res.data.msg,
								confirmText: this.$t('common').confirm,
								showCancel: false,
								success: function (res) {
									if (res.confirm) {
										window.history.go(-1)
									}
								},
							})
						} else {
							uni.showModal({
								title: this.$t('common').Tip,
								content: res.data.msg,
								confirmText: this.$t('common').confirm,
								showCancel: false,
							})
						}
					})
					.catch(err => {
						uni.hideLoading();
						uni.showModal({
							title: this.$t('common').Tip,
							content: this.$t('common').Network,
							confirmText: this.$t('common').confirm,
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
