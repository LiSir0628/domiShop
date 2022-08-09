<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			if(uni.getStorageSync('duomiList')){
				this.$store.commit('editDuomi', uni.getStorageSync('duomiList'))
			}
			if(uni.getStorageSync('accountList')){
				this.$store.commit('editAccountName', uni.getStorageSync('accountList'))
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	@font-face {
		font-family: Arial;
		src: url(static/ARIAL.TTF)
	}
	.uni-navbar__header{
		padding: 0 30rpx !important;
	}
	page {
		word-break: break-all
	}
</style>
