import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login')
  },
  {
    path: '/upbar',
    name: 'UpBar',
    component: () => import('../views/UpBar')
  },
  {
    path: '/psw',
    name: 'Psw',
    component: () => import('../views/Psw')
  },
  {
    path: '/leftbar',
    name: 'LeftBar',
    component: () => import('../views/LeftBar')
  },
  {
    path: '/dishesmng',
    name: 'DishesMng',
    component: () => import('../views/DishesMng')
  },
  {
    path: '/ordermng',
    name: 'OrderMng',
    component: () => import('../views/OrderMng')
  },
  {
    path: '/noticemng',
    name: 'NoticeMng',
    component: () => import('../views/NoticeMng')
  },
  {
    path: '/datamng',
    name: 'DataMng',
    component: () => import('../views/DataMng')
  },
  {
    path: '/editdishes',
    name: 'EditDishes',
    component: () => import('../views/EditDishes')
  },
  {
    path: '/adddishes',
    name: 'AddDishes',
    component: () => import('../views/AddDishes')
  },
  {
    path: '/echarts',
    name: 'Echarts',
    component: () => import('../views/Echarts')
  },
  {
    path: '/customermng',
    name: 'CustomerMng',
    component: () => import('../views/CustomerMng')
  },
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch((err) => err)
}

export default router
