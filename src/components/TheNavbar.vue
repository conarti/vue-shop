<template>
  <nav class="navbar">
    <h1>Online Shop</h1>

    <ul class="navbar-menu">
      <li>
        <router-link to="/"><i class="el-icon-s-shop"></i> Магазин</router-link>
      </li>
      <li>
        <router-link to="/cart"><i class="el-icon-s-goods"></i> Корзина</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'TheNavbar'
}
</script>

<style scoped>
  h1 {
    color: #303133;
    font-size: 20px;
    font-weight: 500;
  }
</style>
