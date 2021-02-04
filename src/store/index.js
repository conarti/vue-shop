import { createStore } from 'vuex'
import theme from './modules/theme.module'
import products from './modules/products.module'
import auth from './modules/auth.module'

export default createStore({
  state() {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    theme, products, auth
  }
})
