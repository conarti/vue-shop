<template>
  <nav class="navbar">
    <h1>Online Shop — Админ-панель</h1>

    <ul class="navbar-menu">
      <li>
        <router-link to="products"><i class="el-icon-s-shop"></i> Продукты</router-link>
      </li>
      <li>
        <router-link to="categories"><i class="el-icon-s-goods"></i> Категории</router-link>
      </li>
      <li>
        <a style="cursor: pointer;" @click.prevent="logout">Выйти</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'TheAdminNavbar',
  setup() {
    const store = useStore()
    const router = useRouter()

    return {
      logout: () => {
        store.commit('auth/logout')
        router.push('/auth')
      }
    }
  }
}
</script>

<style scoped>
h1 {
  color: #303133;
  font-size: 20px;
  font-weight: 500;
}
</style>
