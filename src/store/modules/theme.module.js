const THEME_KEY = 'theme'

export default {
  namespaced: true,
  state() {
    return {
      theme: localStorage.getItem(THEME_KEY)
    }
  },
  mutations: {
    setTheme(state, theme) {
      state.theme = theme
      localStorage.setItem(THEME_KEY, theme)
      document.documentElement.dataset.theme = theme
    }
  },
  getters: {
    theme(state) {
      return state.theme
    },
    isTheme(state) {
      return !!state.theme
    }
  }
}
