const LOCALSTORAGE_KEY = 'cart-products'

export default {
  namespaced: true,
  state() {
    return {
      products: JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) ?? {}
    }
  },
  getters: {
    products: state => state.products,
    productsCount: state => {
      return Object.keys(state.products)
        .reduce((acc, key) => acc + state.products[key], 0)
    },
    orderList: (state, _, __, rootGetters) => {
      const products = rootGetters['products/products']
      return Object.keys(state.products)
        .map(id => {
          const product = products.find(p => p.id === id)
          return {
            name: product.title,
            count: state.products[id],
            price: product.price,
            productId: id
          }
        })
    }
  },
  mutations: {
    update(state, { id, count }) {
      if (!count) {
        delete state.products[id]
      } else {
        state.products[id] = count
      }
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(state.products))
    },
    clear(state) {
      state.products = {}
      localStorage.removeItem(LOCALSTORAGE_KEY)
    }
  },
  actions: {

  }
}
