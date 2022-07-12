<template>
	<view class="container">
		<uni-nav-bar left-icon="back" @clickLeft="back" background-color="#ffffff" color="#000000" title="Receiving address"></uni-nav-bar>
		<view class="addressList">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[{
					id: 1,
					photo: '../../static/images/home/photo.png',
					name: 'name',
					tel: 12563622222,
					isDefault: true,
					address: "dizhineirongdizhineirongdizhineirong"	
				},{
					id: 2,
					photo: '../../static/images/home/photo.png',
					name: 'name',
					tel: 12563622222,
					isDefault: false,
					address: "dizhineirongdizhineirongdizhineirong"	
				}]
			}
		},
		methods: {
			back() {
				window.history.go(-1)
			},
		}
	}
</script>

<style scoped>
	.container {
		
	}
</style>
