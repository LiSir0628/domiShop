<template>
	<view class="container">
		<view class="userMsg">
			<image class="banner" src="../../static/images/user/icon11.png"></image>
			<image class="back" src="../../static/images/user/icon13.png" @click="back"></image>
			<view class="editPhoto">
				<view class="editPhotoModular">
					<image class="photo" src="../../static/images/home/photo.png"></image>
					<image class="camera" src="../../static/images/user/icon12.png"></image>
				</view>
			</view>
			<view class="name">DUOmihuyu</view>
		</view>
		<view class="content"></view>
		<view class="menuList">
			<uni-list :border="false">
				<uni-list-item v-for="item,index in lists" :border="false">
					<template v-slot:header>
						<view class="slot-box">
							<text class="slot-box slot-text">{{item.title}}</text>
						</view>
					</template>
					<template v-slot:body>
						
					</template>
					<template v-slot:footer>
						<text class="solt-right" @click="goClick(index)">{{item.value}}</text>
						<image class="arrow" src="../../static/images/user/icon05.png" @click="goClick(index)"></image>
					</template>
				</uni-list-item>
			</uni-list>
		</view>
		
		<view class="bottom">
			Log out
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lists:[{
					id: 1,
					title: 'Name',
					//url: './../index/administration',
					value: 'DUOmihuyu'
				},{
					id: 2,
					title: 'Sign up for email',
					url: '',
					value: '455655556.168.com'
				},{
					id: 3,
					title: 'Access Code',
					url: '',
					val: ''
				},{
					id: 4,
					title: 'Address Management',
					url: '',
					val: ''
				}]
			}
		},
		methods: {
			back() {
				window.history.go(-1)
			},
			goClick(index) {
				console.log(index)
				uni.navigateTo({
					url: this.lists[index].url
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
	.back{
		width: 16rpx;
		height: 28rpx;
		position: absolute;
		top: 35rpx;
		left: 30rpx;
	}
	.editPhoto{
		position: absolute;
		top: 65rpx;
		left: 0;
		right: 0;
		margin: 0 auto;
		text-align: center;
	}
	.editPhotoModular{
		position: relative;
	}
	.photo{
		width: 144rpx;
		height: 144rpx;
		border-radius: 50%;
		box-shadow: 0rpx 4rpx 40rpx 10rpx rgba(0,0,0,0.1);
		display: block;
		margin: 0 auto;
		/* position: absolute;
		top: 65rpx;
		left: 0;
		right: 0;
		margin: 0 auto; */
	}
	.camera{
		width: 52rpx;
		height: 52rpx;
		position: absolute;
		/* top: 92rpx; */
		bottom: 0;
		left: 0rpx;
		right: -98rpx;
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
		padding: 32rpx;
		box-sizing: border-box;
		
	}
	.arrow{
		width: 13rpx;
		height: 24rpx;
		margin: -2rpx 0 0 8rpx;
	}
	/* 菜单列表 */
	.menuList{
		/* background: #FFFFFF;
		box-shadow: 0rpx -40rpx 40rpx 4rpx rgba(2,1,3,0.05);
		border-radius: 0rpx 0rpx 0rpx 0rpx;
		padding: 30rpx;
		box-sizing: border-box; */
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
		font-weight: 400;
		color: #0B0B0B;
		line-height: 30rpx;
	}
	
	.solt-right{
		font-size: 26rpx;
		font-family: Arial-Regular, Arial;
		font-weight: 400;
		color: #333333;
		line-height: 30rpx;
		margin-right: 16rpx;
	}
	
	.menuList .arrow{
		margin: 0;
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
</style>
