import axios from 'axios'
import dbase from '@/axios/database'
import { error } from '@/utils/error'
import { ElNotification } from 'element-plus'
import { toLocalFormatData } from '@/utils/data'

const TOKEN_KEY = 'jwt-token'
const ID_KEY = 'localId'

export default {
  namespaced: true,
  state () {
    return {
      users: [],
      localId: localStorage.getItem(ID_KEY),
      token: '',
      role: 'guest',
      name: ''
      // для отладки
      // token: localStorage.getItem(TOKEN_KEY),
      // role: 'admin',
    }
  },
  getters: {
    token: state => state.token,
    isAuthenticated: (_, getters) => !!getters.token,
    localId: state => state.localId,
    users: state => state.users,
    name: state => state.name,
    role: state => state.role
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      localStorage.setItem(TOKEN_KEY, token)
    },
    logout (state) {
      state.token = null
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(ID_KEY)
    },
    setUsers (state, users) {
      state.users = users
    },
    setLocalId (state, localId) {
      state.localId = localId
      localStorage.setItem(ID_KEY, localId)
    },
    setRole (state, role) {
      state.role = role
    },
    setName (state, name) {
      state.name = name
    },
    addUser (state, user) {
      state.users.push(user)
    }
  },
  actions: {
    async login ({ commit, dispatch, getters }, payload) {
      try {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_API_KEY}`
        const { data } = await axios.post(url, { ...payload, returnSecureToken: true })
        commit('setToken', data.idToken)
        commit('setLocalId', data.localId)
        await dispatch('getUsers')
        const user = getters['users'].find(user => user.id === data.localId)
        commit('setRole', user.role)
        commit('setName', user.name)
      } catch (e) {
        ElNotification.error({
          title: 'Ошибка авторизации',
          message: error(e.response.data.error.message),
        })
        throw new Error(e)
      }
    },
    async registration ({ commit, dispatch }, payload) {
      try {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_FB_API_KEY}`
        const { data } = await axios.post(url, {
          email: payload.email,
          password: payload.password,
          returnSecureToken: true
        })
        commit('setToken', data.idToken)
        commit('setLocalId', data.localId)
        await dispatch('addUser', payload.name)
        commit('addUser', {
          id: data.localId,
          role: 'user',
          name: payload.name
        })
        commit('setRole', 'user')
        commit('setName', payload.name)
      } catch (e) {
        ElNotification.error({
          title: 'Ошибка авторизации',
          message: error(e.response.data.error.message),
        })
        throw new Error(e)
      }
    },
    async getUsers ({ commit, getters }) {
      try {
        const { data } = await dbase.get('/users.json')
        if (data) {
          commit('setUsers', toLocalFormatData(data))
          if (getters['isAuthenticated']) {
            const role = getters['users'].find(user => user.id === getters['localId']).role
            commit('setRole', role)
          }
        }
      } catch (e) {
        ElNotification.error({
          title: 'Ошибка получения данных пользователей',
          message: error(e.response.data.error.message),
        })
        throw new Error(e)
      }
    },
    async addUser ({ getters }, name) {
      try {
        const { data } = await dbase.patch(`/users/${getters['localId']}.json`, {
          role: 'user',
          name
        })
      } catch (e) {
        ElNotification.error({
          title: 'Ошибка записи пользователя',
          message: error(e.response.data.error.message),
        })
        throw new Error(e)
      }
    }
  }
}
