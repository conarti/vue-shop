<template>
  <template v-if="canShowContent">
    <component :is="layout + '-layout'" v-if="layout" />
  </template>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import MainLayout from '@/layout/MainLayout'
import AuthLayout from '@/layout/AuthLayout'
import { useStore } from 'vuex'

export default {
  setup() {
    const route = useRoute()
    const store = useStore()

    const dataLoading = ref()
    const categories = computed(() => store.getters['categories/categories'])
    const products = computed(() => store.getters['products/products'])

    const canShowContent = computed(() =>
      !dataLoading.value &&
      categories.value &&
      products.value
    )

    onMounted(async () => {
      dataLoading.value = true
      if (!store.getters['categories/categories'].length) {
        await store.dispatch('categories/getCategoriesFromServer')
      }
      if (!store.getters['products/products'].length) {
        await store.dispatch('products/getProductsFromServer')
      }
      if (!store.getters['auth/users'].length) {
        await store.dispatch('auth/getUsers')
      }
      if (route.meta.auth === true) {
        await store.dispatch('order/getOrders')
        await store.dispatch('auth/getUsers')
      }
      dataLoading.value = false
    })

    return {
      layout: computed(() => route.meta.layout),
      canShowContent
    }
  },
  components: { MainLayout, AuthLayout }
}
</script>

