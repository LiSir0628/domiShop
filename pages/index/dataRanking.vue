<template>
	<view class="container">
		<view class="top">
			<uni-nav-bar left-icon="back" @clickLeft="back" background-color="#ffffff" color="#000000" title="Merchandise ranking">
			</uni-nav-bar>
			<view class="newSort" @click="toggle('bottom')">
				<view class="newSortText">{{orderState}}</view>
				<image class="arrowDown" src="../../static/images/rank/icon07.png"></image>
			</view>
		</view>
		<!-- <view class="navbar">
			<scroll-view class="scroll-view_H" :scroll-left="scrollLeft" scroll-x="true" @scroll="scroll"
				:show-scrollbar="false">
				<view class="scroll-view-item_H" v-for="item,index in scrollList"
					:class="{'scroll-view-item-active':cindex == index}" @click="scrollTab(index)">{{item.name}}</view>
			</scroll-view>
		</view> -->

		<!-- <view>
			<scroll-view class="tab" :class="{tabHeight: isShowTabHeight}" :scroll-left="scrollTabLeft" scroll-x="true"
				@scroll="scroll" :show-scrollbar="false">
				<view class="sortList">
					<view class="sort" @click="toggle('bottom')">
						<view class="sortText">{{orderState}}</view>
						<image class="arrowDown" src="../../static/images/rank/icon07.png"></image>
					</view>
					<view class="sort" @click="goSwitch">
						<view class="sortText">{{accountName}}</view>
						<image class="arrowDown" src="../../static/images/rank/icon07.png"></image>
					</view>
					<view class="sort" v-if="cindex != 2" @click="goSwitch">
						<view class="sortText">Membership ranking</view>
						<image class="arrowDown" src="../../static/images/rank/icon07.png"></image>
					</view>
				</view>
			</scroll-view>
		</view> -->

		<!-- <view class="merRankList" v-if="cindex == 0 && lists.merchandise_ranking.length>0"> -->
		<scroll-view class="merRankList" v-if="cindex == 0 && lists.merchandise_ranking.length>0" scroll-y="true" scroll-top="scrollViewTop" ower-threshold="100" @scrolltolower="lower()" :style="showListActive">
			<view class="merRank" :class="{'merRankActive': merIndex == index}" v-for="item,index in lists.merchandise_ranking"
				@click="merIndexChoose(index)">
				<view class="userMsg">
					<view>
						<image class="rankLogo" src="../../static/images/rank/icon01.png" v-if="index == 0"></image>
						<image class="rankLogo" src="../../static/images/rank/icon02.png" v-else-if="index == 1">
						</image>
						<image class="rankLogo" src="../../static/images/rank/icon03.png" v-else-if="index == 2">
						</image>
						<view v-else>
							<image class="rankLogo" src="../../static/images/rank/icon04.png"></image>
							<view class="rankText">{{index+1}}</view>
						</view>
					</view>
					<image v-if="item.image" class="photo" :src="item.image"></image>
					<image v-else class="photo" src="../../static/images/product/icon18.png"></image>
				</view>
				<view class="merRankRight">
					<view class="merRankTop">
						<view class="spTitle ellip">{{item.title}}</view>
						<view class="profit">
							<view class="price">Unit Price: ${{item.unit_price}}</view>
							<view class="ratio">Commission ratio: {{(item.commission_ratio*100).toFixed()}}%</view>
						</view>
					</view>
					<view class="merRankBottom">
						<view class="sales">
							<image class="salesLogo" src="../../static/images/rank/icon08.png"></image>
							<view>Cumulative sales:<text class="weight">${{item.cumulative_sales}}</text></view>
						</view>
						<view class="commission">
							<image class="commissionLogo" src="../../static/images/rank/icon06.png"></image>
							<view>Accumulated Commission:<text class="weight">${{item.accumulated_commission}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="noMore" v-if="page == total_page">
				<view class="noMoreUnderline"></view>
				no more
				<view class="noMoreUnderline"></view>
			</view>
		</scroll-view>
		<!-- </view> -->
		<view class="merRankList" v-else-if="cindex == 0 && lists.merchandise_ranking.length<=0">
			<view class="noData">
				<image class="noDataLogo" src="../../static/images/common/icon02.png"></image>
				<view class="noDataText">It's empty</view>
			</view>
		</view>
		<view class="merRankList" v-else-if="cindex == 1 && lists.account_ranking.length>0">
			<view class="merRank merRankAccount" :class="{'merRankActive': merIndex == index}"
				v-for="item,index in lists.account_ranking" @click="merIndexChoose(index)">
				<view class="userMsg userMsgAccount">
					<view>
						<image class="rankLogo rankLogoAccount" src="../../static/images/rank/icon01.png"
							v-if="index == 0"></image>
						<image class="rankLogo rankLogoAccount" src="../../static/images/rank/icon02.png"
							v-else-if="index == 1"></image>
						<image class="rankLogo rankLogoAccount" src="../../static/images/rank/icon03.png"
							v-else-if="index == 2"></image>
						<view v-else>
							<image class="rankLogo rankLogoAccount" src="../../static/images/rank/icon04.png"></image>
							<view class="rankText rankTextAccount">{{index+1}}</view>
						</view>
					</view>
					<image class="photo circular" :src="item.tiktok_photo"></image>
				</view>
				<view class="accountRight">
					<view class="accountTop">
						<view class="spTitle">
							<view>{{item.tiktok_name}}</view>
							<view class="ID">ID:{{item.account_id}}</view>
						</view>
						<!-- <view class="accountName">name</view> -->
					</view>
					<view class="accountBottom">
						<view class="sales">
							<image class="salesLogo" src="../../static/images/rank/icon08.png"></image>
							<view>Cumulative sales:<text class="weight">${{item.cumulative_sales}}</text></view>
						</view>
						<view class="commission">
							<image class="commissionLogo" src="../../static/images/rank/icon06.png"></image>
							<view>Accumulated Commission:<text class="weight">${{item.accumulated_commission}}</text>
							</view>
						</view>
					</view>
					<view class="accountName">{{item.name}}</view>
				</view>
			</view>
		</view>
		<view class="merRankList" v-else-if="cindex == 1 && lists.account_ranking.length<=0">
			<view class="noData">
				<image class="noDataLogo" src="../../static/images/common/icon02.png"></image>
				<view class="noDataText">It's empty</view>
			</view>
		</view>
		<view class="merRankList" v-else-if="cindex == 2 && lists.membership_ranking.length>0">
			<view class="membershipAccount" :class="{'merRankActive': merIndex == index}"
				v-for="item,index in lists.membership_ranking" @click="merIndexChoose(index)">
				<view class="userMsg userMsgAccount">
					<view>
						<image class="rankLogo rankLogoAccount" src="../../static/images/rank/icon01.png"
							v-if="index == 0"></image>
						<image class="rankLogo rankLogoAccount" src="../../static/images/rank/icon02.png"
							v-else-if="index == 1"></image>
						<image class="rankLogo rankLogoAccount" src="../../static/images/rank/icon03.png"
							v-else-if="index == 2"></image>
						<view v-else>
							<image class="rankLogo rankLogoAccount" src="../../static/images/rank/icon04.png"></image>
							<view class="rankText rankTextAccount">{{index+1}}</view>
						</view>
					</view>
					<image class="photo circular" :src="item.member_photo"></image>
				</view>
				<view class="membershipRight">
					<view class="merRankTop">
						<view class="spTitle ellip">{{item.name}}</view>
						<view class="profit">
							<view class="cumulative">Cumulative sales: ${{item.cumulative_sales}}</view>
							<!-- <view class="ratio">Commission ratio: {{item.commission_ratio}}%</view> -->
						</view>
					</view>
					<view class="membershipBottom">
						<view class="bindAccount">
							Immediate subordinate:
							<text class="numStyle">{{item.subordinate_num}}</text>
						</view>
						<view class="bindAccount">
							Bind the account:
							<text class="numStyle">{{item.bind_account_num}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="merRankList" v-else-if="cindex == 2 && lists.membership_ranking.length<=0">
			<view class="noData">
				<image class="noDataLogo" src="../../static/images/common/icon02.png"></image>
				<view class="noDataText">It's empty</view>
			</view>
		</view>

		<view>
			<!-- 普通弹窗 -->
			<uni-popup ref="popup" background-color="#fff">
				<view class="popup-content">
					<view class="popupChoose" v-for="item,index in orderStateList"
						:class="{'activePopupChoose': citem == index}" @click="getOrderState(index,item.name)">
						{{item.name}}
					</view>
					<view class="confirmed" @click="confirmed">Confirmed</view>
				</view>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cindex: 0,
				scrollLeft: 0,
				scrollList: [{
					id: 1,
					name: 'Merchandise ranking'
				}, {
					id: 2,
					name: 'Account ranking'
				}, {
					id: 3,
					name: 'Membership ranking'
				}],
				orderStateList: [{
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
					// name: 'Nearly seven days',
					name: '7 days',
					value: 7
					
				}, {
					id: 4,
					// name: 'Nearly 30 days',
					name: '30 days',
					value: 30
				}, {
					id: 5,
					// name: 'Nearly 60 days',
					name: '60 days',
					value: 60
				}],

				scrollTabLeft: 0,
				isShowTabHeight: false,

				citem: 0,
				prepareState: 'All',
				orderState: 'All',
				accountName: 'All of them',

				merIndex: 0,
				// merRankList: [],
				
				rank_type: 1,
				days: '',
				isRequest: true,
				page: 1,
				limit: 20,
				total_limit: 0,
				total_page: 0,
				lists:{
					merchandise_ranking: [],
					// merchandise_ranking: [{
					// 	id: 1,
					// 	rank: 1,
					// 	image: '../../static/images/home/photo.png',
					// 	title: 'shangpinmingcheng...',
					// 	unit_price: '12215466',
					// 	commission_ratio: '10',
					// 	cumulative_sales: '12215466',
					// 	accumulated_commission: '12215466'
					// }, {
					// 	id: 2,
					// 	rank: 2,
					// 	image: '../../static/images/home/photo02.png',
					// 	title: 'shangpinmingcheng...',
					// 	unit_price: '12215466',
					// 	commission_ratio: '20',
					// 	cumulative_sales: '12215466',
					// 	accumulated_commission: '12215466'
					// }, {
					// 	id: 3,
					// 	rank: 3,
					// 	image: '../../static/images/home/photo03.png',
					// 	title: 'shangpinmingcheng...',
					// 	unit_price: '12215466',
					// 	commission_ratio: '30',
					// 	cumulative_sales: '12215466',
					// 	accumulated_commission: '12215466'
					// }, {
					// 	id: 4,
					// 	rank: 4,
					// 	image: '../../static/images/home/photo.png',
					// 	title: 'shangpinmingcheng...',
					// 	unit_price: '12215466',
					// 	commission_ratio: '40',
					// 	cumulative_sales: '12215466',
					// 	accumulated_commission: '12215466'
					// }, {
					// 	id: 4,
					// 	rank: 4,
					// 	image: '../../static/images/home/photo.png',
					// 	title: 'shangpinmingcheng...',
					// 	unit_price: '12215466',
					// 	commission_ratio: '40',
					// 	cumulative_sales: '12215466',
					// 	accumulated_commission: '12215466'
					// }, {
					// 	id: 4,
					// 	rank: 4,
					// 	image: '../../static/images/home/photo.png',
					// 	title: 'shangpinmingcheng...',
					// 	unit_price: '12215466',
					// 	commission_ratio: '40',
					// 	cumulative_sales: '12215466',
					// 	accumulated_commission: '12215466'
					// }],
					// account_ranking:[{
					// 	id: 1,
					// 	rank: 1,
					// 	tiktok_photo: '../../static/images/home/photo02.png',
					// 	member_id: "1",
					// 	name: "namenamenamename",
					// 	account_id: "15494965",
					// 	tiktok_name: "Account Name",
					// 	cumulative_sales: "10000",
					// 	accumulated_commission: "1000"
					// }],
					// membership_ranking:[{
					// 	id: 1,
					// 	rank: 1,
					// 	member_photo: '../../static/images/home/photo03.png',
					// 	member_id: "1",
					// 	name: "namenamenamename",
					// 	cumulative_sales: "10000",
					// 	subordinate_num: 5,
					// 	bind_account_num: 10
					// }],
				},
				
				scrollViewTop: 0,
				showListActive: {
					'height': '902rpx'
				},
			}
		},
		onLoad(option) {
			//如果参数有值，渠道入口-请求
			//如果首页、分类特殊值有值-请求（不与上方同时触发）
			if (option.style) this.cindex = option.style
		},
		created() {

		},
		onShow() {
			if (this.accountName == this.$store.state.accountName) {
				// 账号无修改，无需请求
			} else {
				// 账号修改，接口请求触发
				this.accountName = this.$store.state.accountName
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
		mounted() {
			this.getHeight()
			this.getHttpLists("one")
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
									that.showListActive.height = res.windowHeight + "px"
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
						url: 'api/tiktok/index/ranking',
						data: {
							rank_type: 1,
							days: this.days,
							page: this.page,
							limit: this.limit
						}
					})
					.then(res => {
						this.isRequest = true
						uni.hideLoading();
						if (res.data.code == 200) {
							console.log(res.data.data.merchandise_ranking)
							let dataList = res.data.data.merchandise_ranking
							if (type == "one") {
								this.lists.merchandise_ranking = dataList.rank_lists

								this.page = dataList.page
								this.total_limit = dataList.total_limit
								this.total_page = Math.ceil(dataList.total_limit / dataList.limit)
								console.log(this.total_page)
							} else {
								//下拉加载更多
								this.lists.merchandise_ranking = this.lists.merchandise_ranking.concat(dataList.rank_lists)
							
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
			scrollTab(index) {
				if (this.cindex == index) return
				this.cindex = index
				// 根据此navbar 切换下拉框、显示面板
			},
			scroll(e) {
				// this.scrollLeft = e.detail.scrollLeft
				// console.log(e)
				// console.log(this.scrollLeft)
			},
			toggle(type) {
				// 获取选项索引
				for (let i in this.orderStateList) {
					if (this.orderStateList[i].name == this.orderState) {
						this.prepareState = this.orderState
						this.citem = i
					}
				}
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open(type)
			},
			getOrderState(index, name) {
				this.citem = index
				this.prepareState = name
				console.log(this.citem)
				console.log(this.prepareState)
			},
			confirmed() {
				if (this.orderState == this.prepareState) {
					//相同状态,不再次触发接口请求
					this.$refs.popup.close()
				} else {
					this.orderState = this.prepareState
					this.$refs.popup.close()
					
					this.days = this.orderStateList[this.citem].value
					this.page = 1
					this.lists.merchandise_ranking = []
					this.scrollViewTop = 0
					this.getHttpLists("one")
				}
			},
			goSwitch() {
				uni.navigateTo({
					url: './switch'
				});
			},
			merIndexChoose(id) {
				console.log(id)
				uni.navigateTo({
					url: '/pages/product/detail?id=' + this.lists.merchandise_ranking[id].id
				});
				
				// if (this.merIndex == id) return
				// this.merIndex = id
			}
		}
	}
</script>

<style scoped>
	.container {}

	/* 滑动块 */
	.navbar {
		margin-top: 30rpx;
		padding: 0rpx 0 30rpx 20rpx;
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

	/* 分类 */
	.top{
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
	}
	.tab {
		width: 100%;
		padding: 0 20rpx;
		box-sizing: border-box;
		background: #ffffff;
		white-space: nowrap;
	}

	.tabHeight {
		position: fixed;
		top: 112rpx;
		z-index: 100;
	}

	.sortList {
		margin: 0 auto;
		display: flex;
		align-items: center;
	}

	.sort {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 20rpx;
		padding: 0 20rpx;
		box-sizing: border-box;
	}
	
	.newSort{
		position: absolute;
		right: 30rpx;
		top: 0;
		bottom: 0;
		vertical-align: middle;
		display: flex;
		align-items: center;
	}
	
	.newSortText{
		max-width: 120rpx;
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #0B0B0B;
		overflow: hidden;
		white-space: nowrap;
		word-wrap: normal;
		text-overflow: ellipsis;
		-o-text-overflow: ellipsis;
	}
	
	.sortText {
		font-size: 26rpx;
		font-family: Arial;
		font-weight: 400;
		color: #0B0B0B;
	}

	.arrowDown {
		width: 17rpx;
		height: 10rpx;
		margin-left: 10rpx;
	}

	/* 商品排行列表 */
	.merRankList {
		/* margin: 88rpx auto 0; */
		margin: 0 auto;
		padding: 118rpx 30rpx 30rpx 30rpx;
		box-sizing: border-box;
	}

	.merRank {
		width: 690rpx;
		min-height: 220rpx;
		background: #FFFFFF;
		border: 2rpx solid #CECECE;
		border-radius: 10rpx;
		padding: 0 14rpx 0 34rpx;
		box-sizing: border-box;
		display: flex;
		margin-bottom: 20rpx;
	}

	.merRankAccount {
		width: 690rpx;
		min-height: 196rpx;
		padding: 0 14rpx 0 34rpx;
	}

	.membershipAccount {
		width: 690rpx;
		min-height: 163rpx;
		background: #FFFFFF;
		border: 2rpx solid #CECECE;
		border-radius: 10rpx;
		padding: 0 14rpx 0 34rpx;
		box-sizing: border-box;
		display: flex;
		margin-bottom: 20rpx;
	}

	/* .merRankActive{
		background: rgba(255, 116, 54, 0.08);
		border: 2rpx solid #FF7436;
		border-radius: 10rpx;
	} */
	.userMsg {
		width: 88rpx;
		position: relative;
		padding: 66rpx 0 61rpx;
		margin-right: 30rpx;
	}

	.userMsgAccount {
		padding: 40rpx 0 34rpx;
	}

	.rankLogo {
		width: 36rpx;
		height: 36rpx;
		position: absolute;
		top: 48rpx;
		left: -18rpx;
		z-index: 1;
		display: block;
	}

	.rankLogoAccount {
		top: 33rpx;
		left: -10rpx;
	}

	.rankText {
		font-size: 14rpx;
		font-family: DIN;
		font-weight: bold;
		color: #999999;
		position: absolute;
		top: 45rpx;
		left: -4rpx;
		z-index: 2;
	}
	
	.merRank:nth-child(-n+9) .rankText{
		left: -4rpx;
	}
	
	.merRank:nth-child(n+10):nth-child(-n+99) .rankText{
		left: -8rpx;
	}
	
	.merRank:nth-child(n+100) .rankText{
		left: -10rpx;
	}
	
	.rankTextAccount {
		top: 32rpx;
		left: 5rpx;
	}

	.photo {
		width: 88rpx;
		height: 88rpx;
		/* background: #28A897; */
		border-radius: 8rpx;
		display: block;
	}

	.circular {
		border-radius: 50%;
	}

	.merRankRight {
		width: 518rpx;
		line-height: normal;
		padding: 16rpx 0 18rpx;
	}

	.merRankTop {}

	.accountRight {
		width: 518rpx;
		line-height: normal;
		padding: 26rpx 0 21rpx;
	}

	.accountTop {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.membershipRight {
		width: 518rpx;
		line-height: normal;
		padding: 16rpx 0 0;
	}

	.membershipTop {}

	.spTitle {
		font-size: 28rpx;
		font-family: Arial;
		font-weight: bold;
		color: #0B0B0B;
		display: flex;
		align-items: center;
	}

	.ellip {
		overflow: hidden;
		white-space: nowrap;
		word-wrap: normal;
		text-overflow: ellipsis;
		-o-text-overflow: ellipsis;
		display: inherit;
	}

	.ID {
		font-size: 26rpx;
		font-family: Arial;
		font-weight: 400;
		color: #999999;
		margin-left: 20rpx;
	}

	.accountName {
		font-size: 26rpx;
		font-family: Arial;
		font-weight: 400;
		color: #666666;
		margin-top: 10rpx;
		text-align: right;
		width: 220rpx;
		float: right;
		overflow: hidden;
		white-space: nowrap;
		word-wrap: normal;
		text-overflow: ellipsis;
		-o-text-overflow: ellipsis;
	}

	.profit {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		justify-content: space-between;
		margin-top: 20rpx;
	}

	.price {
		min-width: 241rpx;
		padding: 0 6rpx;
		height: 40rpx;
		line-height: 40rpx;
		background: rgba(255, 166, 54, 0.1);
		border-radius: 20px;

		font-size: 22rpx;
		font-family: Arial;
		font-weight: 400;
		color: #FF7436;
		text-align: center;
		margin-bottom: 10rpx;
	}

	.ratio {
		min-width: 249rpx;
		padding: 0 6rpx;
		height: 40rpx;
		line-height: 40rpx;
		background: rgba(255, 166, 54, 0.1);
		border-radius: 20px;

		font-size: 22rpx;
		font-family: Arial;
		font-weight: 400;
		color: #FF7436;
		text-align: center;
		margin-bottom: 10rpx;
	}

	.cumulative {
		min-width: 306rpx;
		padding: 0 6rpx;
		height: 40rpx;
		line-height: 40rpx;
		background: rgba(255, 166, 54, 0.1);
		border-radius: 20px;

		font-size: 22rpx;
		font-family: Arial;
		font-weight: 400;
		color: #FF7436;
		text-align: center;

	}

	.merRankBottom {
		margin-top: 14rpx;
	}

	.accountBottom {
		margin-top: 14rpx;
	}

	.membershipBottom {
		font-size: 26rpx;
		font-family: Arial;
		font-weight: 400;
		color: #333333;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		margin: 0 0 14rpx;
	}

	.bindAccount {
		margin-top: 14rpx;
	}

	.numStyle {
		font-weight: bold;
		margin-left: 4rpx;
	}

	.sales {
		display: flex;
		align-items: center;
		font-size: 26rpx;
		font-family: Arial;
		font-weight: 400;
		color: #333333;
		line-height: 26rpx;
	}

	.salesLogo {
		width: 20rpx;
		height: 27rpx;
		margin: -4rpx 8rpx 0 0;
		display: block;
	}

	.commission {
		display: flex;
		align-items: center;
		font-size: 26rpx;
		font-family: Arial;
		font-weight: 400;
		color: #333333;
		margin-top: 18rpx;
		line-height: 26rpx;
	}

	.commissionLogo {
		width: 22rpx;
		height: 22rpx;
		margin: -1rpx 8rpx 0 0;
		display: block;
	}

	/* 下拉框弹窗 */
	.popup-content {
		width: 750rpx;
		height: 644rpx;
		/* display: flex;
		align-items: center;
		justify-content: center; */
		background-color: #fff;
		box-sizing: border-box;
		text-align: center;
		position: relative;
	}

	.popupChoose {
		width: 750rpx;
		height: 78rpx;
		line-height: 78rpx;
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #999999;
		border-bottom: 2rpx solid #F7F7F7;
	}

	.popupChoose:nth-last-child(2) {
		border-bottom: none;
	}

	.activePopupChoose {
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #111111;
	}

	.confirmed {
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

	.weight {
		font-weight: bold;
		margin-left: 6rpx;
	}
	
	/* 无数据展示 */
	.noData{
		text-align: center;
		margin: 260rpx auto 0;
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
