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
    removeProduct(state, id) {
      const idx = state.products.findIndex(product => product.id === id)
      state.products.splice(idx, 1)
    },
    setLoadStatus(state, status) {
      state.loading = status
    },
    editProduct(state, data) {
      const idx = state.products.findIndex(item => item.id === data.id)
      state.products[idx] = data
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
        })
        commit('setLoadStatus', false)
      } catch (e) {
        ElMessage({
          message: error(e),
          type: 'error'
        })
      }
    },
    async removeProduct({commit}, id) {
      try {
        commit('setLoadStatus', true)
        const { data } = await axiosProducts.delete(`/products/${id}`)
        commit('removeProduct', id)
        ElMessage({
          message: 'Позиция успешно удалена!',
          type: 'success'
        })
        commit('setLoadStatus', false)
      } catch (e) {
        ElMessage({
          message: error(e),
          type: 'error'
        })
      }
    },
    async editProduct({commit}, product) {
      try {
        commit('setLoadStatus', true)
        const { data } = await axiosProducts.patch(`/products/${product.id}`, product)
        commit('editProduct', product)
        ElMessage({
          message: 'Позиция успешно отредактирована!',
          type: 'success'
        })
        commit('setLoadStatus', false)
      } catch (e) {
        ElMessage({
          message: error(e),
          type: 'error'
        })
      }
    }
  },
  getters: {
    products: state => {
      return [
        ...state.products.filter(item => item.count > 0),
        ...state.products.filter(item => item.count === 0)
      ]
    },
    isLoading: state => state.loading
  }
}
