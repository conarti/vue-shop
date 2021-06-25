<template>
  <div class="product-recs">
    <AppProduct
      v-for="product in categoryProducts"
      :key="product.id"
      width="200px"
      height="300px"
      v-bind="product"
      :cart-count="cart[product.id]"
      @change-count="updateCartItem"
      @click="$router.push({ name: 'Product', params: { id: product.id } })"
    />
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import AppProduct from '@/components/ui/AppProduct'

export default {
  name: 'ProductRecommends',
  components: { AppProduct },
  props: {
    categoryProducts: Array
  },
  setup() {
    const store = useStore()
    const cart = computed(() => store.getters['cart/products'])

    const updateCartItem = (id, count) => {
      store.commit('cart/update', { id, count })
    }

    return {
      cart,
      updateCartItem
    }
  }
}
</script>

<style>
.product-recs {
  display: grid;
  justify-content: center;
  gap: 40px;
  grid-auto-flow: column;
}
</style>
