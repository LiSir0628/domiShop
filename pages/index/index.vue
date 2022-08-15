<template>
	<view class="container">
		<view class="title">Order board</view>
		<view class="navbar">
			<scroll-view class="scroll-view_H" :scroll-left="scrollLeft" scroll-x="true" @scroll="scroll"
				:show-scrollbar="false">
				<view class="scroll-view-item_H" v-for="item,index in scrollList"
					:class="{'scroll-view-item-active':cindex == index}" @click="scrollTab(index)">{{item.name}}</view>
			</scroll-view>
		</view>

		<view class="banner">
			<view class="uni-margin-wrap">
				<view class="bannerTitle">Data Overview</view>
				<scroll-view class="tab" :scroll-left="scrollTabLeft" scroll-x="true" @scroll="scrollTwo"
					:show-scrollbar="false">
					<view class="dataNumsNew">
						<image class="dataLogoNew" src="../../static/images/home/icon17.png"></image>
						<view class="dataPriceNew">${{fund_data.total_sales}}</view>
						<view class="dataTitleNew">Total sales</view>
					</view>
					<view class="dataNumsNew">
						<image class="dataLogoNew" src="../../static/images/home/icon18.png"></image>
						<view class="dataPriceNew">${{fund_data.effective_sales}}</view>
						<view class="dataTitleNew">Effective sales</view>
					</view>
					<view class="dataNumsNew">
						<image class="dataLogoNew" src="../../static/images/home/icon19.png"></image>
						<view class="dataPriceNew">${{fund_data.full_commission}}</view>
						<view class="dataTitleNew">Full Commission</view>
					</view>
					<view class="dataNumsNew">
						<image class="dataLogoNew" src="../../static/images/home/icon20.png"></image>
						<view class="dataPriceNew">${{fund_data.effective_commission}}</view>
						<view class="dataTitleNew">Effective Commission</view>
					</view>
					<view class="dataNumsNew">
						<image class="dataLogoNew" src="../../static/images/home/icon21.png"></image>
						<view class="dataPriceNew">{{fund_data.all_singular}}</view>
						<view class="dataTitleNew">All singular</view>
					</view>
					<view class="dataNumsNew">
						<image class="dataLogoNew" src="../../static/images/home/icon22.png"></image>
						<view class="dataPriceNew">{{fund_data.effective_singular}}</view>
						<view class="dataTitleNew">Effective singular</view>
					</view>
				</scroll-view>
				<!-- <swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay"
					:interval="interval" :duration="duration">
					<swiper-item>
						<image class="bannerLogo" src="../../static/images/home/icon04.png"></image>
						<view class="swiperDataList">
							<view class="swiperData">
								<view class="swiperDataNum">$52563.23</view>
								<view class="swiperDataTitle">Total sales</view>
							</view>
							<view class="swiperData">
								<view class="swiperDataNum">$52563.23</view>
								<view class="swiperDataTitle">Effective sales</view>
							</view>
							<view class="swiperData">
								<view class="swiperDataNum">$52563.23</view>
								<view class="swiperDataTitle">Full Commission</view>
							</view>
						</view>
						<view class="swiperDataListBottom">
							<view class="swiperData">
								<view class="swiperDataNum">$52563.23</view>
								<view class="swiperDataTitle">Effective Commission</view>
							</view>
							<view class="swiperData">
								<view class="swiperDataNum">10000</view>
								<view class="swiperDataTitle">All singular</view>
							</view>
							<view class="swiperData">
								<view class="swiperDataNum">10000</view>
								<view class="swiperDataTitle">Effective singular</view>
							</view>
						</view>
					</swiper-item>
					<swiper-item>
						<image class="bannerLogo" src="../../static/images/home/icon04.png"></image>
						<view class="swiperDataList">
							<view class="swiperData">
								<view class="swiperDataNum">10000</view>
								<view class="swiperDataTitle">All singular</view>
							</view>
							<view class="swiperData">
								<view class="swiperDataNum">10000</view>
								<view class="swiperDataTitle">Effective singular</view>
							</view>
							<view class="swiperData">
								<view class="swiperDataNum">10000</view>
								<view class="swiperDataTitle">Refund orders</view>
							</view>
						</view>
						<view class="swiperDataListBottom">
							<view class="swiperData">
								<view class="swiperDataNum">$52563.23</view>
								<view class="swiperDataTitle">Refund sales</view>
							</view>
							<view class="swiperData">
								<view class="swiperDataNum">$52563.23</view>
								<view class="swiperDataTitle">Refund Commission</view>
							</view>
							<view class="swiperData">
								<view class="swiperDataNum">10%</view>
								<view class="swiperDataTitle">Refund rate</view>
							</view>
						</view>
					</swiper-item> -->
				</swiper>
			</view>
		</view>

		<view class="rankModular">
			<view class="newMerchandise" @click="goData(0)">
				<view class="merchandiseLeft">
					<image class="merchandiseNewLogo" src="../../static/images/home/icon16.png"></image>
					<view>Merchandise ranking</view>
				</view>
				<image class="merchandiseRight" src="../../static/images/home/icon05.png"></image>
			</view>
			<!-- <view class="merchandise" v-for="item,index in rankList" @click="goData(index)">
				<view class="merchandiseTop">
					<image class="merchandiseLogo" :src="item.image"></image>
					<image class="arrowRight" src="../../static/images/home/icon05.png"></image>
				</view>
				<view class="merchandiseBottom">{{item.name}}</view>
			</view> -->
		</view>

		<!-- 订单状态，账号查看隐藏 -->
		<!-- <view class="sortList">
			<view class="sort" @click="toggle('bottom')">
				<view class="sortText">{{orderState}}</view>
				<image class="arrowDown" src="../../static/images/home/icon12.png"></image>
			</view>
			<view class="sort" @click="goSwitch">
				<view class="sortText">{{accountName}}</view>
				<image class="arrowDown" src="../../static/images/home/icon12.png"></image>
			</view>
		</view> -->
		<view class="detailTitle" v-if="spLists.length>0">
			<view class="underline"></view>
			Sampling list
			<view class="underline"></view>
		</view>
		<view class="spList" v-if="spLists.length>0">
			<!-- <view class="sp" v-for="item,index in spLists">
				<view class="spTop" @click="goDetail(index)">
					<image v-if="item.cover" class="spLogo" :src="item.cover"></image>
					<image v-else class="spLogo" src="../../static/images/product/icon18.png"></image>
					<view class="spMsg">
						<view class="spDes">{{item.name}}</view>
						<view class="spOperation">
							<view class="state" v-if="item.state == 2">order paid</view>
							<view class="settled" v-else-if="item.state == 4">settled account</view>
							<view class="stateRefund" v-else-if="item.state == 3">refund/return of order</view>
							<view class="time">{{item.time}} payment</view>
						</view>
					</view>
				</view>
				<view class="spMiddle">
					<view class="spData">
						<view class="dataTitle">Amount of payment</view>
						<view class="dataNum">${{item.payment}}</view>
					</view>
					<view class="spData">
						<view class="dataTitle">Commission ratio</view>
						<view class="dataNum">{{item.rate}}</view>
					</view>
					<view class="spData">
						<view class="dataTitle">Commission</view>
						<view class="dataNum">${{item.commission}}</view>
					</view>
				</view>
				<view class="spBottom">
					<image class="photo" src="../../static/images/home/photo.png"></image>
					<view class="name">zhanghaomingcheng</view>
				</view>
			</view> -->
			<view class="sp" v-for="item,index in spLists">
				<view class="spTop" @click="goDetail(index)">
					<image v-if="item.product_image" class="spLogo" :src="item.product_image"></image>
					<image v-else class="spLogo" src="../../static/images/product/icon18.png"></image>
					<view class="spMsg">
						<view class="spDes">{{item.product_name}}</view>
						<view class="spOperation">
							<view class="settled" v-if="item.status == 0">Pending review</view>
							<view class="state" v-else-if="item.status == 1">To be sent</view>
							<view class="state" v-else-if="item.status == 2">Sending</view>
							<view class="state" v-if="item.status == 3">Delivery received</view>
							<view class="stateRefund" v-else-if="item.status == -1 || item.status == -2">It’s done</view>
							<view class="time">{{item.addtime}} apply</view>
						</view>
					</view>
				</view>
				<view class="spMiddle">
					<view class="spData">
						<view class="dataTitle">Price</view>
						<view class="dataNum">${{item.unit_price}}</view>
					</view>
					<view class="spData">
						<view class="dataTitle">Commission ratio</view>
						<view class="dataNum">{{(item.commission_ratio*100).toFixed()}}%</view>
					</view>
					<view class="spData">
						<view class="dataTitle">Commission</view>
						<view class="dataNum">${{item.commission}}</view>
					</view>
				</view>
			</view>
			<view class="noMore" v-if="page == total_page">
				<view class="noMoreUnderline"></view>
				no more
				<view class="noMoreUnderline"></view>
			</view>
		</view>
		<view class="spList" v-else>
			<view class="noData">
				<image class="noDataLogo" src="../../static/images/common/icon01.png"></image>
				<view class="noDataText">It's empty</view>
			</view>
		</view>

		<view class="suspension" @click="goAdministration">
			<image class="suspensionLogo" src="../../static/images/home/icon13.png"></image>
			<view class="suspensionText">
				TIKTOK administration
			</view>
		</view>
		
		<view>
			<!-- 普通弹窗 -->
			<uni-popup ref="popup" background-color="#fff">
				<view class="popup-content">
					<view class="popupChoose" v-for="item,index in orderStateList" :class="{'activePopupChoose': citem == index}" @click="getOrderState(index,item.name)">{{item.name}}</view>
					<view class="confirmed" @click="confirmed">Confirmed</view>
				</view>
			</uni-popup>
		</view>
		
		<view class="bottomNavigation">
			<view class="bottomNav">
				<!-- <image class="navLogo" src="../../static/images/home/icon06.png"></image> -->
				<image class="navLogo" src="../../static/images/home/icon07.png"></image>
				<view class="navActiveText">Order form</view>
			</view>
			<view class="bottomNav" @click="goOptions">
				<image class="navLogo" src="../../static/images/home/icon08.png"></image>
				<view class="navText">Options</view>
			</view>
			<view class="bottomNav" @click="goIndividuals">
				<image class="navLogo" src="../../static/images/home/icon14.png"></image>
				<view class="navText">Individuals</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollLeft: 0,
				scrollTabLeft: 0,
				indicatorDots: true,
				autoplay: true,
				interval: 60000,
				duration: 500,
				
				days: '',
				cindex: 0, //0代表all 传递空值
				scrollList: [{
					id: '',
					name: 'All',
					value: ''
				},{
					id: 1,
					name: 'Today',
					value: 1
				}, {
					id: 2,
					name: 'Yesterday',
					value: 2
				}, {
					id: 3,
					name: 'Nearly seven days',
					value: 7
				}, {
					id: 4,
					name: 'Nearly 30 days',
					value: 30
				}, {
					id: 5,
					name: 'Nearly 60 days',
					value: 60
				}],
				rankList: [{
					id: 1,
					name: 'Merchandise ranking',
					image: '../../static/images/home/icon11.png'
				}, {
					id: 2,
					name: 'Tik Tok Account ranking',
					image: '../../static/images/home/icon09.png'
				}, {
					id: 3,
					name: 'Membership ranking',
					image: '../../static/images/home/icon10.png'
				}],
				
				orderStateList: [{
					id: 1,
					name: 'Full state',
					value: 1
				},{
					id: 2,
					name: 'Order paid',
					value: 2
				},{
					id: 3,
					name: 'Refund/return of order',
					value: 3
				},{
					id: 4,
					name: 'Settled Account',
					value: 4
				}],
				
				fund_data: {},
				spLists: [],
				isRequest: true,
				page: 1,
				limit: 20,
				total_limit: 0,
				total_page: 0,
				// spLists:[{
				// 	id: 1,
				// 	image: '../../static/images/home/photo.png',
				// 	name: 'zhelishi shangpinneirongshangpinne shangpinneirongs,zhelishi shangpinneirongshangpinne shangpinneirongs',
				// 	state: 2,
				// 	time: '10-18 16:05:20',
				// 	payment: '52563.23',
				// 	ratio: '23',
				// 	commission: '256'
				// },{
				// 	id: 2,
				// 	image: '../../static/images/home/photo.png',
				// 	name: 'zhelishi shangpinneirongshangpinne shangpinneirongs,zhelishi shangpinneirongshangpinne shangpinneirongs',
				// 	state: 4,
				// 	time: '10-18 16:05:20',
				// 	payment: '52563.23',
				// 	ratio: '23',
				// 	commission: '256'
				// },{
				// 	id: 3,
				// 	image: '../../static/images/home/photo.png',
				// 	name: 'zhelishi shangpinneirongshangpinne shangpinneirongs,zhelishi shangpinneirongshangpinne shangpinneirongs',
				// 	state: 3,
				// 	time: '10-18 16:05:20',
				// 	payment: '52563.23',
				// 	ratio: '23',
				// 	commission: '256'
				// }],
				
				citem: 0,
				prepareState: 'Full state',
				orderState: 'Full state',
				
				accountName: 'All of them',
			}
		},
		onReachBottom() {
			//上拉加载，请求记得限制。
			if(this.isRequest){
				if(this.page < this.total_page){
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
		mounted() {
			this.getHttpFund("one")
			this.getHttpLists("one")
			// this.$refs.popup.open("bottom")
			// 返回不触发，进行触发
		},
		onShow() {
			if(this.accountName == this.$store.state.accountName){
				// 账号无修改，无需请求
			} else {
				// 账号修改，接口请求触发
				this.accountName = this.$store.state.accountName
			}
		},
		methods: {
			getHttpLists(type) {
				this.isRequest = false
				uni.showLoading({
					title: 'loading...',
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
									arr[i].addtime = this.$transformTime(arr[i].addtime*1000,'mm-dd hh:mm:ss')
								}
							}
							
							if (type == "one") {	
								this.spLists = arr					
								//this.page = dataList.page
								this.total_limit = dataList.total_limit
								this.total_page = Math.ceil(dataList.total_limit / this.limit)
								console.log(this.total_page)
							} else {
								//下拉加载更多								
								this.spLists = this.spLists.concat(arr)		
								//this.page = dataList.page
								this.total_page = Math.ceil(dataList.total_limit / this.limit)
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
			getHttpFund(type) {
				this.$myRequest({
					method: 'GET',
					url: 'api/tiktok/index/index',
					data:{
						days: this.days,
						order_page: 1,
						order_limit: 20,
					}
				})
				.then(res=>{
					if(type != "one") uni.hideLoading();
					if(res.data.code == 200){
						this.fund_data = res.data.data.fund_data
					} else {
						uni.showModal({
							title: 'TIP',
							content: res.data.msg,
							confirmText: "confirm",
							showCancel: false,
						})
					}
				})
				.catch(err=>{
					if(type != "one") uni.hideLoading();
					uni.showModal({
						title: 'TIP',
						content: "Network error, please try again later",
						confirmText: "confirm",
						//content: err,
						showCancel: false,
					})
				})
			},
			// getHttpLists(type) {
			// 	this.isRequest = false
			// 	uni.showLoading({
			// 		title: 'loading...',
			// 		mask: true
			// 	});
			// 	this.$myRequest({
			// 		method: 'GET',
			// 		url: 'api/tiktok/index/index',
			// 		data:{
			// 			days: this.days,
			// 			order_page: this.page,
			// 			order_limit: this.limit,
			// 		}
			// 	})
			// 	.then(res=>{
			// 		this.isRequest = true
			// 		uni.hideLoading();
			// 		if(res.data.code == 200){
			// 			//console.log(res.data.data);
			// 			let order = {};
			// 			order = res.data.data.order
			// 			for(let i in order.orderList){
			// 				if(order.orderList[i].time){
			// 					order.orderList[i].time = this.$transformTime(order.orderList[i].time*1000,'mm-dd hh:mm:ss')
			// 				}
			// 			}
			// 			if(type == "one") {
			// 				this.spLists = order.orderList
			// 				this.fund_data = res.data.data.fund_data
			// 				//console.log(this.spLists)
			// 				this.page = order.order_page
			// 				this.total_limit = order.order_total_limit
			// 				this.total_page = Math.ceil(order.order_total_limit / order.order_limit)
			// 				//console.log(this.total_page)
			// 			} else {
			// 				//下拉加载更多
			// 				this.spLists = this.spLists.concat(order.orderList)
							
			// 				this.page = order.order_page
			// 				this.total_page = Math.ceil(order.order_total_limit / order.order_limit)
			// 			}
						
						
			// 		} else {
			// 			uni.showModal({
			// 				title: 'TIP',
			// 				content: res.data.msg,
			// 				showCancel: false,
			// 			})
			// 		}
			// 	})
			// 	.catch(err=>{
			// 		this.isRequest = true
			// 		uni.hideLoading();
			// 		uni.showModal({
			// 			title: 'TIP',
			// 			content: "Network error, please try again later",
			// 			//content: err,
			// 			showCancel: false,
			// 		})
			// 	})
			// },
			toggle(type) {
				// 获取选项索引
				for(let i in this.orderStateList){
					if(this.orderStateList[i].name == this.orderState){
						this.prepareState = this.orderState
						this.citem = i
					}
				}
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open(type)
			},
			scrollTab(index) {
				if (this.cindex == index) return
				this.cindex = index
				this.days = this.scrollList[index].value
				this.scrollTabLeft = 0
				
				// this.page = 1
				// this.spLists = []
				// this.getHttpLists("one")
				
				// 上方时间tab触发表单数据变化
				uni.showLoading({
					title: 'loading...',
					mask: true
				});
				this.getHttpFund()
			},
			scroll(e) {
				//this.scrollLeft = e.detail.scrollLeft
				// console.log(e)
				// console.log(this.scrollLeft)
			},
			scrollTwo(e) {
				//this.scrollTabLeft = e.detail.scrollLeft
				if(e.detail.scrollLeft > uni.upx2px(1030)){
					// this.scrollTabLeft = uni.upx2px(1030)
				} else if(e.detail.scrollLeft <= 0){
					this.scrollTabLeft = 0
				} else {
					this.scrollTabLeft = e.detail.scrollLeft
				}
				// console.log(e)
				// console.log(this.scrollTabLeft)
			},
			
			getOrderState(index,name) {
				this.citem = index
				this.prepareState = name
				console.log(this.citem)
				console.log(this.prepareState)
			},
			confirmed(){
				if(this.orderState == this.prepareState){
					//相同状态,不再次触发接口请求
					this.$refs.popup.close()
				} else {
					this.orderState = this.prepareState
					this.$refs.popup.close()
				}
			},
			goData(id){
				let style = "";
				if(id == 0) style = 0
				if(id == 1) style = 1
				if(id == 2) style = 2
				uni.navigateTo({
					url: './dataRanking?style=' + style
				});
			},
			goSwitch() {
				uni.navigateTo({
					url: './switch'
				});
			},
			goDetail(index) {
				uni.navigateTo({
					// url: '/pages/product/detail?id=' + this.spLists[index].id
					url: '/pages/product/detail?id=' + this.spLists[index].pid
				});
			},
			goAdministration() {
				uni.navigateTo({
					url: './administration'
				});
			},
			goOptions() {
				uni.switchTab({
					url: './../product/options'
				});
			},
			goIndividuals() {
				uni.switchTab({
					url: './../user/user'
				});
			}
		}
	}
</script>

<style scoped>
	page {
		width: 100%;
		height: 100%;
	}

	.container {
		width: 100%;
		min-height: 100%;
		background: #161616;
		line-height: normal;
		padding-bottom: 120rpx;
	}

	.title {
		margin: 0 auto;
		padding: 48rpx 0;
		text-align: center;
		font-size: 36rpx;
		font-family: Arial;
		font-weight: bold;
		color: #FFFFFF;
		background: #0B0B0B;
	}

	/* 滑动块 */
	.navbar {
		background: #0B0B0B;
		padding: 0rpx 0 25rpx 20rpx;
	}

	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}

	.scroll-view-item {
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
		font-size: 36rpx;
	}

	.scroll-view-item_H {
		display: inline-block;
		text-align: center;
		font-size: 28rpx;
		font-family: Arial;
		font-weight: 400;
		color: #999999;
		line-height: normal;
		margin-right: 62rpx;
	}

	.scroll-view-item-active {
		font-size: 32rpx;
		font-family: Arial;
		font-weight: bold;
		color: #FFFFFF;
	}

	/deep/ ::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}

	/* 轮播图 */
	.banner {
		margin: 20rpx auto 0;
		text-align: left;
	}
	.uni-margin-wrap {
		width: 711rpx;
		height: 277rpx;
		margin: 0 auto;
	}
	.bannerTitle{
		font-size: 32rpx;
		line-height: 32rpx;
		font-family: Arial;
		font-weight: bold;
		color: #FFFFFF;
		margin-bottom: 20rpx;
	}
	.tab{
		white-space: nowrap;
		width: 100%;
	}
	.dataNumsNew{
		display: inline-block;
		min-width: 270rpx;
		height: 223rpx;
		background: #262626;
		border-radius: 8rpx;
		padding: 30rpx 20rpx;
		box-sizing: border-box;
		margin-right: 20rpx;
	}
	.dataLogoNew{
		width: 56rpx;
		height: 56rpx;
		display: block;
	}
	.dataPriceNew{
		font-size: 32rpx;
		line-height: 34rpx;
		font-family: DIN;
		font-weight: bold;
		color: #FFFFFF;
		margin-top: 28rpx;
	}
	.dataTitleNew{
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #999999;
		margin-top: 22rpx;
	}
	
	
	
	
	
	
	.swiper {
		height: 277rpx;
		position: relative;
	}

	.swiper-item {
		display: block;
		height: 277rpx;
		line-height: 277rpx;
		text-align: center;
	}

	.bannerLogo {
		width: 711rpx;
		height: 277rpx;
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
	}

	.swiperDataList,
	.swiperDataListBottom {
		width: 710rpx;
		border-radius: 2rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;
		box-sizing: border-box;
		/* position: absolute;
		top: 0; */
	}

	.swiperData {
		width: 33.3%;
		text-align: center;
	}

	.swiperDataNum {
		font-size: 36rpx;
		line-height: 36rpx;
		font-family: DIN;
		font-weight: bold;
		color: #FFFFFF;
		margin-top: 44rpx;
	}

	.swiperDataTitle {
		font-size: 24rpx;
		line-height: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #F9F9F9;
		margin-top: 20rpx;
	}

	.swiperDataListBottom .swiperDataNum {
		margin-top: 30rpx;
	}

	/deep/ uni-swiper .uni-swiper-dots-horizontal {
		bottom: 17rpx;
	}

	/deep/ uni-swiper .uni-swiper-dot {
		width: 40rpx;
		height: 8rpx;
		background: rgba(247, 247, 247, 0.3);
		border-radius: 4rpx;
	}

	/deep/ uni-swiper .uni-swiper-dot-active {
		background-color: #FFFFFF !important;
		background: #FFFFFF !important;
	}

	/* 排行榜模块 */
	.rankModular {
		padding: 0 20rpx;
		margin-top: 29rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.merchandise {
		width: 223rpx;
		height: 175rpx;
		background: #262626;
		border-radius: 8rpx;
		padding: 20rpx 20rpx 18rpx 19rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		box-sizing: border-box;
	}

	.merchandiseTop {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.newMerchandise{
		width: 710rpx;
		height: 100rpx;
		padding: 20rpx 20rpx 20rpx 20rpx;
		box-sizing: border-box;
		background: #262626;
		border-radius: 8rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.merchandiseLeft {
		display: flex;
		align-items: center;
		font-size: 26rpx;
		font-family: Arial;
		font-weight: 400;
		color: #FFFFFF;
	}
	.merchandiseNewLogo{
		width: 56rpx;
		height: 56rpx;
		margin-right: 20rpx;
	}
	.merchandiseRight{
		width: 32rpx;
		height: 27rpx;
	}

	.merchandiseLogo {
		width: 56rpx;
		height: 56rpx;
	}

	.arrowRight {
		width: 32rpx;
		height: 27rpx;
	}

	.merchandiseBottom {
		font-size: 26rpx;
		line-height: 34rpx;
		font-family: Arial;
		font-weight: 400;
		color: #FFFFFF;
	}

	/* 分类排序 */
	.sortList {
		padding: 0 20rpx;
		margin: 40rpx auto;
		display: flex;
		align-items: center;
	}

	.sort {
		min-width: 180rpx;
		height: 64rpx;
		background: #161616;
		border: 2rpx solid #F7F7F7;
		border-radius: 8rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 20rpx;
		padding: 0 20rpx;
		box-sizing: border-box;
	}

	.sortText {
		font-size: 26rpx;
		font-family: Arial;
		font-weight: 400;
		color: #FFFFFF;
	}

	.arrowDown {
		width: 17rpx;
		height: 10rpx;
		margin-left: 10rpx;
	}

	/* 商品列表 */
	.spList {
		width: 710rpx;
		padding: 0 20rpx;
		margin: 30rpx auto 0;
	}

	.sp {
		width: 710rpx;
		/* 推荐达人模块隐藏，高度减少104rpx */
		/* height: 400rpx; */  
		height: 296rpx;
		border-radius: 8rpx;
		background: #262626;
		margin-bottom: 20rpx;
	}

	.spTop {
		height: 187rpx;
		padding: 22rpx 20rpx 20rpx 20rpx;
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
	}

	.spLogo {
		width: 144rpx;
		height: 144rpx;
		background: #FFFFFF;
		border-radius: 8rpx;
		display: block;
	}

	.spMsg {
		width: 508rpx;
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
		justify-content: space-between;

	}

	.spDes {
		width: 508rpx;
		font-size: 30rpx;
		line-height: 40rpx;
		font-family: Arial;
		font-weight: bold;
		color: #FFFFFF;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.spOperation {
		width: 508rpx;
		display: flex;
		justify-content: space-between;
		/* justify-content: flex-end; */
		align-items: end;
	}

	.state {
		/* width: 150rpx; */
		width: max-content;
		padding: 0 24rpx;
		height: 40rpx;
		background: rgba(40, 168, 151, 0.1);
		border-radius: 20rpx;
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #28A897;
		text-align: center;
		line-height: 40rpx;
	}
	.settled {
		/* width: 200rpx; */
		width: max-content;
		padding: 0 24rpx;
		height: 40rpx;
		background: rgba(245, 138, 90, 0.1);
		border-radius: 20rpx;
		
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #F58A5A;
		text-align: center;
		line-height: 40rpx;
	}
	.stateRefund{
		/* width: 246rpx; */
		width: max-content;
		padding: 0 24rpx;
		height: 40rpx;
		background: rgb(51, 51, 51);
		border-radius: 20rpx;
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #999999;
		text-align: center;
		line-height: 40rpx;
	}

	.time {
		font-size: 24rpx;
		line-height: 40rpx;
		font-family: Arial;
		font-weight: 400;
		color: #FFFFFF;
		text-align: right;
	}

	.spMiddle {
		width: 710rpx;
		height: 109rpx;
		background: #333333;
		border-radius: 2rpx 2rpx 8rpx 8rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx 54rpx;
		box-sizing: border-box;
	}

	.spData {
		text-align: center;
	}

	.dataTitle {
		font-size: 24rpx;
		line-height: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #CECECE;
	}

	.dataNum {
		font-size: 28rpx;
		line-height: 28rpx;
		font-family: DIN;
		font-weight: bold;
		color: #FFFFFF;
		margin-top: 18rpx;
	}



	.spBottom {
		width: 710rpx;
		height: 104rpx;
		display: flex;
		align-items: center;
		padding: 0 20rpx;
		box-sizing: border-box;
	}

	.photo {
		width: 64rpx;
		height: 64rpx;
		border-radius: 50%;
	}

	.name {
		font-size: 26rpx;
		font-family: Arial;
		font-weight: 400;
		color: #FFFFFF;
		margin-left: 12rpx;
	}
	
	/* 无数据展示 */
	.noData{
		text-align: center;
		margin: 215rpx auto 0;
	}
	.noDataLogo{
		width: 128rpx;
		height: 108rpx;
	}
	.noDataText{
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #999999;
		line-height: 24rpx;
		margin-top: 12rpx;
	}
	
	/* 悬浮框 */
	.suspension {
		width: 340rpx;
		height: 80rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 2rpx 13rpx 0px rgba(11, 11, 11, 0.35);
		border-radius: 40rpx 0px 0px 40rpx;
		display: flex;
		align-items: center;
		position: fixed;
		bottom: 170rpx;
		right: 0;
	}

	.suspensionLogo {
		width: 56rpx;
		height: 56rpx;
		margin: 0 10rpx 0 13rpx;
	}

	.suspensionText {
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #0B0B0B;
	}
	
	/* 下拉框弹窗 */
	.popup-content {
		width: 750rpx;
		height: 484rpx;
		/* display: flex;
		align-items: center;
		justify-content: center; */
		background-color: #fff;
		box-sizing: border-box;
		text-align: center;
		position: relative;
	}
	.popupChoose{
		width: 750rpx;
		height: 78rpx;
		line-height: 78rpx;		
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #999999;
		border-bottom: 2rpx solid #F7F7F7;
	}
	.popupChoose:nth-last-child(2){
		border-bottom: none;
	}
	.activePopupChoose{
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #161616;
	}
	.confirmed{
		width: 670rpx;
		height: 80rpx;
		background: #FF7436;
		border-radius: 8rpx;
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 80rpx;
		position: absolute;
		left: 0;
		right: 0;
		margin: 0 auto;
		bottom: 37rpx;
	}
	
	/* 底部导航 */
	.bottomNavigation{
		position: fixed;
		width: 750rpx;
		height: 97rpx;
		background: #0B0B0B;
		bottom: 0;
		left: 0;	
		display: flex;
		/* align-items: center; */
		justify-content: space-around;
		border-top: 2rpx solid #333333;
	}
	.bottomNav{
		width: 33.3%;
		text-align: center;
	}
	.navLogo{
		width: 42rpx;
		height: 42rpx;
		display: block;
		margin: 13rpx auto 0;
	}
	.navText,.navActiveText{
		font-size: 20rpx;
		line-height: 20rpx;
		font-family: Arial;
		font-weight: 400;
		color: #999999;
		margin-top: 11rpx;
	}
	.navActiveText{
		color: #FFFFFF;
	}
	
	/* 标题线 */
	.detailTitle {
		width: 750rpx;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 24rpx;
		font-family: Arial;
		font-weight: bold;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 30rpx;
		box-sizing: border-box;
		letter-spacing: 2rpx;
		margin-top: 20rpx;
	}
	
	.underline {
		width: 100rpx;
		height: 2rpx;
		background: #FFFFFF;
		margin: 0 30rpx;
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
