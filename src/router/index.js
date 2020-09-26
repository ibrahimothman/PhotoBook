import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignUp from '../views/SignUp.vue'
import Login from '../components/Login.vue'
import Albums from '../views/Albums.vue'
import Album from '../views/Album.vue'
import { Auth } from 'aws-amplify'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/albums',
    name: 'Albums',
    component: Albums,
    meta: { requiresAuth: true }
  },
  {
    path: '/albums/:id',
    name: 'Album',
    component: Album,
    meta: { requiresAuth: true }
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async(to, from, next) => {
  const requiresAuth = to.matched.some(route => route.meta.requiresAuth);
  const isAuthenticated = await Auth.currentUserInfo();

  if (requiresAuth && !isAuthenticated) {
    return next('/');
  }
  return next();
})

export default router
