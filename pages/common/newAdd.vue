<template>
	<view class="newAddContainer">
		<uni-popup ref="newAddPopup" background-color="#fff" type="bottom" @maskClick="newAddClose">
			<view class="newAdd-popup-content">
				<view class="newAddCard">
					<view class="newAddCardTitle">
						<view class="newAddCardTip">Add TIKTOK account</view>
						<image class="newAddClose" src="../../static/images/detail/icon13.png" @click="newAddClose"></image>
					</view>
					<input class="newAddAccount" v-model="account" placeholder="Tiktok Account"/>
					<input class="newAddName" v-model="nickname" placeholder="Account Name"/>
					<view class="newAddAccountMsg">
						<input class="newAddFollower" v-model="fans" placeholder="Number of followers"/>
						<input class="newAddLikes" v-model="praise_nums" placeholder="Likes"/>
					</view>
										
					<view class="imageUpload" @click="photo">
						<image v-if="backendImage" class="backendImage" :src="backendImage"></image>
						<image v-else class="newAddUpload" src="../../static/images/common/icon03.png"></image>
						
					</view>					
					
					<view class="newAddBtn" @click="addAccount">Add an account</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import { pathToBase64, base64ToPath } from 'image-tools'
	export default {
		data() {
			return {
				account: '',
				nickname: '',
				fans: '',
				praise_nums: '',
				backend: '',
				backendImage: '',
			}
		},
		mounted() {
			this.$refs.newAddPopup.open("bottom")
		},
		methods: {
			open(){
				this.$refs.newAddPopup.open("bottom")
			},
			
			newAddClose() {
				this.$refs.newAddPopup.close()
			},
			
			photo() {
				let _this = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera'], //拍照选择
					success: function(res) {
						const tempFilePaths = res.tempFilePaths;
						_this.backendImage = res.tempFilePaths[0]
						console.log(res)
						pathToBase64(res.tempFilePaths[0])
						.then(path => {
							_this.backend = path
						  })
						  .catch(error => {
							console.error(error)
						  })
						// uni.uploadFile({
						// 	url: 'https://user.mini.zhishukongjian.com/user/albums', //仅为示例，非真实的接口地址
						// 	header:{
						// 		'token': uni.getStorageSync('token') || ''
						// 	},
						// 	filePath: tempFilePaths[0],
						// 	name: 'public',
						// 	formData: {
								
						// 	},
						// 	success: (uploadFileRes) => {
						// 		console.log(uploadFileRes)
								
						// 	}
						// });	
					}
				});
			},
			
			addAccount() {
				console.log(this.account)
				console.log(this.nickname)
				console.log(this.fans)
				console.log(this.praise_nums)
				console.log(this.backend)				
				return
				
				uni.showLoading({
					title: 'loading...',
					mask: true
				});
				this.$myRequest({
						method: 'POST',
						url: 'api/tiktok/user/darren/add',
						data: {
							account: this.account,
							nickname: this.nickname,
							fans: this.fans,
							praise_nums: this.praise_nums,
							backend: this.backend
						}
					})
					.then(res => {
						uni.hideLoading();
						if (res.data.code == 200) {
							console.log(res)								
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
			}
			
		}
	}
</script>

<style scoped>
	.newAddContainer {
		
	}
	
	/* 领样要求 */
	.newAddPopup{
		
	}
	.newAdd-popup-content{
	
	}
	.newAddCard{
		width: 750rpx;
		height: 795rpx;
		background: #FFFFFF;
		
		margin: 0 auto;
		text-align: center;
		line-height: normal;
		padding: 30rpx;
		box-sizing: border-box;
		position: relative;
	}
	.newAddCardTitle{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.newAddCardTip{
		font-size: 28rpx;
		font-family: Arial;
		font-weight: bold;
		color: #0B0B0B;
	}
	.newAddClose{
		width: 24rpx;
		height: 24rpx;
		display: block;
	}
	
	/* 输入框 */
	.newAddAccount,.newAddName,.newAddFollower,.newAddLikes{
		width: 690rpx;
		height: 80rpx;
		background: #F7F7F7;
		border-radius: 40rpx;
		font-size: 26rpx;
		font-family: Arial;
		font-weight: 400;
		color: #0B0B0B;
		margin-top: 32rpx;
		text-align: left;
		padding: 0 40rpx;
		box-sizing: border-box;
	}
	.newAddName{
		margin-top: 30rpx;
	}
	.newAddAccountMsg{
		width: 690rpx;
		margin-top: 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.newAddFollower{
		width: 335rpx;
		margin-top: 0;
	}
	.newAddLikes{
		width: 335rpx;
		margin-top: 0;
	}
	/* 图片上传 */
	.imageUpload{
		width: 176rpx;
		height: 176rpx;
		background: #F7F7F7;
		border-radius: 8rpx;
		margin: 39rpx auto 0;
		position: relative;
	}
	.backendImage{
		width: 176rpx;
		height: 176rpx;
		border-radius: 8rpx;
	}
	.newAddUpload{
		width: 56rpx;
		height: 55rpx;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		margin: auto;
	}
	
	.newAddBtn{
		width: 670rpx;
		height: 80rpx;
		line-height: 80rpx;
		background: #FF7436;
		border-radius: 8rpx;
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #FFFFFF;
		position: absolute;
		bottom: 40rpx;
	}
</style>
