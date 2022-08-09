<template>
	<view class="container">
		<uni-nav-bar left-icon="back" @clickLeft="back" background-color="#ffffff" color="#000000" title="New receiving address"></uni-nav-bar>
		<view class="example">
			<view class="modular">
				<view class="modularTitle">Name of consignee</view>
				<input class="uni-input" v-model="name" placeholder="enter the name of the consignee" />
			</view>

			<view class="modular">
				<view class="modularTitle">Contact</view>
				<input class="uni-input" v-model="tel" placeholder="enter your contact information" />
			</view>
			
			<view class="modular">
				<view class="modularTitle">In the area</view>
				<picker v-if="array.length > 0" @change="bindPickerChange" :value="index" range-key="name" :range="array">
					<view class="uni-input">{{array[index].name}}</view>
				</picker>
			</view>
			
			<view class="modular">
				<view class="modularTitle">In the city</view>
				<picker v-if="arrayCity.length > 0" @change="bindPickerCaityChange" :value="cindex" range-key="name" :range="arrayCity">
					<view class="uni-input">{{arrayCity[cindex].name}}</view>
				</picker>
				<!-- <view v-else class="noData">暂无数据</view> -->
			</view>

			<view class="modular modularAddress">
				<view class="modularTitle">Detailed address</view>
				<!-- <textarea v-model="address" placeholder="Please enter a detailed address" /> -->
				<input class="uni-input" v-model="detail" placeholder="Please enter a detailed address" />
			</view>

			<view class="modular modularSwitch">
				<view class="modularTitle">To the default address</view>
				<!-- <uni-data-checkbox v-model="sex" :localdata="sexs" /> -->
				<switch :checked="is_default" color="#FF7436" @change="switchChange" />
			</view>
			<view class="btn" @click="submit">Save</view>
		</view>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				id: "",
				// 基础表单数据
				name: '',
				tel: '',
				detail: '',
				is_default: false,
				
				country_id: "",
				country_name: "",
				city_id: "",
				city_name: "",
				
				array: [],
				index: 0,
				arrayCity: [],
				cindex: 0,
			}
		},
		onLoad(option) {
			//如果参数有值，渠道入口-请求
			//如果首页、分类特殊值有值-请求（不与上方同时触发）
			if (option.id){
				this.id = option.id
				this.getHttpLists()
			} else {
				this.getCountry("one")
			}
		},
		methods: {
			bindPickerChange(e) {
				console.log('国家选择，携带值为', e.detail.value)
				this.index = e.detail.value
				this.country_id = this.array[this.index].id
				this.country_name = this.array[this.index].name
				this.city(this.country_id)
			},
			bindPickerCaityChange(e) {
				console.log('城市选择，携带值为', e.detail.value)
				this.cindex = e.detail.value
				this.city_id = this.arrayCity[this.cindex].id
				this.city_name = this.arrayCity[this.cindex].name
			},
			getHttpLists() {
				uni.showLoading({
					title: 'loading...',
					mask: true
				});
				this.$myRequest({
						method: 'GET',
						url: 'api/tiktok/user/address',
						data: {
							id: this.id
						}
					})
					.then(res => {
						uni.hideLoading();
						if (res.data.code == 200) {
							console.log(res.data.data)
							this.id = res.data.data.id
							this.name = res.data.data.name
							this.tel = res.data.data.tel
							this.detail = res.data.data.detail
							this.is_default = res.data.data.is_default == 1 ? true : false
							this.country_id = res.data.data.country_id
							this.country_name = res.data.data.country_name
							this.city_id = res.data.data.city_id
							this.city_name = res.data.data.city_name
							this.getCountry("one")
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
			},
			getCountry(type) {
				uni.showLoading({
					title: 'loading...',
					mask: true
				});
				this.$myRequest({
						method: 'GET',
						url: 'https://user.mini.zhishukongjian.com/country',
						data: {
							limit: 10000
						}
					})
					.then(res => {
						uni.hideLoading();
						if (res.data.code == 200) {
							this.array = res.data.data
							if(this.id){
								for(let i in this.array){
									if(this.array[i].id == this.country_id){
										console.log(this.array[i])
										this.index = i
									}
								}
							}
							//console.log(this.array)
							//根据index获取country_id值
							this.country_id = this.array[this.index].id
							this.country_name = this.array[this.index].name
							if(type == "one"){
								this.city(this.array[this.index].id, this.city_id)
							}
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
			},
			city(country_id, city_id) {
				this.city_id = city_id ? city_id : ""
				this.city_name = ""
				this.cindex = 0
				this.arrayCity = []
				uni.showLoading({
					title: 'loading...',
					mask: true
				});
				this.$myRequest({
						method: 'GET',
						url: 'https://user.mini.zhishukongjian.com/country/' + country_id,
						data: {
							limit: 10000
						}
					})
					.then(res => {
						uni.hideLoading();
						if (res.data.code == 200) {
							this.arrayCity = res.data.data
							if(this.id){
								for(let i in this.arrayCity){
									if(this.arrayCity[i].id == this.city_id){
										console.log(this.arrayCity[i])
										this.cindex = i
									}
								}
							}
							//console.log(this.arrayCity)
							//根据cindex获取city_id值
							this.city_id = this.arrayCity[this.cindex].id
							this.city_name = this.arrayCity[this.cindex].name
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
			},
			back() {
				window.history.go(-1)
			},
			switchChange() {
				this.is_default = !this.is_default
			},
			submit() {
				uni.showLoading({
					title: 'loading...',
					mask: true
				});
				this.$myRequest({
						method: 'POST',
						url: 'api/tiktok/user/address',
						data: {
							id: this.id,
							name: this.name,
							tel: this.tel,
							country_id: this.country_id,
							country_name: this.country_name,
							city_id: this.city_id,
							city_name: this.city_name,
							detail: this.detail,
							is_default: this.is_default ? 1 : 0,
						}
					})
					.then(res => {
						uni.hideLoading();
						if (res.data.code == 200) {
							// uni.showModal({
							// 	title: 'TIP',
							// 	content: res.data.msg,
							// 	showCancel: false,
							// 	success: function (res) {
							// 		if (res.confirm) {
							// 			window.history.go(-1)
							// 		}
							// 	}
							// })
							
							//返回上一页
							window.history.go(-1)	
							
							//history.back()		
													
							// uni.navigateBack({
							// 	delta:1,
							// })
							
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
			},
		}
	}
</script>

<style scoped>
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
	
	.noData{
		font-size: 26rpx;
		font-family: Arial;
		font-weight: 400;
		color: #999999;
	}
	
	.modularAddress {
		margin-top: 19rpx;
	}

	.modularSwitch {
		background: #ffffff;
	}

	.uni-input {
		width: 400rpx;
		font-size: 26rpx;
		font-family: Arial;
		font-weight: 400;
		color: #999999;
		text-align: right;
	}

	/* 地势联动 */
	.title {
		font-size: 14px;
		font-weight: bold;
		margin: 20px 0 5px 0;
	}

	.data-pickerview {
		height: 400px;
		border: 1px #e5e5e5 solid;
	}

	.popper__arrow {
		top: -6px;
		left: 50%;
		margin-right: 3px;
		border-top-width: 0;
		border-bottom-color: #EBEEF5;
	}

	.popper__arrow {
		top: -6px;
		left: 50%;
		margin-right: 3px;
		border-top-width: 0;
		border-bottom-color: #EBEEF5;
	}
	
	/deep/ .input-value{
		font-size: 26rpx;
		font-family: Arial;
		font-weight: 400;
		color: #999999;
		line-height: normal;
		padding: 0;
	}
	
	/deep/ .input-value-border{
		border: none;
	}
	/deep/ .arrow-area{
		margin-bottom: -5px;
		justify-content: end;
		align-items: center;
	}
	/* 单选按键 */
	/deep/ uni-switch .uni-switch-input {
		width: 80rpx;
		height: 40rpx;
		border-radius: 40rpx;
	}

	/deep/ uni-switch .uni-switch-input:after {
		width: 36rpx;
		height: 36rpx;
		border-radius: 50%;
		background: #CECECE;
		bottom: 0;
		margin: auto 0;
		/* transform: translateX(40rpx); */
	}

	/deep/ uni-switch .uni-switch-input.uni-switch-input-checked:after {
		background: #ffffff;
		transform: translateX(40rpx);
	}

	/deep/ uni-switch .uni-switch-input:before {
		width: 80rpx;
		height: 40rpx;
		border-radius: 40rpx;
		background: #ffffff;
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
