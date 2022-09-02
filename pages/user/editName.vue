<template>
	<view class="container">
		<uni-nav-bar left-icon="back" @clickLeft="back" background-color="#ffffff" color="#000000" :title="$t('editName.Change_Name')"></uni-nav-bar>
		<view class="example">
			<view class="modular">
				<input class="uni-input" v-model="name" :placeholder="$t('editName.Please_enter_your_name')" />
			</view>
			<view class="btn" @click="submit">{{ $t('editName.Confirmed') }}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '',
			}
		},
		methods: {
			back() {
				window.history.go(-1)
			},
			
			submit() {
				if(!this.name){
					//未输入名称
					uni.showModal({
						title: this.$t('common').Tip,
						content: this.$t('editName').Please_enter_your_name,
						confirmText: this.$t('common').confirm,
						showCancel: false,
					})
					return
				}
				uni.showLoading({
					title: this.$t('common').loading + '...',
					mask: true
				});
				this.$myRequest({
						method: 'POST',
						url: 'https://user.mini.zhishukongjian.com/user/editerbatch',
						data: {
							nickname: this.name
						}
					})
					.then(res => {
						uni.hideLoading();
						if (res.data.code == 200) {
							this.$store.commit('editName', this.name)
							uni.setStorageSync('duomiList', this.$store.state.duomiList);
							uni.showModal({
								title: this.$t('common').Tip,
								content: res.data.msg,
								confirmText: this.$t('common').confirm,
								showCancel: false,
								success: function (res) {
									if (res.confirm) {
										window.history.go(-1)
									}
								},
							})
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
		background: #FF7436;
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
