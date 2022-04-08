import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ProfileCoin from '../views/ProfileCoin.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/profilecoin/:id',
    name: 'ProfileCoin',
    component: ProfileCoin,
    props: true
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior () {
    return {left: 0, top: 0};
  }
})

export default router
