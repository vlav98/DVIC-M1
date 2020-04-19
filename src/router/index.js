import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../components/Login'
import Register from '../components/Register'
import Dashboard from '../components/Dashboard'
import NewProject from '../views/projects/Create'
import NewClient from '../views/clients/Create'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/new-project',
    name: 'new-project',
    component: NewProject
  },
  {
    path: '/new-client',
    name: 'new-client',
    component: NewClient
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
