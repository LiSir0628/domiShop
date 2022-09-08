<template>
	<view class="container">
		<view class="top">
			<view class="search">
				<image class="searchLogo" src="../../static/images/home/icon02.png" @click="search"></image>
				<input class="searchText" v-model="searchText" @confirm="search"
					:placeholder="$t('options.Search')" />
			</view>
			<image class="area" src="../../static/images/product/icon24.png" @click="areaChange"></image>
			<image class="model" src="../../static/images/product/icon20.png" @click="langChange"></image>
		</view>
		<view class="navbar">
			<scroll-view class="scroll-view_H" :scroll-left="scrollLeft" scroll-x="true" @scroll="scroll"
				:show-scrollbar="false">
				<view class="scroll-view-item_H" v-for="item,index in category_lists"
					:class="{'scroll-view-item-active':cindex == index}" @click="scrollChoose(index)">
					{{item.name}}
					<view :class="{'underline': index == cindex}"></view>
				</view>
			</scroll-view>
		</view>
		<view class="uni-margin-wrap">
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
				:duration="duration">
				<swiper-item v-for="item,index in banner" @click="goBanner(index)">
					<image style="width: 690rpx;" mode="widthFix" :src="item.image"></image>
				</swiper-item>
			</swiper>
		</view>
		<view>
			<!-- 升降排序 -->
			<scroll-view class="tab" :class="{tabHeight: isShowTabHeight}" :scroll-left="scrollTabLeft" scroll-x="true"
				@scroll="scrollTab" :show-scrollbar="false">
				<view class="scroll-view-item_Tab" @click="toggleA('bottom')">
					<view class="sortText">{{sampleState}}</view>
					<image class="arrowDown" src="../../static/images/product/icon11.png"></image>
				</view>
				<view class="scroll-view-item_Tab" @click="toggleB('bottom')">
					<view class="sortText">{{cbState}}</view>
					<image class="arrowDown" src="../../static/images/product/icon11.png"></image>
				</view>
				<view class="scroll-view-item_Tab" v-for="item,index in scrollTabList"
					:class="{'scroll-view-item-activeTab':citem == index}" @click="scrollChooseTab(index)">
					{{item.name}}
					<image class="sortLogo" v-if="item.rise" src="../../static/images/product/icon03.png"></image>
					<image class="sortLogo" v-else-if="item.drop" src="../../static/images/product/icon04.png"></image>
					<image class="sortLogo" v-else src="../../static/images/product/icon05.png"></image>
				</view>
				<view class="scroll-view-item_Tab" @click="toggle('bottom')">
					<view class="sortText">{{orderState}}</view>
					<image class="arrowDown" src="../../static/images/product/icon11.png"></image>
				</view>
			</scroll-view>
		</view>
		<view class="productList" :class="{productListHeight: isShowTabHeight}" v-if="product_lists.length > 0">
			<view class="product" v-for="item,index in product_lists" @click="goDetail(index)">
				<view class="productImg">
					<image v-if="item.image" class="productLogo" :src="item.image"></image>
					<image v-else class="productLogo" src="../../static/images/product/icon18.png"></image>
					<view v-if="item.is_samples == 1" class="is_sample">
						<view class="sample" :class="{newSample: langText != 'English'}">{{ $t('options.Collectable_sample') }}</view>
						<image class="sampleLogo" src="../../static/images/product/icon19.png"></image>
					</view>
				</view>
				<view class="productMsg">
					<view class="productMsgTop">
						<view class="productTitle">{{item.title}}</view>
					</view>
					<view class="region" v-if="item.cb == 1">{{ $t('options.Cross_border') }}</view>
					<view class="region" v-else-if="item.cb == 2">{{ $t('options.mainland') }}</view>
					<view class="productMsgBottom">
						<view class="pricePlan">
							<view>{{ $t('options.Sales') }}: <text class="sales">{{item.cumulative_sales}}</text></view>
							<view>{{ $t('options.Price') }}: <text class="price">$<text
										style="margin-left: 4rpx;">{{item.unit_price}}</text></text></view>
						</view>
						<view class="commission">{{ $t('options.High_Commission') }}: 
							<text style="margin-left: 2rpx;font-weight: bold;">
								{{(item.commission_ratio*100).toFixed()}}%
							</text>
						</view>
						<view class="earnedMsg">
							<!-- <image class="priceLogo" src="../../static/images/product/icon06.png"></image> -->
							<text class="earned">{{ $t('options.Earned') }}:
								<text style="margin-left: 4rpx;word-break: break-all;font-size: 32rpx;font-weight: bold;">${{item.commission}}</text>
							</text>
						</view>
					</view>

				</view>
			</view>
		</view>
		<view class="productList" :class="{productListHeight: isShowTabHeight}" v-else>
			<view class="noData">
				<image class="noDataLogo" src="../../static/images/common/icon02.png"></image>
				<view class="noDataText">{{ $t('common.It’s_empty') }}</view>
			</view>
		</view>
		<view class="noMore" v-if="product_lists.length > 0 && current_page == total_page">
			<view class="noMoreUnderline"></view>
			{{ $t('options.no_more') }}
			<view class="noMoreUnderline"></view>
		</view>

		<view>
			<!-- 普通弹窗 -->
			<uni-popup ref="popup" background-color="#fff">
				<view class="popup-content">
					<view class="popupChoose" v-for="item,index in orderStateList"
						:class="{'activePopupChoose': kindex == index}" @click="getOrderState(index,item.name)">
						{{item.name}}</view>
					<view class="confirmed" @click="confirmed">{{ $t('options.Cancels') }}</view>
				</view>
			</uni-popup>
		</view>
		
		<view>
			<!-- 普通弹窗 -->
			<uni-popup ref="popup_samples" background-color="#fff">
				<view class="popup-content">
					<view class="popupChoose" v-for="item,index in samplesList"
						:class="{'activePopupChoose': sindex == index}" @click="getSampleState(index,item.name)">
						{{item.name}}</view>
					<view class="confirmed" @click="cancel">{{ $t('options.Cancels') }}</view>
				</view>
			</uni-popup>
		</view>
		
		<view>
			<!-- 普通弹窗 -->
			<uni-popup ref="popup_cb" background-color="#fff">
				<view class="popup-content">
					<view class="popupChoose" v-for="item,index in cbList"
						:class="{'activePopupChoose': cbindex == index}" @click="getCbState(index,item.name)">
						{{item.name}}</view>
					<view class="confirmed" @click="cancel">{{ $t('options.Cancels') }}</view>
				</view>
			</uni-popup>
		</view>

		<view class="bottomNavigation">
			<view class="bottomNav" @click="goIndex">
				<!-- <image class="navLogo" src="../../static/images/home/icon06.png"></image> -->
				<image class="navLogo" src="../../static/images/product/icon01.png"></image>
				<view class="navText">{{ $t('index.Order_form') }}</view>
			</view>
			<view class="bottomNav">
				<image class="navLogo" src="../../static/images/product/icon02.png"></image>
				<view class="navActiveText">{{ $t('index.Options') }}</view>
			</view>
			<view class="bottomNav" @click="goIndividuals">
				<image class="navLogo" src="../../static/images/product/icon10.png"></image>
				<view class="navText">{{ $t('index.Individuals') }}</view>
			</view>
		</view>
		
		<new-lang ref="newLang" @langSwitch="langSwitch"></new-lang>
		<go-area ref="goArea" areaSwitch="areaSwitch"></go-area>
	</view>
