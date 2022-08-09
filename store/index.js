import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		duomiList: {},
		
		nickname: "",
		
		accountList: {},
		accountName: "", //账号名称
		accountId : "", //账号id
		
		addressList: {},
		addressName: "",
		addressId: "",
	},
	mutations: {
		editDuomi(state,duomi) {
			state.duomiList = duomi
			state.nickname = duomi.nickname
		},
		editName(state,name) {
			state.nickname = name
			state.duomiList.nickname = name
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
