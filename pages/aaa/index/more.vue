<template>
	<view class="container">
		<uni-nav-bar fixed left-icon="back" @clickLeft="back" background-color="#ffffff" color="#000000" title="More Courses">
		</uni-nav-bar>
		
		<view class="content">
			<view class="logo-list">
				<view class="logo-list-other" v-for="item,index in spLists" @click="goDetail(item)">
					<image class="sp-logo" :src="item.full_pic_url"></image>
					<view class="sp-name">{{item.title}}</view>
					<view class="sp-view">{{item.views}} people in total</view>
					<view class="sp-time">{{item.video_num}} Lesson time</view>
					<view class="sp-price">
						$<text class="price">{{item.price}}</text>
					</view>
				</view>
			</view>
			<view class="noMore" v-if="current_page == total_page">
				<view class="noMoreUnderline"></view>
				no more
				<view class="noMoreUnderline"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: "",
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
		onPageScroll(res){
			// 滚动距离
			// console.log(res.scrollTop);
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
					url: 'course',
					data: {
						category_id: "",
						keyword: this.keyword,
						page: this.page,
						limit: this.limit
					}
				})
				.then(res => {
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
					url: "./detail?id=" + item.id
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
	
	.logo-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 30rpx 30rpx 2rpx;
	}
	
	.logo-list-other {
		width: 340rpx;
		background: #FFFFFF;
		margin-bottom: 30rpx;
		
		box-sizing: border-box;
		position: relative;
	}
	
	.sp-logo{
		width: 340rpx;
		height: 200rpx;
		display: block;
		
		border-radius: 24rpx;
	}
	
	.sp-name{
		font-size: 34rpx;
		line-height: 40rpx;
		font-family: Inter-SemiBold;
		font-weight: normal;
		color: #222222;
		padding: 12rpx 2rpx 0;
		
		overflow: hidden;
		white-space: nowrap;
		word-wrap: normal;
		text-overflow: ellipsis;
		-o-text-overflow: ellipsis;
	}
	
	.sp-view{
		font-size: 28rpx;
		line-height: 30rpx;
		font-family: Inter-Medium;
		font-weight: 500;
		color: #999999;
		padding: 10rpx 0 0 0;
		
		overflow: hidden;
		white-space: nowrap;
		word-wrap: normal;
		text-overflow: ellipsis;
		-o-text-overflow: ellipsis;
	}
	.sp-time{
		font-size: 28rpx;
		line-height: 30rpx;
		font-family: Inter-Medium;
		font-weight: 500;
		color: #999999;
		padding: 10rpx 0 0 0;
		
		overflow: hidden;
		white-space: nowrap;
		word-wrap: normal;
		text-overflow: ellipsis;
		-o-text-overflow: ellipsis;
	}
	.sp-price{
		font-size: 28rpx;
		font-family: Inter-Regular;
		font-weight: 400;
		color: #E84678;
		padding: 12rpx 0 0 0;
	}
	.price{
		font-size: 40rpx;
	}
	
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
</style>
