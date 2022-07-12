<template>
	<view class="container">
		<uni-nav-bar left-icon="back" @clickLeft="back" background-color="#ffffff" color="#000000" title="Data ranking">
		</uni-nav-bar>
		<view class="navbar">
			<scroll-view class="scroll-view_H" :scroll-left="scrollLeft" scroll-x="true" @scroll="scroll"
				:show-scrollbar="false">
				<view class="scroll-view-item_H" v-for="item,index in scrollList"
					:class="{'scroll-view-item-active':cindex == index}" @click="scrollTab(index)">{{item.name}}</view>
			</scroll-view>
		</view>
		
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
		
		<view class="merRankList" v-if="cindex == 0">
			<view class="merRank" :class="{'merRankActive': merIndex == index}" v-for="item,index in merRankList" @click="merIndexChoose(index)">
				<view class="userMsg">
					<view>
						<image class="rankLogo" src="../../static/images/rank/icon01.png" v-if="index == 0"></image>
						<image class="rankLogo" src="../../static/images/rank/icon02.png" v-else-if="index == 1"></image>
						<image class="rankLogo" src="../../static/images/rank/icon03.png" v-else-if="index == 2"></image>		
						<view v-else>
							<image class="rankLogo" src="../../static/images/rank/icon04.png"></image>
							<view class="rankText">{{index+1}}</view>
						</view>
					</view>
					<image class="photo" :src="item.image"></image>
				</view>
				<view class="merRankRight">
					<view class="merRankTop">
						<view class="spTitle ellip">{{item.title}}</view>
						<view class="profit">
							<view class="price">Unit Price: ${{item.unitPrice}}</view>
							<view class="ratio">Commission ratio: {{item.commissionRatio}}%</view>
						</view>
					</view>
					<view class="merRankBottom">
						<view class="sales">
							<image class="salesLogo" src="../../static/images/rank/icon08.png"></image>
							<view>Cumulative sales:<text class="weight">${{item.cumulativeSales}}</text></view>
						</view>
						<view class="commission">
							<image class="commissionLogo" src="../../static/images/rank/icon06.png"></image>
							<view>Accumulated Commission:<text class="weight">${{item.accumulatedCommission}}</text></view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="merRankList" v-else-if="cindex == 1">
			<view class="merRank merRankAccount" :class="{'merRankActive': merIndex == index}" v-for="item,index in merRankList" @click="merIndexChoose(index)">
				<view class="userMsg userMsgAccount">
					<view>
						<image class="rankLogo rankLogoAccount" src="../../static/images/rank/icon01.png" v-if="index == 0"></image>
						<image class="rankLogo rankLogoAccount" src="../../static/images/rank/icon02.png" v-else-if="index == 1"></image>
						<image class="rankLogo rankLogoAccount" src="../../static/images/rank/icon03.png" v-else-if="index == 2"></image>
						<view v-else>
							<image class="rankLogo rankLogoAccount" src="../../static/images/rank/icon04.png"></image>
							<view class="rankText rankTextAccount">{{index+1}}</view>
						</view>
					</view>
					<image class="photo circular" :src="item.image"></image>
				</view>
				<view class="accountRight">
					<view class="accountTop">
						<view class="spTitle">
							<view>Account Name</view>
							<view class="ID">ID:15494965</view>
						</view>
						<!-- <view class="accountName">name</view> -->
					</view>
					<view class="accountBottom">
						<view class="sales">
							<image class="salesLogo" src="../../static/images/rank/icon08.png"></image>
							<view>Cumulative sales:<text class="weight">${{item.cumulativeSales}}</text></view>
						</view>
						<view class="commission">
							<image class="commissionLogo" src="../../static/images/rank/icon06.png"></image>
							<view>Accumulated Commission:<text class="weight">${{item.accumulatedCommission}}</text></view>
						</view>
					</view>
					<view class="accountName">namenamenamenamenamename</view>
				</view>
			</view>
		</view>
		<view class="merRankList" v-else-if="cindex == 2">
			<view class="membershipAccount" :class="{'merRankActive': merIndex == index}" v-for="item,index in merRankList" @click="merIndexChoose(index)">
				<view class="userMsg userMsgAccount">
					<view>
						<image class="rankLogo rankLogoAccount" src="../../static/images/rank/icon01.png" v-if="index == 0"></image>
						<image class="rankLogo rankLogoAccount" src="../../static/images/rank/icon02.png" v-else-if="index == 1"></image>
						<image class="rankLogo rankLogoAccount" src="../../static/images/rank/icon03.png" v-else-if="index == 2"></image>
						<view v-else>
							<image class="rankLogo rankLogoAccount" src="../../static/images/rank/icon04.png"></image>
							<view class="rankText rankTextAccount">{{index+1}}</view>
						</view>
					</view>
					<image class="photo circular" :src="item.image"></image>
				</view>
				<view class="membershipRight">
					<view class="merRankTop">
						<view class="spTitle ellip">{{item.title}}</view>
						<view class="profit">
							<view class="cumulative">Cumulative sales: ${{item.unitPrice}}</view>
							<!-- <view class="ratio">Commission ratio: {{item.commissionRatio}}%</view> -->
						</view>
					</view>
					<view class="membershipBottom">
						<view class="bindAccount">
							Immediate subordinate: 
							<text class="numStyle">50</text>
						</view>
						<view class="bindAccount">
							Bind the account: 
							<text class="numStyle">100</text>
						</view>
					</view>
				</view>
			</view>
		</view>	
				
		<view>
			<!-- 普通弹窗 -->
			<uni-popup ref="popup" background-color="#fff">
				<view class="popup-content">
					<view class="popupChoose" v-for="item,index in orderStateList"
						:class="{'activePopupChoose': citem == index}" @click="getOrderState(index,item.name)">
						{{item.name}}</view>
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
					id: 1,
					name: 'Today'
				}, {
					id: 2,
					name: 'Yesterday'
				}, {
					id: 3,
					name: 'Nearly seven days'
				}, {
					id: 4,
					name: 'Nearly 30 days'
				}, {
					id: 5,
					name: 'Nearly 60 days'
				}],

				citem: 0,
				prepareState: 'Today',
				orderState: 'Today',	
				accountName: 'All of them',
				
				merIndex: 0,
				merRankList:[{
					id: 1,
					rank: 1,
					image: '../../static/images/home/photo.png',
					title: 'shangpinmingcheng...',
					unitPrice: '12215466',
					commissionRatio: '10',
					cumulativeSales: '12215466',
					accumulatedCommission: '12215466'
				},{
					id: 2,
					rank: 2,
					image: '../../static/images/home/photo.png',
					title: 'shangpinmingcheng...',
					unitPrice: '12215466',
					commissionRatio: '20',
					cumulativeSales: '12215466',
					accumulatedCommission: '12215466'
				},{
					id: 3,
					rank: 3,
					image: '../../static/images/home/photo.png',
					title: 'shangpinmingcheng...',
					unitPrice: '12215466',
					commissionRatio: '30',
					cumulativeSales: '12215466',
					accumulatedCommission: '12215466'
				},{
					id: 4,
					rank: 4,
					image: '../../static/images/home/photo.png',
					title: 'shangpinmingcheng...',
					unitPrice: '12215466',
					commissionRatio: '40',
					cumulativeSales: '12215466',
					accumulatedCommission: '12215466'
				}]
			}
		},
		onLoad(option) {
			//如果参数有值，渠道入口-请求
			//如果首页、分类特殊值有值-请求（不与上方同时触发）
			if(option.style) this.cindex = option.style
		},
		created() {
			
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
				}
			},
			goSwitch() {
				uni.navigateTo({
					url: './switch'
				});
			},
			merIndexChoose(id){
				if(this.merIndex == id) return
				this.merIndex = id
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

	/* 分类排序 */
	.sortList {
		padding: 0 20rpx;
		margin: 0 auto;
		display: flex;
		align-items: center;
	}

	.sort {
		/* min-width: 180rpx;
		height: 48rpx;
		background: #111111;
		border: 2rpx solid #F7F7F7;
		border-radius: 8rpx; */
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
		color: #0B0B0B;
	}

	.arrowDown {
		width: 17rpx;
		height: 10rpx;
		margin-left: 10rpx;
	}
	
	/* 商品排行列表 */
	.merRankList{
		padding: 30rpx;
	}	.merRank{
		width: 690rpx;
		height: 220rpx;
		background: #FFFFFF;
		border: 2rpx solid #CECECE;
		border-radius: 10rpx;
		padding: 0 14rpx 0 34rpx;
		box-sizing: border-box;
		display: flex;
		margin-bottom: 20rpx;
	}
	.merRankAccount{
		width: 690rpx;
		height: 196rpx;
		padding: 0 14rpx 0 34rpx;
	}
	.membershipAccount{
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
	} */	.userMsg{
		width: 88rpx;
		position: relative;
		padding: 66rpx 0 61rpx;
		margin-right: 30rpx;
	}
	.userMsgAccount{
		padding: 40rpx 0 34rpx;
	}	.rankLogo{
		width: 36rpx;
		height: 36rpx;
		position: absolute;
		top: 48rpx;
		left: -18rpx;
		z-index: 1;
		display: block;
	}
	.rankLogoAccount{
		top: 33rpx;
		left: -10rpx;
	}
	
	.rankText{
		font-size: 14rpx;
		font-family: DIN;
		font-weight: bold;
		color: #999999;
		position: absolute;
		top: 45rpx;
		left: -4rpx;
		z-index: 2;
	}
	.rankTextAccount{
		top: 32rpx;
		left: 5rpx;
	}
		.photo{
		width: 88rpx;
		height: 88rpx;
		background: #28A897;
		border-radius: 8rpx;
		display: block;
	}
	.circular{
		border-radius: 50%;
	}
	.merRankRight{
		width: 518rpx;
		line-height: normal;
		padding: 16rpx 0 18rpx;
	}
	.merRankTop{
		
	}
	.accountRight{
		width: 518rpx;
		line-height: normal;
		padding: 26rpx 0 28rpx;
	}
	.accountTop{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.membershipRight{
		width: 518rpx;
		line-height: normal;
		padding: 16rpx 0 0;
	}
	.membershipTop{
		
	}
	.spTitle{
		font-size: 28rpx;
		font-family: Arial;
		font-weight: bold;
		color: #0B0B0B;
		display: flex;
		align-items: center;
	}
	.ellip{
		overflow: hidden;
		white-space: nowrap; 
		word-wrap: normal;  
		text-overflow: ellipsis;
		-o-text-overflow:ellipsis;
		display: inherit;
	}
	.ID{
		font-size: 26rpx;
		font-family: Arial;
		font-weight: 400;
		color: #999999;
		margin-left: 20rpx;
	}
	.accountName{
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
		-o-text-overflow:ellipsis;
	}	.profit{
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 20rpx;
	}	.price{
		width: 253rpx;
		height: 40rpx;
		line-height: 40rpx;
		background: rgba(255, 166, 54, 0.1);
		border-radius: 20px;
		
		font-size: 22rpx;
		font-family: Arial;
		font-weight: 400;
		color: #FF7436;
		text-align: center;
	}	.ratio{
		width: 261rpx;
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
	.cumulative{
		width: 326rpx;
		height: 40rpx;
		line-height: 40rpx;
		background: rgba(255, 166, 54, 0.1);
		border-radius: 20px;
		
		font-size: 22rpx;
		font-family: Arial;
		font-weight: 400;
		color: #FF7436;
		text-align: center;

	}	.merRankBottom{
		margin-top: 24rpx;
	}
	.accountBottom{
		margin-top: 14rpx;
	}
	.membershipBottom{
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
	.bindAccount{
		margin-top: 14rpx;
	}
	.numStyle{
		font-weight: bold;
		margin-left: 4rpx;
	}	.sales{
		display: flex;
		align-items: center;
		font-size: 26rpx;
		font-family: Arial;
		font-weight: 400;
		color: #333333;
		line-height: 26rpx;
	}	.salesLogo{
		width: 20rpx;
		height: 27rpx;
		margin: -4rpx 8rpx 0 0;
		display: block;
	}	.commission{
		display: flex;
		align-items: center;
		font-size: 26rpx;
		font-family: Arial;
		font-weight: 400;
		color: #333333;
		margin-top: 18rpx;
		line-height: 26rpx;
	}	.commissionLogo{
		width: 22rpx;
		height: 22rpx;
		margin: -1rpx 8rpx 0 0;
		display: block;
	}
	/* 下拉框弹窗 */
	.popup-content {
		width: 750rpx;
		height: 564rpx;
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
	.weight{
		font-weight: bold;
		margin-left: 6rpx;
	}
</style>
