<template>
	<view class="container">
		<uni-nav-bar left-icon="back" @clickLeft="back" :fixed="true" background-color="#ffffff" color="#000000" title="Favorite list"></uni-nav-bar>
		<view class="content">
			<view v-if="lists.length > 0">
				<view class="sp" v-for="item,index in lists">
					<view class="spTop">
						<image class="spLogo" :src="item.image"></image>
						<view class="spMsg">
							<view class="spDes">{{item.name}}</view>
							<view class="spOperation">
								<view class="price">$ {{item.price}}</view>
								<view class="commission">High Commission: {{item.commission}}%</view>
								<image class="love" src="../../static/images/detail/icon16.png" @click="remove(index)"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view v-else>
				<view class="noData">
					<image class="noDataLogo" src="../../static/images/common/icon02.png"></image>
					<view class="noDataText">It's empty</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// lists:[],
				lists:[{
					id: 1,
					image: '../../static/images/home/photo.png',
					name: 'zhelishi shangpinneirongshangpinne shangpinneirongs,zhelishi shangpinneirongshangpinne shangpinneirongs',
					price: '2563200.00',
					commission: '56.00'
				},{
					id: 2,
					image: '../../static/images/home/photo.png',
					name: 'zhelishi shangpinneirongshangpinne shangpinneirongs,zhelishi shangpinneirongshangpinne shangpinneirongs',
					price: '300000',
					commission: '60'
				}]
			}
		},
		methods: {
			back() {
				window.history.go(-1)
			},
			remove(index) {
				this.lists.splice(index,1)
			}
		}
	}
</script>

<style scoped>
	.container {
		
	}
	
	/* 主要内容 */
	.content {
		width: 690rpx;
		margin: 30rpx auto;
	}
	
	.sp {
		width: 690rpx;
		/* height: 400rpx; */
		background: #FFFFFF;
		border: 2rpx solid #CECECE;
		border-radius: 8rpx;
		margin-bottom: 20rpx;
	}
	
	.spTop {
		padding: 22rpx 22rpx 22rpx 22rpx;
		display: flex;
		justify-content: space-between;
	}
	
	.spLogo {
		width: 144rpx;
		height: 144rpx;
		border-radius: 8rpx;
		display: block;
	}
	
	.spMsg {
		width: 486rpx;
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
		justify-content: space-between;
	
	}
	
	.spDes {
		width: 486rpx;
		font-size: 28rpx;
		font-family: Arial;
		font-weight: bold;
		color: #0B0B0B;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		line-height: normal;
	}
	
	.spOperation {
		width: 486rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		line-height: normal;
	}
	
	.price{
		font-size: 24rpx;
		font-family: DIN;
		font-weight: bold;
		color: #999999;
	}
	
	.commission{
		font-size: 28rpx;
		font-family: Arial;
		font-weight: bold;
		color: #FF3838;
	}
	
	.love{
		width: 24rpx;
		height: 21rpx;
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
