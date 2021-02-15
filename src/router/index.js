import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import Shop from '@/views/Shop'

let routes
routes = [
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
    redirect: '/admin/products',
    meta: {
      layout: 'main',
      auth: true
    },
    component: () => import(/* webpackChunkName: "admin" */ '@/views/Admin'),
    children: [
      //FIXME Исправить name
      {
        path: 'products',
        name: 'Products',
        component: () => import(/* webpackChunkName: "products" */ '@/views/AdminProducts')
      },
      {
        path: 'categories',
        name: 'Categories',
        component: () => import(/* webpackChunkName: "categories" */ '@/views/AdminCategories')
      },
      {
        path: 'orders',
        name: 'AdminOrders',
        component: () => import(/* webpackChunkName: "products" */ '@/views/AdminOrders')
      },
      {
        path: '/admin/products/:id',
        name: 'AdminProduct',
        component: () => import(/* webpackChunkName: "product" */ '@/views/AdminProduct')
      },
      {
        path: '/admin/categories/:id',
        name: 'Category',
        component: () => import(/* webpackChunkName: "category" */ '@/views/AdminCategory')
      },
      {
        path: '/admin/orders/:id',
        name: 'AdminOrder',
        component: () => import(/* webpackChunkName: "category" */ '@/views/AdminOrder')
      }
    ]
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
  scrollBehavior(to, from, savedProsition) {
    if (to.name === 'Products' && from.name === 'Products') {
      return savedProsition
    } else if (from.name === 'Product' && to.name === 'Product') {
      return {
        top: 0,
        behavior: 'smooth'
      }
    } else {
      return {
        top: 0
      }
    }
  }
})

router.beforeEach( (to, from, next) => {
  const requireAuth = to.meta.auth

  if (requireAuth && store.getters['auth/isAuthenticated']) {
    next()
  } else if (requireAuth && !store.getters['auth/isAuthenticated']) {
    next('/auth?message=access-denied')
  } else if (store.getters['auth/isAuthenticated'] && to.meta.layout === 'auth') {
    next('/admin?message=auth-exists')
  } else {
    next()
  }
})

export default router
