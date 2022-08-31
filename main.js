
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
//引入vuex
import store from './store'
//把vuex定义成全局组件
Vue.prototype.$store = store
// 复制
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
// 语法切换
import VueI18n from 'vue-i18n'
Vue.use(VueI18n);

const i18n = new VueI18n({ 
	// #ifdef MP 	
	locale: 'Malay', //初始化,保证刷新页面也保留
	// #endif
	// #ifdef APP-PLUS
	locale: plus.storage.getItem('language') || 'Malay', //初始化,保证刷新页面也保留
	// #endif
	// #ifdef H5
	locale: localStorage.getItem('language') || 'Malay', //初始化,保证刷新页面也保留
	// #endif
	// 加载语言文件的内容
	messages: { 
		'English': require('./locales/en.js').lang,
		'Malay': require('./locales/malay.js').lang
	}
})
Vue.prototype._i18n = i18n

import utils from './common/util.js'
Vue.prototype.$utils = utils;
import myRequest from '@/request.js'
Vue.prototype.$myRequest = myRequest

import wx from './common/weixin.js'
Vue.prototype.$wx = wx;


import {_get,_post,_put,_delete } from './common/http.js'
Vue.prototype.$_get = _get;
Vue.prototype.$_post = _post;
Vue.prototype.$_put = _put;
Vue.prototype.$_delete = _delete;

import {toast,handleTree,transformTime} from './common/api.js'
Vue.prototype.$toast = toast;
Vue.prototype.$handleTree = handleTree;
Vue.prototype.$transformTime = transformTime;


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	i18n,
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif