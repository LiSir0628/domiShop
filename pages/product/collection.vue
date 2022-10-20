<template>
	<view class="container">
		<uni-nav-bar left-icon="back" @clickLeft="back" :fixed="true" background-color="#ffffff" color="#000000" :title="$t('collection.Freesample_collection')"></uni-nav-bar>
		<view class="navbar">
			<scroll-view class="scroll-view_H" :scroll-left="scrollLeft" scroll-x="true" @scroll="scroll"
				:show-scrollbar="false">
				<view class="scroll-view-item_H" v-for="item,index in scrollList"
					:class="{'scroll-view-item-active':cindex == index}" @click="scrollTab(index)">{{item.name}}</view>
			</scroll-view>
		</view>
		<!-- <view class="content" v-if="lists.length > 0"> -->
		<scroll-view class="content" v-if="lists.length > 0" scroll-y="true" scroll-top="scrollViewTop" ower-threshold="100" @scrolltolower="lower()" :style="showListActive">
			<view class="sp" v-for="item,index in lists">
				<view class="spTop">
					<view class="timeClock">
						<image class="clock" src="../../static/images/product/icon17.png"></image>
						<view>{{item.addtime}}</view>
					</view>
					<view v-if="item.status == -2" class="closed">{{ $t('collection.It’s_closed') }}</view>
					<view v-else-if="item.status == -1" class="closed">Audit rejection</view>
					<view v-else-if="item.status == 3" class="received">{{ $t('collection.Delivery_received') }}</view>
					<view v-else-if="item.status == 1" class="shipment">{{ $t('collection.Ready_for_shipment') }}</view>
					<view v-else-if="item.status == 0" class="review">{{ $t('collection.Pending_review') }}</view>
					<view v-else-if="item.status == 2" class="progress">{{ $t('collection.Delivery_in_progress') }}</view>
				</view>
				<view class="spCenter">
					<image v-if="item.product_image" class="spLogo" :src="item.product_image" @click="goDetail(index)"></image>
					<image v-else class="spLogo" src="../../static/images/product/icon18.png" @click="goDetail(index)"></image>
					<view class="spMsg">
						<view class="spDes">{{item.product_name}}</view>
						<view class="spOperation">
							<view class="price">{{item.left_icon}} {{item.unit_price}}</view>
							<view class="commission">{{ $t('collection.High_Commission') }}: {{(item.commission_ratio*100).toFixed()}}%</view>
						</view>
					</view>
				</view>
				<view class="spBtn" v-if="item.status == 0 || item.status == 1" @click="cancel(index)">{{ $t('collection.Cancellation_of_application') }}</view>
				<view class="spBottom" v-if="item.status == 2 || item.status == 3">
					<!-- <view class="delivery">Delivery Company: ems</view>
					<view class="number">Odd Number: 1234567891111111</view> -->
					<view class="delivery">{{ $t('collection.Delivery_Company') }}: {{item.express_company}}</view>
					<view class="number">{{ $t('collection.Odd_Number') }}: {{item.express_no}}</view>
				</view>
			</view>
			<view class="noMore" v-if="current_page == total_page">
				<view class="noMoreUnderline"></view>
				{{ $t('collection.no_more') }}
				<view class="noMoreUnderline"></view>
			</view>
		</scroll-view>
		<!-- </view> -->
		<view class="content" v-else>
			<view class="noData">
				<image class="noDataLogo" src="../../static/images/common/icon02.png"></image>
				<view class="noDataText">{{ $t('common.It’s_empty') }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cindex: 0,
				state: 1,
				scrollLeft: 0,
				scrollList: [{
					id: 1,
					name: this.$t('collection').All_of_it
				}, {
					id: 2,
					name: this.$t('collection').Pending_review
				}, {
					id: 3,
					name: this.$t('collection').Ready_for_shipment
				}, {
					id: 4,
					name: this.$t('collection').Delivery_in_progress
				}, {
					id: 5,
					name: this.$t('collection').Delivery_received
				}, {
					id: 6,
					name: this.$t('collection').done
				}],
				// scrollList: [{
				// 	id: 1,
				// 	name: 'All of it'
				// }, {
				// 	id: 2,
				// 	name: 'Pending review (6)'
				// }, {
				// 	id: 3,
				// 	name: 'Ready for shipment (2)'
				// }],
				
				isRequest: true,
				current_page: 1,
				page: 1,
				limit: 20,
				total_limit: 0,
				total_page: 0,
				lists: [],
				// lists:[{
				// 	id: 1,
				// 	image: '../../static/images/home/photo.png',
				// 	name: 'zhelishi shangpinneirongshangpinne shangpinneirongs,zhelishi shangpinneirongshangpinne shangpinneirongs',
				// 	price: '25632.00',
				// 	commission: '56.00',
				// 	time: '2021-10-18 16:05:20',
				// 	state: 1
				// },{
				// 	id: 2,
				// 	image: '../../static/images/home/photo.png',
				// 	name: 'zhelishi shangpinneirongshangpinne shangpinneirongs,zhelishi shangpinneirongshangpinne shangpinneirongs',
				// 	price: '300000',
				// 	commission: '60',
				// 	time: '2021-10-18 16:05:20',
				// 	state: 2
				// },{
				// 	id: 3,
				// 	image: '../../static/images/home/photo.png',
				// 	name: 'zhelishi shangpinneirongshangpinne shangpinneirongs,zhelishi shangpinneirongshangpinne shangpinneirongs',
				// 	price: '300000',
				// 	commission: '60',
				// 	time: '2021-10-18 16:05:20',
				// 	state: 3
				// },{
				// 	id: 4,
				// 	image: '../../static/images/home/photo.png',
				// 	name: 'zhelishi shangpinneirongshangpinne shangpinneirongs,zhelishi shangpinneirongshangpinne shangpinneirongs',
				// 	price: '300000',
				// 	commission: '60',
				// 	time: '2021-10-18 16:05:20',
				// 	state: 4
				// },{
				// 	id: 5,
				// 	image: '../../static/images/home/photo.png',
				// 	name: 'zhelishi shangpinneirongshangpinne shangpinneirongs,zhelishi shangpinneirongshangpinne shangpinneirongs',
				// 	price: '300000',
				// 	commission: '60',
				// 	time: '2021-10-18 16:05:20',
				// 	state: 5
				// }]
				
				scrollViewTop: 0,
				showListActive: {
					'height': '902rpx'
				},
			}
		},
		onLoad(option) {
			//如果参数有值，渠道入口-请求
			//如果首页、分类特殊值有值-请求（不与上方同时触发）
			if (option.state){
				this.state = option.state
				for(let i in this.scrollList){
					if(this.scrollList[i].id == this.state){
						this.cindex = i
						break
					}
				}
			}
			this.getHttpLists("one")
		},
		onReachBottom() {
			//上拉加载，请求记得限制。
			// if (this.isRequest) {
			// 	console.log(this.page)
			// 	console.log(this.total_page)
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
		mounted() {
			this.getHeight()
			this.$nextTick(()=>{
				if(this.cindex > 2){
					this.scrollLeft = uni.upx2px(1000)
					// this.scrollLeft = uni.upx2px(662)
					// console.log(this.scrollLeft)
					this.$forceUpdate()
				}
			})
		},
		methods: {
			lower() {
				//上拉加载，请求记得限制。
				if (this.isRequest) {
					console.log(this.page)
					console.log(this.total_page)
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
									that.showListActive.height = res.windowHeight - 44 - uni.upx2px(150) + "px"
									// console.log(that.showListActive.height)
									that.$forceUpdate()
								}
							// #endif
						},
					})
				}).exec();
			},
			goDetail(index) {
				uni.navigateTo({
					url: './detail?id=' + this.lists[index].pid
				});
			},
			getHttpLists(type) {
				//this.lists = []
				this.isRequest = false
				uni.showLoading({
					title: this.$t('common').loading + '...',
					mask: true
				});
				this.$myRequest({
						method: 'GET',
						url: 'api/tiktok/sample/lists',
						data: {
							state: this.state,
							page: this.page,
							limit: this.limit
						}
					})
					.then(res => {
						this.isRequest = true
						uni.hideLoading();
						if (res.data.code == 200) {					
							let dataList = res.data.data
							let arr = dataList.lists
							for(let i in arr){
								if(arr[i].addtime){
									//arr[i].addtime = this.$transformTime(arr[i].addtime*1000,'yyyy-mm-dd hh:mm:ss')
								}
							}
							this.current_page = this.page
							if (type == "one") {	
								this.lists = arr					
								//this.page = dataList.page
								this.total_limit = dataList.total_limit
								this.total_page = Math.ceil(dataList.total_limit / this.limit)
								console.log(this.total_page)
							} else {
								//下拉加载更多								
								this.lists = this.lists.concat(arr)		
								//this.page = dataList.page
								this.total_page = Math.ceil(dataList.total_limit / this.limit)
							}
						} else {
							uni.showModal({
								title: this.$t('common').Tip,
								content: res.data.msg,
								confirmText: this.$t('common').confirm,
								showCancel: false,
							})
						}
					})
					.catch(err => {
						this.isRequest = true
						uni.hideLoading();
						uni.showModal({
							title: this.$t('common').Tip,
							content: this.$t('common').Network,
							confirmText: this.$t('common').confirm,
							//content: err,
							showCancel: false,
						})
				})
			},
			back() {
				window.history.go(-1)
			},
			scrollTab(index) {
				if (this.cindex == index) return
				this.cindex = index
				this.state = this.scrollList[this.cindex].id
				
				this.page = 1
				this.lists = []
				this.scrollViewTop = 0
				this.getHttpLists("one")
				// 根据此navbar 切换下拉框、显示面板
			},
			scroll(e) {
				if(e.detail.scrollLeft >= uni.upx2px(640)){
					
				} else if(e.detail.scrollLeft <=0 ) {
					this.scrollLeft = 0
				} else {
					this.scrollLeft = e.detail.scrollLeft
				}
				// console.log(e.detail.scrollLeft)
				// console.log(this.scrollLeft)
			},
			cancel(index) {
				// 取消领样申请
				uni.showLoading({
					title: this.$t('common').loading + '...',
					mask: true
				});
				this.$myRequest({
						method: 'POST',
						url: 'api/tiktok/sample/cancel',
						data: {
							id: this.lists[index].id,
						}
					})
					.then(res => {
						uni.hideLoading();
						if (res.data.code == 200) {
							console.log(res.data)
							this.lists[index].status = -2
							this.$forceUpdate()
						} else {
							uni.showModal({
								title: this.$t('common').Tip,
								content: res.data.msg,
								confirmText: this.$t('common').confirm,
								showCancel: false,
							})
						}
					})
					.catch(err => {
						uni.hideLoading();
						uni.showModal({
							title: this.$t('common').Tip,
							content: this.$t('common').Network,
							confirmText: this.$t('common').confirm,
							//content: err,
							showCancel: false,
						})
				})
			},
		}
	}
