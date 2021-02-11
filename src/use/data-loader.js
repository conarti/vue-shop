import { useStore } from 'vuex'

export async function useDataLoader() {
  const store = useStore()

  if (!store.getters['categories/categories'].length) {
    await store.dispatch('categories/getCategoriesFromServer')
  }
  if (!store.getters['products/products'].length) {
    await store.dispatch('products/getProductsFromServer')
  }
}
