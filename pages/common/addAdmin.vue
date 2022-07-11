<template>
	<view class="popupMask">
		<uni-popup ref="popup" background-color="#fff" @maskClick="close">
			<view class="popup-content">
				<view class="card" @click.stop="noClose">
					<view class="close" @click="close">X</view>
					<view class="cardTitle">TIKTOK APP SCAN code access</view>
					<view class="cardTip">Please make sure you scan the TIK Tok account for at least one public video</view>
					<image class="cardEwm" src="../../static/images/home/demo.png"></image>
					<view class="cardTime">Expired after {{time}}s</view>
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
			}
		},
		created() {
			
		},
		mounted() {

		},
		methods: {
			open(){
				this.$refs.popup.open("center")
				this.time = 59
				this.openTimer()
			},
			openTimer() {
				//计时器计算倒计时
				this.setTime = setInterval(()=>{
					if (this.time > 0) {
						this.time = this.time - 1
						console.log(this.time)
					} else{
						this.time = 59
						clearInterval(this.setTime);
						//此时需要操作，展示0s 或者 替换二维码 重新开始计算。
					} 
				}, 1000);
			},
			close() {
				this.$refs.popup.close()
				clearInterval(this.setTime)
			},
			noClose() {
				// 防止点击图片关闭遮罩
			}
			
		}
	}
</script>

<style scoped>
	.container {
		
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
		font-size: 24rpx;
		color: #999999;
		position: absolute;
		right: 30rpx;
		line-height: 24rpx;
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
	.cardEwm{
		width: 396rpx;
		height: 396rpx;
		padding-top: 34rpx;
		display: block;
		margin: 0 auto;
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
