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
			if(uni.getStorageSync('addressList')){
				this.$store.commit('editAddress', uni.getStorageSync('addressList'))
			}
			if(uni.getStorageSync('language')){
				this.$store.commit('editLanguage', uni.getStorageSync('language'))
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
	.uni-tabbar-bottom{
		display: none;
	}
	uni-page-wrapper{
		width: 100%;
		height: 100% !important;
	}
	
	/*  修改文字 */
	.uni-picker-container .uni-picker-action-cancel{
		display: flex;
		align-items: center;
		flex-direction: row-reverse;
		color: rgba(255, 255, 255, 0) !important;
	}
	
	.uni-picker-container .uni-picker-action-cancel::after{
		content: 'cancel';
		color: #888;
	}
	
	.uni-picker-container .uni-picker-action.uni-picker-action-confirm{
		color: rgba(255, 255, 255, 0) !important;
	}
	.uni-picker-container .uni-picker-action.uni-picker-action-confirm::after{
		content: 'confirm';
		color: #007aff;
	}
</style>
