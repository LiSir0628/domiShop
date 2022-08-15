<template>
	<view class="container">
		<uni-nav-bar left-icon="back" @clickLeft="back" :fixed="true" background-color="#ffffff" color="#000000" title="Favorite list"></uni-nav-bar>
		<!-- <view class="content"> -->
		<scroll-view class="content" scroll-y="true" scroll-top="scrollViewTop" ower-threshold="100" @scrolltolower="lower()" :style="showListActive">
			<view v-if="lists.length > 0">
				<view class="sp" v-for="item,index in lists" @click="goDetail(index)">
					<view class="spTop">
						<image v-if="item.image" class="spLogo" :src="item.image"></image>
						<image v-else class="spLogo" src="../../static/images/product/icon18.png"></image>
						<view class="spMsg">
							<view class="spDes">{{item.title}}</view>
							<view class="spOperation">
								<view class="price">$ {{item.unit_price}}</view>
								<view class="favorite">
									<view class="commission">High Commission: {{(item.commission_ratio*100).toFixed()}}%</view>
									<image class="love" src="../../static/images/detail/icon16.png" @click.stop="remove(index)"></image>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view v-else>
				<view class="noData">
					<image class="noDataLogo" src="../../static/images/common/icon02.png"></image>
					<view class="noDataText">It's empty</view>
				</view>
			</view>
		</scroll-view>
		<!-- </view> -->
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lists: [],
				// lists:[{
				// 	id: 1,
				// 	product_id: 1,
				// 	stock: 100,
				// 	image: '../../static/images/home/photo.png',
				// 	title: 'zhelishi shangpinneirongshangpinne shangpinneirongs,zhelishi shangpinneirongshangpinne shangpinneirongs',
				// 	unit_price: '2563200.00',
				// 	commission_ratio: '56.00',
				// 	is_collection: true
				// },{
				// 	id: 2,
				// 	product_id: 2,
				// 	stock: 100,
				// 	image: '../../static/images/home/photo.png',
				// 	title: 'zhelishi shangpinneirongshangpinne shangpinneirongs,zhelishi shangpinneirongshangpinne shangpinneirongs',
				// 	unit_price: '300000',
				// 	commission_ratio: '60',
				// 	is_collection: true
				// }],
				isRequest: true,
				page: 1,
				limit: 20,
				total_limit: 0,
				total_page: 0,
				
				scrollViewTop: 0,
				showListActive: {
					'height': '902rpx'
				},
			}
		},
		onReachBottom() {
			//上拉加载，请求记得限制。
			// if (this.isRequest) {
			// 	if (this.page < this.total_page) {
			// 		console.log("选品页触底了,加载一下")
			// 		this.page = this.page + 1
			// 		this.getHttpLists()
			// 	} else {
			// 		console.log("页码已达到最大，无法再次请求")
			// 	}
			// 	this.$forceUpdate()
			// } else {
			// 	console.log("正在请求，无法再次请求")
			// }
		},
		onShow() {
			this.getHttpLists("one")
		},
		mounted() {
			//this.getHttpLists("one")
			this.getHeight()
		},
		methods: {
			lower() {
				//上拉加载，请求记得限制。
				if (this.isRequest) {
					if (this.page < this.total_page) {
						console.log("选品页触底了,加载一下")
						this.page = this.page + 1
						this.getHttpLists()
					} else {
						console.log("页码已达到最大，无法再次请求")
					}
					this.$forceUpdate()
				} else {
					console.log("正在请求，无法再次请求")
				}
			},
			getHeight() {
				const query = uni.createSelectorQuery().in(this);
				query.select('.top').boundingClientRect(data => {
					// console.log(data.height)
					var that = this;
					uni.getSystemInfo({
						success(res) {
							// console.log(res.windowHeight)
							// #ifdef MP-WEIXIN
							// #endif
							
							// #ifdef H5
								if(res.windowHeight>568){
									that.showListActive.height = res.windowHeight - 44 + "px"
									// console.log(that.showListActive.height)
									that.$forceUpdate()
								}
							// #endif
						},
					})
				}).exec();
			},
			getHttpLists(type) {
				this.isRequest = false
				uni.showLoading({
					title: 'loading...',
					mask: true
				});
				this.$myRequest({
						method: 'GET',
						url: 'api/tiktok/product/collection',
						data: {
							page: this.page,
							limit: this.limit
						}
					})
					.then(res => {
						this.isRequest = true
						uni.hideLoading();
						if (res.data.code == 200) {
							console.log(res.data.data)
							let dataList = res.data.data
							if (type == "one") {
								this.lists = dataList.collection_lists
			
								this.page = dataList.page
								this.total_limit = dataList.total_limit
								this.total_page = Math.ceil(dataList.total_limit / dataList.limit)
								//console.log(this.total_page)
							} else {
								//下拉加载更多
								this.lists = this.lists.concat(dataList.collection_lists)
							
								this.page = dataList.page
								this.total_page = Math.ceil(dataList.total_limit / dataList.limit)
							}
							
						} else {
							uni.showModal({
								title: 'TIP',
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
							title: 'TIP',
							content: "Network error, please try again later",
							confirmText: "confirm",
							//content: err,
							showCancel: false,
						})
				})
			},
			back() {
				window.history.go(-1)
			},
			goDetail(index) {
				uni.navigateTo({
					url: '/pages/product/detail?id=' + this.lists[index].product_id
				});
			},
			remove(index) {
				uni.showLoading({
					title: 'loading...',
					mask: true
				});
				this.$myRequest({
						method: 'POST',
						url: 'api/tiktok/product/collection',
						data: {
							id: this.lists[index].product_id,
							is_collection: 0
						}
					})
					.then(res => {
						uni.hideLoading();
						if (res.data.code == 200) {
							this.lists.splice(index,1)
							console.log(res.data)
						} else {
							uni.showModal({
								title: 'TIP',
								content: res.data.msg,
								confirmText: "confirm",
								showCancel: false,
							})
						}
					})
					.catch(err => {
						uni.hideLoading();
						uni.showModal({
							title: 'TIP',
							content: "Network error, please try again later",
							confirmText: "confirm",
							//content: err,
							showCancel: false,
						})
				})
			}
		}
	}
