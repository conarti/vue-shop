<template>
  <component :is="layout + '-layout'" v-if="layout" />
</template>

<script>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import MainLayout from '@/layout/MainLayout'
import AuthLayout from '@/layout/AuthLayout'
import { useStore } from 'vuex'
import { ElNotification } from 'element-plus'
import { error } from '@/utils/error'

export default {
  setup() {
    const route = useRoute()
    const store = useStore()

    onMounted(async () => {
        await store.dispatch('products/getProductsFromServer')
        await store.dispatch('categories/getCategoriesFromServer')
    })

    return {
      layout: computed(() => route.meta.layout)
    }
  },
  components: { MainLayout, AuthLayout }
}
</script>

