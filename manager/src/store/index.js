import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		// 左侧菜单栏数据
		menuItems: [{
				name: 'home', // 要跳转的路由名称 不是路径
				size: 18, // icon大小
				type: 'md-home', // icon类型
				text: '产品信息', // 文本内容
			},
			{
				name: 'information', // 要跳转的路由名称 不是路径
				size: 18, // icon大小
				type: 'md-home', // icon类型
				text: '资讯管理', // 文本内容
			},
			{
				name: 'marking', // 要跳转的路由名称 不是路径
				size: 18, // icon大小
				type: 'md-home', // icon类型
				text: '营销活动管理', // 文本内容
			}
			
		],
	},
	mutations: {
		setMenus(state, items) {
			state.menuItems = [...items]
		},
	}
})

export default store
