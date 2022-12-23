<template>
	<view class="container">
		<uni-nav-bar fixed left-icon="back" @clickLeft="back" background-color="#ffffff" color="#000000" title="Browse History">
		</uni-nav-bar>
		<view class="content" v-if="isShow">
			<view class="lists" v-if="spLists.length > 0">
				<view class="list" v-for="item,index in spLists" @click="goDetail(item)">
					<view class="courses">
						<image class="courses-logo" :src="item.pic"></image>
						<image class="courses-play" src="../../static/images/icon06.png"></image>
					</view>
					<view class="msg">
						<view class="name">{{item.title}}</view>
						<view class="people">{{item.views}} people studied</view>
						<view class="courses-msg">
							<view class="courses-time">{{item.video_num}} Lesson time</view>
							<view class="courses-price">
								$<text class="price">{{item.price}}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="noMore" v-if="current_page == total_page">
					<view class="noMoreUnderline"></view>
					no more
					<view class="noMoreUnderline"></view>
				</view>
			</view>
			<view class="no-lists" v-else>
				<image class="no-lists-logo" src="../../static/images/icon07.png"></image>
				<view class="no-lists-text">No data available</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShow: false,
				spLists: [],
				
				isRequest: true,
				current_page: 1,
				page: 1,
				limit: 20,
				total_limit: 0,
				total_page: 0,
			}
		},
		created() {
			this.getHttpLists("one")
		},
		onReachBottom() {
			//上拉加载，请求记得限制。
			if (this.isRequest) {
				if (this.page < this.total_page) {
					//console.log("选品页触底了,加载一下")
					this.page = this.page + 1
					this.getHttpLists()
				} else {
					console.log("页码已达到最大，无法再次请求")
				}
				this.$forceUpdate()
			} else {
				//console.log("正在请求，无法再次请求")
			}
		},
		methods: {
			back() {
				window.history.go(-1)
			},
			
			getHttpLists(type) {
				this.isRequest = false
				uni.showLoading({
					title: "loading...",
					mask: true
				});
				this.$myRequest({
					method: 'GET',
					url: 'user/viewed',
					data: {
						page: this.page,
						limit: this.limit
					}
				})
				.then(res => {
					this.isShow = true
					this.isRequest = true
					uni.hideLoading();
					if (res.data.code == 200) {
						this.current_page = this.page
						
						if (type == "one") {
							this.spLists = res.data.data.lists
							this.total_limit = res.data.data.total_limit
							this.total_page = Math.ceil(this.total_limit / this.limit)
						} else {
							this.spLists = this.spLists.concat(res.data.data.lists)
						}
						
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
					this.isRequest = true
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
		}
	}
</script>

<style scoped>
	.container {
		
	}
	
	/deep/ .uni-navbar--border {
		border-bottom-color: white;
	}
	
	.content{
		
	}
	
	.lists{
		padding: 28rpx 30rpx;
	}
	
	.list{
		display: flex;
		margin-bottom: 36rpx;
	}
	
	.courses{
		width: 270rpx;
		height: 200rpx;
		position: relative;
	}
	
	.courses-logo{
		width: 270rpx;
		height: 200rpx;
		display: block;
		border-radius: 20rpx;
	}
	
	.courses-play{
		width: 64rpx;
		height: 64rpx;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
	}
	
	.msg{
		width: 390rpx;
		margin-left: 30rpx;
	}
	.name{
		font-size: 34rpx;
		line-height: 40rpx;
		font-family: Inter-SemiBold;
		font-weight: normal;
		color: #222222;
		
		overflow: hidden;
		white-space: nowrap;
		word-wrap: normal;
		text-overflow: ellipsis;
		-o-text-overflow: ellipsis;
	}
	.people{
		font-size: 30rpx;
		font-family: Inter-Regular;
		font-weight: 400;
		color: #999999;
		margin-top: 22rpx;
	}
	.courses-msg{
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		margin-top: 8rpx;
	}
	.courses-time{
		font-size: 30rpx;
		font-family: Inter-Regular;
		font-weight: 400;
		color: #999999;
	}
	.courses-price{
		font-size: 28rpx;
		font-family: Inter-Regular;
		font-weight: 400;
		color: #E84678;
	}
	.price{
		font-size: 36rpx;
	}
	/* 更多 */
	.noMore {
		color: #999999;
		font-size: 24rpx;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto;
		padding: 10rpx 0 20rpx;
	}
	
	.noMoreUnderline {
		width: 40rpx;
		height: 2rpx;
		background: #999999;
		margin: 0 20rpx;
	}
	
	.no-lists{
		padding: 148rpx 0;
		text-align: center;
	}
	
	.no-lists-logo{
		width: 128rpx;
		height: 108rpx;
		display: flex;
		margin: 0 auto;
	}
	
	.no-lists-text{
		font-size: 28rpx;
		font-family: Inter-Medium;
		font-weight: 500;
		color: #222222;
		margin-top: 20rpx;
	}
</style>
