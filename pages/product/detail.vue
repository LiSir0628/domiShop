<template>
	<view class="container">
		<uni-nav-bar left-icon="back" @clickLeft="back" background-color="#ffffff" color="#000000" :fixed="true"
			title="Product details">
		</uni-nav-bar>

		<uni-swiper-dot class="uni-swiper-dot-box" :info="banner" :current="current" mode="nav" :dots-styles="dotsStyles"
			field="content">
			<swiper class="swiper-box" @change="change" :current="swiperDotIndex">
				<swiper-item v-for="(item, index) in banner" :key="index">
					<image v-if="item.url" class="banner" :src="item.url"></image>
					<image v-else class="banner" src="../../static/images/product/icon18.png"></image>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>

		<view class="priceTemplate">
			<view class="price_modular">
				<view class="price">
					<text class="priceSpan">$</text>{{unit_price}}
				</view>
				<view v-if="is_samples == 1" class="is_sample">
					Collectable sample
				</view>
			</view>
			<view class="profit">
				Estimated profit per unit:
				<text class="profitPrice">${{commission}}</text>
			</view>
			<view class="rate">
				<image class="hotLogo" src="../../static/images/detail/icon02.png"></image>
				Commission rate: <text class="rateNum">{{(commission_ratio*100).toFixed()}}%</text>
			</view>
			<view class="totalSales">
				<view>Total sales: {{cumulative_sales}}</view>
				<view class="logoSubject">
					<image class="linkLogo" src="../../static/images/detail/icon03.png" @click="copy('复制连接')">
					</image>
					<!-- <image v-if="isShowLove" class="loveLogo" src="../../static/images/detail/icon04.png" @click="goLove"></image>
					<image v-else class="loveLogo" src="../../static/images/detail/icon16.png" @click="goLove"></image> -->
					<uni-transition ref="ani" custom-class="transition" mode-class="fade" :duration="0" :show="!isShowLove">
						<image v-if="!isShowLove" class="loveLogo" src="../../static/images/detail/icon04.png" @click="goLove"></image>
					</uni-transition>
					<uni-transition ref="ani" custom-class="transition" mode-class="zoom-in" :duration="800" :show="isShowLove">
						<image v-if="isShowLove" class="loveLogo" src="../../static/images/detail/icon16.png" @click="goLove"></image>
					</uni-transition>
				</view>
			</view>
			<view class="sample" @click="sample">
				<image class="menuLogo" src="../../static/images/detail/icon17.png"></image>
				<view class="priceContent">
					Sample request: Number of followers {{fans}}   <!-- 2.Window sales in recent 30 days :{{show_window}} -->
				</view>
			</view>
		</view>

		<view class="liveTemplate">
			<view class="liveModular">
				<view class="liveSubject">
					<image class="starsLogo" src="../../static/images/detail/icon07.png"></image>
					<view class="liveTitle">LIVE BENEFITS</view>
				</view>
				<view class="logoSubject">
					<image class="linkLogo" src="../../static/images/detail/icon03.png" @click="copy('复制连接')"></image>
					<image class="cardLogo" src="../../static/images/detail/icon06.png" @click="goCard"></image>
				</view>
			</view>
			<view class="liveContent" v-html="benefits">
				<!-- Price: 1.50 yuan per bag (bidding starts at 10 bag at 10 bags)，Price: 1.50 yuan per bag . -->
			</view>
		</view>

		<view class="sellTemplate">
			<view class="liveModular">
				<view class="liveSubject">
					<image class="starsLogo" src="../../static/images/detail/icon07.png"></image>
					<view class="liveTitle">SELLING POINT</view>
				</view>
				<view class="logoSubject">
					<image class="linkLogo" src="../../static/images/detail/icon03.png" @click="copy('复制连接')"></image>
				</view>
			</view>
			<view class="sellContent" v-html="selling_point">
				<!-- <view class="sellContentText">1. Chongqing Strength Factory, Douyin hotpot base</view>
				<view class="sellContentText">2. Independent Small Packaging, 1 small bag 1 small</view>
				<view class="sellContentText">3.the praise rate is above 92% , product quality is guaranteed</view>
				<view class="sellContentText">
					4. the optimization of seasoning, craftsmanship quality, thicken
					pepper, spicy and addictive. The butter is rich and fragrant.
				</view>
				<view class="sellContentText">
					5. a multi-purpose, can do hot pot, braised vegetables, Malatan
					INGREDIENTS: Butter, pepper, Douban, ginger, garlic, edibles
					seasoning, monosodium glutamate, rock sugar, spices
				</view> -->
			</view>
		</view>

		<view class="deliveryTemplate">
			<view class="liveModular">
				<view class="liveSubject">
					<image class="starsLogo" src="../../static/images/detail/icon07.png"></image>
					<view class="liveTitle">DELIVERY LOGISTICS</view>
				</view>
				<view class="logoSubject">
					<image class="linkLogo" src="../../static/images/detail/icon03.png" @click="copy('复制连接')"></image>
				</view>
			</view>
			<view class="deliveryContent">
				<view class="deliveryList">
					<view class="deliveryTitle">Place of shipment</view>
					<view class="deliveryMsg">{{delivery_place}}</view>
				</view>
				<view class="deliveryList">
					<view class="deliveryTitle">Delivery, express delivery</view>
					<view class="deliveryMsg">{{express_company}}</view>
				</view>
				<view class="deliveryList">
					<view class="deliveryTitle">Delivery Time</view>
					<view class="deliveryMsg">{{delivery_time}}</view>
				</view>
			</view>
		</view>

		<view class="detailTitle" v-if="content">
			<view class="underline"></view>
			Product details
			<view class="underline"></view>
		</view>
		
		<view class="spImages" v-html="content">

		</view>
		
		<!-- <view class="spImages">
			<image class="spImage" mode="widthFix" src="../../static/images/detail/icon08.png"></image>
			<image class="spImage" mode="widthFix" src="../../static/images/detail/icon08.png"></image>
			<image class="spImage" mode="widthFix" src="../../static/images/detail/icon08.png"></image>
		</view> -->

		<view class="bottomCar">
			<view class="copyLine" @click="copy('复制连接')">
				<image class="copyLogo" src="../../static/images/detail/icon03.png"></image>
				<view class="copy">Copy the link</view>
			</view>
			<!-- <view class="add" @click="openAdd">Add a window</view> -->
			<view class="add" @click="openAdd">administration</view>
			<view class="collection" @click="openCollection">Free sample collection</view>
		</view>
		
		<view>
			<!-- 普通弹窗 -->
			<uni-popup ref="popupAdd" type="bottom" background-color="#fff" @maskClick="closeAdd">
				<view class="popup-content">
					<view class="popupTop">
						<view class="addTitle">Select the TIKTOK</view>
						<!-- <view class="addClose" @click="closeAdd">X</view> -->
						<image class="addClose" src="../../static/images/detail/icon13.png" @click="closeAdd"></image>
					</view>
					
					<scroll-view class="popupCenter" :scroll-top="scrollHeightAdd" scroll-y="true" @scroll="scrollAdd"
						:show-scrollbar="false">
						<view class="userMsg" :class="{'userMsgActive': cindex == index }" v-for="item,index in userList" @click="chooseTiktok(index)">
							<image v-if="item.image" class="photo" :src="item.image"></image>
							<image v-else class="photo" src="../../static/images/common/photo.png"></image>
							<!-- <image v-else class="photo" src="../../static/images/home/photo.png"></image> -->
							<view class="useMsg">
								<view class="userName">{{item.name}}</view>
								<view class="userFans">
									<view class="FansNum">
										<image class="userLogo" src="../../static/images/detail/icon09.png"></image>
										{{item.fans}}
									</view>
									<view class="sales">
										Likes: {{item.praise_nums}}
									</view>
								</view>
								<view class="isFree">Meet the conditions of free sample</view>
								<!-- <view class="isFree">Meet the conditions of free sample</view> -->											
							</view>
							<image v-if="cindex == index" class="activeLogo" src="../../static/images/detail/icon10.png"></image>
						</view>
					</scroll-view>
					<!-- <view class="popupCenter">
						<view class="userMsg" :class="{'userMsgActive': cindex == index }" v-for="item,index in userList" @click="chooseTiktok(index)">
							<image v-if="item.image" class="photo" :src="item.image"></image>
							<image v-else class="photo" src="../../static/images/home/photo.png"></image>
							<view class="useMsg">
								<view class="userName">{{item.name}}</view>
								<view class="userFans">
									<view class="FansNum">
										<image class="userLogo" src="../../static/images/detail/icon09.png"></image>
										{{item.fans}}
									</view>
									<view class="sales">
										Window sales: {{item.sales}}
									</view>
								</view>
								<view class="isFree">Meet the conditions of free sample</view>								
					
							</view>
							<image v-if="cindex == index" class="activeLogo" src="../../static/images/detail/icon10.png"></image>
						</view>
					</view> -->
					
					<view class="popupBottom">
						<view class="newAdd" @click="open('center')">
							New TIKTOK
						</view>
						<view class="confirmed" @click="confirmed">
							Confirmed
						</view>
					</view>
				</view>
			</uni-popup>
		</view>
		
		<view>
			<!-- 普通弹窗2 -->
			<uni-popup ref="popupCollection" type="bottom" background-color="#fff" @maskClick="closeCollection">
				<view class="collectionMask">
					<view class="popupTop">
						<view class="addTitle">Select Harvest Address</view>
						<image class="addClose" src="../../static/images/detail/icon13.png" @click="closeCollection"></image>
					</view>			
					<scroll-view class="addressList" :scroll-top="scrollHeight" scroll-y="true" @scroll="scroll"
						:show-scrollbar="false" :style="contentHeight">
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
							<image class="edit" src="../../static/images/user/icon02.png" @click="edit(index)"></image>
							<image v-if="point == index" class="activeLogo" src="../../static/images/detail/icon10.png"></image>
						</view>
					</scroll-view>
					<!-- <view class="addressList" :style="contentHeight">
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
							<image class="edit" src="../../static/images/user/icon02.png" @click="edit(index)"></image>
							<image v-if="point == index" class="activeLogo" src="../../static/images/detail/icon10.png"></image>
						</view>
					</view> -->
					
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
		
		<uni-popup ref="requestPopup" background-color="#fff" type="bottom" @maskClick="requestClose">
			<view class="request-popup-content">
				<view class="requestCard">
					<view class="cardTitle">
						<view class="cardTip">Sample request:</view>
						<image class="requestClose" src="../../static/images/detail/icon13.png" @click="requestClose"></image>
					</view>
					<view class="followers">
						1.Number of followers : {{fans}}
					</view>
					<view class="salesDay">
						<!-- 2.Window sales in recent 30 days :  {{show_window}} -->
					</view>
				</view>
			</view>
		</uni-popup>
		
		<!-- <add-admin ref="addAdmin"></add-admin> -->
		<new-add ref="newAdd" @fatherMethod="fatherMethod"></new-add>
		<my-popup ref="myPopup" :isSuccess="isSuccess" :text="text"></my-popup>
	</view>
