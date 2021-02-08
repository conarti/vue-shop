import { createStore } from 'vuex'
import products from './modules/products.module'
import categories from './modules/categories.module'
import auth from './modules/auth.module'

export default createStore({
  state() {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    products, auth, categories
  }
})
