import dbase from '@/axios/database'
import { ElMessage, ElNotification } from 'element-plus'
import { error } from '@/utils/error'
import { toLocalFormatData } from '@/utils/data'

export default {
  namespaced: true,
  state: {
    products: [],
    loading: false
  },
  getters: {
    products: state => {
      return [
        ...state.products.filter(item => item.count > 0),
        ...state.products.filter(item => item.count === 0)
      ]
    },
    isLoading: state => state.loading
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
    },
    subtractProductsToOrder(state, cart) {
      Object.keys(cart)
        .forEach(id => {
          const idx = state.products.findIndex(product => product.id === id)
          state.products[idx].count -= cart[id]
        })
    }
  },
  actions: {
    async getProductsFromServer({commit}) {
      try {
        commit('setLoadStatus', true)
        const { data } = await dbase.get('/products.json')
        commit('setProducts', toLocalFormatData(data))
        commit('setLoadStatus', false)
      } catch (e) {
        ElNotification.error({
          title: 'Ошибка при получении данных с сервера (продукты)',
          message: error(e)
        })
      }
    },

    async addProduct({commit}, payload) {
      try {
        commit('setLoadStatus', true)
        const { data } = await dbase.patch(`/products/${payload.id}.json`, {
          title: payload.title,
          img: payload.img,
          category: payload.category,
          price: payload.price,
          count: payload.count
        })
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
        const { data } = await dbase.delete(`/products/${id}.json`)
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

    async editProduct({commit}, payload) {
      try {
        commit('setLoadStatus', true)
        const { data } = await dbase.patch(`/products/${payload.id}.json`, {
          title: payload.title,
          img: payload.img,
          category: payload.category,
          price: payload.price,
          count: payload.count
        })
        commit('editProduct', payload)
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
    },

    async updateProducts({ state, commit }, cart) {
      try {
        commit('setLoadStatus', true)
        commit('subtractProductsToOrder', cart)
        const { data } = await dbase.put('/products.json', state.products)
        commit('setLoadStatus', false)
      } catch (e) {
        ElNotification.error({
          title: 'Ошибка при сохранении данных на сервер (продукты)',
          message: error(e)
        })
      }
    }
  }
}
