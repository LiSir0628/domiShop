<template>
	<view class="languageCont">
		<uni-popup ref="popupLang" background-color="#fff">
			<view class="popup-content-lang">
				<view class="popupChooseLang" v-for="item,index in langList"
					:class="{'activePopupChooseLang': langIndex == index}" @click="langState(index,item.name)">
					{{item.name}}</view>
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
					name: 'English' //马来语 Inggeris,需要进行配置
				}, {
					id: 2,
					name: 'Malay'
				}],
				langIndex: 1
			}
		},
		methods: {
			langOpen() {
				if(localStorage.getItem('language')){
					for(let i in this.langList){
						if(this.langList[i].name == localStorage.getItem('language')){
							this.langIndex = i
							break
						}
					}
				}
				this.$refs.popupLang.open("bottom")
			},
			langState(index, name) {
				this.$refs.popupLang.close()
				if(this.langIndex == index) return
				this.langIndex = index
				
				this.$i18n.locale = name;
				this.$store.commit('editLanguage', name)
				uni.setStorageSync('language', name)
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
	.languageCont {
		
	}
	
	/* 下拉框弹窗 */
	.popup-content-lang {
		width: 750rpx;
		height: 330rpx;
		/* display: flex;
		align-items: center;
		justify-content: center; */
		background-color: #fff;
		box-sizing: border-box;
		text-align: center;
		position: relative;
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
	
	.popupChooseLang:nth-last-child(2) {
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
