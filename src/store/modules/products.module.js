import axiosProducts from '@/axios/axios.products'

export default {
  namespaced: true,
  state: {
    products: [],
    loading: false
  },
  mutations: {
    setProducts(state, payload) {
      state.products = payload
    },
    updateLoadStatus(state) {
      state.loading = !state.loading
    }
  },
  actions: {
    async getProductsFromServer({commit}) {
      try {
        commit('updateLoadStatus')
        const { data } = await axiosProducts.get('/products')
        commit('setProducts', data)
        commit('updateLoadStatus')
      } catch (e) {}
    }
  },
  getters: {
    getProducts: state => state.products,
    isLoading: state => state.loading
  }
}
