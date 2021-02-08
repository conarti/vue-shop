import axiosProducts from '@/axios/axios.products'
import { ElNotification } from 'element-plus'
import { error } from '@/utils/error'

export default {
  namespaced: true,
  state: {
    categories: [],
    loading: false
  },
  mutations: {
    setCategories(state, payload) {
      state.categories = payload
    },
    setLoadStatus(state, status) {
      state.loading = status
    }
  },
  actions: {
    async getCategoriesFromServer({commit}) {
      try {
        commit('setLoadStatus', true)
        const { data } = await axiosProducts.get('/categories')
        commit('setCategories', data)
        commit('setLoadStatus', false)
      } catch (e) {
        ElNotification.error({
          title: 'Ошибка при получении данных с сервера (категории)',
          message: error(e),
          showClose: false
        })
      }
    }
  },
  getters: {
    categories: state => state.categories,
    isLoading: state => state.loading
  }
}
