<template>
	<view class="container">
		<view class="userMsg">
			<image class="banner" src="../../static/images/user/icon11.png"></image>
			<image class="edit" src="../../static/images/user/icon06.png"></image>
			<image class="photo" src="../../static/images/home/photo.png"></image>
			<view class="name">DUOmihuyu</view>
		</view>
		<view class="content">
			<view class="orderList">
				<view class="orderTop">
					<view class="collection">Free sample collection</view>
					<view class="view">
						<view class="">View all</view>
						<image class="arrow" src="../../static/images/user/icon05.png"></image>
					</view>
				</view>
				<view class="orderContent">
					<view class="orderState">
						<view class="orderNum">15</view>
						<view class="orderTitle">Pending review</view>
					</view>
					<view class="orderState orderStateMiddle">
						<view class="orderNum">20</view>
						<view class="orderTitle">Ready for shipment</view>
					</view>
					<view class="orderState">
						<view class="orderNum">20</view>
						<view class="orderTitle">Delivery received</view>
					</view>
					<view class="orderState orderStateMiddle">
						<view class="orderNum">20</view>
						<view class="orderTitle">Delivery in progress</view>
					</view>
					<view class="orderState orderStateMiddle">
						<view class="orderNum">20</view>
						<view class="orderTitle">It’s done</view>
					</view>
				</view>
			</view>
			
			<view class="menuList">
				
			</view>
		</view>
		
		<view class="menuList">
			
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goIndex() {
				uni.navigateTo({
					url: './../index/index'
				});
			},
			goOptions() {
				uni.navigateTo({
					url: './../product/options'
				});
			}
		}
	}
</script>

<style scoped>
	.container {
		
	}
	
	.userMsg{
		position: relative;
	}
	
	.banner{
		width: 750rpx;
		height: 366rpx;
		display: block;
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
		top: 65rpx;
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
		top: 252rpx;
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
		font-weight: 400;
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
		width: 33.3%;
		text-align: center;
		margin-bottom: 48rpx;
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
		font-size: 24rpx;
		font-family: Arial-Regular, Arial;
		font-weight: 400;
		color: #999999;
		line-height: 28rpx;
		margin-top: 17rpx;
	}
	
	/* 菜单列表 */
	.menuList{
		
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
</style>
