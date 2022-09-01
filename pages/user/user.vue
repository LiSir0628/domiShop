<template>
	<view class="container">
		<view class="userMsg">
			<image class="banner" src="../../static/images/user/icon11.png"></image>
			<view class="language" @click="langChange">{{langText}}</view>
			<image class="edit" src="../../static/images/user/icon06.png" @click="edit"></image>
			<image class="photo" src="../../static/images/home/photo.png"></image>
			<view class="name">{{nickname}}</view>
		</view>
		<view class="content">
			<view class="orderList">
				<view class="orderTop">
					<view class="collection">{{ $t('user.Freesample_collection') }}</view>
					<view class="view">
						<view class="" @click="goView(1)">{{ $t('user.View_all') }}</view>
						<image class="arrow" src="../../static/images/user/icon05.png"></image>
					</view>
				</view>
				<view class="orderContent">
					<view class="orderState" :class="{newOrderState: langText != 'English'}" @click="goView(2)">
						<view class="orderNum">{{applyList.wait_examine_nums}}</view>
						<view class="orderTitle">{{ $t('user.Pending_review') }}</view>
					</view>
					<view class="orderState orderStateMiddle" :class="{newOrderState: langText != 'English'}" @click="goView(3)">
						<view class="orderNum">{{applyList.wait_delivery_nums}}</view>
						<view class="orderTitle">{{ $t('user.Ready_for_shipment') }}</view>
					</view>
					<view class="orderState" :class="{newOrderState: langText != 'English'}" @click="goView(5)">
						<view class="orderNum">{{applyList.arrived_nums}}</view>
						<view class="orderTitle">{{ $t('user.Delivery_received') }}</view>
					</view>
					<view class="orderState orderStateMiddle" :class="{newOrderState: langText != 'English'}" @click="goView(4)">
						<view class="orderNum">{{applyList.shipping_nums}}</view>
						<view class="orderTitle">{{ $t('user.Delivery_in_progress') }}</view>
					</view>
					<view class="orderState orderStateMiddle" :class="{newOrderState: langText != 'English'}" @click="goView(6)">
						<view class="orderNum">{{applyList.complete_nums}}</view>
						<view class="orderTitle">{{ $t('user.It’s_done') }}</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="menuList">
			<uni-list :border="false">
				<uni-list-item v-for="item,index in lists" :border="false">
					<template v-slot:header>
						<view class="slot-box">
							<image class="slot-image" :src="item.image"></image>
						</view>
					</template>
					<template v-slot:body>
						<text class="slot-box slot-text" @click="goClick(index)">{{item.title}}</text>
					</template>
					<template v-slot:footer>
						<image class="arrow" src="../../static/images/user/icon05.png" @click="goClick(index)"></image>
					</template>
				</uni-list-item>
			</uni-list>
		</view>
		
		<view class="bottomNavigation">
			<view class="bottomNav" @click="goIndex">
				<!-- <image class="navLogo" src="../../static/images/home/icon06.png"></image> -->
				<image class="navLogo" src="../../static/images/product/icon01.png"></image>
				<view class="navText">Order form</view>
			</view>
			<view class="bottomNav" @click="goOptions">
				<image class="navLogo" src="../../static/images/product/icon16.png"></image>
				<view class="navText">Options</view>
			</view>
			<view class="bottomNav">
				<image class="navLogo" src="../../static/images/product/icon15.png"></image>
				<view class="navActiveText">Individuals</view>
			</view>
		</view>
		
		<uni-popup ref="popup" background-color="#fff" @maskClick="close">
			<view class="kefu" @click.stop="noClose">
				<image class="close" src="../../static/images/detail/icon13.png" @click="close"></image>
				<view class="emailTip">{{ $t('service.Customer_Service_Mailbox') }}</view>
				<view class="email">kefu@gmail.com</view>
			</view>
		</uni-popup>
		
		<new-lang ref="newLang" @langSwitch="langSwitch"></new-lang>
	</view>
</template>

