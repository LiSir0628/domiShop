import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		accountName: "", //账号名称
		accountId : "", //账号id
	},
	mutations: {
		editAccountName(state,user){
			state.accountName = user.name
			state.accountId = user.id
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
