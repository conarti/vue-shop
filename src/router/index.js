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
    component: () => import('@/views/Auth.vue')
  },
  {
    path: '/product/:id',
    name: 'Product',
    meta: {
      layout: 'main',
      auth: false
    },
    component: () => import('@/views/Product')
  },
  {
    path: '/cart',
    name: 'Cart',
    meta: {
      layout: 'main',
      auth: false
    },
    component: () => import('@/views/Cart')
  },
  {
    path: '/admin',
    name: 'Admin',
    redirect: '/admin/products',
    meta: {
      layout: 'main',
      auth: true
    },
    component: () => import('@/views/Admin'),
    children: [
      {
        path: 'products',
        name: 'Products',
        component: () => import('@/views/AdminProducts')
      },
      {
        path: 'categories',
        name: 'Categories',
        component: () => import('@/views/AdminCategories')
      },
      {
        path: 'orders',
        name: 'AdminOrders',
        component: () => import('@/views/AdminOrders')
      },
      {
        path: '/admin/products/:id',
        name: 'AdminProduct',
        component: () => import('@/views/AdminProduct')
      },
      {
        path: '/admin/categories/:id',
        name: 'Category',
        component: () => import('@/views/AdminCategory')
      },
      {
        path: '/admin/orders/:id',
        name: 'AdminOrder',
        component: () => import('@/views/AdminOrder')
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
