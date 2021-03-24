<template>
  <component
    v-if="canShowContent && layout"
    :is="layout + '-layout'"
  />
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { ElLoading } from 'element-plus';
import MainLayout from '@/layout/MainLayout'
import AuthLayout from '@/layout/AuthLayout'

export default {
  setup() {
    const route = useRoute()
    const store = useStore()

    const dataLoading = ref()
    const categories = computed(() => store.getters['categories/categories'])
    const products = computed(() => store.getters['products/products'])
    const users = computed(() => store.getters['auth/users'])

    const canShowContent = computed(() =>
      !dataLoading.value &&
      categories.value &&
      products.value
    )

    onMounted(async () => {
      dataLoading.value = true
      if (!categories.value.length) {
        await store.dispatch('categories/getCategoriesFromServer')
      }
      if (!products.value.length) {
        await store.dispatch('products/getProductsFromServer')
      }
      if (!users.value.length) {
        await store.dispatch('auth/getUsers')
      }
      dataLoading.value = false
    })

    let loading
    watch(dataLoading, status => {
      if (status) {
        loading = ElLoading.service({ fullscreen: true })
      } else {
        loading.close()
      }
    })

    return {
      layout: computed(() => route.meta.layout),
      canShowContent,
      dataLoading
    }
  },
  components: { MainLayout, AuthLayout }
}
</script>

