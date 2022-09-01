import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		duomiList: {},	
		nickname: "",
		avatar: "",
		mail: "",
		
		accountList: {},
		accountName: "", //账号名称
		accountId : "", //账号id
		
		addressList: {},
		addressName: "",
		addressId: "",
		
		langText: ""
	},
	mutations: {
		editDuomi(state,duomi) {
			state.duomiList = duomi
			state.nickname = duomi.nickname
			state.avatar = duomi.avatar
		},
		editName(state,name) {
			state.nickname = name
			state.duomiList.nickname = name
		},
		editAvatar(state,photo) {
			state.avatar = photo
			state.duomiList.avatar = photo
		},
		editEmail(state,email){
			state.mail = email
			state.duomiList.mail = email
		},
		
		editAccountName(state,user){
			state.accountList = user
			state.accountName = user.name
			state.accountId = user.id
		},
		editAddress(state,address){
			state.addressList = address
			state.addressName = address.country_name + address.city_name + address.detail
			state.addressId = address.id
		},
		
		editLanguage(state,name){
			state.langText = name
		}
	},
	actions: {

	},
	getters: {

	},
	modules: {

	}
})

export default store
