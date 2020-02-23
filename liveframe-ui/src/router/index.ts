import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/window',
    name: 'window',
    component: () => import(/* webpackChunkName: "window" */ '../views/Window.vue')
  },
  {
    path: '/photo',
    name: 'photo',
    component: () => import(/* webpackChunkName: "photo" */ '../views/Photo.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
