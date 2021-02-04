import { useStore } from 'vuex'
import { computed, ref, watch, onMounted } from 'vue'

// id: count
const CART_MODEL = {
  '2': 3,
  '4': 23,
  '7': 38,
  '20': 9,
  '6': 5,
  '5': 1
}

export function useCart() {
  const store = useStore()

  onMounted(async () => {
    await store.dispatch('products/getProductsFromServer')
    updateCartData()
  })

  const products = computed(() => store.getters['products/getProducts'])

  const tableItems = ref([])

  function updateCartData() {
    const result = []
    const neededIds = Object.keys(CART_MODEL)
    neededIds.forEach(id => {
      const filteredByID = products.value.filter(product => product.id === id)
      filteredByID.forEach(item => {
        item.count = CART_MODEL[id]
      })
      result.push(...filteredByID)
    })
    tableItems.value = result
  }

  const endSum = computed(() => {
    let result = 0
    tableItems.value.forEach(item => {
      result += item.count * item.price
    })
    return result
  })

  const countChange = (val, id) => {
    if (!val) {
      delete CART_MODEL[id]
    } else {
      CART_MODEL[id] = val
    }
    updateCartData()
  }

  return {
    tableItems,
    endSum,
    countChange,
    isLoad: computed(() => store.getters['products/isLoading'])
  }
}
