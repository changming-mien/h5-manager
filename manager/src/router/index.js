import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
 const commonRoutes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../components/Login.vue')
    },
    {path: 'home', redirect: '/home'},
    {path: '/', redirect: '/login'},
    {path: 'information', redirect: '/information/new'},
    {path: 'marking', redirect: '/marking'},
] 

// 需要通过后台数据来生成的组件
export const asyncRoutes = {
    'home': {
        path: 'home',
        name: 'home',
        component: () => import('../views/Home.vue')
    },

    'password': {
        path: 'password',
        name: 'password',
        component: () => import('../views/Password.vue')
    },
    'information': {
        path: 'information',
        name: 'information',
        redirect: '/new',
        component: () => import('../views/Information.vue'),
        children:[
            {
                path: '/headLine',
                name: 'headLine',
                component: () => import('../views/information/Headline.vue')
            },{
                path: '/new',
                name: 'new',
                component: () => import('../views/information/New.vue')
            }
        ]
    },
    'marking': {
        path: 'marking',
        name: 'marking',
        component: () => import('../views/Marking')
    },
   
}

const createRouter = () => new Router({
    routes: commonRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher 
}

export default router