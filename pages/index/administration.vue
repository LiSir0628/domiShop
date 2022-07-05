<template>
	<view class="container">
		<uni-nav-bar left-icon="back" @clickLeft="back" background-color="#ffffff" color="#000000" title="TIKTOK administration"></uni-nav-bar>
		<view class="content" :style="contentHeight">
			<view class="userList" v-for="item,index in lists" :class="{'active': cIndex == index}" @click="choose(index)">
				<image class="userPhoto" :src="item.photo"></image>
				<view class="userName">{{item.name}}</view>
			</view>
			<!-- <view class="btn" @click="add">New TIKTOK account</view> -->
			<view class="btn" @click="toggle('center')">New TIKTOK account</view>
		</view>
		<!-- <view class="mask" v-if="isShowMask" @click="close"> -->
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
		<!-- </view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShowMask: false,
				time: 59,
				setTime: null,
				cIndex: 0,
				lists:[{
					id: 1,
					photo: '../../static/images/home/photo.png',
					name: 'zhanghaomingcheng'
				},{
					id: 2,
					photo: '../../static/images/home/photo.png',
					name: 'zhanghaomingcheng'
				},{
					id: 3,
					photo: '../../static/images/home/photo.png',
					name: 'zhanghaomingcheng'
				},{
					id: 4,
					photo: '../../static/images/home/photo.png',
					name: 'zhanghaomingcheng'
				},{
					id: 5,
					photo: '../../static/images/home/photo.png',
					name: 'zhanghaomingcheng'
				},{
					id: 6,
					photo: '../../static/images/home/photo.png',
					name: 'zhanghaomingcheng'
				},{
					id: 7,
					photo: '../../static/images/home/photo.png',
					name: 'zhanghaomingcheng'
				},{
					id: 8,
					photo: '../../static/images/home/photo.png',
					name: 'zhanghaomingcheng'
				},{
					id: 9,
					photo: '../../static/images/home/photo.png',
					name: 'zhanghaomingcheng'
				},{
					id: 10,
					photo: '../../static/images/home/photo.png',
					name: 'zhanghaomingcheng'
				},{
					id: 11,
					photo: '../../static/images/home/photo.png',
					name: 'zhanghaomingcheng'
				}],
				contentHeight: {
					'height': '1080rpx'
				},
			}
		},
		onLoad(option) {
			var that = this;
			uni.getSystemInfo({
				success(res) {
					// #ifdef MP-WEIXIN
					if (res.windowHeight > 568) {
						// that.showListActive.height = (res.windowHeight - 52 - 90 - 27 - 10) + "px"
					}
					// #endif
			
					// #ifdef H5
					if (res.windowHeight > 568) {
						that.contentHeight.height = (res.windowHeight - 44 - 30 - 60) + "px"
					}
					// #endif
					console.log(res.windowHeight)
					console.log(that.contentHeight.height)
				},
			})
		},
		mounted() {
			//关闭计时器，避免重复调用
			clearInterval(this.setTime)
		},
		methods: {
			back() {
				window.history.go(-1)
			},
			choose(index) {
				if(this.cIndex == index) return
				this.cIndex = index
			},
			openTimer() {
				//计时器计算倒计时
				this.setTime = setInterval(()=>{
					if (this.time > 0) {
						this.time = this.time - 1
					} else{
						this.time = 59
						clearInterval(this.setTime);
						//此时需要操作，展示0s 或者 替换二维码 重新开始计算。
					} 
				}, 1000);
			},
			toggle(type) {
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open(type)
				this.time = 59
				this.openTimer()
			},
			close() {
				this.$refs.popup.close()
				clearInterval(this.setTime)
			},
			noClose() {
				// 防止点击图片关闭遮罩
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
		/* padding: 30rpx 19rpx 30rpx 20rpx; */
	}
	
	.content{
		/* max-height: 1130rpx; */
		height: 1080rpx;
		padding: 30rpx;
		box-sizing: border-box;
		overflow: hidden;
		overflow-y: auto;
	}
	.content::-webkit-scrollbar {
	  display: none;
	}
	.userList{
		width: 690rpx;
		height: 148rpx;
		background: #FFFFFF;
		border: 1px solid #CECECE;
		border-radius: 8rpx;
		display: flex;
		align-items: center;
		padding: 30rpx 20rpx;
		box-sizing: border-box;
		margin: 0 auto 30rpx auto;
	}
	/* .active{
		background: rgba(255, 116, 54, 0.08);
		border: 2rpx solid #FF7436;
	} */
	.userPhoto{
		width: 88rpx;
		height: 88rpx;
		border-radius: 50%;
	}
	.userName{
		margin-left: 20rpx;
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #0B0B0B;
	}
	
	.btn{
		width: 670rpx;
		height: 80rpx;
		background: #FF7436;
		border-radius: 8rpx;
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #FFFFFF;
		text-align: center;
		line-height: 80rpx;
		position: absolute;
		left: 0;
		right: 0;
		margin: 0 auto;
		bottom: 37rpx;
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
