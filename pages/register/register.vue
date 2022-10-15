<template>
	<view class="container">
		<view class="hello">{{ $t('register.Hello') }}!</view>
		<view class="des">{{ $t('register.Registration') }}</view>
		<view class="content">
			<input class="account" v-model="account" :placeholder="$t('register.account_number')" />
			<view class="codeText">
				<input class="code" v-model="code" :placeholder="$t('register.code')" />
				<view class="codeBtn" @click="getCode">
					{{timeTitle}}
				</view>
			</view>
			<input class="password" v-model="passWord" :placeholder="$t('register.set_password')" />
		</view>
		<view class="prompt">
			<text class="label">*</text>
			<text>{{ $t('register.agree') }}</text>
			<text class="underline"  @click="lookAgreement">{{ $t('register.Agreement') }}</text>
			<text>{{ $t('register.and') }}</text>
			<text class="underline" @click="look">{{ $t('register.privacy_terms') }}</text>
		</view>
		<view class="btn" @click="sumbit">
			<text>{{ $t('register.Sign_up') }}</text>
			<image class="arrow" src="../../static/images/register/icon03.png"></image>
		</view>
		
		<view class="text-mask" v-if="isClickService">
			<view v-html="service_text"></view>
			<view class="read-btn" @click="read">{{ $t('register.read') }}</view>
		</view>
		<view class="text-mask" v-if="isClickPrivacy">
			<view v-html="privacy_text"></view>
			<view class="read-btn" @click="read">{{ $t('register.read') }}</view>
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
				timeTitle: this.$t('register').Verification_Code,
				isSumbit: true,
				
				service_text: "",  //服务协议
				privacy_text: "",  //隐私协议
				isClickService: false, //是否展示服务协议
				isClickPrivacy: false, //是否展示隐私协议
			}
		},
		mounted() {
			this.isClickService = false
			this.isClickPrivacy = false
			//关闭计时器，避免重复调用
			clearInterval(this.setTime)
		},
		methods: {
			lookAgreement() {
				if(this.service_text){
					this.isClickService = true
					return
				}
				uni.showLoading({
					title: this.$t('common').loading + '...',
					mask: true
				});
				this.$myRequest({
					method: 'GET',
					url: 'api/general/dict/info',
					data:{
						dict_key: "user_service_agreement"
					}
				})
				.then(res=>{
					if(res.data.code == 200){
						//console.log(res.data.data.dict_val)
						this.isClickService = true
						this.service_text = res.data.data.dict_val
						uni.hideLoading();
					} else {
						uni.hideLoading();
					}
				})
				.catch(err=>{
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
			look() {
				if(this.privacy_text){
					this.isClickPrivacy = true
					return
				}
				uni.showLoading({
					title: this.$t('common').loading + '...',
					mask: true
				});
				this.$myRequest({
					method: 'GET',
					url: 'api/general/dict/info',
					data:{
						dict_key: "privacy_agreement"
					}
				})
				.then(res=>{
					if(res.data.code == 200){
						//console.log(res.data.data.dict_val)
						this.isClickPrivacy = true
						this.privacy_text = res.data.data.dict_val
						uni.hideLoading();
					} else{
						uni.hideLoading();
					}
				})
				.catch(err=>{
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
			read() {
				this.isClickService = false
				this.isClickPrivacy = false
			},
			getCode(){
				if(!this.account){
					uni.showModal({
						title: this.$t('common').Tip,
						content: this.$t('register').Verification_Code,
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
						this.timeTitle = this.$t('register').Verification_Code
						this.time = 59
						this.isSumbit = true
						clearInterval(this.setTime);
					} 
				}, 1000);
			},
			sumbit() {
				if(!this.account){
					uni.showModal({
						title: this.$t('common').Tip,
						content: this.$t('register').fill_email_address,
						confirmText: this.$t('common').confirm,
						showCancel: false,
					})
					return
				} else if(!this.passWord) {
					uni.showModal({
						title: this.$t('common').Tip,
						content: this.$t('register').fill_password,
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
							title: this.$t('common').Tip,
							content: res.data.msg,
							confirmText: this.$t('common').confirm,
							showCancel: false,
						})
					}
				})
				.catch(err=>{
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
			getUserList() {
				uni.showLoading({
					title: this.$t('common').loading + '...',
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
			onUnload() {
				this.isClickService = false
				this.isClickPrivacy = false
				//页面销毁、清除定时器
				clearInterval(this.setTime);
			},
			onBeforeUnload() {
				this.isClickService = false
				this.isClickPrivacy = false
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
	
	/* 协议 */
	.text-mask{
		width: 100%;
		height: 100%;
		padding: 30rpx 40rpx;
		box-sizing: border-box;
		overflow: hidden;
		overflow-y: auto;
		position: fixed;
		top: 0;
		left: 0;
		background: #ffffff;
	}
	.read-btn {
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
		/* position: fixed;
		bottom: 30rpx;
		left: 0;
		right: 0; */
		margin: 30rpx auto 0;
	}
</style>
