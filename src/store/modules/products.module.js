import axiosProducts from '@/axios/axios.products'
import { ElMessage, ElNotification } from 'element-plus'
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
    addProduct(state, payload) {
      state.products.push(payload)
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
    },
    async addProduct({commit}, payload) {
      try {
        commit('setLoadStatus', true)
        const { data } = await axiosProducts.post('/products', payload)
        commit('addProduct', payload)
        ElMessage({
          message: 'Позиция успешно добавлена!',
          type: 'success'
        });
        commit('setLoadStatus', false)
      } catch (e) {
        ElMessage({
          message: error(e),
          type: 'error'
        });
      }
    }
  },
  getters: {
    products: state => state.products,
    isLoading: state => state.loading
  }
}
