<template>
  <nav class="navbar">
    <h3>Online Shop</h3>

    <ul class="navbar-menu">
      <li>
        <router-link to="/">Магазин</router-link>
      </li>
      <li>
        <router-link to="/cart">Корзина</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'TheNavbar'
}
</script>