</template>

<script>
	import addAdmin from "../common/addAdmin.vue"
	import newAdd from "../common/newAdd.vue"
	import myPopup from "../common/myPopup.vue"
	export default {
		data() {
			return {
				id: "",
				isShowLove: false,
				//info: ["../../static/images/detail/icon08.png","../../static/images/detail/icon08.png","../../static/images/detail/icon08.png"],
				banner: [{url: "" ,content: ""}],
				is_samples: "",
				stock: 1000,
				is_collection: false,
				left_icon: "货币图标-左边",
				right_icon: "货币图标-右边",
				unit_price: "",
				commission: "",
				commission_ratio: "",
				cumulative_sales: "",
				fans: "",
				show_window: "",
				
				benefits: "",
				selling_point: "",
				delivery_place: "",
				express_company: "",
				delivery_time: "",
				content: "",
				// benefits: "<p>Price: 1.50 yuan per bag (bidding starts at 10 bag at 10 bags)，Price: 1.50 yuan per bag .</p>",
				// selling_point: "<p>1. Chongqing Strength Factory, Douyin hotpot base</p><p>2. Independent Small Packaging, 1 small bag 1 small</p><p>3.the praise rate is above 92% , product quality is guaranteed</p><p>4. the optimization of seasoning, craftsmanship quality, thicken pepper, spicy and addictive. The butter is rich and fragrant.</p><p>5. a multi-purpose, can do hot pot, braised vegetables, Malatan INGREDIENTS: Butter, pepper, Douban, ginger, garlic, edibles seasoning, monosodium glutamate, rock sugar, spices</p>",
				// delivery_place: "United Kingdom",
				// express_company: "EMS",
				// delivery_time: "Delivery in 48 hours",
				// content: "<p>商品介绍</p>",
				cindex: 0,
				kindex: 0,
				userList: [],
				// userList:[{
				// 	id: 1,
				// 	photo: '../../static/images/home/photo.png',
				// 	name: 'zhanghaomingcheng',
				// 	fans: 450,
				// 	praise_nums: 56263
				// },{
				// 	id: 2,
				// 	photo: '../../static/images/home/photo.png',
				// 	name: 'zhanghaomingcheng',
				// 	fans: 450,
				// 	praise_nums: 56263
				// }],
				
				current: 0,
				mode: 'default',
				dotsStyles: {},
				swiperDotIndex: 0,
				
				isSuccess: true,
				text: '',
				
				point: 0, //免费领样指向
				cPoint: 0 ,			
				contentHeight: {
					'height': '720rpx'
				},
				list: [],
				// list:[{
				// 	id: 1,
				// 	name: 'name',
				// 	tel: 12563622222,
				// 	country_id: 1,
				// 	country_name: "中国",
				// 	city_id: 2,
				// 	city_name: "福州市",
				// 	detail: "dizhineirongdizhineirongdizhineirongdizhineirongdizhineirongdizhineirong",
				// 	is_default: 1
				// },{
				// 	id: 2,
				// 	name: 'name',
				// 	tel: 12563622222,
				// 	country_id: 1,
				// 	country_name: "中国",
				// 	city_id: 2,
				// 	city_name: "福州市",
				// 	detail: "中文中文中文中文中文中文中文中文",
				// 	is_default: 0,
				// }],
				
				scrollHeight: 0,  //地址
				scrollHeightAdd: 0,  //tiktok账号

			}
		},
		components: {
			addAdmin,
			newAdd,
			myPopup
		},
		onLoad(option) {
			//如果参数有值，渠道入口-请求
			//如果首页、分类特殊值有值-请求（不与上方同时触发）
			if (option.id) this.id = option.id
			this.getHttpLists()
			this.getUserLists()
		},
		onShow() {
			//console.log(this.scrollHeight)
			this.getHttpAddress()
		},
		mounted() {
			//this.isShowLove = this.is_collection
			//console.log(this.isShowLove)
			this.$forceUpdate()
		},
		methods: {
			fatherMethod() {
				this.kindex = 0
				this.cindex = 0
				this.scrollHeightAdd = 0
				this.getUserLists()
			},
			getHttpAddress() {
				uni.showLoading({
					title: 'loading...',
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
			getUserId() {
				for(let i in this.userList){
					if(this.userList[i].id == this.$store.state.accountId){
						this.cindex = i
						this.kindex = i
					}
				}
			},
			getUserLists() {
				uni.showLoading({
					title: 'loading...',
					mask: true
				});
				this.$myRequest({
						method: 'GET',
						url: 'api/tiktok/user/darren',
						data: {}
					})
					.then(res => {
						uni.hideLoading();
						if (res.data.code == 200) {
							console.log(res.data.data)
							this.userList = res.data.data
							this.getUserId()
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
			getHttpLists() {
				uni.showLoading({
					title: 'loading...',
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
							let arr = [];
							let arrObj = {};
							for(let i in obj.banner){
								arrObj = {}
								arrObj.url = obj.banner[i]
								arrObj.content = ""
								arr.push(arrObj)
							}
							this.banner = arr // 轮播图数据处理
							console.log(this.banner)
							this.is_samples = obj.is_samples
							this.stock = obj.stock
							this.is_collection = obj.is_collection == 1 ? true : false
							console.log(this.is_collection)
							this.isShowLove = this.is_collection
							this.left_icon = obj.left_icon
							this.right_icon = obj.right_icon
							this.unit_price = obj.unit_price
							this.commission = obj.commission
							this.commission_ratio = obj.commission_ratio
							this.cumulative_sales = obj.cumulative_sales
							this.fans = obj.fans
							this.benefits = obj.benefits
							this.selling_point = obj.selling_point
							this.delivery_place = obj.delivery_place
							this.express_company = obj.express_company
							this.delivery_time = obj.delivery_time
							this.content = obj.content
							
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
				// const pages = getCurrentPages()
				// if (pages.length === 1) {
				// 	if (typeof params === 'number') {
				// 		history.go(-1)
				// 	} else {
				// 		history.back()
				// 	}
				// } else {
				// 	uni.navigateBack()
				// }
			},
			change(e) {
				this.current = e.detail.current
				console.log(e)
			},
			sample() {
				this.$refs.requestPopup.open()
			},
			copy(text) {
				// #ifdef H5
				this.$copyText(text).then(
					res => {
						// uni.showToast({
						// 	title: '复制成功'
						// })
						this.isSuccess = true
						this.text = 'Link replication successful'
						this.$refs.myPopup.open()
					}
				)
				// #endif
				// #ifndef H5
				uni.setClipboardData({
					data: text,
					success: () => {
						// uni.showToast({
						// 	title: '复制成功'
						// })
						this.isSuccess = true
						this.text = 'Link replication successful'
						this.$refs.myPopup.open()
					}
				})
				// #endif
			},
			goLove(type) {
				this.isShowLove = !this.isShowLove
				console.log(this.isShowLove)
				
				uni.showLoading({
					title: 'loading...',
					mask: true
				});
				this.$myRequest({
						method: 'POST',
						url: 'api/tiktok/product/collection',
						data: {
							id: this.id,
							is_collection: this.isShowLove ? 1 : 0
						}
					})
					.then(res => {
						uni.hideLoading();
						if (res.data.code == 200) {
							console.log(res.data)						
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
			goCard() {
				uni.navigateTo({
					//url: './card',
					url: './card?id=' + this.id
				});
			},
			/* 添加窗口 */
			openAdd() {
				this.cindex = this.kindex
				this.$refs.popupAdd.open()
			},
			closeAdd() {
				this.$refs.popupAdd.close()
			},
			requestClose() {
				this.$refs.requestPopup.close()
			},
			chooseTiktok(index){
				if(this.cindex == index) return
				this.cindex = index
			},
			open(type) {	
				//this.$refs.addAdmin.open()
				this.$refs.newAdd.newAddOpen()
			},
			
			confirmed() {
				this.kindex = this.cindex
				console.log("用户选择kindex:" + this.kindex)
				this.$refs.popupAdd.close()
		
				//还需要管理一个 账号id
				this.$store.commit('editAccountName', this.userList[this.kindex])
				console.log(this.$store.state.accountName)
				console.log(this.$store.state.accountId)
			},
			
			onUnload() {
				//页面销毁、清除定时器
				//clearInterval(this.setTime);
				
				// this.$refs.addAdmin.close()
				this.$refs.newAdd.newAddClose()
			},
			onBeforeUnload() {
				//页面销毁、清除定时器
				//clearInterval(this.setTime);
				
				// this.$refs.addAdmin.close()
				this.$refs.newAdd.newAddClose()
			},
			/* 免费领样 */
			openCollection() {
				this.point = this.cPoint
				this.$refs.popupCollection.open()
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
				this.cPoint = 0
				this.point = 0
				this.$nextTick(()=>{
					uni.navigateTo({
						url: "/pages/user/address"
					});
				})
			},
			confirmedCollection() {
				this.cPoint = this.point
				console.log("选择地址cPoint:" + this.cPoint)
				console.log(this.list[this.cPoint])
				console.log(this.list[this.cPoint].id)
				this.$refs.popupCollection.close()
				
				uni.navigateTo({
					url: "./car?id=" + this.id
				});
				// 成功获取选择用户地址，此时应该对用户地址进行替换
			},
			
			
			
			scroll(e) {
				this.scrollHeight = e.detail.scrollTop
				// console.log(e)
				// console.log(this.scrollHeight)
			},
			scrollAdd(e) {
				this.scrollHeightAdd = e.detail.scrollTop
				// console.log(e)
				// console.log(this.scrollHeightAdd)
			},
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
		background: #F7F7F7;
		line-height: normal;
		padding-bottom: 120rpx;
	}

	.uni-swiper-dot-box {
		width: 750rpx;
		height: 750rpx
	}

	.swiper-box {
		width: 750rpx;
		height: 750rpx
	}

	.banner {
		width: 750rpx;
		height: 750rpx;
	}

	/deep/ .uni-swiper__dots-nav {
		background: none;
		justify-content: flex-end;
	}

	/deep/ .uni-swiper__dots-nav-item {
		width: 60rpx;
		height: 40rpx;
		line-height: 40rpx;
		background: #000000;
		opacity: 0.4;
		border-radius: 20rpx;

		text-align: center;
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #FFFFFF;
	}

	/* 价格展示模块 */
	.priceTemplate {
		padding: 30rpx 0 30rpx 30rpx;
		background: #ffffff;
		box-sizing: border-box;
	}

	.price_modular{
		display: flex;
		align-items: center;
	}
	
	.price {
		font-size: 46rpx;
		line-height: 28rpx;
		font-family: Arial;
		font-weight: bold;
		color: #FF3838;
	}

	.priceSpan {
		font-size: 24rpx;
		margin-right: 8rpx;
	}

	.is_sample{
		width: 255rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		background: #FFEFE8;
		border-radius: 8rpx;
		
		font-size: 26rpx;
		font-family: Arial;
		font-weight: 400;
		color: #FF7436;
		margin-left: 20rpx;
	}

	.profit {
		width: max-content;
		padding: 0 18rpx;
		/* width: 392rpx; */
		/* width: 356rpx;
		padding: 0 18rpx; */
		height: 48rpx;
		line-height: 48rpx;
		background: #FF3838;
		border-radius: 24rpx;

		font-size: 24rpx;
		font-family: Arial;
		color: #ffffff;
		text-align: center;
		margin-top: 21rpx;
	}

	.profitPrice {
		margin-left: 8rpx;
		font-size: 32rpx;
		color: #ffffff;
	}

	.rate {
		margin-top: 20rpx;
		font-size: 26rpx;
		font-family: Arial;
		font-weight: 400;
		color: #0B0B0B;
		line-height: 28rpx;
		display: flex;
		align-items: flex-end;
	}

	.hotLogo {
		width: 32rpx;
		height: 38rpx;
		margin-right: 8rpx;
		display: block;
	}

	.rateNum {
		margin-left: 4rpx;
		font-size: 32rpx;
		font-weight: bold;
	}

	.totalSales {
		font-size: 26rpx;
		line-height: 26rpx;
		font-family: Arial;
		font-weight: 400;
		color: #666666;
		margin-top: 24rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.logoSubject {
		display: flex;
		align-items: center;
		margin-right: 30rpx;
	}

	.linkLogo {
		width: 32rpx;
		height: 32rpx;
		display: block;
	}
	
	.loveLogo {
		width: 36rpx;
		height: 31rpx;
		display: block;
		margin-left: 38rpx;
	}
	
	.cardLogo {
		width: 31rpx;
		height: 36rpx;
		display: block;
		margin-left: 38rpx;
	}
	
	.sample {
		width: 690rpx;
		height: 60rpx;
		background: rgba(40, 168, 151, 0.1);
		border-radius: 8rpx;
		margin-top: 25rpx;
		padding: 16rpx 20rpx 20rpx 20rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}

	.menuLogo {
		width: 32rpx;
		height: 32rpx;
	}

	.priceContent {
		width: 617rpx;
		font-size: 26rpx;
		font-family: Arial;
		font-weight: 400;
		color: #28A897;
		overflow: hidden;
		white-space: nowrap;
		word-wrap: normal;
		text-overflow: ellipsis;
		-o-text-overflow: ellipsis;
		margin-left: 10rpx;
	}

	/* 直播利益 */
	.liveTemplate,
	.sellTemplate,
	.deliveryTemplate {
		padding: 30rpx 0 30rpx 30rpx;
		background: #ffffff;
		margin-top: 20rpx;
	}

	.liveModular {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.liveSubject {
		display: flex;
		align-items: center;
	}

	.starsLogo {
		width: 24rpx;
		height: 24rpx;
	}

	.liveTitle {
		font-size: 24rpx;
		font-family: Arial;
		font-weight: bold;
		color: #0B0B0B;
		margin-left: 8rpx;
	}

	.liveContent {
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #333333;
		padding: 16rpx 27rpx 0 30rpx;
		line-height: 40rpx;
	}

	/* 商品卖点 */
	.sellTemplate {
		padding: 30rpx 0 20rpx 30rpx;
	}
	
	
	.sellContent {
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #333333;
		padding: 16rpx 16rpx 0 30rpx;
		line-height: 36rpx;
	}

	.sellContentText{
		margin-bottom: 10rpx;
	}
	
	.sellContent p {
		margin-bottom: 10rpx;
	}
	
	/deep/ .sellContent p {
		margin-bottom: 10rpx;
	}
	
	/* 发货物流 */
	.deliveryTemplate {
		padding: 30rpx 0 20rpx 30rpx;
	}

	.deliveryContent {
		padding: 0 30rpx 0 30rpx;
	}

	.deliveryList {
		font-size: 24rpx;
		line-height: 24rpx;
		display: flex;
		margin-top: 20rpx;
		padding-bottom: 10rpx;
	}

	.deliveryTitle {
		width: 280rpx;
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #333333;
	}

	.deliveryMsg {
		width: 320rpx;
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #FF7436;
		margin-left: 60rpx;
	}

	/* 标题线 */
	.detailTitle {
		width: 750rpx;
		height: 80rpx;
		line-height: 80rpx;
		background: #0B0B0B;
		font-size: 24rpx;
		font-family: Arial;
		font-weight: bold;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx;
		box-sizing: border-box;
		letter-spacing: 2rpx;
		margin-top: 20rpx;
	}

	.underline {
		width: 200rpx;
		height: 2rpx;
		background: #FFFFFF;
	}

	/* 商品图片展示 */
	.spImages {
		width: 100%;
		display: block;
	}
	/deep/ .spImages img{
		width: 100%;
		display: block;
	}
	.spImage {
		width: 100%;
		display: block;
	}


	/* 购物栏底部 */
	.bottomCar {
		width: 750rpx;
		height: 120rpx;
		background: #FFFFFF;
		border: 2rpx solid #CECECE;
		position: fixed;
		bottom: 0;
		padding: 24rpx 20rpx;
		box-sizing: border-box;

		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.copyLine{
		display: flex;
		align-items: center;
	}
	
	.copyLogo {
		width: 26rpx;
		height: 26rpx;
	}

	.copy {
		font-size: 26rpx;
		font-family: Arial;
		font-weight: 400;
		color: #0B0B0B;
		margin-left: 7rpx;
	}

	.add {
		width: 202rpx;
		height: 72rpx;
		background: #0B0B0B;
		border-radius: 4rpx;
		font-size: 24rpx;
		font-family: Arial;
		font-weight: bold;
		color: #FFFFFF;
		text-align: center;
		line-height: 72rpx;
		margin-left: 12rpx;
	}

	.collection {
		width: 297rpx;
		height: 72rpx;
		background: #FF7436;
		border-radius: 4rpx;
		font-size: 24rpx;
		font-family: Arial;
		font-weight: bold;
		color: #FFFFFF;
		text-align: center;
		line-height: 72rpx;
		margin-left: 12rpx;
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
	
	/* 领样要求 */
	.requestPopup{
		
	}
	.request-popup-content{

	}
	.requestCard{
		width: 750rpx;
		height: 230rpx;
		background: #FFFFFF;
		
		margin: 0 auto;
		text-align: center;
		line-height: normal;
		padding: 30rpx;
		box-sizing: border-box;
		position: relative;
	}
	.cardTitle{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.cardTip{
		font-size: 28rpx;
		font-family: Arial;
		font-weight: bold;
		color: #0B0B0B;
	}
	.requestClose{
		width: 24rpx;
		height: 24rpx;
		display: block;
	}
	.followers{
		font-size: 24rpx;
		line-height: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #666666;
		text-align: left;
		margin-top: 32rpx;
	}
	.salesDay{
		font-size: 24rpx;
		line-height: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #666666;
		text-align: left;
		margin-top: 32rpx;
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
</style>
