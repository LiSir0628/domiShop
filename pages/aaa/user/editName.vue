<template>
	<view class="container">
		<uni-nav-bar left-icon="back" @clickLeft="back" background-color="#ffffff" color="#000000" title="Change Name"></uni-nav-bar>
		<view class="example">
			<view class="modular">
				<input class="uni-input" v-model="name" placeholder="Please enter your name" />
			</view>
			<view class="btn" @click="submit">Confirmed</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				useList: {},
				name: '',
			}
		},
		created() {
			this.useList = uni.getStorageSync('coursesUserList')
		},
		methods: {
			back() {
				window.history.go(-1)
			},
			
			submit() {
				if(!this.name){
					//未输入名称
					uni.showModal({
						title: "Tip",
						content: "Please enter the name you wish to change",
						confirmText: "confirm",
						showCancel: false,
					})
					return
				}
				uni.showLoading({
					title: 'loading...',
					mask: true
				});
				this.$myRequest({
						method: 'POST',
						url: 'user/editerbatch',
						data: {
							nickname: this.name
						}
					})
					.then(res => {
						uni.hideLoading();
						if (res.data.code == 200) {				
							this.useList.nickname =  res.data.data.nickname
							uni.setStorageSync('coursesUserList', this.useList);					
							uni.showModal({
								title: "Tip",
								content: res.data.msg,
								confirmText: "confirm",
								showCancel: false,
								success: function (res) {
									if (res.confirm) {
										window.history.go(-1)
									}
								},
							})
						} else {
							uni.showModal({
								title: "Tip",
								content: res.data.msg,
								confirmText: "confirm",
								showCancel: false,
							})
						}
					})
					.catch(err => {
						uni.hideLoading();
						uni.showModal({
							title: "Tip",
							content: "Network error, please try again later",
							confirmText: "confirm",
							showCancel: false,
						})
				})
			},
		}
	}
</script>

<style scoped>
	.container {
		
	}
	.container {}
	
	.example {
		/* padding: 30rpx; */
		background-color: #fff;
	}
	
	.modular {
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 30rpx;
		background: rgb(247, 247, 247);
		border-bottom: 2rpx solid #ffffff;
		line-height: 26rpx;
	}
	
	.modularTitle {
		font-size: 26rpx;
		font-family: Arial;
		font-weight: bold;
		color: #0B0B0B;
	}
	
	.uni-input {
		width: 400rpx;
		font-size: 26rpx;
		font-family: Arial;
		font-weight: 400;
		color: #999999;
		text-align: left;
	}
	
	.codeBtn{
		/* width: 232rpx;
		height: 80rpx;
		background: #FF7436;
		border-radius: 4rpx;
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #FFFFFF;
		text-align: center;
		padding: 27rpx 0 34rpx 0;
		box-sizing: border-box;
		line-height: normal; */
		
		font-size: 26rpx;
		font-family: Arial;
		font-weight: 400;
		color: #FF7436;
	}
	
	.btn {
		width: 670rpx;
		height: 80rpx;
		line-height: 80rpx;
		background: #E84678;
		border-radius: 8rpx;
	
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #FFFFFF;
		text-align: center;
		position: fixed;
		bottom: 30rpx;
		left: 0;
		right: 0;
		margin: 0 auto;
	}
</style>
