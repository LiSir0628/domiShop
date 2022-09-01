<template>
	<view class="container">
		<uni-nav-bar left-icon="back" @clickLeft="back" background-color="#ffffff" color="#000000" :title="$t('car.collection')"></uni-nav-bar>
		<view id="addressLists" class="addressLists" @click="choose">
			<view class="addressModular">
				<image class="site" src="../../static/images/product/icon13.png"></image>
				<view class="addressContent">
					<view class="addressUserMsg">
						<view class="addressUserName">{{address.name}}</view>
						<view class="addressTel">{{address.tel}}</view>
					</view>
					<view class="address">{{address.country_name}} {{address.city_name}} {{address.detail}}</view>
				</view>
				<image class="chooseLogo" src="../../static/images/product/icon14.png"></image>
			</view>
		</view>
		
		<view class="content" :style="contentHeight">
			<view class="spMsg">
				<image v-if="spLogo" class="spLogo" :src="spLogo"></image>
				<image v-else class="spLogo" src="../../static/images/product/icon18.png"></image>
				<view class="spContent">
					<view class="spName">{{title}}</view>
					<view class="followers">{{ $t('car.Number') }}≥ {{fans}}</view>
					<!-- <view class="windowSales">Window sales≥ 1000</view> -->
				</view>
			</view>
			<view class="salesPrice">$ <text class="price">{{unit_price}}</text></view>
			<view class="commission">{{ $t('car.High_Commission') }}: {{(commission_ratio*100).toFixed()}}%</view>
			<view class="tikTok">
				<view class="tikTokLeft">{{ $t('car.Account') }}</view>
				<view class="tikTokRight" @click="goAdministration">
					<!-- <image class="userPhoto" src="../../static/images/home/photo.png"></image> -->
					<!-- <image v-if="tiktok_id == 17" class="userPhoto" src="../../static/images/home/photo.png"></image> -->
					<view class="tiktok_name">{{tiktok_name}}</view>
					<image v-if="photo" class="userPhoto" :src="photo"></image>
					<image v-else class="userPhoto" src="../../static/images/register/icon09.png"></image>
					<image class="chooseLogo" src="../../static/images/product/icon14.png"></image>
				</view>
			</view>
			<view class="tikTok">
				<view class="tikTokLeft">{{ $t('car.notes') }}</view>
				<view class="tikTokRight">
					<input class="remarks" v-model="notes" :placeholder="$t('pro_detail.Product_details')"/>
				</view>
			</view>
			<view class="notes">
				<view class="noteModular">
					<image class="noteLogo" src="../../static/images/product/icon12.png"></image>
					<view class="noteTitle">{{ $t('car.Guidance_application') }}</view>
				</view>
				<view class="des" v-html="des"></view>
			</view>
		</view>
		
		<view class="bottom" @click="commit">
			{{ $t('car.Submission_application') }}
		</view>
		
		<view>
			<!-- 普通弹窗2 -->
			<uni-popup ref="popupCollection" type="bottom" background-color="#fff" @maskClick="closeCollection">
				<view class="collectionMask">
					<view class="popupTop">
						<view class="addTitle">Select Harvest Address</view>
						<image class="addClose" src="../../static/images/detail/icon13.png" @click="closeCollection"></image>
					</view>
					
					<view class="addressList">
					<!-- <scroll-view class="addressList" :scroll-top="scrollHeight" scroll-y="true" @scroll="scroll"
						:show-scrollbar="false" :style="addresstHeight"> -->
						<view class="addressModular" :class="{'activeModular': point == index}" v-for="item,index in list" @click="chooseAddress(index)">
							<image v-if="point == index" class="addressPhoto" src="../../static/images/detail/icon15.png"></image>
							<image v-else class="addressPhoto" src="../../static/images/user/icon03.png"></image>
							<view class="addressContent">
								<view class="addressUserMsg">
									<view class="addressUserName">{{item.name}}</view>
									<view class="addressTel">{{item.tel}}</view>
									<view v-if="item.is_default == 1" class="default">Default</view>
								</view>
								<view class="address">{{item.country_name}} {{item.city_name}} {{item.detail}}</view>
							</view>
							<image class="edit" src="../../static/images/user/icon02.png" @click.stop="edit(index)"></image>
							<image v-if="point == index" class="activeLogo" src="../../static/images/detail/icon10.png"></image>
						</view>
					<!-- </scroll-view> -->
					</view>
					
					<view class="popupBottom">
						<view class="newAdd" @click="addAddress">
							New receiving address
						</view>
						<view class="confirmed" @click="confirmedCollection">
							Confirmed
						</view>
					</view>
				</view>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				point: 0, //免费领样指向
				cPoint: 0 ,			
				addresstHeight: {
					'height': '720rpx'
				},
				contentHeight: {
					'height': '880rpx'
				},
				address:{},
				list:[],
				scrollHeight: 0,  //地址
				//des: "1.After the delivery system will automatically add to your account window, no manual operation.<br/>2.Upon receipt of samples, operations are to be comp-leted within 15 days to ensure that the completed and applied samples are the same tiktok.<br/>3. Overtime and not completing the job will affect your reputation on the platform.<br/>1.After the delivery system will automatically add to your account window, no manual operation.<br/>2.Upon receipt of samples, operations are to be comp-leted within 15 days to ensure that the completed and applied samples are the same tiktok.<br/>3. Overtime and not completing the job will affect your reputation on the platform.",
				des: this.$t('car_grey').one + "</br>"  + this.$t('car_grey').two + "</br>" + this.$t('car_grey').three,
			
				id: "",
				title: "Commodity title",
				banner:[],
				spLogo: "",
				
				left_icon: "货币图标-左边",
				right_icon: "货币图标-右边",
				unit_price: "0.00",
				commission: "0.00",
				commission_ratio: "0",
				cumulative_sales: "0",
				fans: "0",
				
				tiktok_id: '',
				tiktok_name: '',
				address_id: '',
				notes: '',
				
				photo: '',
				
			}
		},
		onLoad(option) {
			if (option.id) this.id = option.id
			this.getHttpLists()

		},
		onShow() {
			this.photo = this.$store.state.accountList.image
			this.tiktok_id = this.$store.state.accountId
			this.tiktok_name = this.$store.state.accountName
			
			this.address = this.$store.state.addressList
			this.address_id = this.$store.state.addressId
			console.log("账号id:" + this.tiktok_id)
			console.log("地址id:" + this.address_id)
			this.getHttpAddress()
		},
		mounted() {
			this.getHeight()
		},
		methods: {
			getHeight() {
				this.$nextTick(()=>{
					let that = this;
					let query = uni.createSelectorQuery();
					query.select('#addressLists').boundingClientRect(data => {
						// console.log(data)
						// console.log(data.height)
						uni.getSystemInfo({
							success(res) {
								// #ifdef MP-WEIXIN
								if (res.windowHeight > 568) {
									// that.showListActive.height = (res.windowHeight - 52 - 90 - 27 - 10) + "px"
								}
								// #endif
						
								// #ifdef H5
								if (res.windowHeight > 568) {
									// 44顶部高度，105地址高度，70为底部按钮高度
									that.contentHeight.height = res.windowHeight - uni.upx2px(88) - data.height - uni.upx2px(136) + "px"
								}
								// #endif
								console.log(res.windowHeight)
								console.log(that.contentHeight.height)
							},
						})
					}).exec()
				})
			},
			getHttpAddress() {
				uni.showLoading({
					title: this.$t('common').loading + '...',
					mask: true
				});
				this.$myRequest({
						method: 'GET',
						url: 'api/tiktok/user/address',
						data: {
							
						}
					})
					.then(res => {
						uni.hideLoading();
						if (res.data.code == 200) {
							this.list = res.data.data
							this.openCollection()			
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
			getHttpLists() {
				uni.showLoading({
					title: this.$t('common').loading + '...',
					mask: true
				});
				this.$myRequest({
						method: 'GET',
						url: 'api/tiktok/product/detail',
						data: {
							id: this.id
						}
					})
					.then(res => {
						uni.hideLoading();
						if (res.data.code == 200) {
							console.log(res.data.data)
							let obj = res.data.data;
							
							this.title = obj.title ? obj.title : this.title
							this.banner = obj.banner
							if(this.banner.length > 0){
								this.spLogo = this.banner[0]
							}
							this.left_icon = obj.left_icon
							this.right_icon = obj.right_icon
							this.unit_price = obj.unit_price
							this.commission = obj.commission
							this.commission_ratio = obj.commission_ratio
							this.cumulative_sales = obj.cumulative_sales
							this.fans = obj.fans
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
			back() {
				window.history.go(-1)
			},
			choose() {
				this.openCollection()
				this.$refs.popupCollection.open()
				console.log("选择地址")
			},
			goAdministration() {
				uni.navigateTo({
					url: '/pages/index/administration'
				});
			},
			
			/* 免费领样 */
			openCollection() {
				let obj = {}
				this.scrollHeight = 0
				for(let i in this.list){
					if(this.list[i].id == this.$store.state.addressId){
						this.point = 0
						this.cPoint = 0
						obj = this.list[i]
						this.list.splice(i,1)
						this.list.unshift(obj)
						break
					}
				}
				
				// this.point = this.cPoint
				// this.$refs.popupCollection.open()
			},
			
			closeCollection() {
				this.$refs.popupCollection.close()
			},
			chooseAddress(index){
				if(this.point == index) return
				this.point = index
			},
			edit(index) {
				console.log("修改地址" + index)
				uni.navigateTo({
					url: '/pages/user/address?id=' + this.list[index].id
				});
			},
			addAddress() {
				console.log("新增收货地址")
				this.scrollHeight = 0
				// this.cPoint = 0
				// this.point = 0
				this.$nextTick(()=>{
					uni.navigateTo({
						url: "/pages/user/address"
					});
				})
			},
			confirmedCollection() {
				this.cPoint = this.point
				this.$refs.popupCollection.close()
				this.$store.commit('editAddress', this.list[this.cPoint])
				uni.setStorageSync('addressList', this.list[this.cPoint])
				this.address = this.list[this.cPoint]
				this.getHeight()
				console.log(this.$store.state.addressList)
				console.log(this.$store.state.addressName)
				console.log(this.$store.state.addressId)
				// 成功获取选择用户地址，此时应该对用户地址进行替换
			},
			scroll(e) {
				this.scrollHeight = e.detail.scrollTop
				// console.log(e)
				// console.log(this.scrollHeight)
			},
			
			commit() {
				console.log(this.notes)
				
				uni.showLoading({
					title: this.$t('common').loading + '...',
					mask: true
				});
				this.$myRequest({
						method: 'POST',
						url: 'api/tiktok/product/apply',
						data: {
							id: this.id,
							tiktok_id: this.tiktok_id,
							address_id: this.address_id,
							notes: this.notes
						}
					})
					.then(res => {
						uni.hideLoading();
						if (res.data.code == 200) {
							console.log(res.data)
							uni.setStorageSync('index_is_refresh', "1");
							uni.redirectTo({
								url: '/pages/product/collection?state=1'
							});
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
			}
		}
	}
</script>

<style scoped>
	.container {
		
	}	
	/* 领样内容 */
	.content{
		width: 690rpx;
		height: 880rpx;
		background: #FFFFFF;
		border: 2rpx solid #CECECE;
		border-radius: 8rpx;
		box-sizing: border-box;
		margin: 0 auto;
		padding: 21rpx 19rpx 22rpx 21rpx;
		overflow: hidden;
		overflow-y: auto;
	}
	.spMsg{
		display: flex;
	}
	.spLogo{
		width: 144rpx;
		height: 144rpx;
		border-radius: 8rpx;
	}
	.spContent{
		width: 480rpx;
		margin-left: 16rpx;
		line-height: normal;
	}
	.spName{
		font-size: 32rpx;
		line-height: normal;
		/* line-height: 32rpx; */
		font-family: Arial;
		font-weight: bold;
		color: #0B0B0B;
		
		overflow: hidden;
		white-space: nowrap;
		word-wrap: normal;
		text-overflow: ellipsis;
		-o-text-overflow: ellipsis;
	}
	.followers{
		font-size: 26rpx;
		line-height: 26rpx;
		font-family: Arial;
		font-weight: 400;
		color: #666666;
		margin-top: 20rpx;
	}
	.windowSales{
		font-size: 26rpx;
		line-height: 26rpx;
		font-family: Arial;
		font-weight: 400;
		color: #666666;
		margin-top: 30rpx;
	}
	.salesPrice{
		font-size: 24rpx;
		font-family: DIN;
		font-weight: bold;
		color: #FF3838;
		text-align: right;
		margin-top: 24rpx;
	}
	.price{
		margin-left: 8rpx;
		font-size: 36rpx;
	}
	.commission{
		width: 283rpx;
		height: 48rpx;
		line-height: 48rpx;
		background: rgba(255,56,56,0.1000);
		border-radius: 24rpx;
		
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #FF3838;
		text-align: center;
		margin: 10rpx 0 0 auto;
	}
	
	.tikTok{
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 26rpx 8rpx 0 0; 
	}
	
	.tikTokLeft{
		font-size: 26rpx;
		font-family: Arial;
		font-weight: 400;
		color: #0B0B0B;
	}
	
	.tikTokRight{
		display: flex;
		align-items: center;
		
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #999999;
	}
	.remarks{
		font-size: 26rpx;
		font-family: Arial;
		font-weight: 400;
		color: #999999;
		text-align: right;
	}
	.tiktok_name{
		width: 100rpx;
		
		overflow: hidden;
		white-space: nowrap;
		word-wrap: normal;
		text-overflow: ellipsis;
		-o-text-overflow: ellipsis;
		text-align: right;
	}
	.userPhoto{
		width: 64rpx;
		height: 64rpx;
		border-radius: 50%;
		margin-left: 20rpx;
		margin-right: 20rpx;
	}
	
	.notes{
		width: 650rpx;
		min-height: 378rpx;
		background: #F7F7F7;
		border-radius: 8rpx;
		margin-top: 20rpx;
		padding: 20rpx;
		box-sizing: border-box;
	}
	
	.noteModular{
		display: flex;
		align-items: center;
	}
	
	.noteLogo{
		width: 24rpx;
		height: 30rpx;
	}
	
	.noteTitle{
		font-size: 25rpx;
		font-family: Arial;
		font-weight: 400;
		color: #0B0B0B;
		margin-left: 8rpx;
	}
	
	.des{
		padding: 0 0 0 30rpx;
		font-size: 24rpx;
		line-height: 42rpx;
		font-family: Arial;
		font-weight: 400;
		color: #666666;
	}
	
	/* 下拉框弹窗 */
	.popup-content {
		width: 750rpx;
		height: 980rpx;
		/* display: flex;
		align-items: center;
		justify-content: center; */
		background-color: #fff;
		box-sizing: border-box;
		position: relative;
		padding: 30rpx 30rpx 20rpx 30rpx;
	}
	
	.popupTop{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.addTitle{
		font-size: 28rpx;
		line-height: 28rpx;
		font-family: Arial;
		font-weight: bold;
		color: #0B0B0B;
	}
	.addClose{
		width: 24rpx;
		height: 24rpx;
		line-height: 24rpx;
		color: rgb(209,209,209);
		display: block;
	}
	.popupCenter{
		height: 720rpx;
		margin-top: 40rpx;
		overflow: hidden;
		overflow-y: auto;
	}
	::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}
	.userMsg{
		width: 690rpx;
		height: 161rpx;
		display: flex;
		padding: 26rpx 0 26rpx 20rpx;
		background: #FFFFFF;
		border: 2rpx solid #CECECE;
		border-radius: 8rpx;
		position: relative;
		box-sizing: border-box;
		margin-bottom: 19rpx;
	}
	.userMsgActive{
		background: rgb(255, 244, 239);
		border: 2rpx solid rgb(225, 116, 54);
	}
	.photo{
		width: 88rpx;
		height: 86rpx;
		display: block;
		border-radius: 50%;
		margin-top: 6rpx;
	}
	.useMsg{
		margin-left: 20rpx;
		line-height: 24rpx;
	}
	.userName{
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #0B0B0B;
	}
	.userFans{
		display: flex;
		align-items: center;
		margin-top: 16rpx;
	}
	.FansNum{
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #666666;
	}
	.userLogo{
		width: 24rpx;
		height: 17rpx;
		margin-right: 8rpx;
	}
	.sales{
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #FF3838;
		margin-left: 20rpx;
	}
	.isFree{
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #39B83C;
		margin-top: 16rpx;
	}
	.noFree{
		font-size: 14rpx;
		font-family: Arial;
		font-weight: 400;
		color: #CECECE;
		margin-top: 16rpx;
	}
	.activeLogo{
		width: 61rpx;
		height: 57rpx;
		position: absolute;
		right: -2rpx;
		bottom: -2rpx;
		display: block;
	}
	
	.popupBottom{
		width: 690rpx;
		position: fixed;
		bottom: 21rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		text-align: center;
		left: 0;
		right: 0;
		margin: 0 auto;
	}
	.newAdd{
		width: 335rpx;
		height: 80rpx;
		line-height: 80rpx;
		background: #0B0B0B;
		border-radius: 8rpx;
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #FFFFFF;
	}
	.confirmed{
		width: 335rpx;
		height: 80rpx;
		line-height: 80rpx;
		background: #FF7436;
		border-radius: 8rpx;
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #FFFFFF;
	}
	
	/* 第二个弹窗样式 */
	.collectionMask{
		width: 750rpx;
		height: 980rpx;
		/* display: flex;
		align-items: center;
		justify-content: center; */
		background-color: #fff;
		box-sizing: border-box;
		position: relative;
		padding: 30rpx 30rpx 20rpx 30rpx;
	}
	.addressList{
		height: 720rpx;
		margin: 30rpx 0;
		box-sizing: border-box;
		overflow: hidden;
		overflow-y: auto;
	}
	.addressList::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}
	
	.addressModular{
		width: 690rpx;
		min-height: 134rpx;
		background: #FFFFFF;
		border: 2rpx solid #CECECE;
		border-radius: 8rpx;
		margin: 0 auto 20rpx;
		padding: 0 22rpx 0 20rpx;
		box-sizing: border-box;
		display: flex;
		/* align-items: center; */
		justify-content: space-between;
		position: relative;
	}
	.activeModular{
		width: 690rpx;
		min-height: 134rpx;
		background: rgba(255,116,54,0.0800);
		border: 2rpx solid #FF7436;
		border-radius: 8rpx;
	}
	.addressPhoto{
		width: 64rpx;
		height: 64rpx;
		margin: 35rpx 0;
		border: 2rpx solid rgba(0,0,0,0);
	}
	.addressContent{
		width: 520rpx;
		padding: 20rpx 0 14rpx;
		text-align: left;
	}
	.addressUserMsg{
		display: flex;
		align-items: center;
		line-height: 40rpx;
	}
	.addressUserName{
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #0B0B0B;
	}
	.addressTel{
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #0B0B0B;
		margin-left: 20rpx;
	}
	.default{
		width: 93rpx;
		height: 40rpx;
		line-height: 40rpx;
		background: rgba(255,116,54,0.0800);
		border-radius: 4rpx;
		text-align: center;
		
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #FF3838;
		margin-left: 16rpx;
	}
	.address{
		font-size: 24rpx;
		line-height: 36rpx;
		font-family: Arial;
		font-weight: 400;
		color: #666666;
		margin-top: 14rpx;
		word-wrap: break-word;
	}
	.edit{
		width: 24rpx;
		height: 24rpx;
		margin: 55rpx 0;
	}
	
	/* 选择地址 */
	.addressLists{
		width: 690rpx;
		/* height: 180rpx; */
		/* background: #F7F7F7; */
		border-radius: 8rpx;
		margin: 0 auto 0;
		padding: 20rpx 0 15rpx;
	}
	.addressLists .addressModular{
		background: #F7F7F7;
		border: none;
		margin: 0;
		align-items: center;
	}
	.addressLists .addressContent{
		width: 540rpx;
		padding: 30rpx 0 26rpx;
		font-size: 26rpx;
	}
	.addressLists .addressUserMsg{
		line-height: 28rpx;
	}
	.addressLists .addressUserName{
		font-size: 28rpx;
		font-family: Arial;
		font-weight: bold;
		color: #0B0B0B;
	}
	.addressLists .addressTel{
		font-size: 26rpx;
	}
	.addressLists .address{
		font-size: 26rpx;
		/* line-height: 26rpx; */
		font-family: Arial;
		font-weight: 400;
		color: #0B0B0B;
		margin-top: 20rpx;
	}
	.site{
		width: 48rpx;
		height: 48rpx;
		/* margin: 46rpx 0;
		border: 2rpx solid rgba(0,0,0,0); */
	}
	.chooseLogo{
		width: 16rpx;
		height: 26rpx;
		/* margin: 57rpx 0;
		border: 2rpx solid rgba(0,0,0,0); */
	}
	
	/* 底部按钮 */
	.bottom{
		width: 670rpx;
		height: 80rpx;
		line-height: 80rpx;
		background: #FF7436;
		border-radius: 8rpx;
		
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #FFFFFF;
		text-align: center;
		position: fixed;
		bottom: 26rpx;
		left: 0;
		right: 0;
		margin: 0 auto;
	}
	
	::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}
	/deep/ ::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}
</style>
