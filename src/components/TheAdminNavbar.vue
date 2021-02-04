<template>
  <nav class="navbar">
    <h3>Online Shop — Админ-панель</h3>

    <ul class="navbar-menu">
      <li>
        <a style="cursor: pointer" @click.prevent="logout">Выйти</a>
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
