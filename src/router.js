import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home.vue'
import Mine from './views/mine.vue'
import Index from './views/index.vue'
import Classify from './views/classify.vue'
import Search from './views/search.vue'
import Car from './views/car.vue'
import Guide from './views/guide.vue'
import Login from './views/login.vue'
import Register from './views/register.vue'
import GoodsDetail from './views/goods-detail.vue'
import giveMoney from './views/give-money.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    { path: '/', redirect: { name: 'guide' } },
    { path: '/guide', component: Guide, name: 'guide' },
    {
      path: '/app',
      component: Index,
      name: 'app',
      children: [
        { path: 'home', component: Home, name: 'home' },
        {
          path: 'classify', component: Classify, name: 'classify'
        },
        { path: 'car', component: Car, name: 'car' },
        { path: 'mine', component: Mine, name: 'mine' },
      ]
    },
    { path: '/search', component: Search, name: 'search' },
    { path: '/login', component: Login, name: 'login' },
    { path: '/register', component: Register, name: 'register' },
    { path: '/goods-detail/:goodsid?', component: GoodsDetail, name: 'goods-detail' },
    { path: '/give-money', component: giveMoney, name: 'give-money' }
  ]
})
