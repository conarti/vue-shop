import axiosProducts from '@/axios/axios.products'
import { ElMessage, ElNotification } from 'element-plus'
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
    },
    addCategory(state, payload) {
      state.categories.push(payload)
    },
    removeCategory(state, id) {
      const idx = state.categories.findIndex(category => category.id === id)
      state.categories.splice(idx, 1)
    },
    editCategory(state, data) {
      const idx = state.categories.findIndex(item => item.id === data.id)
      state.categories[idx] = data
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
    },
    async addCategory({commit}, payload) {
      try {
        commit('setLoadStatus', true)
        const { data } = await axiosProducts.post('/categories', payload)
        commit('addCategory', payload)
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
    async removeCategory({commit}, id) {
      try {
        commit('setLoadStatus', true)
        const { data } = await axiosProducts.delete(`/categories/${id}`)
        commit('removeCategory', id)
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
    async editCategory({commit}, category) {
      try {
        commit('setLoadStatus', true)
        const { data } = await axiosProducts.patch(`/categories/${category.id}`, category)
        commit('editCategory', category)
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
    categories: state => state.categories,
    isLoading: state => state.loading
  }
}
