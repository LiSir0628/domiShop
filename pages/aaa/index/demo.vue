<template>
	<view class="container">
		<uni-nav-bar fixed left-icon="back" @clickLeft="back" background-color="#ffffff" color="#000000" title="登录">
		</uni-nav-bar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
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
	
	/deep/ .uni-navbar--border {
		border-bottom-color: white;
	}
</style>
