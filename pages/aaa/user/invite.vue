<template>
	<view class="container">
		<uni-nav-bar fixed left-icon="back" @clickLeft="back" background-color="#ffffff" color="#000000" title="Invitation List">
		</uni-nav-bar>
		<view class="content" v-if="isShow">
			<view v-if="spLists.length > 0">
				<view class="lists" v-for="item in spLists">
					<image class="photo" v-if="item.avatar" :src="item.avatar"></image>
					<image class="photo" v-else src="../../static/images/default.png"></image>
					<view class="lists-content">
						<view class="lists-msg">
							<view class="lists-name">{{item.nickname}}</view>
							<view class="lists-id">{{item.id}}</view>
						</view>
						<!-- <view class="lists-des">
							<view class="lists-time">{{item.create_time}}</view>
							<view class="lists-earn">Earn ${{item.earn}}</view>
						</view> -->
					</view>
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
				// spLists: [{
				// 	avatar: "../../static/images/photo.png",
				// 	nickname: "某某某",
				// 	id: "账号",
				// 	create_time: "8:48",
				// 	earn: 51,
				// 	invite: "RUM8OIZX",
				// }],
				
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
					url: 'user/invites',
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
		/* padding: 24rpx 0; */
	}
	
	.lists{
		display: flex;
		align-items: center;
		padding: 30rpx;
		border-bottom: 2rpx solid #E6E6E6;
	}
	
	.photo{
		width: 104rpx;
		height: 104rpx;
		border-radius: 50%;
	}
	
	.lists-content{
		width: 554rpx;
		display: flex;
		justify-content: space-between;
		margin-left: 30rpx;
		/* align-items: center; */
	}
	
	.lists-msg{
		width: 554rpx;
	}
	
	.lists-name{
		width: 554rpx;
		word-wrap: break-word;
		font-size: 34rpx;
		font-family: Inter-Medium;
		font-weight: 500;
		color: #222222;
		
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
	
	.lists-id{
		font-size: 30rpx;
		font-family: Inter-Medium;
		font-weight: 500;
		color: #999999;
		margin-top: 10rpx;
	}
	
	.lists-des{
		text-align: right;
	}
	
	.lists-time{
		font-size: 28rpx;
		font-family: Inter-Medium;
		font-weight: 500;
		color: #999999;
	}
	
	.lists-earn{
		font-size: 32rpx;
		font-family: Inter-Bold;
		font-weight: bold;
		color: #E84678;
		margin-top: 10rpx;
	}
	
	/* 没数据 */
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