<script>
	import newLang from "../common/language.vue"
	export default {
		data() {
			return {
				nickname: "",
				lists:[{
					id: 1,
					image: '../../static/images/user/icon10.png',
					title: this.$t('user').Tiktok_account_manager,
					url: './../index/administration'
				},{
					id: 2,
					image: '../../static/images/user/icon08.png',
					title: this.$t('user').Merchandise_collection,
					url: './love'
				},{
					id: 3,
					image: '../../static/images/user/icon07.png',
					title: this.$t('user').service,
					url: ''
				},{
					id: 4,
					image: '../../static/images/user/icon09.png',
					title: this.$t('user').Log_out,
					url: ''
				}],
				applyList: {},
				
				langText: "Malay", //语法展示，缓存中获取English
			}
		},
		components: {
			newLang
		},
		created() {

		},
		onShow() {
			this.nickname = this.$store.state.nickname
			this.getHttpLists()
			
			if(localStorage.getItem('language')){
				this.langText = localStorage.getItem('language')
			}
			this.switchText()
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
			
			switchText() {
				this.lists[0].title = this.$t('user').Tiktok_account_manager
				this.lists[1].title = this.$t('user').Merchandise_collection
				this.lists[2].title = this.$t('user').service
				this.lists[3].title = this.$t('user').Log_out
			},
			
			edit() {
				console.log("修改个人资料")
				uni.navigateTo({
					url: './editUser'
				});
			},
			getHttpLists() {
				if(!this.applyList.wait_examine_nums && this.applyList.wait_examine_nums!== 0){
					uni.showLoading({
						title: this.$t('common').loading + '...',
						mask: true
					});
				}
				this.$myRequest({
						method: 'GET',
						url: 'api/tiktok/sample/lists',
						data: {
							state: 1,
						}
					})
					.then(res => {
						uni.hideLoading();
						if (res.data.code == 200) {						
							this.applyList = res.data.data
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
			goClick(index) {
				// id是3 客服，id是4 退出登錄。
				if(this.lists[index].id == 4){
					//退出登录，清空token值，跳转登录页
					uni.setStorageSync('index_is_refresh', "1");
					uni.setStorageSync('token', "");
					uni.navigateTo({
						url: '/pages/register/login'
					});
				} else if(this.lists[index].id == 3){
					this.$refs.popup.open("center")
				} else {
					uni.navigateTo({
						url: this.lists[index].url
					});
				}
			},
			close() {
				this.$refs.popup.close()
			},
			noClose() {
				
			},
			goView(state) {
				uni.navigateTo({
					url: './../product/collection?state=' + state
				});
			},
			goIndex() {
				uni.switchTab({
					url: './../index/index'
				});
			},
			goOptions() {
				uni.switchTab({
					url: './../product/options'
				});
			},
		}
	}
</script>

<style scoped>
	.container {
		padding-bottom: 100rpx;
	}
	
	.userMsg{
		position: relative;
	}
	
	.banner{
		width: 750rpx;
		height: 366rpx;
		display: block;
	}
	.language{
		font-size: 26rpx;
		font-family: Arial-Regular, Arial;
		font-weight: 400;
		color: #333333;
		position: absolute;
		top: 33rpx;
		left: 28rpx;
	}
	
	.edit{
		width: 38rpx;
		height: 38rpx;
		position: absolute;
		top: 33rpx;
		right: 29rpx;
	}
	.photo{
		width: 144rpx;
		height: 144rpx;
		border-radius: 50%;
		box-shadow: 0rpx 4rpx 40rpx 10rpx rgba(0,0,0,0.1);
		position: absolute;
		top: 85rpx;
		left: 0;
		right: 0;
		margin: 0 auto;
	}
	.name{
		font-size: 36rpx;
		font-family: Arial-Bold, Arial;
		font-weight: bold;
		color: #0B0B0B;
		position: absolute;
		top: 282rpx;
		left: 0;
		right: 0;
		margin: 0 auto;
		text-align: center;
	}
	.content{
		background: #FFFFFF;
		box-shadow: 0rpx -40rpx 40rpx 4rpx rgba(2,1,3,0.05);
		border-radius: 0rpx 0rpx 0rpx 0rpx;
		padding: 30rpx;
		box-sizing: border-box;
		
	}
	/* 订单列表 */
	.orderList{
		width: 690rpx;
		height: 354rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 4rpx 40rpx 10rpx rgba(0,0,0,0.1);
		border-radius: 16rpx 16rpx 16rpx 16rpx;
		margin: 0 auto;
		padding: 28rpx 0;
		box-sizing: border-box;
	}
	.orderTop{
		display: flex;
		align-items: center;
		justify-content: space-between;
		line-height: 30rpx;
		padding: 0 28rpx;
	}
	.collection{
		font-size: 26rpx;
		font-family: Arial-Regular, Arial;
		font-weight: bold;
		color: #0B0B0B;
	}
	.view{
		font-size: 26rpx;
		font-family: Arial-Regular, Arial;
		font-weight: 400;
		color: #666666;
		display: flex;
		align-items: center;
	}
	.arrow{
		width: 13rpx;
		height: 24rpx;
		margin: -2rpx 0 0 8rpx;
	}
	.orderContent{
		margin-top: 45rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
	.orderState{
		width: 32.5%;
		text-align: center;
		margin-bottom: 48rpx;
		font-size: 24rpx;
	}
	.newOrderState{
		/* width: auto !important; */
		font-size: 20rpx;
	}
	.newOrderState:nth-child(4){
		width: 40%;
	}
	/* .orderStateMiddle{
		width: 40%;
	} */
	.orderNum{
		font-size: 36rpx;
		font-family: DIN-Bold, DIN;
		font-weight: bold;
		color: #0B0B0B;
		line-height: 42rpx;
	}
	.orderTitle{
		font-family: Arial-Regular, Arial;
		font-weight: 400;
		color: #333333;
		line-height: 28rpx;
		margin-top: 17rpx;
	}
	
	/* 菜单列表 */
	.menuList{
		margin-top: 26rpx;
	}
	/deep/ .uni-list-item{
		margin-bottom: 67rpx;
	}
	/deep/ .uni-list-item__container{
		align-items: center;
		padding: 0 30rpx;
	}
	
	.slot-box {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.slot-image{
		width: 38rpx;
		height: 38rpx;
		margin-right: 16rpx;
	}
	
	.slot-text {
		flex: 1;
		font-size: 26rpx;
		font-family: Arial-Regular, Arial;
		font-weight: bold;
		color: #0B0B0B;
		line-height: 30rpx;
	}
	
	.menuList .arrow{
		margin: 0;
	}
	
	/* 底部导航 */
	.bottomNavigation{
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
		color: #0B0B0B;
	}
	
	/* 客服提示 */
	/deep/ .uni-popup__wrapper{
		border-radius: 8rpx;
	}
	.kefu{
		width: 550rpx;
		/* height: 182rpx; */
		background: #FFFFFF;
		border-radius: 8rpx;
		position: relative;
		text-align: center;
		padding: 40rpx 0;
		/* box-sizing: border-box; */
	}
	.close{
		width: 24rpx;
		height: 24rpx;
		line-height: 24rpx;
		color: rgb(209,209,209);
		display: block;
		position: absolute;
		right: 30rpx;
		top: 30rpx;
	}
	.emailTip{
		font-size: 28rpx;
		font-family: Arial;
		font-weight: bold;
		color: #0B0B0B;
	}
	.email{
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #333333;
		margin-top: 26rpx;
	}
</style>
