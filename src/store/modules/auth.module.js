import axios from 'axios'
import { error } from '@/utils/error'
import { ElNotification } from 'element-plus'

const TOKEN_KEY = 'jwt-token'

export default {
  namespaced: true,
  state() {
    return {
      token: localStorage.getItem(TOKEN_KEY)
    }
  },
  getters: {
    token: state => state.token,
    isAuthenticated: (_, getters) => !!getters.token,
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem(TOKEN_KEY, token)
    },
    logout(state) {
      state.token = null
      localStorage.removeItem(TOKEN_KEY)
    }
  },
  actions: {
    async login({ commit }, payload) {
      try {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_API_KEY}`
        const { data } = await axios.post(url, { ...payload, returnSecureToken: true })
        commit('setToken', data.idToken)
      } catch (e) {
        ElNotification.error({
          title: 'Ошибка авторизации',
          message: error(e.response.data.error.message),
          showClose: false
        })
        // console.log(error(e.response.data.error.message))
        throw new Error(e)
      }
    }
  }
}
