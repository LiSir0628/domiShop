<template>
	<view class="container">
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
				privacy_text: "",  //隐私协议
				isClickPrivacy: false, //是否展示隐私协议
			}
		},
		created() {
			this.look()
		},
		methods: {
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
				uni.navigateTo({
					url: "./register"
				});
			},
		}
	}
</script>

<style scoped>
	.container {
		
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
