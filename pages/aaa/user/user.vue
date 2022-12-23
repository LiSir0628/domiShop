<template>
	<view class="container">
		<view class="top">
			<image class="talk-logo" src="../../static/images/user/icon06.png" @click="open"></image>
			<view class="user-modular">
				<image class="photo-logo" v-if="useList.avatar" :src="useList.avatar" @click="upload"></image>
				<image class="photo-logo" v-else src="../../static/images/default.png" @click="upload"></image>
				<view class="user-msg">
					<view class="user-name" @click="editName">{{useList.nickname}}</view>
					<view class="user-id">Account ID: {{useList.id}}</view>
				</view>
			</view>
		</view>
		
		<view class="category no-border" @click="goCommission">
			<image class="category-logo category-logo-a" src="../../static/images/user/icon07.png"></image>
			<view class="category-text">My Commission</view>
			<!-- <view class="earn">$2500</view> -->
		</view>
		<view class="category" @click="goHistory">
			<image class="category-logo" src="../../static/images/user/icon01.png"></image>
			<view class="category-text">Browse History</view>
		</view>
		
		<view class="category no-border" @click="goBuy">
			<image class="category-logo" src="../../static/images/user/icon02.png"></image>
			<view class="category-text">Buy courses</view>
		</view>
		<view class="category no-border" @click="goInvite">
			<image class="category-logo category-logo-b" src="../../static/images/user/icon08.png"></image>
			<view class="category-text">Invitation List</view>
		</view>
		<view class="category" @click="goBack">
			<image class="category-logo" src="../../static/images/user/icon04.png"></image>
			<view class="category-text">Log out</view>
		</view>
		
		<view class="study-modular" v-if="spLists.length > 0">
			<view class="study">Studying</view>
			<scroll-view class="scroll-logo-list" scroll-x="true" @scroll="scroll" :show-scrollbar="false">
				<view class="logo-list">
					<view class="logo-list-other" v-for="item,index in spLists" @click="goDetail(item)">
						<image class="sp-logo" :src="item.pic"></image>
						<view class="sp-name">{{item.title}}</view>
					</view>
					<view class="modular">0</view>
				</view>
			</scroll-view>
		</view>
		
		<uni-popup class="payTip-popup" ref="payState" @maskClick="closeMask">
			<view class="payTip-card">
				<image class="close-logo" src="../../static/images/detail/icon06.png" @click="closeMask"></image>
				<view class="tip01">Invite friends  <br/> to get commission</view>
				<image class="ewm" :src="qrCodeUrl"></image>
				<!-- <canvas class="ewm" canvas-id="qrcode" v-show="qrShow"/> -->
				<view class="btn">
					Long press on image to save
				</view>
				<view class="btn" @click="copy(useList.invite)">
					Copy link
				</view>
			</view>
		</uni-popup>
		<!-- 二维码 -->
		<view class="qr-box">
			<canvas canvas-id="qrcode" v-show="qrShow" style="width: 560rpx;height:560rpx;margin: 0 auto;"/>
		</view>
		<view class="bottom">
			<view class="bottom-list" v-for="item,index in bottomList" @click="goIndex(index)">
				<image class="bottom-logo" :style="item.styleClass" :src="item.image"></image>
				<view :class="{'bottom-nav-active': kindex == index}">{{item.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uQRCode from '@/common/uqrcode.js' //引入uqrcode.js
	import {
		pathToBase64,
		base64ToPath
	} from 'image-tools'
	export default {
		data() {
			return {
				qrShow: false,
				qrCodeUrl: "",
				invitation_code: "",
				useList: {
					
				},
				
				page: 1,
				limit: 10,
				spLists: [],
				// spLists: [{
				// 	id: 1,
				// 	title: "Kechen内容 Kechen内容",
				// 	des: "jianjie kehcengjiakecheng jiekecheng jianjie kehcengjiakecheng jiekecheng",
				// 	pic: "../../static/images/banner03.png"
				// }],
				
				kindex: 1,
				bottomList: [{
					id: 1,
					name: "Home",
					image: "../../static/images/icon04.png",
					url: "/pages/index/index",
					styleClass: {
						width: '53rpx',
						height: '53rpx'
					},
				}, {
					id: 2,
					name: "Me",
					image: "../../static/images/icon05.png",
					url: "/pages/user/user",
					styleClass: {
						width: '50rpx',
						height: '50rpx'
					},
				}]
			}
		},
		onLoad() {
			uni.showLoading({
				title: "loading...",
				mask: true
			});
		},
		onShow() {
			this.kindex = 1
			
			if(uni.getStorageSync('coursesUserList')){
				this.useList = uni.getStorageSync('coursesUserList')
			} else if(!uni.getStorageSync('token')){
				uni.redirectTo({url:'/pages/register/login'});
			} else {
				uni.setStorageSync('token', "");
				uni.redirectTo({url:'/pages/register/login'});
			}
			this.invitation_code = this.useList.invitation_code
			console.log(this.useList)
			console.log("邀请码:" + this.invitation_code)
			
			if(!this.qrCodeUrl){
				this.$nextTick(()=>{
					this.qrFun(this.useList.invite)
					console.log("生成二维码:" + this.useList.invite)
					//console.log("生成二维码:" + window.location.origin + "/pages/register/login?invi=" + this.invitation_code)
				})
			}
			
			this.getHttpLists()
		},
		methods: {
			scroll(e) {
				//this.scrollLeft = e.detail.scrollLeft
				// console.log(e)
				// console.log(this.scrollLeft)
			},
			
			upload() {
				let _this = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera'], //拍照选择
					success: function(res) {
						const tempFilePaths = res.tempFilePaths;
						uni.showLoading({
							title: 'loading...',
							mask: true
						});
						pathToBase64(res.tempFilePaths[0])
							.then(path => {
								_this.useList.avatar = path
								_this.setUpload()
							})
							.catch(error => {
								uni.hideLoading();
								console.error(error)
							})
					},
				});
			},
			setUpload() {
				this.$myRequest({
					method: 'POST',
					url: 'user/editerbatch',
					data: {
						avatar: this.useList.avatar
					}
				})
				.then(res => {
					uni.hideLoading();
					if (res.data.code == 200) {
						if(res.data.data.avatar.indexOf("?") == -1) {
							// 不存在?
							res.data.data.avatar = res.data.data.avatar + "?timestamp=" + Math.random()
						} else if(res.data.data.avatar.indexOf("?") != -1){
							// 存在?
							res.data.data.avatar = res.data.data.avatar + "&timestamp=" + Math.random()
						}
						
						this.useList.avatar = res.data.data.avatar
						uni.setStorageSync('coursesUserList', this.useList);
					} else {
						uni.showModal({
							title: "Tip",
							content: res.data.msg,
							confirmText: "confirm",
							showCancel: false,
						})
					}
					this.$forceUpdate()
				})
				.catch(err => {
					uni.hideLoading();
					uni.showModal({
						title: "Tip",
						content: "Network error, please try again later",
						confirmText: "confirm",
						showCancel: false,
					})
				})
			},
			editName() {
				uni.navigateTo({
					url: "./editName"
				});
			},
			
			
			goCommission() {
				//目前仿佛没有点击事件
				uni.navigateTo({
					url: "./commission"
				});
			},
			goHistory() {
				uni.navigateTo({
					url: "./history"
				});
			},
			goInvite() {
				console.log("进入邀请列表")
				uni.navigateTo({
					url: "./invite"
				});
			},
			goBuy() {
				uni.navigateTo({
					url: "./purchase"
				});
			},
			
			goBack() {
				uni.setStorageSync('token', "");
				uni.redirectTo({url:'/pages/register/login'});
			},
			
			getHttpLists() {
				// uni.showLoading({
				// 	title: "loading...",
				// 	mask: true
				// });
				this.$myRequest({
					method: 'GET',
					url: 'user/buied',
					data: {
						page: this.page,
						limit: this.limit
					}
				})
				.then(res => {
					uni.hideLoading();
					if (res.data.code == 200) {
						this.spLists = res.data.data.lists		
						this.$forceUpdate()
					} else {
						uni.showModal({
							title: "Tip",
							content: res.data.msg,
							confirmText: "confirm",
							showCancel: false,
						})
					}
				})
				.catch(err => {
					uni.hideLoading();
					uni.showModal({
						title: "Tip",
						content: "Network error, please try again later",
						confirmText: "confirm",
						showCancel: false,
					})
				})
			},
			goDetail(item) {
				uni.navigateTo({
					url: "/pages/index/detail?id=" + item.course_id
				});
			},
			
			goIndex(index) {
				if (this.kindex == index) return
				if (!this.bottomList[index].url) return
				this.kindex = index
				uni.navigateTo({
					url: this.bottomList[index].url
				});
			},
			
			open() {
				this.$refs.payState.open("center")
				
				// this.$nextTick(()=>{
				// 	this.qrFun(window.location.href)
				// 	console.log("生成二维码")
				// })
			},
			
			closeMask() {
				this.$refs.payState.close()
			},
			copy(text) {
				// text = text.replace(/<[^>]+>/g, '').replace(/&nbsp;/ig, '').replace(/\s/g, '')
				console.log(text)
				// #ifdef H5
				this.$copyText(text).then(
					res => {
						uni.showToast({
							title: "copy success"
						})
					}
				)
				// #endif
				// #ifndef H5
				uni.setClipboardData({
					data: text,
					success: () => {
						uni.showToast({
							title: "copy success"
						})
					}
				})
				// #endif
			},
			qrFun(text) {
				this.qrShow = true
				uQRCode.make({
					canvasId: 'qrcode',
					componentInstance: this,
					text: text,
					size: 280,
					margin: 0,
					backgroundColor: '#ffffff',
					foregroundColor: '#000000',
					fileType: 'jpg',
					errorCorrectLevel: uQRCode.errorCorrectLevel.H,
					success: res => {
						this.qrCodeUrl = res
					}
				})
			}
		}
	}
</script>

<style scoped>
	.container {
		padding-bottom: 80rpx;
	}
	
	.top{
		padding: 30rpx 30rpx 40rpx 40rpx;
		border-bottom: 16rpx solid #f5f5f5;
	}
	
	.talk-logo{
		width: 44rpx;
		height: 44rpx;
		display: block;
		margin: 0 0 0 auto;
	}
	
	.user-modular{
		margin-top: 55rpx;
		display: flex;
		align-items: center;
	}
	
	.photo-logo{
		width: 128rpx;
		height: 128rpx;
		border-radius: 50%;
	}
	
	.user-msg{
		margin-left: 30rpx;
	}
	
	.user-name{
		width: 450rpx;
		word-wrap: break-word;
		font-size: 38rpx;
		font-family: Inter-Bold;
		font-weight: bold;
		color: #222222;
		
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
	
	.user-id{
		font-size: 32rpx;
		font-family: Inter-Medium;
		font-weight: 500;
		color: #222222;
		margin-top: 24rpx;
	}
	
	/* 分类条目 */
	.category{
		display: flex;
		align-items: center;
		padding: 30rpx;
		border-bottom: 16rpx solid #f5f5f5;
		position: relative;
		background: #FFFFFF;
	}
	.no-border{
		border-bottom: 2rpx solid #f5f5f5;
	}
	.earn{
		font-size: 34rpx;
		font-family: Inter-Bold;
		font-weight: bold;
		color: #E84678;
		position: absolute;
		right: 30rpx;
	}
	.category-logo{
		width: 44rpx;
		height: 44rpx;
		display: block;
	}
	.category-logo-a{
		width: 40rpx;
		height: 39rpx;
		padding: 2rpx;
	}
	.category-logo-b{
		width: 40rpx;
		height: 38rpx;
		padding: 2rpx;
	}
	.category-text{
		margin-left: 28rpx;
		font-size: 32rpx;
		font-family: Inter-SemiBold;
		font-weight: normal;
		color: #222222;
	}
	
	/* 滚动 */
	/deep/ ::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}
	
	.study-modular{
		background: #ffffff;
		padding: 33rpx 0;
	}
	
	.study{
		font-size: 36rpx;
		font-family: Inter-SemiBold;
		font-weight: normal;
		color: #222222;
		padding-left: 30rpx;
	}
	
	.scroll-logo-list {
		width: 750rpx;
		/* margin: 10rpx auto 0; */
		margin: 0;
		white-space: nowrap;
		border-radius: 20rpx;
	}
	
	/deep/ .uni-scroll-view{
		
	}
	
	.logo-list {
		display: flex;
		padding: 30rpx 30rpx 30rpx;
	}
	
	.logo-list-other {
		width: 100%;
		/* margin-right: 30rpx; */
		white-space: initial;
		margin-right: 10rpx;
		
		width: 280rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		
		box-sizing: border-box;
		position: relative;
	}
	.modular{
		width: 10rpx;
		opacity: 0;
	}
	
	.sp-logo{
		width: 280rpx;
		height: 180rpx;
		border-radius: 20rpx;
		display: block;
	}
	
	.sp-name{
		font-size: 32rpx;
		line-height: 40rpx;
		font-family: Inter-Medium;
		font-weight: 500;
		color: #212644;
		padding: 14rpx 0 0 0;
		
		overflow: hidden;
		white-space: nowrap;
		word-wrap: normal;
		text-overflow: ellipsis;
		-o-text-overflow: ellipsis;
	}
	
	.sp-des{
		font-size: 32rpx;
		line-height: 36rpx;
		font-family: Inter-Medium;
		font-weight: 500;
		color: #999999;
		padding: 10rpx 20rpx 0 20rpx;
		
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
	
	/* 购买提示窗口 */
	.payTip-popup {
		border-radius: 24rpx;
	}
	
	.payTip-card {
		width: 660rpx;
		height: 998rpx;
		padding: 0 48rpx;
		box-sizing: border-box;
		border-radius: 24rpx;
		background: #FFFFFF;
		text-align: center;
	}
	
	.close-logo {
		width: 36rpx;
		height: 36rpx;
		position: absolute;
		right: 48rpx;
		top: 28rpx;
	}
	
	.tip-logo {
		width: 96rpx;
		height: 96rpx;
		margin: 50rpx auto 0;
	}
	
	.tip01 {
		font-size: 40rpx;
		line-height: 48rpx;
		font-family: Inter-Bold;
		font-weight: bold;
		color: #222222;
		padding: 38rpx 0;
		text-align: left;
	}
	
	.ewm{
		width: 560rpx;
		height: 560rpx;
		margin: 0 auto;
		display: block;
	}
	
	.btn {
		width: 500rpx;
		height: 88rpx;
		line-height: 88rpx;
		background: #E84678;
		border-radius: 20rpx;
		
		font-size: 32rpx;
		font-family: Inter-SemiBold;
		font-weight: normal;
		color: #FFFFFF;
		
		margin: 26rpx auto 0;
		text-align: center;
	}
	
	.qr-box{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		margin: 0 auto;
		z-index: -100;
		opacity: 0;
	}
	
	/* 底部 */
	.bottom {
		width: 750rpx;
		height: 100rpx;
		padding-top: 4rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-evenly;
		position: fixed;
		bottom: 0;
		background: #FFFFFF;
		border-top: 2rpx solid rgba(155, 155, 155, 0.1);
	
		font-size: 22rpx;
		font-family: Inter-Regular;
		font-weight: 400;
		color: #6A6A6C;
		z-index: 10;
	}
	
	.bottom-list {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}
	
	.bottom-logo {
		width: 50rpx;
		height: 50rpx;
		display: block;
	}
	
	.bottom-nav-active {
		color: #E84678;
	}
</style>
