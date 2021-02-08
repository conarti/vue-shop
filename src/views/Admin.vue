<template>
  <router-view></router-view>
</template>

<script>
import { useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'

export default {
  name: 'Admin',
  setup() {
    const route = useRoute()
    if (route.query?.message === 'auth-exists') {
      ElNotification({
        title: 'Вы были перенаправлены',
        message: 'Вы уже авторизованы',
        type: 'info'
      })
    }
  }
}
</script>