</script>

<style scoped>
	.container {
		
	}
	
	/* 主要内容 */
	.content {
		width: 690rpx;
		padding: 30rpx 0;
		margin: 0 auto;
		box-sizing: border-box;
	}
	
	/deep/ ::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}
	
	.sp {
		width: 690rpx;
		/* height: 400rpx; */
		background: #FFFFFF;
		border: 2rpx solid #CECECE;
		border-radius: 8rpx;
		margin-bottom: 20rpx;
	    box-sizing: border-box;	
	}
	
	.spTop {
		padding: 22rpx 22rpx 22rpx 22rpx;
		display: flex;
		justify-content: space-between;
	}
	
	.spLogo {
		width: 144rpx;
		height: 144rpx;
		border-radius: 8rpx;
		display: block;
	}
	
	.spMsg {
		width: 486rpx;
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
		justify-content: space-between;
	
	}
	
	.spDes {
		width: 486rpx;
		font-size: 28rpx;
		font-family: Arial;
		font-weight: bold;
		color: #0B0B0B;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		line-height: normal;
	}
	
	.spOperation {
		width: 486rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		line-height: normal;
	}
	
	.price{
		font-size: 24rpx;
		font-family: DIN;
		font-weight: bold;
		color: #999999;
	}
	.favorite{
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.commission{
		font-size: 28rpx;
		font-family: Arial;
		font-weight: bold;
		color: #FF3838;
	}
	
	.love{
		width: 24rpx;
		height: 21rpx;
	}
	
	/* 无数据展示 */
	.noData{
		text-align: center;
		margin: 300rpx auto 0;
	}
	.noDataLogo{
		width: 188rpx;
		height: 158rpx;
	}
	.noDataText{
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #CECECE;
		line-height: 24rpx;
		margin-top: 12rpx;
	}
</style>
