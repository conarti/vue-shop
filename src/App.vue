<template>
  <component :is="layout + '-layout'" v-if="layout" />
</template>

<script>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useDataLoader } from '@/use/data-loader'
import MainLayout from '@/layout/MainLayout'
import AuthLayout from '@/layout/AuthLayout'

export default {
  setup() {
    const route = useRoute()

    onMounted(async () => {
        await useDataLoader()
    })

    return {
      layout: computed(() => route.meta.layout)
    }
  },
  components: { MainLayout, AuthLayout }
}
</script>

