import dbase from '@/axios/database'
import { ElMessage, ElNotification } from 'element-plus'
import { error } from '@/utils/error'
import { toLocalFormatData } from '@/utils/data'

export default {
  namespaced: true,
  state: {
    categories: [],
    loading: false
  },
  getters: {
    categories: state => state.categories,
    isLoading: state => state.loading
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
    async getCategoriesFromServer({commit, getters}) {
      try {
        commit('setLoadStatus', true)
        // const { data } = await axiosProducts.get('/categories')
        const { data } = await dbase.get('/categories.json')
        commit('setCategories', toLocalFormatData(data))
        commit('setLoadStatus', false)
      } catch (e) {
        ElNotification.error({
          title: 'Ошибка при получении данных с сервера (категории)',
          message: error(e)
        })
      }
    },

    async addCategory({commit}, payload) {
      try {
        commit('setLoadStatus', true)
        const { data } = await dbase.put(`/categories/${payload.id}.json`, {
          title: payload.title,
          type: payload.type
        })
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
        // const { data } = await axiosProducts.delete(`/categories/${id}`)
        const { data } = await dbase.delete(`/categories/${id}.json`)
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

    async editCategory({commit}, payload) {
      try {
        commit('setLoadStatus', true)
        const { data } = await dbase.patch(`/categories/${payload.id}.json`, {
          title: payload.title,
          type: payload.type
        })
        commit('editCategory', payload)
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
  }
}
