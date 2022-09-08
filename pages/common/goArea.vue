<template>
	<view class="areauageCont">
		<uni-popup ref="popupArea" background-color="#fff">
			<view class="popup-content-area">
				<view class="areaListContent">
					<view class="popupChooseArea" v-for="item,index in areaList"
						:class="{'activePopupChooseArea': areaIndex == index}" @click="areaState(index,item.name)">
						{{item.name}}
					</view>
				</view>
				<view class="confirmedArea" @click="confirmedArea">{{ $t('options.Cancels') }}</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				areaList: [{
					id: 1,
					name: 'English'
				}, {
					id: 9,
					name: 'Malay'
				}],
				areaIndex: 0
			}
		},
		methods: {	
			areaOpen() {
				if (uni.getStorageSync('areaName')) {
					for (let i in this.areaList) {
						if (this.areaList[i].name == uni.getStorageSync('areaName')) {
							this.areaIndex = i
							break
						}
					}
				}
				this.$refs.popupArea.open("bottom")
			},
			areaState(index, name) {
				this.$refs.popupArea.close()
				if (this.areaIndex == index) return
				this.areaIndex = index

				uni.setStorageSync('areaName', name)
				this.$emit('areaSwitch', name);
			},
			confirmedArea() {
				//选择关闭
				this.$refs.popupArea.close()
			},
		}
	}
</script>

<style scoped>
	.areauageCont {}

	/* 下拉框弹窗 */
	.popup-content-area {
		width: 750rpx;
		height: 330rpx;
		/* display: flex;
		align-items: center;
		justify-content: center; */
		background-color: #fff;
		box-sizing: border-box;
		text-align: center;
		position: relative;
		z-index: 10000;
	}

/* 	.areaListContent {
		height: 310rpx;
		overflow: hidden;
		overflow-y: auto;
	} */

	::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}

	.popupChooseArea {
		width: 750rpx;
		height: 78rpx;
		line-height: 78rpx;
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #999999;
		border-bottom: 2rpx solid #F7F7F7;
	}

	.popupChooseArea:nth-last-child(1) {
		border-bottom: none;
	}

	.activePopupChooseArea {
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #111111;
	}

	.confirmedArea {
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
