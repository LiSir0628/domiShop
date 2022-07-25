<template>
	<view class="popupMask">
		<uni-popup ref="popup" background-color="#fff" @maskClick="close">
			<view class="popup-content">
				<view class="card" @click.stop="noClose">
					<!-- <view class="close" @click="close">X</view> -->
					<image class="close" src="../../static/images/detail/icon13.png" @click="close"></image>
					<view class="cardTitle">TIKTOK APP SCAN code access</view>
					<view class="cardTip">Please make sure you scan the TIK Tok account for at least one public video</view>
					
					<view class="ewm">
						<image class="cardEwm" :class="{'overdue': isShowOverdue}" src="../../static/images/home/demo.png"></image>
						<image v-if="isShowOverdue" class="refreshLogo" src="../../static/images/home/icon15.png" @click="refreshBtn"></image>
					</view>
					<view v-if="!isShowOverdue" class="cardTime">Expired after {{time}}s</view>
					<view v-else class="cardTime">The QR Code has expired</view>
					<view class="service">With authorization, you can:</view>
					<view class="serviceDes">
						<view class="serviceText">
							<view class="circle">1</view>
							<view class="text">Synchronize Account Base Information and view account operation data.</view>
						</view>
						<view class="serviceText">
							<view class="circle">2</view>
							<view class="text">Post view video list.</view>
						</view>
						<view class="serviceText">
							<view class="circle">3</view>
							<view class="text">Get the league’s sales order data.</view>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				time: 59,
				setTime: null,
				isShowOverdue: false,
			}
		},
		created() {
			
		},
		mounted() {

		},
		methods: {
			open(){
				this.$refs.popup.open("center")
				this.isShowOverdue = false
				this.time = 59
				this.openTimer()
			},
			openTimer() {
				this.isShowOverdue = false
				this.time = 59
				//计时器计算倒计时
				this.setTime = setInterval(()=>{
					if (this.time > 0) {
						this.time = this.time - 1
						//console.log(this.time)
					} else{
						this.time = 59
						clearInterval(this.setTime);
						//此时需要操作，展示0s 或者 替换二维码 重新开始计算。
						this.isShowOverdue = true
					} 
				}, 1000);
			},
			close() {
				this.$refs.popup.close()
				clearInterval(this.setTime)
			},
			noClose() {
				// 防止点击图片关闭遮罩
			},
			refreshBtn() {
				clearInterval(this.setTime)
				this.openTimer()
			}
			
		}
	}
</script>

<style scoped>
	.container {
		
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
		background: rgba(0,0,0,0.6);
	}
	.card{
		width: 650rpx;
		height: 905rpx;
		background: #FFFFFF;
		border-radius: 8rpx;
		margin: 0 auto;
		text-align: center;
		line-height: normal;
		padding: 30rpx 36rpx 29rpx;
		box-sizing: border-box;
		position: relative;
	}
	.close{
		/* font-size: 24rpx;
		color: #999999;
		position: absolute;
		right: 30rpx;
		line-height: 24rpx; */
		width: 24rpx;
		height: 24rpx;
		line-height: 24rpx;
		color: rgb(209,209,209);
		display: block;
		position: absolute;
		right: 30rpx;
	}
	.cardTitle{
		font-size: 26rpx;
		font-family: Arial;
		font-weight: bold;
		color: #0B0B0B;
		line-height: 26rpx;
	}
	.cardTip{
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #39B83C;
		margin-top: 24rpx;
		line-height: 24rpx;
	}
	.ewm{
		width: 396rpx;
		height: 396rpx;
		display: block;
		margin: 34rpx auto 0;
		position: relative;
	}
	.cardEwm{
		width: 396rpx;
		height: 396rpx;
		display: block;
		margin: 0 auto;
	}
	.overdue{
		opacity: 0.2;
	}
	.refreshLogo{
		width: 74rpx;
		height: 73rpx;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
	}
	.cardTime{
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #0B0B0B;
		margin-top: 29rpx;
		line-height: 24rpx;
	}
	.service{
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #0B0B0B;
		text-align: left;
		margin-top: 31rpx;
		line-height: 24rpx;
	}
	.serviceDes{
		margin-top: 26rpx;
	}
	.serviceText{
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #666666;
		text-align: left;
		/* margin-top: 26rpx; */
		line-height: 50rpx;
		display: flex;
	}
	.circle{
		width: 24rpx;
		height: 24rpx;
		background: #FF7436;
		border-radius: 50%;
		font-size: 20rpx;
		font-family: Arial;
		font-weight: 400;
		color: #FFFFFF;
		text-align: center;
		line-height: 24rpx;
		margin-top: 12rpx;
	}
	.text{
		width: 540rpx;
		margin-left: 20rpx;
	}
</style>
