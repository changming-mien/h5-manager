import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import iView from 'iview'
import elementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import qs from 'qs'
import 'iview/dist/styles/iview.css'
import './permission'
import {get , post , login,post2} from './views/Marking/request';

Vue.prototype.$login = login;
Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.prototype.$post2 = post2;
Vue.config.productionTip = false
Vue.prototype.$qs=qs
Vue.use(iView)
Vue.use(elementUi)

// 设置基础URL
axios.defaults.baseURL = '/service'

// 设置请求超时时间
axios.defaults.timeout = 5000
Vue.prototype.$axios = axios
axios.defaults.withCredentials = true
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})