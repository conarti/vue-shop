import dbase from '@/axios/database'
import { ElMessage, ElNotification } from 'element-plus'
import { error } from '@/utils/error'
import { toLocalFormatData } from '@/utils/data'

export default {
  namespaced: true,
  state: {
    orders: [],
    loading: false
  },
  getters: {
    orders: state => state.orders,
    isLoading: state => state.loading
  },
  mutations: {
    setLoadStatus(state, status) {
      state.loading = status
    },
    setOrders(state, orders) {
      state.orders = orders
    },
    addOrder(state, order) {
      state.orders.push({ ...order, id: state.orders.length })
    },
    removeOrder(state, id) {
      const idx = state.orders.findIndex(order => order.id === id)
      state.orders.splice(idx, 1)
    }
  },
  actions: {
    async getOrders({ commit }) {
      try {
        commit('setLoadStatus', true)
        const { data } = await dbase.get('/orders.json')
        if (data) {
          commit('setOrders', toLocalFormatData(data))
        }
        commit('setLoadStatus', false)
      } catch (e) {
        ElNotification.error({
          title: 'Ошибка при получении данных с сервера (заказы)',
          message: error(e)
        })
      }
    },

    async addOrder({ commit, dispatch, getters, rootGetters }, payload) {
      try {
        commit('setLoadStatus', true)
        const { data } = await dbase.post(`/orders.json`, {
          date: Date.now(),
          userId: rootGetters['auth/localId'],
          list: rootGetters['cart/orderList']
        })
        commit('addOrder', payload)
        await dispatch('products/updateProducts', rootGetters['cart/products'], { root: true })
        commit('cart/clear', payload, { root: true })
        ElMessage({
          message: 'Заказ успешно добавлен!',
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

    async removeOrder({commit}, id) {
      try {
        commit('setLoadStatus', true)
        const { data } = await dbase.delete(`/orders/${id}.json`)
        commit('removeOrder', id)
        ElMessage({
          message: 'Заказ успешно удален!',
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

    // async editCategory({commit}, payload) {
    //   try {
    //     commit('setLoadStatus', true)
    //     const { data } = await dbase.patch(`/categories/${payload.id}.json`, {
    //       title: payload.title,
    //       type: payload.type
    //     })
    //     commit('editCategory', payload)
    //     ElMessage({
    //       message: 'Позиция успешно отредактирована!',
    //       type: 'success'
    //     })
    //     commit('setLoadStatus', false)
    //   } catch (e) {
    //     ElMessage({
    //       message: error(e),
    //       type: 'error'
    //     })
    //   }
    // }
  }
}
