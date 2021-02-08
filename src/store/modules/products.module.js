import axiosProducts from '@/axios/axios.products'
import { ElNotification } from 'element-plus'
import { error } from '@/utils/error'

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
    setLoadStatus(state, status) {
      state.loading = status
    }
  },
  actions: {
    async getProductsFromServer({commit}) {
      try {
        commit('setLoadStatus', true)
        const { data } = await axiosProducts.get('/products')
        commit('setProducts', data)
        commit('setLoadStatus', false)
      } catch (e) {
        ElNotification.error({
          title: 'Ошибка при получении данных с сервера (продукты)',
          message: error(e),
          showClose: false
        })
      }
    }
  },
  getters: {
    products: state => state.products,
    isLoading: state => state.loading
  }
}