</script>

<style scoped>
	.container {
		/* padding-bottom: 42rpx; */
	}
	
	/* 滑动块 */
	.navbar {
		/* margin-top: 30rpx; */
		width: 750rpx;
		padding: 30rpx 0 30rpx 20rpx;
		position: fixed;
		top: 44px;
		background: #FFFFFF;
		z-index: 100;
		box-sizing: border-box;
		/* border-top: 2rpx solid #eee; */
	}
	
	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}
	
	.scroll-view-item_H {
		display: inline-block;
		text-align: center;
		height: 64rpx;
		line-height: 64rpx;
		padding: 0 20rpx;
		background: #FFFFFF;
		border: 2rpx solid #999999;
		border-radius: 8rpx;
		margin-right: 20rpx;
		font-size: 26rpx;
		font-family: Arial;
		font-weight: 400;
		color: #999999;
	}
	
	.scroll-view-item-active {
		background: #0B0B0B;
		color: #FFFFFF;
	}
	
	/deep/ ::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}
	
	/* 主要内容 */
	.content {
		width: 690rpx;
		margin: 130rpx auto 0;
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
	
	.spTop{
		border-bottom: 2rpx solid #CECECE;
		padding: 20rpx 22rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.timeClock{
		display: flex;
		align-items: center;
		font-size: 24rpx;
		line-height: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #333333;
	}
	
	.clock{
		width: 24rpx;
		height: 24rpx;
		margin-right: 8rpx;
	}
	
	.time{
		
	}
	
	.closed{
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #999999;
	}
	
	.received{
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #0B0B0B;
	}	.shipment{
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #F58A5A;
	}	.review{
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #28A897;
	}	.progress{
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #39B83C;
	}
	
	.spCenter {
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
	
	.commission{
		font-size: 28rpx;
		font-family: Arial;
		font-weight: bold;
		color: #FF3838;
	}
	
	.spBtn{
		width: 313rpx;
		height: 48rpx;
		line-height: 48rpx;
		background: #FF7436;
		border-radius: 8rpx;
		
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #FFFFFF;
		text-align: center;
		margin: 4rpx 22rpx 22rpx auto;
	}
	
	.spBottom{
		width: 686rpx;
		padding: 18rpx 20rpx 14rpx 22rpx;
		background: #F7F7F7;
		border-radius: 0rpx 0rpx 8rpx 8rpx;
		
		font-size: 24rpx;
		line-height: 30rpx;
		font-family: Arial;
		font-weight: 400;
		color: #666666;
		
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		box-sizing: border-box;
	}
	.delivery{

	}
	.number{
		
	}
	
	/* 无数据展示 */
	.noData{
		text-align: center;
		margin: 360rpx auto 0;
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
	
	.noMore{
		color: #999999;
		font-size: 24rpx;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto;
	}
	.noMoreUnderline{
		width: 40rpx;
		height: 2rpx;
		background: #999999;
		margin: 0 20rpx;
	}
</style>
