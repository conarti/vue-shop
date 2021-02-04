import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import Shop from '@/views/Shop'

const routes = [
  {
    path: '/',
    name: 'Shop',
    meta: {
      layout: 'main',
      auth: false
    },
    component: Shop
  },
  {
    path: '/auth',
    name: 'Auth',
    meta: {
      layout: 'auth',
      auth: false
    },
    component: () => import(/* webpackChunkName: "auth" */ '@/views/Auth.vue')
  },
  {
    path: '/product/:id',
    name: 'Product',
    meta: {
      layout: 'main',
      auth: false
    },
    component: () => import(/* webpackChunkName: "product" */ '@/views/Product')
  },
  {
    path: '/cart',
    name: 'Cart',
    meta: {
      layout: 'main',
      auth: false
    },
    component: () => import(/* webpackChunkName: "cart" */ '@/views/Cart')
  },
  {
    path: '/admin',
    name: 'Admin',
    meta: {
      layout: 'main',
      auth: true
    },
    component: () => import(/* webpackChunkName: "admin" */ '@/views/Admin')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  const requireAuth = to.meta.auth

  if (requireAuth && store.getters['auth/isAuthenticated']) {
    next()
  } else if (requireAuth && !store.getters['auth/isAuthenticated']) {
    next('/auth?message=auth')
  } else if (store.getters['auth/isAuthenticated'] && to.meta.layout === 'auth') {
    next('/admin?message=auth-exists')
  } else {
    next()
  }
})

export default router
