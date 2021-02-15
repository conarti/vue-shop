import { createStore, createLogger } from 'vuex'
import products from './products.module'
import categories from './categories.module'
import auth from './auth.module'
import cart from './cart.module'
import order from './order.module'

export default createStore({
  state() {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    products,
    auth,
    categories,
    cart,
    order
  },
  // plugins: [createLogger()]
})
