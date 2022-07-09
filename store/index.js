import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		accountName: "All of them",
		accountId : "",
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
