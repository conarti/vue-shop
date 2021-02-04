<template>
  <el-header>
    <component :is="isNeedAuth ? 'the-admin-navbar' : 'the-navbar'"></component>
  </el-header>
  <el-container>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
import TheNavbar from '@/components/TheNavbar'
import TheAdminNavbar from '@/components/TheAdminNavbar'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

export default {
  name: 'MainLayout',
  setup() {
    const route = useRoute()
    const isNeedAuth = computed(() => route.meta.auth)

    return { isNeedAuth }
  },
  components: { TheNavbar, TheAdminNavbar }
}
</script>
