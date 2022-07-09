
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
//引入vuex
import store from './store'
//把vuex定义成全局组件
Vue.prototype.$store = store

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

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
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