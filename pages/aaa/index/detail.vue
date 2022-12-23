<template>
	<view class="container">
		<view class="video-modular">
			<!-- <view class="full-title">
				<image class="back" src="../../static/images/detail/back.png" @click="back"></image>
				<view v-if="fullScreen">{{title}}</view>
			</view> -->
			<!-- <image class="back" src="../../static/images/detail/back.png" @click="back"></image> -->
			<!-- <image v-if="!spLists[kindex]" class="video" src="../../static/images/detail/icon02.png"></image>
			<image v-else class="video" :src="spLists[kindex].full_pic_url"></image> -->
			<!-- <video id="videoId" class="videoId" :autoplay="true" :controls="false" src="../../static/images/movie.mp4"></video>-->
			<view class="no-full-title" v-if="!videoUrl">
				<image class="back" src="../../static/images/detail/back.png" @click="back"></image>
			</view>
			<image v-if="!videoUrl" class="video" src="../../static/images/detail/icon02.png"></image>
			<video v-if="videoUrl" id="videoId" class="videoId" :title="title" :src="videoUrl" :poster="coverUrl" 
			@timeupdate="videoTimeUpdateEvent" @progress="videoProgress" 
			@play="play" @waiting="wait" @fullscreenchange="fullscreen">
				<cover-view>
					<image v-if="isShowLoad" class="load-logo" src="../../static/images/tk.gif"></image>
					<view class="no-full-title" v-if="!fullScreen">
						<image class="back" src="../../static/images/detail/back.png" @click="back"></image>
					</view>
					
					<view class="full-title" v-else @click="closeFull">
						<image class="back" src="../../static/images/detail/back.png"></image>
						<view class="full-title-style">{{title}}</view>
					</view>
				</cover-view>
			</video>
			<image v-if="isShowPlay" class="play-logo" src="../../static/images/detail/icon01.png" @click="playVideo"></image>
		</view>
		<!-- <view class="introduction">
			<view class="title">tiktok video</view>
			<view class="des">kechengjianjie kechengjianjie kechengjianjie kec hengjianjie kechengjianjie kechengjianjie kechen gjianjie kechengjianjie kechengjianjie kechengjia njie kechengjianjie kechengjianjie kechengjianjie kechengjianjie kechengjianjie</view>
		</view> -->
		<view class="sort-modular">
			<view class="sort-text-lists" v-for="item,index in sortLists">
				<view class="sort-text" :class="{'sort-text-active': cindex == index}"
					@click="goSwitch(index)">
					{{item.title}}
				</view>
			</view>
		</view>

		<view class="nav">
			<view class="classes" v-if="cindex == 0">
				<view class="classes-msg">
					<view class="classes-tip">Select a course</view>
					<view class="classes-time">{{spMsg.video_num}} Lesson time</view>
				</view>
				<view class="programme" v-for="item,index in spLists" :class="{'classes-active': kindex === index}"
					@click="goProgramme(index,item)">
					<template v-if="spMsg.buied == 1">
						<!-- <view>{{item.title}} - 已购买</view> -->
						<view>{{item.title}}</view>
					</template>
					<template v-else-if="spMsg.charge_type ==1">
						<view>{{item.title}}(Try it out)</view>
					</template>
					<template v-else-if="spMsg.charge_type ==2">
						<view v-if="item.charge_type == 1">{{item.title}}(Try it out)</view>
						<!-- <view v-else-if="item.charge_type == 2" @click.stop="goMask(index,item)">{{item.title}} - 收费 - 触发付款</view> -->
						<view v-else-if="item.charge_type == 2" @click.stop="goMask(index,item)">{{item.title}}</view>
					</template>
					<template v-else-if="spMsg.charge_type ==3">
						<!-- <view @click.stop="goMask(index,item)">{{item.title}} - 收费 - 触发付款</view> -->
						<view @click.stop="goMask(index,item)">{{item.title}}</view>
					</template>
				</view>
			</view>
			<view class="content introduction" v-if="cindex == 1">
				<view class="title">{{spMsg.title}}</view>
				<view class="des">{{spMsg.description}}</view>
			</view>
		</view>

		<uni-popup class="payTip-popup" ref="payState" @maskClick="closeMask">
			<view class="payTip-card">
				<image class="close-logo" src="../../static/images/detail/icon06.png" @click="closeMask"></image>
				<image class="tip-logo" src="../../static/images/detail/icon07.png"></image>
				<view class="tip01">I'm sorry about that.</view>
				<view class="tip02">You have not purchased the course and cannot study it yet</view>
				<!-- <view class="btn payTip-btn">
					<text class="symbols">$</text>
					<text class="btn-price">15</text> 购买该课时
				</view> -->
				<view class="btn payTip-btn" @click="openPay">
					<text class="symbols">$</text>
					<text class="btn-price">{{spMsg.price}}</text> Buy courses
				</view>
			</view>
		</uni-popup>

		<uni-popup class="state-popup" ref="popupState" @maskClick="close">
			<view class="state-card">
				<view class="state-top">
					<view class="state-title">
						Buy courses
					</view>
					<view class="state-close" @click="close">+</view>
				</view>

				<view class="state-center">
					<view class="state-msg">
						<image class="state-logo" src="../../static/images/detail/icon02.png"></image>
						<view class="state-content">
							<view class="state-name">{{spMsg.title}}</view>
							<view class="state-times">
								<view class="state-time">{{spMsg.video_num}} Lesson time</view>
								<!-- <view class="state-long">总时长: 01:15:25</view> -->
							</view>
							<view class="state-price">
								$<text class="state-prices">{{spMsg.price}}</text>
							</view>
						</view>
					</view>
					<view class="state-tip">Payment Methods</view>
					<view class="state-pay-modular">
						<image class="pay-logo" src="../../static/images/detail/icon05.png"></image>
						<checkbox :checked="is_default" color="#ffffff" @click="switchChange" />
					</view>
					<view class="btn pay-btn" @click="goPay">
						<text class="symbols">$</text>
						<text class="btn-price">{{spMsg.price}}</text> Buy courses
					</view>
				</view>
			</view>
		</uni-popup>
		
		<view class="bottom" v-if="spMsg.buied != 1 && spMsg.price">
		<!-- <view class="bottom"> -->
			<view class="btn" @click="goBuy">
				<text class="symbols">$</text>
				<text class="btn-price">{{spMsg.price}}</text> Buy courses
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: "",
				isShowLoad: false,
				
				videoUrl: "",
				coverUrl: "../../static/images/detail/icon02.png",
				fullScreen: false,
				isShowPlay: true,
				videoContext: null,
				
				cindex: 0,
				sortLists: [{
					id: 1,
					title: "Lesson"
				}, {
					id: 2,
					title: "Introduction"
				}],

				course_id: "",
				page: 1,
				limit: 50,
				name: "",
				keyword: "",

				kindex: 0,
				spMsg: {},
				spLists: [],

				is_default: false,
			}
		},
		onLoad(option) {
			if (option.id) this.course_id = option.id
		},
		created() {
			//this.getHttpLists()
		},
		onShow() {
			uni.setStorageSync('history_length', window.history.length.toString());
			this.getHttpLists()
		},
		mounted() {
			//this.$refs.payState.open("center")
			//this.goBuy()
		},
		methods: {
			back() {
				window.history.go(-1)
			},

			change(e) {
				console.log(e)
			},
			goSwitch(index) {
				if (this.cindex == index) return
				this.cindex = index
			},
			playVideo(type) {
				if(this.spLists.length <=0 ){
					//无视频
					console.log("无视频")
					uni.showModal({
						title: "Tip",
						content: "No video available to play at this time",
						confirmText: "confirm",
						showCancel: false,
					})
					return
				} else if (this.spMsg.buied == 1) {
					console.log("已购买")
				} else if (this.spMsg.charge_type == 1) {
					console.log("免费视频")
				} else if (this.spMsg.charge_type == 2) {
					console.log("部分收费")
					if (this.spLists[this.kindex].charge_type == 2) {
						console.log("收费")
						this.$refs.payState.open("center")
						return
					}
				} else if (this.spMsg.charge_type == 3) {
					console.log("全部收费")
					this.$refs.payState.open("center")
					return
				}
				
				//接口触发是否可以播放判断，不进行播放操作
				if(type == "no") return
				
				this.startVideo()
			},
			startVideo() {
				this.videoUrl = ""
				this.isShowPlay = true
				console.log("开始播放")
				uni.showLoading({
					title: "loading...",
					mask: true
				});
				this.$myRequest({
					method: 'GET',
					url: 'course/video/' + this.spLists[this.kindex].id + '/info',
					data: {}
				})
				.then(res => {
					uni.hideLoading();
					if (res.data.code == 200) {
						console.log(res.data)
						this.videoUrl = res.data.data
						this.$nextTick(() =>{
							this.videoContext = uni.createVideoContext('videoId');
							//document.getElementsByClassName("uni-video-progress-buffered")[0].style.width = 0 + "%"
							this.isShowLoad = true
							this.videoContext.play();  //播放
							this.isShowPlay = false
						})
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
			closeFull() {
				this.videoContext.exitFullScreen();
			},
			videoTimeUpdateEvent(e) {
				// 播放进度-改变事件
				this.isShowLoad = false
				let currentTime = Number(e.detail.currentTime);
				//document.getElementsByClassName("uni-video-progress-buffered")[0].style.width = (e.detail.currentTime/e.detail.duration*100) + "%"
				// console.log(e)
				// console.log(e.detail.duration)
				// console.log(currentTime)
			},
			videoProgress(e) {
				// 进度条-改变事件
				//console.log(e)
			},
			play(e){
				// 当开始、继续播放-触发事件
			},
			wait(e) {
				// 当视频出现缓冲-触发事件
				this.isShowLoad = true
				console.log(e)
			},
			fullscreen(e) {
				// 视频全屏-触发事件
				this.fullScreen = e.detail.fullScreen
				console.log(e.detail.fullScreen)
			},
			getHttpLists() {
				uni.showLoading({
					title: "loading...",
					mask: true
				});
				this.$myRequest({
						method: 'GET',
						url: 'course/video?timestamp=' + Math.random(),
						data: {
							course_id: this.course_id,
							page: this.page,
							limit: this.limit,
							name: this.name,
							keyword: this.keyword,
						}
					})
					.then(res => {
						uni.hideLoading();
						if (res.data.code == 200) {
							this.spMsg = res.data.data
							this.spLists = res.data.data.lists
							// this.spLists = this.spLists.concat(this.spLists)
							// this.spLists = this.spLists.concat(this.spLists)
							// this.spLists = this.spLists.concat(this.spLists)
							// this.spLists = this.spLists.concat(this.spLists)
							// this.spLists = this.spLists.concat(this.spLists)
							// this.spLists = this.spLists.concat(this.spLists)
							// videoid用户最后观看视频id
							if (this.spMsg.videoid == 0) {
								this.kindex = 0
							} else {
								for (let i in this.spLists) {
									if (this.spLists[i].id == this.spMsg.videoid) {
										this.kindex = parseInt(i)
										break
									}
								}
							}
							if(this.spLists.length> 0){
								//this.coverUrl = this.spLists[this.kindex].full_pic_url
								this.title = this.spLists[this.kindex].title
							}
							this.playVideo("no")
							//buied是否已经购买
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
			goMask(index, item) {
				if (this.kindex === index) return
				this.kindex = index
				
				this.videoUrl = ""
				//this.coverUrl = this.spLists[index].full_pic_url
				this.isShowPlay = true
				this.$refs.payState.open("center")
			},
			closeMask() {
				this.$refs.payState.close()
			},
			goProgramme(index, item) {
				if (this.kindex === index) return
				this.kindex = index
				console.log(this.kindex)
				//视频封面
				//this.coverUrl = this.spLists[index].full_pic_url
				this.startVideo()
			},
			openPay() {
				this.closeMask()
				this.goBuy()
			},
			goBuy() {
				//打开购买窗口
				this.$refs.popupState.open("bottom")
			},
			switchChange() {
				this.is_default = !this.is_default
				console.log(this.is_default)
			},
			goPay() {
				// window.location.href = "http://www.baidu.com"
				// return
				if(!this.is_default){
					uni.showModal({
						title: "Tip",
						content: "Please select a payment method",
						confirmText: "confirm",
						showCancel: false,
					})
					return
				}
				uni.showLoading({
					title: "loading...",
					mask: true
				});
				this.$myRequest({
					method: 'POST',
					url: 'pay/pay/course',
					data: {
						course_id: this.course_id,
						product_type: "course",
						payment_type: "paypal"
					}
				})
				.then(res => {
					uni.hideLoading();
					if (res.data.code == 200) {
						console.log(res.data.data.approval_url)
						uni.setStorageSync('return_url', window.location.pathname);
						window.location.href = res.data.data.approval_url
						//window.location.replace(res.data.data.approval_url)
						
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
			close() {
				this.$refs.popupState.close()
			},

		}
	}
</script>

<style scoped>
	.container {
		padding-bottom: 10rpx;
	}
	
	.video-modular {
		height: 450rpx;
		position: relative;
	}
	
	.load-logo{
		width: 150rpx;
		height: 150rpx;
		max-width: 90px;
		max-height: 90px;
		display: block;
		position: absolute;
		left: 0;
		right: 0;
		top: 20rpx;
		bottom: 0;
		margin: auto;
		
	}
	
	.no-full-title{
		position: absolute;
		z-index: 1;
		left: 18rpx;
		top: 12rpx;
		
		font-size: 38rpx;
		font-family: Inter-Medium;
		font-weight: 500;
		color: #FFFFFF;
		
		display: flex;
		align-items: center;
	}
	
	.full-title {
		position: absolute;
		z-index: 1;
		left: 18rpx;
		top: 20rpx;
		
		font-size: 38rpx;
		font-family: Inter-Medium;
		font-weight: 500;
		color: #FFFFFF;
		
		display: flex;
		align-items: center;
	}
	
	.full-title-style{
		width: 480rpx;
		margin-left: 10rpx;
		
		overflow: hidden;
		white-space: nowrap;
		word-wrap: normal;
		text-overflow: ellipsis;
		-o-text-overflow: ellipsis;
	}
	
	.back {
		width: 42rpx;
		height: 42rpx;
	}

	.video {
		width: 750rpx;
		height: 414rpx;
		padding: 18rpx 0;
		background: #000000;
		display: block;
	}

	.videoId {
		width: 100%;
		/* height: 450rpx; */
	}
	
	/deep/ .uni-video-cover{
		display: none !important;
	}
	/* /deep/ .uni-video-ball{
		width: 20rpx;
		height: 20rpx;
		top: -36rpx;
		margin-left: -40rpx;
	} */
	/deep/ .uni-video-inner{
		background-color: #E84678 !important;
	}
	/deep/ .uni-video-progress-buffered{
		/* width: 0%; */
		background-color: #E84678 !important;
	}
	/deep/ .uni-video-fullscreen{
		width: 48rpx;
		height: 48rpx;
		padding: 16rpx 12rpx;
		background-image: url("../../static/images/detail/icon10.png");
	}
	/deep/ .uni-video-fullscreen.uni-video-type-fullscreen{
		background-image: url("../../static/images/detail/icon11.png");
	} 
	.play-logo {
		width: 168rpx;
		height: 168rpx;
		display: block;
		position: absolute;
		left: 0;
		right: 0;
		top: 40rpx;
		bottom: 0;
		margin: auto;
		z-index: 1;
	}

	/* 简介数据 */
	.nav {
		padding-bottom: 150rpx;
	}

	.introduction {
		padding: 42rpx 28rpx 0;
		/* border-bottom: 14rpx solid #F5F5F5; */
	}

	.title {
		font-size: 40rpx;
		font-family: Inter-Bold;
		font-weight: bold;
		color: #222222;
	}

	.des {
		font-size: 30rpx;
		line-height: 34rpx;
		font-family: Inter-Regular;
		font-weight: 400;
		color: #999999;
		margin-top: 18rpx;
	}

	.sort-modular {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-top: 14rpx solid #F5F5F5;
		border-bottom: 2rpx solid #EAEAEA;
		padding: 0 75rpx;
	}
	.sort-text-lists{
		width: 300rpx;
		text-align: center;
	}
	.sort-text {
		width: max-content;
		margin: 0 auto;
		font-size: 34rpx;
		font-family: Inter-Medium;
		font-weight: 500;
		color: #222222;
		padding: 32rpx 0 18rpx;

		border-bottom: 7rpx solid #ffffff;
	}

	.sort-text-active {
		font-family: Inter-SemiBold;
		font-weight: bold;
		color: #222222;

		border-bottom: 7rpx solid #E84678;
	}

	/* 课时信息 */
	.classes {
		padding: 42rpx 28rpx 0;
	}

	.classes-msg {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.classes-tip {
		font-size: 36rpx;
		font-family: Inter-Bold;
		font-weight: bold;
		color: #222222;
	}

	.classes-time {
		font-size: 32rpx;
		font-family: Inter-Medium;
		font-weight: 500;
		color: #999999;
	}

	.programme {
		font-size: 34rpx;
		line-height: 46rpx;
		font-family: Inter-Medium;
		font-weight: 500;
		color: #222222;
		margin: 50rpx 42rpx 0;

		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.classes-active {
		font-size: 34rpx;
		font-family: Inter-Medium;
		font-weight: 500;
		color: #E84678;
	}

	/*购买按钮*/
	.bottom {
		width: 750rpx;
		height: 136rpx;
		box-sizing: border-box;
		background: #FFFFFF;
		border-top: 2rpx solid #E6E6E6;
		position: fixed;
		bottom: 0;
	}

	.btn {
		width: 680rpx;
		height: 96rpx;
		line-height: 96rpx;
		box-sizing: border-box;
		background: #E84678;
		border-radius: 20rpx;

		font-size: 36rpx;
		font-family: Inter-Medium;
		font-weight: 400;
		color: #ffffff;
		text-align: center;
		margin: 20rpx auto;
	}

	.symbols {
		font-size: 28rpx;
		font-family: Inter-Regular;
		font-weight: 400;
	}

	.btn-price {
		font-size: 36rpx;
		font-family: Inter-SemiBold;
		font-weight: 400;
		margin: 0 10rpx 0 2rpx;
	}

	/* 购买提示窗口 */
	.payTip-popup {
		border-radius: 24rpx;
	}

	.payTip-card {
		width: 620rpx;
		height: 700rpx;
		padding: 0 36rpx;
		box-sizing: border-box;
		border-radius: 24rpx;
		background: #FFFFFF;
		text-align: center;
	}

	.close-logo {
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		right: 28rpx;
		top: 28rpx;
	}

	.tip-logo {
		width: 96rpx;
		height: 96rpx;
		margin: 50rpx auto 0;
	}

	.tip01 {
		font-size: 40rpx;
		font-family: Inter-Bold;
		font-weight: bold;
		color: #222222;
		margin-top: 40rpx;
	}

	.tip02 {
		font-size: 32rpx;
		font-family: Inter-Medium;
		font-weight: 500;
		color: #666666;
		margin: 32rpx 0 142rpx;
	}

	.payTip-btn {
		width: 480rpx;
		height: 88rpx;
	}

	/* 购买窗口 */
	.state-popup {
		border-radius: 50rpx;
		/* z-index: 1000; */
	}

	.state-card {
		width: 750rpx;
		height: 732rpx;
		padding: 30rpx 0 0 0;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 0 0;
		box-sizing: border-box;
		position: relative;
	}

	.state-top {
		width: 750rpx;
		position: relative;
		padding: 0 0 30rpx 0;
		border-bottom: 2rpx solid rgba(155, 155, 155, 0.4);
		box-sizing: border-box;
		text-align: left;
	}

	.state-title {
		font-size: 38rpx;
		font-family: Inter-SemiBold;
		font-weight: normal;
		color: #222222;
		line-height: 40rpx;
		padding: 0 40rpx;
	}

	.state-close {
		font-size: 60rpx;
		line-height: 32rpx;
		color: #1A1D26;
		position: absolute;
		top: 0;
		right: 30rpx;
		transform: rotate(45deg);
	}

	.state-center {}

	.state-msg {
		display: flex;
		justify-content: space-between;
		padding: 40rpx;
	}

	.state-logo {
		width: 220rpx;
		height: 164rpx;
		border-radius: 20rpx;
		display: block;
	}

	.state-content {
		width: 416rpx;
	}

	.state-name {
		font-size: 34rpx;
		font-family: Inter-SemiBold;
		font-weight: normal;
		color: #222222;

		overflow: hidden;
		white-space: nowrap;
		word-wrap: normal;
		text-overflow: ellipsis;
		-o-text-overflow: ellipsis;
	}

	.state-times {
		font-size: 30rpx;
		font-family: Inter-Medium;
		font-weight: 500;
		color: #999999;

		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 20rpx;
	}

	.state-time {}

	.state-long {}

	.state-price {
		font-size: 28rpx;
		font-family: Inter-Regular;
		font-weight: 400;
		color: #E84678;
		margin-top: 6rpx;
	}

	.state-prices {
		font-size: 34rpx;
	}

	.state-tip {
		font-size: 34rpx;
		font-family: Inter-Medium;
		font-weight: 500;
		color: #222222;
		padding: 0 40rpx;
	}

	.state-pay-modular {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 36rpx 40rpx;
	}

	.pay-logo {
		width: 140rpx;
		height: 100rpx;
		border-radius: 16rpx;
	}

	/deep/ .uni-checkbox-input {
		width: 36rpx;
		height: 36rpx;
		opacity: 1;
		border: 2rpx solid #999999;
		border-radius: 50%;
		margin-top: -4rpx;
	}

	/deep/ .uni-checkbox-input-checked {
		background: #E84678;
	}

	/deep/ .uni-checkbox-input.uni-checkbox-input-checked:before {
		font-size: 24rpx !important;
	}

	.pay-btn {
		position: absolute;
		bottom: 32rpx;
		left: 0;
		right: 0;
		margin: 0 auto;
	}
	
	@media only screen and (orientation: landscape) {
		.full-title{
			font-size: 26rpx;
			top: 24rpx;
			left: 32rpx;
		}
		.back {
			width: 24rpx;
			height: 24rpx;
		}
		.load-logo{
			top: 0;
		}
		/deep/ .uni-video-fullscreen{
			width: 26rpx;
			height: 26rpx;
		}
	}
</style>