</template>

<script>
	import newLang from "../common/language.vue"
	import goArea from "../common/goArea.vue"
	export default {
		data() {
			return {
				searchText: "",
				searchValue: "",
				cindex: 0,
				scrollLeft: 0,
				category_lists: [{
					id: '',
					name: this.$t('options').All,
				}],
				banner: [],
				// banner: [{
				// 	id: 1,
				// 	des: "轮播图说明",
				// 	image: "../../static/images/detail/icon11.png",
				// 	url: "http://www.baidu.com"
				// }, {
				// 	id: 2,
				// 	des: "轮播图说明",
				// 	image: "../../static/images/detail/icon12.png",
				// 	url: "http://www.baidu.com"
				// }],
				indicatorDots: true,
				autoplay: true,
				interval: 60000,
				duration: 500,

				citem: 0,
				scrollTabLeft: 0,
				scrollTabList: [{
					id: 1,
					name: this.$t('options').Closing_Price,
					rise: false,
					drop: false
				}, {
					id: 2,
					name: this.$t('options').Commission_ratio,
					rise: false,
					drop: false
				}, {
					id: 3,
					name: this.$t('options').Amount_of_commission,
					rise: false,
					drop: false
				}],
				isShowTabHeight: false,

				orderStateList: [{
					id: 1,
					name: this.$t('options').Total_sales,
				}, {
					id: 2,
					name: this.$t('options').A24_hours,
				}, {
					id: 3,
					name: this.$t('options').A2_hours,
				}],
				kindex: 0,
				prepareState: this.$t('options').sales,
				orderState: this.$t('options').sales,
				
				samplesList:[{
					id: "",
					name: this.$t('options').All_s,
				},{
					id: 1,
					name: this.$t('options').Send_samples, //可领样
				},{
					id: 0,
					name: this.$t('options').No_sample, //不可领样
				}],
				sindex: 0,
				sampleState: this.$t('options').All_s,
				
				cbList:[{
					id: 0,
					name: this.$t('options').All_a,
				},{
					id: 1,
					name: this.$t('options').Cross_border, //跨境
				},{
					id: 2,
					name: this.$t('options').mainland, //本土
				}],
				cbindex: 0,
				cbState: this.$t('options').All_a,
				

				//productList:[],
				category: '', //分类
				sort: "", //排序
				isRequest: true,
				current_page: 1,
				page: 1,
				limit: 20,
				total_limit: 0,
				total_page: 0,
				product_lists: [],
				
				langText: "English", //语法展示，缓存中获取English
			}
		},
		components: {
			newLang,
			goArea
		},
		onLoad(option) {
			
		},
		onReachBottom() {
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
		created() {

		},
		onShow() {
			if(uni.getStorageSync('language')){
				this.langText = uni.getStorageSync('language')
			}
			this.switchText()
		},
		mounted() {
			this.sortLists()
			//this.getHttpLists("one")
			window.onscroll = (() => {
				var scroll = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
				// console.log(scroll);
				if (scroll >= 200) {
					// 分类 固定展示
					this.isShowTabHeight = true
				} else {
					// 分类 不固定展示
					this.isShowTabHeight = false
				}
			})
		},
		methods: {
			langChange() {
				this.$refs.newLang.langOpen()
			},
			
			langSwitch(name){
				this.langText = name
				this.switchText()
				this.$forceUpdate()
			},
			
			areaChange() {
				this.$refs.goArea.areaOpen()
			},
			
			areaSwitch(name){
				//切换国家名称
				// this.langText = name
				// this.switchText()
				// this.$forceUpdate()
			},
			
			
			switchText() {
				this.category_lists[0].name = this.$t('options').All
				
				this.scrollTabList[0].name = this.$t('options').Closing_Price
				this.scrollTabList[1].name = this.$t('options').Commission_ratio
				this.scrollTabList[2].name = this.$t('options').Amount_of_commission
				
				this.orderStateList[0].name = this.$t('options').Total_sales
				this.orderStateList[1].name = this.$t('options').A24_hours
				this.orderStateList[2].name = this.$t('options').A2_hours
				
				this.samplesList[0].name = this.$t('options').All_s
				this.samplesList[1].name = this.$t('options').Send_samples
				this.samplesList[2].name = this.$t('options').No_sample
				this.sampleState = this.samplesList[this.sindex].name
				
				
				this.cbList[0].name = this.$t('options').All_a
				this.cbList[1].name = this.$t('options').Cross_border
				this.cbList[2].name = this.$t('options').mainland
				console.log(this.cbList[this.cbindex])
				this.cbState = this.cbList[this.cbindex].name
				
				this.prepareState = this.orderStateList[this.kindex].name
				this.orderState = this.orderStateList[this.kindex].name
			},
			
			sortLists() {
				uni.showLoading({
					title: this.$t('common').loading + '...',
					mask: true
				});
				this.$myRequest({
						method: 'GET',
						url: 'api/tiktok/product/index',
						data: {
	
						}
					})
					.then(res => {
						//uni.hideLoading();
						if (res.data.code == 200) {
							let obj = {};
							//this.category_lists = []
							this.banner =  res.data.data.banner
							for(let i in res.data.data.category_lists){
								obj = {}
								obj.id = i
								obj.name = res.data.data.category_lists[i]
								this.category_lists.push(obj)
							}
							this.getHttpLists("one")
							// console.log(this.category_lists)
						} else {
							uni.hideLoading();
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
			getHttpLists(type) {
				this.isRequest = false
				uni.showLoading({
					title: this.$t('common').loading + '...',
					mask: true
				});
				this.$myRequest({
						method: 'GET',
						url: 'api/tiktok/product/options',
						data: {
							search: this.searchValue,
							category: this.category,
							sort: this.sort,
							page: this.page,
							limit: this.limit,
							is_samples: this.samplesList[this.sindex].id,
							cb: this.cbList[this.cbindex].id
						}
					})
					.then(res => {
						this.isRequest = true
						uni.hideLoading();
						if (res.data.code == 200) {
							this.current_page = this.page
							// console.log(res.data.data);
							if (type == "one") {
								this.product_lists = res.data.data.product_lists

								this.page = res.data.data.page
								this.total_limit = res.data.data.total_limit
								this.total_page = Math.ceil(res.data.data.total_limit / res.data.data.limit)
								// console.log(this.total_page)
							} else {
								//下拉加载更多
								this.product_lists = this.product_lists.concat(res.data.data.product_lists)

								this.page = res.data.data.page
								this.total_page = Math.ceil(res.data.data.total_limit / res.data.data.limit)
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
			goDetail(index) {
				uni.navigateTo({
					url: './detail?id=' + this.product_lists[index].id
				});
			},
			search() {
				// console.log(this.searchText)
				this.searchValue = this.searchText
				this.page = 1
				this.product_lists = []
				this.getHttpLists("one")
			},
			toggleA(type) {
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup_samples.open(type)
			},
			toggleB(type) {
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup_cb.open(type)
			},
			toggle(type) {
				// 获取选项索引
				for (let i in this.orderStateList) {
					if (this.orderStateList[i].name == this.orderState) {
						this.prepareState = this.orderState
						this.kindex = i
					}
				}
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open(type)
			},
			getOrderState(index, name) {
				this.kindex = index
				this.prepareState = name
				// 点击后直接赋值触发
				if (this.orderState == this.prepareState && this.sort > 6) {
					//相同状态,不再次触发接口请求
					this.$refs.popup.close()
					// console.log("我没请求")
				} else {
					//其他升降序全部关闭
					for (let i in this.scrollTabList) {
						this.scrollTabList[i].rise = false
						this.scrollTabList[i].drop = false
					}
					this.orderState = this.prepareState
					//请求 7总销量，8-24小时内，9-2小时内
					this.sort = 7 + index
					this.page = 1
					this.product_lists = []
					this.getHttpLists("one")

					this.$refs.popup.close()
				}
			},
			getSampleState(index, name) {
				if(this.sindex == index) return
				this.sindex = index
				this.sampleState = name
				
				this.page = 1
				this.product_lists = []
				this.getHttpLists("one")
				this.$refs.popup_samples.close()
			},
			getCbState(index, name) {
				if(this.cbindex == index) return
				this.cbindex = index
				this.cbState = name
				
				this.page = 1
				this.product_lists = []
				this.getHttpLists("one")
				this.$refs.popup_cb.close()
			},
			cancel() {
				this.$refs.popup_samples.close()
				this.$refs.popup_cb.close()
			},
			confirmed() {
				// 销售选择关闭
				this.$refs.popup.close()
				this.prepareState = "sales"
				this.orderState = "sales"
				this.kindex = 0
				//升降序，总销量查询全部关闭
				for (let i in this.scrollTabList) {
					this.scrollTabList[i].rise = false
					this.scrollTabList[i].drop = false
				}
				this.sort = ""
				this.page = 1
				this.product_lists = []
				this.getHttpLists("one")
			},

			goBanner(index) {
				//console.log(this.banner[index].url)
				if(this.banner[index].url && this.banner[index].url != "#"){
					//console.log("页面跳转")
				} else {
					//console.log("无链接,不进行跳转。")
				}
			},

			scrollChoose(index) {
				if (this.cindex == index) return
				this.cindex = index
				this.category = this.category_lists[index].id
				this.page = 1
				this.product_lists = []
				this.searchText = ""
				this.searchValue = ""
				this.getHttpLists("one")
				console.log(index)
				// this.$nextTick(()=>{
				// 	const that = this
				// 	let view = uni.createSelectorQuery().select(".scroll-view-item-active")
				// 	view.boundingClientRect(function(data) {
				// 		// console.log(data)
				// 		// that.scrollLeft = that.scrollLeft +  parseInt(data.left) - uni.upx2px(30)
				// 	}).exec();
				// })
			},
			scroll(e) {
				// this.scrollLeft = e.detail.scrollLeft
				// console.log(e)
				// console.log(this.scrollLeft)
			},
			scrollChooseTab(index) {
				let oldCitem = this.citem
				this.citem = index
				// 首次点击为升序，再次点击为降序
				if (this.scrollTabList[index].rise == false) {
					this.scrollTabList[index].rise = true
					this.scrollTabList[index].drop = false
				} else if (this.scrollTabList[index].rise) {
					this.scrollTabList[index].rise = false
					this.scrollTabList[index].drop = true
				}
				//切换 分类点击，旧分类变为随机排序
				if (oldCitem != this.citem) this.scrollTabList[oldCitem].rise = false
				if (oldCitem != this.citem) this.scrollTabList[oldCitem].drop = false

				if (this.scrollTabList[index].rise) {
					this.sort = (index + 1) * 2 - 1
				} else {
					this.sort = (index + 1) * 2
				}
				this.page = 1
				this.product_lists = []
				this.getHttpLists("one")
				// console.log(this.sort)
				// console.log("**************")
			},
			scrollTab(e) {

			},
			goIndex() {
				uni.switchTab({
					url: './../index/index'
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
		background: #F7F7F7;
		line-height: normal;
		padding-bottom: 120rpx;
	}

	.top {
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: #FFFFFF;
		z-index: 10;
		padding: 17rpx 0 20rpx 0;
		display: flex;
		align-items: center;
		
	}

	.search {
		width: 559rpx;
		height: 80rpx;
		background: #F7F7F7;
		border-radius: 40rpx;
		/* margin: 17rpx 30rpx 0 30rpx; */
		margin: 0 30rpx 0 30rpx;
		display: flex;
		align-items: center;
	}
	
	.searchLogo {
		width: 32rpx;
		height: 32rpx;
		margin: 0 10rpx 0 40rpx;
	}

	.searchText {
		width: 447rpx;
		height: 80rpx;
		font-size: 26rpx;
		font-family: Arial;
		font-weight: 400;
		color: #666666;
		line-height: 80rpx;
	}
	
	.area {
		width: 40rpx;
		height: 48rpx;
		margin-right: 20rpx;
	}
	
	.model {
		width: 48rpx;
		height: 48rpx;
	}
	
	/* 滑动块 */
	.navbar {
		padding: 8rpx 0 20rpx 30rpx;
		margin-top: 116rpx;
		background: #FFFFFF;
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
		color: #0B0B0B;
	}

	.underline {
		width: 40rpx;
		height: 8rpx;
		background: #FF7436;
		border-radius: 4rpx;
		margin: 20rpx auto 0;
	}

	/deep/ ::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}

	/* 轮播图 */
	.uni-margin-wrap {
		width: 690rpx;
		min-height: 260rpx;
		padding: 0 30rpx 30rpx;
		background: #FFFFFF;
		border-radius: 8rpx;
	}

	.swiper {
		height: 260rpx;
		position: relative;
		border-radius: 4px;
	}

	.swiper-item {
		display: block;
		min-height: 260rpx;
		line-height: 260rpx;
		text-align: center;
	}

	/deep/ uni-swiper .uni-swiper-dots-horizontal {
		bottom: 17rpx;
	}

	/deep/ uni-swiper .uni-swiper-dot {
		width: 20rpx;
		height: 8rpx;
		background: rgba(0, 0, 0, 0.4);
		border-radius: 4rpx;
	}

	/deep/ uni-swiper .uni-swiper-dot-active {
		width: 20rpx;
		height: 8rpx;
		background: #FFFFFF;
		border-radius: 4rpx;
	}

	/* 分类 */
	.tab {
		width: 100%;
		padding: 24rpx 0 24rpx 30rpx;
		box-sizing: border-box;
		background: #F7F7F7;
		white-space: nowrap;
	}

	.tabHeight {
		position: fixed;
		top: 112rpx;
		z-index: 10;
	}

	.scroll-view-item_Tab {
		display: inline-block;
		text-align: center;
		font-size: 26rpx;
		font-family: Arial;
		font-weight: 400;
		color: #0B0B0B;
		line-height: normal;
		margin-right: 40rpx;
		/* font-size: 28rpx;
		font-family: Arial;
		font-weight: 400;
		color: #999999;
		line-height: normal;
		margin-right: 62rpx; */
	}

	.scroll-view-item-activeTab {
		/* font-size: 32rpx;
		font-family: Arial;
		font-weight: bold;
		color: #0B0B0B; */
	}

	.sortLogo {
		width: 18rpx;
		height: 18rpx;
		margin-left: 8rpx;
	}

	.sortText {
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		display: inline-block;
	}

	.arrowDown {
		width: 15rpx;
		height: 9rpx;
		margin: 0 0 2rpx 8rpx;
		/* margin-left: 8rpx; */
		vertical-align: middle;
		display: inline-block;
	}

	/* 商品展示列表 */
	.productListHeight {
		margin-top: 86rpx;
	}

	.productList {
		width: 100%;
		/* height: 2000rpx; */
		padding: 0 30rpx;
		/* background: #cecece; */
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.product {
		width: 335rpx;
		/* height: 593rpx; */
		background: #ffffff;
		margin-bottom: 19rpx;
		border-bottom-left-radius: 8rpx;
		border-bottom-right-radius: 8rpx;
	}

	.productImg{
		width: 335rpx;
		height: 335rpx;
		border-top-left-radius: 8rpx;
		border-top-right-radius: 8rpx;
		position: relative;
	}

	.productLogo {
		width: 335rpx;
		height: 335rpx;
		border-top-left-radius: 8rpx;
		border-top-right-radius: 8rpx;
		display: block;
	}
	
	.is_sample{
		width: 335rpx;
		height: 64rpx;
		background: #FFEFE8;
		position: absolute;
		bottom: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 8rpx 20rpx;
		box-sizing: border-box;
	}
	
	.sample{
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #FF7436;
	}
	
	.newSample{
		font-size: 20rpx !important;
	}
	
	.sampleLogo{
		width: 48rpx;
		height: 48rpx;
	}
	
	.productMsg {
		padding: 16rpx 11rpx 17rpx;
		border-bottom-left-radius: 8rpx;
		border-bottom-right-radius: 8rpx;
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
		justify-content: space-between;
		min-height: 260rpx;
		box-sizing: border-box;
	}

	.productMsgTop {
		width: 100%;
		height: 80rpx;
	}

	.productTitle {
		/* height: 68rpx; */
		font-size: 28rpx;
		font-family: Arial;
		font-weight: bold;
		color: #0B0B0B;
		letter-spacing: 1rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
	
	.region{
		text-align: right;
		color: #0B0B0B;
		font-size: 24rpx;
	}
	
	.productMsgBottom {
		width: 100%;
	}

	.pricePlan {
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #666666;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		justify-content: space-between;
		/* margin-top: 22rpx; */
		margin-top: 16rpx;
	}

	.sales {
		color: #0B0B0B;
		font-weight: bold;
	}

	.price {
		color: #0B0B0B;
		font-weight: bold;
	}

	.commission {
		width: max-content;
		padding: 0 20rpx;
		/* height: 40rpx;
		background: rgba(255, 116, 54, 0.1);
		border-radius: 20rpx; */
		height: 48rpx;
		line-height: 48rpx;
		background: linear-gradient(219deg, #FFEFDB 0%, #FFEFDB 100%);
		border-radius: 8rpx;
		
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #C57700;
		text-align: center;
		margin-top: 19rpx;
		
/* 		width: 280px;
		height: 48px;
		background: linear-gradient(219deg, #FFEFDB 0%, #FFEFDB 100%);
		border-radius: 8px; */
	}

	.earnedMsg {
		margin-top: 17rpx;
	}

	.priceLogo {
		width: 22rpx;
		height: 22rpx;
	}

	.earned {
		font-size: 28rpx;
		font-family: Arial;
		font-weight: bold;
		color: #FF3838;
		/* margin-left: 8rpx; */
	}

	/* 下拉框弹窗 */
	.popup-content {
		width: 750rpx;
		height: 405rpx;
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

	/* 底部导航 */
	.bottomNavigation {
		position: fixed;
		width: 750rpx;
		height: 97rpx;
		background: #FEFEFE;
		bottom: 0;
		left: 0;
		display: flex;
		/* align-items: center; */
		justify-content: space-around;
		border-top: 2rpx solid #f7f7f7;
	}

	.bottomNav {
		width: 33.3%;
		text-align: center;
	}

	.navLogo {
		width: 42rpx;
		height: 42rpx;
		display: block;
		margin: 13rpx auto 0;
	}

	.navText,
	.navActiveText {
		font-size: 20rpx;
		line-height: 20rpx;
		font-family: Arial;
		font-weight: 400;
		color: #999999;
		margin-top: 11rpx;
	}

	.navActiveText {
		color: #0B0B0B;
	}

	/* 无数据展示 */
	.noData {
		text-align: center;
		margin: 200rpx auto 0;
	}

	.noDataLogo {
		width: 188rpx;
		height: 158rpx;
	}

	.noDataText {
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
