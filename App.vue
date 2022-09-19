<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
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
					console.log(res.data.data)
					uni.setStorageSync('langList', res.data.data);
					
					if(!uni.getStorageSync('language')){
						this.$i18n.locale = res.data.data[0].iso;
						this.$store.commit('editLanguage', res.data.data[0].name)
						uni.setStorageSync('language', res.data.data[0].name)
						uni.setStorageSync('languageIso', res.data.data[0].iso)
						this.$emit('langSwitch', res.data.data[0].name);
					}
				}
			})
			.catch(err => {
				uni.hideLoading();
			})
			
			
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
		// content: 'cancel';
		content: '';
		color: #888;
	}
	
	.uni-picker-container .uni-picker-action.uni-picker-action-confirm{
		color: rgba(255, 255, 255, 0) !important;
	}
	.uni-picker-container .uni-picker-action.uni-picker-action-confirm::after{
		content: 'ok';
		color: #007aff;
	}
</style>
