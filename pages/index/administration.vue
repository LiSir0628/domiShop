<template>
	<view class="container">
		<uni-nav-bar left-icon="back" @clickLeft="back" background-color="#ffffff" color="#000000" :title="$t('pro_detail.Product_details')"></uni-nav-bar>
		<view class="content" :style="contentHeight">
			<view v-if="lists.length > 0">
				<view class="userList" v-for="item,index in lists" :class="{'active': cIndex == index}" @click="choose(index)">
					<image v-if="item.image" class="userPhoto" :src="item.image"></image>
					<image v-else class="userPhoto" src="../../static/images/common/photo.png"></image>
					<!-- <image v-else class="userPhoto" src="../../static/images/home/photo.png"></image> -->
					<view class="userName">{{item.name}}</view>
				</view>
			</view>
			<view v-else>
				<view class="noData">
					<image class="noDataLogo" src="../../static/images/common/icon02.png"></image>
					<view class="noDataText">{{ $t('common.It’s_empty') }}</view>
				</view>
			</view>
			<!-- <view class="btn" @click="add">New TIKTOK account</view> -->
			<view class="btn" @click="open('bottom')">{{ $t('administration.New_TIKTOK_account') }}</view>
		</view>
		
		<!-- <add-admin ref="addAdmin"></add-admin> -->
		<new-add ref="newAdd" @fatherMethod="fatherMethod"></new-add>
	</view>
</template>

<script>
	import addAdmin from "../common/addAdmin.vue"
	import newAdd from "../common/newAdd.vue"
	export default {
		data() {
			return {
				isShowMask: false,
				time: 59,
				setTime: null,
				cIndex: 0,
				lists: [],
				contentHeight: {
					'height': '1080rpx'
				},
			}
		},
		components: {
			addAdmin,
			newAdd
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
		mounted() {
			//关闭计时器，避免重复调用
			//clearInterval(this.setTime)
			
			this.getHttpLists()
		},
		methods: {
			fatherMethod() {
				this.getHttpLists()
			},
			getUserId() {
				let obj = {}
				for(let i in this.lists){
					if(this.lists[i].id == this.$store.state.accountId){
						obj = this.lists[i]
						this.lists.splice(i,1)
						this.lists.unshift(obj)
						break
					}
				}
				if(this.lists.length > 0 && !this.$store.state.accountId){
					this.$store.commit('editAccountName', this.lists[this.cIndex])
					uni.setStorageSync('accountList', this.lists[this.cIndex])
				}
				//console.log(this.lists)
			},
			getHttpLists() {
				uni.showLoading({
					title: this.$t('common').loading + '...',
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
							//console.log(res.data.data)
							this.lists = res.data.data
							this.getUserId()
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
			back() {
				window.history.go(-1)
			},
			choose(index) {
				if(this.cIndex == index) return
				this.cIndex = index
				
				//还需要管理一个 账号id
				this.$store.commit('editAccountName', this.lists[index])
				uni.setStorageSync('accountList', this.lists[index]);
				//console.log(this.$store.state.accountName)
				//console.log(this.$store.state.accountId)
			},

			open(type) {		
				//this.$refs.addAdmin.open()
				this.$refs.newAdd.newAddOpen()
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
		}
	}
</script>

<style scoped>
	.container {
		/* padding: 30rpx 19rpx 30rpx 20rpx; */
	}
	
	.content{
		/* max-height: 1130rpx; */
		height: 1080rpx;
		padding: 30rpx;
		box-sizing: border-box;
		overflow: hidden;
		overflow-y: auto;
	}
	.content::-webkit-scrollbar {
	  display: none;
	}
	.userList{
		width: 690rpx;
		height: 148rpx;
		background: #FFFFFF;
		border: 1px solid #CECECE;
		border-radius: 8rpx;
		display: flex;
		align-items: center;
		padding: 30rpx 20rpx;
		box-sizing: border-box;
		margin: 0 auto 30rpx auto;
	}
	.active{
		background: rgba(255, 116, 54, 0.08);
		border: 2rpx solid #FF7436;
	}
	.userPhoto{
		width: 88rpx;
		height: 88rpx;
		border-radius: 50%;
	}
	.userName{
		margin-left: 20rpx;
		font-size: 26rpx;
		font-family: Arial;
		font-weight: 400;
		color: #0B0B0B;
	}
	
	.btn{
		width: 670rpx;
		height: 80rpx;
		background: #FF7436;
		border-radius: 8rpx;
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #FFFFFF;
		text-align: center;
		line-height: 80rpx;
		position: absolute;
		left: 0;
		right: 0;
		margin: 0 auto;
		bottom: 37rpx;
	}
	
	/* 遮罩样式 */
	.mask{
		position: fixed;
		width: 100%;
		height: 100%;
		padding: 172rpx 0;
		margin: 0 auto;
		top: 0;
		left: 0;
		background: rgba(0,0,0,0.6);
	}
	.card{
		width: 650rpx;
		height: 905rpx;
		background: #FFFFFF;
		border-radius: 8rpx;
		margin: 0 auto;
		text-align: center;
		line-height: normal;
		padding: 30rpx 36rpx 29rpx;
		box-sizing: border-box;
		position: relative;
	}
	.close{
		font-size: 24rpx;
		color: #999999;
		position: absolute;
		right: 30rpx;
		line-height: 24rpx;
	}
	.cardTitle{
		font-size: 26rpx;
		font-family: Arial;
		font-weight: bold;
		color: #0B0B0B;
		line-height: 26rpx;
	}
	.cardTip{
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #39B83C;
		margin-top: 24rpx;
		line-height: 24rpx;
	}
	.cardEwm{
		width: 396rpx;
		height: 396rpx;
		padding-top: 34rpx;
		display: block;
		margin: 0 auto;
	}
	.cardTime{
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #0B0B0B;
		margin-top: 29rpx;
		line-height: 24rpx;
	}
	.service{
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #0B0B0B;
		text-align: left;
		margin-top: 31rpx;
		line-height: 24rpx;
	}
	.serviceDes{
		margin-top: 26rpx;
	}
	.serviceText{
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #666666;
		text-align: left;
		/* margin-top: 26rpx; */
		line-height: 50rpx;
		display: flex;
	}
	.circle{
		width: 24rpx;
		height: 24rpx;
		background: #FF7436;
		border-radius: 50%;
		font-size: 20rpx;
		font-family: Arial;
		font-weight: 400;
		color: #FFFFFF;
		text-align: center;
		line-height: 24rpx;
		margin-top: 12rpx;
	}
	.text{
		width: 540rpx;
		margin-left: 20rpx;
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
