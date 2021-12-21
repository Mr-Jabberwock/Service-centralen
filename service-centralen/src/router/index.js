import Vue from 'vue'
import VueRouter from 'vue-router'
import Companies from '../views/Companies.vue'
import Overview from '../views/Overview.vue'
import Offers from '../views/Offers.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Companies',
    component: Companies
  },
  {
    path: '/statistics',
    name: 'Statistics',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Statistics')
  },
  {
    path: '/overview',
    name: 'Overview',
    component: Overview
  },
  {
    path: '/offers',
    name: 'Offers',
    component: Offers
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
