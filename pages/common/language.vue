<template>
	<view class="languageCont">
		<uni-popup ref="popupLang" background-color="#fff">
			<view class="popup-content-lang">
				<view class="langListContent">
					<view class="popupChooseLang" v-for="item,index in langList"
						:class="{'activePopupChooseLang': langIndex == index}" @click="langState(index,item.name)">
						{{item.name}}
					</view>
				</view>
				<view class="confirmedLang" @click="confirmedLang">Cancels</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				langList: [{
					id: 1,
					iso: 'en',
					name: 'English'
				}, {
					id: 9,
					iso: 'ms',
					name: 'Malay'
				}],
				langIndex: 0
			}
		},
		methods: {
			getLangList(type) {
				uni.showLoading({
					title: this.$t('common').loading + '...',
					mask: true
				});
				this.$myRequest({
						method: 'GET',
						url: 'https://user.mini.zhishukongjian.com/langs',
						data: {

						}
					})
					.then(res => {
						uni.hideLoading();
						if (res.data.code == 200) {
							//请求语法接口
							uni.setStorageSync('langList', res.data.data);
							if (type == "one") this.langList = uni.getStorageSync('langList')
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
			langOpen() {
				if (uni.getStorageSync('langList')) {
					this.langList = uni.getStorageSync('langList')
				} else {
					this.getLangList("one")
				}

				if (localStorage.getItem('language')) {
					for (let i in this.langList) {
						if (this.langList[i].name == localStorage.getItem('language')) {
							this.langIndex = i
							break
						}
					}
				}
				this.$refs.popupLang.open("bottom")
			},
			langState(index, name) {
				this.$refs.popupLang.close()
				if (this.langIndex == index) return
				this.langIndex = index

				this.$i18n.locale = this.langList[index].iso;
				this.$store.commit('editLanguage', name)
				uni.setStorageSync('language', name)
				uni.setStorageSync('languageIso', this.langList[index].iso)
				this.$emit('langSwitch', name);
			},
			confirmedLang() {
				//选择关闭
				this.$refs.popupLang.close()
			},
		}
	}
</script>

<style scoped>
	.languageCont {}

	/* 下拉框弹窗 */
	.popup-content-lang {
		width: 750rpx;
		height: 890rpx;
		/* height: 330rpx; */
		/* display: flex;
		align-items: center;
		justify-content: center; */
		background-color: #fff;
		box-sizing: border-box;
		text-align: center;
		position: relative;
	}

	.langListContent {
		height: 730rpx;
		overflow: hidden;
		overflow-y: auto;
	}

	::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}

	.popupChooseLang {
		width: 750rpx;
		height: 78rpx;
		line-height: 78rpx;
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #999999;
		border-bottom: 2rpx solid #F7F7F7;
	}

	.popupChooseLang:nth-last-child(1) {
		border-bottom: none;
	}

	.activePopupChooseLang {
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #111111;
	}

	.confirmedLang {
		width: 670rpx;
		height: 80rpx;
		background: #FF7436;
		border-radius: 8rpx;
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 80rpx;
		position: absolute;
		left: 0;
		right: 0;
		margin: 0 auto;
		bottom: 37rpx;
	}
</style>
