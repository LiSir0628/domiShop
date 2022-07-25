<template>
	<view class="container">
		<uni-nav-bar left-icon="back" @clickLeft="back" background-color="#ffffff" color="#000000" title="Receiving address"></uni-nav-bar>
		<view class="addressList" :style="contentHeight" v-if="lists.length > 0">
			<view class="addressModular" :class="{'activeModular': item.isDefault}" v-for="item,index in lists">
				<image v-if="!item.isDefault" class="addressPhoto" src="../../static/images/user/icon03.png"></image>
				<image v-else class="addressPhoto" src="../../static/images/user/icon04.png"></image>
				<view class="addressContent">
					<view class="addressUserMsg">
						<view class="addressUserName">{{item.name}}</view>
						<view class="addressTel">{{item.tel}}</view>
						<view v-if="item.isDefault" class="default">Default</view>
					</view>
					<view class="address">{{item.address}}</view>
				</view>
				<image class="edit" src="../../static/images/user/icon02.png" @click="edit(index)"></image>
			</view>
		</view>
		<view class="addressList" :style="contentHeight" v-else>
			<view class="noData">
				<image class="noDataLogo" src="../../static/images/common/icon02.png"></image>
				<view class="noDataText">It's empty</view>
			</view>
		</view>
		<view class="newAddress" @click="newAdd">
			New receiving address
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				contentHeight: {
					'height': '1080rpx'
				},
				// lists:[],
				lists:[{
					id: 1,
					photo: '../../static/images/home/photo.png',
					name: 'name',
					tel: 12563622222,
					isDefault: true,
					address: "dizhineirongdizhineirongdizhineirongdizhineirongdizhineirongdizhineirong"	
				},{
					id: 2,
					photo: '../../static/images/home/photo.png',
					name: 'name',
					tel: 12563622222,
					isDefault: false,
					address: "中文中文中文中文中文中文中文中文"	
				}],
			}
		},
		onLoad(option) {
			var that = this;
			uni.getSystemInfo({
				success(res) {
					// #ifdef MP-WEIXIN
					if (res.windowHeight > 568) {
						// that.showListActive.height = (res.windowHeight - 52 - 90 - 27 - 10) + "px"
					}
					// #endif
			
					// #ifdef H5
					if (res.windowHeight > 568) {
						that.contentHeight.height = (res.windowHeight - 44 - 30 - 60) + "px"
					}
					// #endif
				},
			})
		},
		methods: {
			back() {
				window.history.go(-1)
			},
			edit(index) {
				console.log("修改地址" + index)
			},
			newAdd() {
				console.log("新增地址")
			}
		}
	}
</script>

<style scoped>
	.container {
		
	}
	
	.addressList{
		height: 1080rpx;
		padding: 30rpx;
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
	/* 主要内容 */
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
		color: #FF7436;
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
	
	.newAddress{
		width: 670rpx;
		height: 80rpx;
		line-height: 80rpx;
		background: #FF7436;
		border-radius: 8rpx;
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #FFFFFF;
		position: fixed;
		text-align: center;
		margin: 0 auto;
		bottom: 37rpx;
		left: 0;
		right: 0;
	}
	
	/* 无数据展示 */
	.noData{
		text-align: center;
		margin: 300rpx auto 0;
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
</style>
