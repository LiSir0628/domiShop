<template>
	<view class="popupMask">
		<uni-popup ref="popup" background-color="#fff" @maskClick="close">
			<view class="popup-content">
				<view class="card">
					<image class="close" src="../../static/images/detail/icon13.png" @click="close"></image>
					<image v-if="isSuccess" class="isSuccessLogo" src="../../static/images/detail/icon14.png"></image>
					<view class="text">{{text}}</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props:{
			isSuccess:{
				type: Boolean,
				default: true
			},
			text:{
				type: String,
				default: "successful"
				//default: this.$t('pro_detail').successful
			}
		},
		created() {

		},
		mounted() {

		},
		methods: {
			open(){
				this.$refs.popup.open("center")
			},
			close() {
				this.$refs.popup.close()
			},
			noClose() {
				// 防止点击图片关闭遮罩
			}
		}
	}
</script>

<style scoped>
	.popupMask {
		
	}
	/deep/ .uni-popup .uni-popup__wrapper{
		border-radius: 50px;
	}
	/* 遮罩样式 */
	.mask{
		position: fixed;
		width: 100%;
		height: 100%;
		padding: 172rpx 0;
		margin: 0 auto;
		top: 0;
		left: 0;
		background: rgba(0,0,0,0.4);
	}
	.card{
		width: 480rpx;
		height: 233rpx;
		background: #FFFFFF;
		border-radius: 8rpx;
		
		margin: 0 auto;
		text-align: center;
		line-height: normal;
		padding: 20rpx;
		box-sizing: border-box;
		position: relative;
	}
	
	.close{
		width: 24rpx;
		height: 24rpx;
		line-height: 24rpx;
		color: rgb(209,209,209);
		display: block;
		position: absolute;
		right: 20rpx;
	}
	.isSuccessLogo{
		width: 72rpx;
		height: 72rpx;
		margin: 29rpx auto 0;
		display: block;
	}
	.text{
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #333333;
		margin-top: 40rpx;
	}
</style>
