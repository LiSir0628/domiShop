<template>
	<view class="container">
		<view class="userMsg">
			<image class="banner" src="../../static/images/user/icon11.png"></image>
			<image class="back" src="../../static/images/user/icon13.png" @click="back"></image>
			<view class="editPhoto">
				<view class="editPhotoModular">
					<!-- <image class="photo" src="../../static/images/register/icon09.png"></image> -->
					<image class="photo" v-if="userList.avatar" :src="userList.avatar"></image>
					<image class="photo" v-else src="../../static/images/register/icon09.png"></image>
					<image class="camera" src="../../static/images/user/icon12.png" @click="photo"></image>
				</view>
			</view>
			<view class="name">{{nickname}}</view>
		</view>
		<view class="content"></view>
		<view class="menuList">
			<uni-list :border="false">
				<uni-list-item v-for="item,index in lists" :border="false" @click="goClick(index)" link>
					<template v-slot:header>
						<view class="slot-box">
							<text class="slot-box slot-text">{{item.title}}</text>
						</view>
					</template>
					<template v-slot:body>

					</template>
					<template v-slot:footer>
						<text class="solt-right">{{item.value}}</text>
						<image v-show="item.url" class="arrow" src="../../static/images/user/icon05.png"></image>
					</template>
				</uni-list-item>
			</uni-list>
		</view>

		<view class="bottom" @click="goBack">
			{{ $t('editUser.Log_out') }}
		</view>
	</view>
</template>

<script>
	import { pathToBase64, base64ToPath } from 'image-tools'
	export default {
		data() {
			return {
				userList: {},
				nickname: '',
				lists: [{
					id: 1,
					title: this.$t('editUser').Name,
					url: './editName',
					value: ''
				}, {
					id: 2,
					title: this.$t('editUser').Login_mailbox,
					url: './editEmail',
					value: ''
				}, {
					id: 3,
					title: this.$t('editUser').Change_Password,
					url: './editPassword',
					val: ''
				}, {
					id: 4,
					title: this.$t('editUser').Address_Management,
					url: './addressList',
					val: ''
				}]
			}
		},
		onShow() {
			this.userList = this.deepClone(this.$store.state.duomiList)
			this.nickname = this.$store.state.nickname
			this.lists[0].value = this.nickname
			this.lists[1].value = this.$store.state.duomiList.mail
		},
		methods: {
			deepClone(obj) {
				let objClone = Array.isArray(obj) ? [] : {};
				if(obj && typeof obj === "object") {
					for(let key in obj) {
						if(obj.hasOwnProperty(key)) {
							//判断ojb子元素是否为对象，如果是，递归复制
							if(obj[key] && typeof obj[key] === "object") {
								objClone[key] = this.deepClone(obj[key]);
							} else {
								//如果不是，简单复制
								objClone[key] = obj[key];
							}
						}
					}
				}
				return objClone;
			},
			back() {
				window.history.go(-1)
			},
			goClick(index) {
				//console.log(index)
				uni.navigateTo({
					url: this.lists[index].url
				});
			},
			goBack() {
				uni.setStorageSync('index_is_refresh', "1");
				uni.setStorageSync('token', "");
				uni.navigateTo({
					url: '/pages/register/login'
				});
			},
			photo() {
				let _this = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera'], //拍照选择
					success: function(res) {
						const tempFilePaths = res.tempFilePaths;
						_this.userList.avatar = res.tempFilePaths[0]
						pathToBase64(res.tempFilePaths[0])
						.then(path => {
							_this.userList.avatar = path
							_this.setPhoto()
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
			setPhoto() {
				uni.showLoading({
					title: this.$t('common').loading + '...',
					mask: true
				});
				this.$myRequest({
						method: 'POST',
						url: 'https://user.mini.zhishukongjian.com/user/editerbatch',
						data: {
							avatar: this.userList.avatar
						}
					})
					.then(res => {
						uni.hideLoading();
						if (res.data.code == 200) {
							this.$store.commit('editAvatar', this.userList.avatar)
							uni.setStorageSync('duomiList', this.$store.state.duomiList);
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
		}
	}
</script>

<style scoped>
	.container {
		padding-bottom: 100rpx;
	}

	.userMsg {
		position: relative;
	}

	.banner {
		width: 750rpx;
		height: 366rpx;
		display: block;
	}

	.back {
		width: 16rpx;
		height: 28rpx;
		position: absolute;
		top: 35rpx;
		left: 30rpx;
	}

	.editPhoto {
		position: absolute;
		top: 65rpx;
		left: 0;
		right: 0;
		margin: 0 auto;
		text-align: center;
	}

	.editPhotoModular {
		position: relative;
	}

	.photo {
		width: 144rpx;
		height: 144rpx;
		border-radius: 50%;
		box-shadow: 0rpx 4rpx 40rpx 10rpx rgba(0, 0, 0, 0.1);
		display: block;
		/* margin: 0 auto; */
		margin: 20rpx auto 0;
		/* position: absolute;
		top: 65rpx;
		left: 0;
		right: 0;
		margin: 0 auto; */
	}

	.camera {
		width: 52rpx;
		height: 52rpx;
		position: absolute;
		/* top: 92rpx; */
		bottom: 0;
		left: 0rpx;
		right: -98rpx;
		margin: 0 auto;
	}

	.name {
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

	.content {
		background: #FFFFFF;
		box-shadow: 0rpx -40rpx 40rpx 4rpx rgba(2, 1, 3, 0.05);
		border-radius: 0rpx 0rpx 0rpx 0rpx;
		padding: 32rpx;
		box-sizing: border-box;

	}

	.arrow {
		width: 13rpx;
		height: 24rpx;
		margin: -2rpx 0 0 8rpx;
	}

	/* 菜单列表 */
	.menuList {
		/* background: #FFFFFF;
		box-shadow: 0rpx -40rpx 40rpx 4rpx rgba(2,1,3,0.05);
		border-radius: 0rpx 0rpx 0rpx 0rpx;
		padding: 30rpx;
		box-sizing: border-box; */
	}

	/deep/ .uni-list-item {
		margin-bottom: 67rpx;
	}

	/deep/ .uni-list-item__container {
		align-items: center;
		padding: 0 30rpx;
	}

	.slot-box {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.slot-image {
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

	.solt-right {
		font-size: 26rpx;
		font-family: Arial-Regular, Arial;
		font-weight: 400;
		color: #333333;
		line-height: 30rpx;
		margin-right: 16rpx;
	}

	.menuList .arrow {
		margin: 0;
	}

	/* 底部按钮 */
	.bottom {
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

	/* 隐藏原生样式 */
	.uniui-arrowright {
		display: none;
	}

	/deep/ .uniui-arrowright {
		display: none;
	}

	.uni-list-item--hover {
		background: none;
	}

	/deep/ .uni-list-item--hover {
		background: none;
	}
</style>
