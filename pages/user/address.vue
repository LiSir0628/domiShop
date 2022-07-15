<template>
	<view class="container">
		<uni-nav-bar left-icon="back" @clickLeft="back" background-color="#ffffff" color="#000000" title="New receiving address"></uni-nav-bar>
		<view class="example">
			<view class="modular">
				<view class="modularTitle">Name of consignee</view>
				<input class="uni-input" v-model="baseFormData.name" placeholder="enter the name of the consignee" />
			</view>

			<view class="modular">
				<view class="modularTitle">Contact</view>
				<input class="uni-input" v-model="baseFormData.age" placeholder="enter your contact information" />
			</view>
			
			<view class="modular">
				<view class="modularTitle">In the area</view>
				<uni-data-picker placeholder="Select Harvest Address" popup-title="请选择所在地区" :localdata="dataTree" v-model="classes"
					@change="onchange" @nodeclick="onnodeclick" @popupopened="onpopupopened" @popupclosed="onpopupclosed">
				</uni-data-picker>
			</view>

			<view class="modular modularAddress">
				<view class="modularTitle">Detailed address</view>
				<!-- <textarea v-model="baseFormData.address" placeholder="Please enter a detailed address" /> -->
				<input class="uni-input" v-model="baseFormData.address" placeholder="Please enter a detailed address" />
			</view>

			<view class="modular modularSwitch">
				<view class="modularTitle">To the default address</view>
				<!-- <uni-data-checkbox v-model="baseFormData.sex" :localdata="sexs" /> -->
				<switch :checked="baseFormData.checked" color="#FF7436" @change="switchChange" />
			</view>
			<view class="btn" @click="submit">Save</view>
		</view>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				// 基础表单数据
				baseFormData: {
					name: '',
					age: '',
					address: '',
					checked: true
				},
				
				classes: '1-2',
				dataTree: [{
						text: "一年级",
						value: "1-0",
						children: [{
								text: "1.1班",
								value: "1-1"
							},
							{
								text: "1.2班",
								value: "1-2"
							}
						]
					},
					{
						text: "二年级",
						value: "2-0",
						children: [{
								text: "2.1班",
								value: "2-1"
							},
							{
								text: "2.2班",
								value: "2-2"
							}
						]
					},
					{
						text: "三年级",
						value: "3-0",
						disable: true
					}
				],
			}
		},
		methods: {
			back() {
				window.history.go(-1)
			},
			switchChange() {
				this.baseFormData.checked = !this.baseFormData.checked
			},
			submit() {
				console.log(this.baseFormData)
			},

			onnodeclick(e) {
				console.log(e);
				console.log("第一步")
			},
			onpopupopened(e) {
				console.log('popupopened');
				console.log("第二步")
			},
			onpopupclosed(e) {
				console.log('popupclosed');
				console.log("第三步")
			},
			onchange(e) {
				console.log('onchange:', e);
				console.log("第四步")
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
