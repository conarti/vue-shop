<template>
  <el-card>
    <el-empty description="Здесь пока ничего нет"></el-empty>
  </el-card>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
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
