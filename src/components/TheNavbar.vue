<template>
  <nav class="navbar">
    <h1 class="navbar__header">
      <span class="navbar__title-logo">Ю</span>.Лавка
    </h1>
    <ul class="navbar-menu">
      <li>
        <router-link to="/">
          <i class="el-icon-s-shop"></i> Магазин
        </router-link>
      </li>
      <li style="margin-right: 5px">
        <el-popover
          placement="bottom"
          trigger="hover"
          :disabled="!isPopoverVisible"
          :width="300"
        >
          <template #reference>
            <router-link to="/cart">
              <i class="el-icon-s-goods"></i> Корзина
            </router-link>
          </template>

          <ul
            v-if="!isCartEmpty"
            class="navbar__cart-list"
          >
            <li class="navbar__cart-list-item navbar__cart-list-item--title">
              <span>Название:</span>
              <span>Количество:</span>
              <span>Сумма:</span>
            </li>
            <li
              v-for="product in cartProducts"
              class="navbar__cart-list-item"
            >
              <span style="min-width: 80px">{{ product.title }}</span>
              <span style="margin-left: auto;">{{ product.cartCount }} шт.</span>
              <span style="min-width: 105px; text-align: end">
                {{ sum(product.cartCount * product.price) }} руб.
              </span>
            </li>
            <li>
              <ElDivider />
            </li>
            <li class="navbar__cart-list-item navbar__cart-list-item--title">
              <span>Итого:</span>
              <span>{{ sum(cartSum) }} руб.</span>
            </li>
          </ul>

          <div
            class="popover__empty"
            v-else
          >
            <span>Добавьте первый товар...</span>
          </div>
        </el-popover>
      </li>
      <li style="margin-right: 1rem">
        <ElBadge
          v-if="cartCount"
          :value="cartCount"
          :max="99"
          type="primary"
          class="navbar__badge"
        />
      </li>
      <li v-if="isAuth">
        <a href="#" @click.prevent>
          <el-popover
            placement="bottom"
            trigger="hover"
            :width="200"
          >
            <template #reference>
              <i class="el-icon-user-solid"></i>
            </template>

            <div class="navbar__user-menu">
              <div class="navbar__user-menu-header">
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                <h2>{{ name }}</h2>
              </div>
              <el-link
                v-if="role === 'admin'"
                style="margin: 10px auto 5px;"
                type="primary"
                @click.prevent="$router.push({ name: 'Admin' })"
              >Администрирование</el-link>
              <div class="navbar__user-menu-btn-group">
                <el-link
                  @click.prevent
                >Заказы</el-link>
                <el-link
                  type="danger"
                  @click.prevent="logout"
                >Выйти</el-link>
              </div>
            </div>
          </el-popover>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { useStore } from 'vuex'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { sum } from '@/utils/formatter'

export default {
  name: 'TheNavbar',
  setup() {
    const store = useStore()
    const route = useRoute()

    const cart = computed(() => store.getters['cart/products'])

    const isCartEmpty = computed(() => !store.getters['cart/productsCount'])

    const isPopoverVisible = computed(() => route.path !== '/cart')

    const products = computed(() => store.getters['products/products'])

    const cartProducts = computed(() => Object.keys(cart.value)
      .map(key => ({
        ...products.value.find(product => product.id === key),
        cartCount: cart.value[key]
      })
      )
    )

    const cartSum = computed(() => {
      return cartProducts.value
        .reduce((acc, product) => acc + product.price * product.cartCount, 0)
    })

    const isAuth = computed(() => store.getters['auth/isAuthenticated'])
    const role = computed(() => store.getters['auth/role'])
    const name = computed(() => store.getters['auth/name'])

    const logout = () => store.commit('auth/logout')

    return {
      cartCount: computed(() => store.getters['cart/productsCount']),
      isPopoverVisible,
      cartProducts,
      isCartEmpty,
      cartSum,
      sum,
      isAuth,
      logout,
      role,
      name
    }
  }
}
</script>

<style>
.navbar__title-logo {
  color: #409EFF;
}
.navbar__header {
  color: #303133;
  font-size: 20px;
  font-weight: 500;
}
.navbar__badge {
  cursor: default;
}
.navbar__badge > sup {
  top: -0.1em;
}
.navbar__cart-list {
  padding: 1rem;
  margin: 0;
  list-style-type: none;
  font-weight: 500;
}
.navbar__cart-list-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0;
}
.navbar__cart-list-item--title {
  margin-bottom: 15px;
  font-weight: 600;
}
.popover__empty {
  font-weight: 500;
  text-align: center;
}
.navbar__btn {
  padding: 0!important;
}
.navbar__btn > span {
  margin: 0!important;
}
.navbar__user-menu {
  display: flex;
  flex-direction: column;
}
.navbar__user-menu-header > h2 {
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  margin: 0;
}
.navbar__user-menu-btn-group {
  margin-top: 5px;
  display: flex;
  justify-content: space-evenly;
}
.navbar__user-menu-header {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
</style>
