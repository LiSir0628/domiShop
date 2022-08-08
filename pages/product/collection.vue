<template>
	<view class="container">
		<uni-nav-bar left-icon="back" @clickLeft="back" :fixed="true" background-color="#ffffff" color="#000000" title="Free sample collection"></uni-nav-bar>
		<view class="navbar">
			<scroll-view class="scroll-view_H" :scroll-left="scrollLeft" scroll-x="true" @scroll="scroll"
				:show-scrollbar="false">
				<view class="scroll-view-item_H" v-for="item,index in scrollList"
					:class="{'scroll-view-item-active':cindex == index}" @click="scrollTab(index)">{{item.name}}</view>
			</scroll-view>
		</view>
		<view class="content" v-if="lists.length > 0">
			<view class="sp" v-for="item,index in lists">
				<view class="spTop">
					<view class="timeClock">
						<image class="clock" src="../../static/images/product/icon17.png"></image>
						<view>{{item.addtime}}</view>
					</view>
					<view v-if="item.status == -2" class="closed">It’s closed</view>
					<view v-else-if="item.status == -1" class="closed">Audit rejection</view>
					<view v-else-if="item.status == 3" class="received">Delivery received</view>
					<view v-else-if="item.status == 1" class="shipment">Ready for shipment</view>
					<view v-else-if="item.status == 0" class="review">Pending review</view>
					<view v-else-if="item.status == 2" class="progress">Delivery in progress</view>
				</view>
				<view class="spCenter">
					<image v-if="item.product_image" class="spLogo" :src="item.product_image"></image>
					<image v-else class="spLogo" src="../../static/images/product/icon18.png"></image>
					<view class="spMsg">
						<view class="spDes">{{item.product_name}}</view>
						<view class="spOperation">
							<view class="price">$ {{item.unit_price}}</view>
							<view class="commission">High Commission: {{(item.commission_ratio*100).toFixed()}}%</view>
						</view>
					</view>
				</view>
				<view class="spBtn" v-if="item.status == 0 || item.status == 1" @click="cancel">Cancellation of application</view>
				<view class="spBottom" v-if="item.status == 2 || item.status == 3">
					<!-- <view class="delivery">Delivery Company: ems</view>
					<view class="number">Odd Number: 1234567891111111</view> -->
					<view class="delivery">Delivery Company: {{item.express_company}}</view>
					<view class="number">Odd Number: {{item.express_no}}</view>
				</view>
			</view>
		</view>
		<view class="content" v-else>
			<view class="noData">
				<image class="noDataLogo" src="../../static/images/common/icon02.png"></image>
				<view class="noDataText">It's empty</view>
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
					name: 'All of it'
				}, {
					id: 2,
					name: 'Pending review'
				}, {
					id: 3,
					name: 'Ready for shipment'
				}, {
					id: 4,
					name: 'Delivery in progress'
				}, {
					id: 5,
					name: 'Delivery received'
				}, {
					id: 6,
					name: 'It’s done'
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
			}
		},
		onLoad(option) {
			//如果参数有值，渠道入口-请求
			//如果首页、分类特殊值有值-请求（不与上方同时触发）
			if (option.id) this.id = option.id
			this.getHttpLists()
		},
		mounted() {

		},
		methods: {
			getHttpLists() {
				this.lists = []
				uni.showLoading({
					title: 'loading...',
					mask: true
				});
				this.$myRequest({
						method: 'GET',
						url: 'api/tiktok/sample/lists',
						data: {
							state: this.state,
							// page: 1,
							// limit: 20,
						}
					})
					.then(res => {
						uni.hideLoading();
						if (res.data.code == 200) {
							console.log(res.data.data)
							this.lists = res.data.data
							
							for(let i in this.lists){
								if(this.lists[i].addtime){
									this.lists[i].addtime = this.$transformTime(this.lists[i].addtime*1000,'yyyy-mm-dd hh:mm:ss')
								}
							}
						} else {
							uni.showModal({
								title: 'TIP',
								content: res.data.msg,
								showCancel: false,
							})
						}
					})
					.catch(err => {
						uni.hideLoading();
						uni.showModal({
							title: 'TIP',
							content: "Network error, please try again later",
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
				this.getHttpLists()
				// 根据此navbar 切换下拉框、显示面板
			},
			scroll(e) {
				// this.scrollLeft = e.detail.scrollLeft
				// console.log(e)
				// console.log(this.scrollLeft)
			},
			cancel() {
				// 取消领样申请
			},
		}
	}
</script>

<style scoped>
	.container {
		padding-bottom: 42rpx;
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
</style>
