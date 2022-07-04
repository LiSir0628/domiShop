<template>
	<view class="container">
		<view class="top">
			<uni-nav-bar left-icon="back" @clickLeft="back" background-color="#ffffff" color="#000000" title="Select the TIKTOK account"></uni-nav-bar>
			<view class="search">
				<image class="searchLogo" src="../../static/images/home/icon02.png" @click="search"></image>
				<input class="searchText" v-model="searchText" placeholder="TIKTOK account keyword search" />
			</view>
		</view>

		<view class="content">
			<radio-group>
				<view class="userList" v-for="item,index in lists" :key="item.id" @click="choose(index)">
					<view class="userLeft">
						<image class="userPhoto" :src="item.photo"></image>
						<view class="userName">{{item.name}}</view>
					</view>
					<view class="userRight">
						<radio :value="item.id" :checked="index === current" />
					</view>
				</view>
			</radio-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 1,
				lists: [{
					id: '1',
					photo: '../../static/images/home/photo.png',
					name: 'zhanghaomingcheng'
				}, {
					id: '2',
					photo: '../../static/images/home/photo.png',
					name: 'zhanghaomingcheng'
				}],
				searchText: "",
			}
		},
		onLoad(option) {

		},
		methods: {
			back() {
				window.history.go(-1)
				// uni.navigateBack({
				// 	delta:1,
				// })
			},
			search() {
				console.log(this.searchText)
			},
			choose(index) {
				if (this.current == index) return
				this.current = index
				console.log(this.current)
			}
		}
	}
</script>

<style scoped>
	.container {
		/* padding: 30rpx 19rpx 30rpx 20rpx; */
	}

	.top {
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: #FFFFFF;
		z-index: 101;
		padding-bottom: 10rpx;
	}

	.search {
		width: 690rpx;
		height: 80rpx;
		background: #F7F7F7;
		border-radius: 40rpx;
		margin: 20rpx 20rpx 0 40rpx;
		display: flex;
		align-items: center;
	}

	.searchLogo {
		width: 32rpx;
		height: 32rpx;
		margin: 0 10rpx 0 20rpx;
	}

	.searchText {
		width: 600rpx;
		height: 80rpx;
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #666666;
		line-height: 80rpx;
	}

	.content {
		/* margin-top: 230rpx; */
		padding: 208rpx 40rpx 30rpx 40rpx;
		box-sizing: border-box;
	}

	.userList {
		width: 670rpx;
		height: 148rpx;
		background: #FFFFFF;
		border-bottom: 2rpx solid #CECECE;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30rpx 0;
		box-sizing: border-box;
		margin: 0 auto;
	}

	.active {
		background: rgba(255, 116, 54, 0.08);
		border-bottom: 2rpx solid #FF7436;
	}

	.userLeft {
		display: flex;
		align-items: center;
	}

	.userPhoto {
		width: 88rpx;
		height: 88rpx;
		border-radius: 50%;
	}

	.userName {
		margin-left: 20rpx;
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #0B0B0B;
	}

	.userRight {
		
	}
	
	/deep/ .uni-radio-input-checked{
		border-color: #FF7436 !important;
		background: #FF7436 !important;
	}
</style>
