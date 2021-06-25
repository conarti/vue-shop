<template>
  <el-card
    v-loading="isLoad"
    :style="{height: isLoad ? '242px' : '', marginBottom: '1rem'}"
  >
    <ShopCarousel
      v-if="!isLoad && carouselProducts.length > 0"
      :carousel-products="carouselProducts"
    />
  </el-card>

  <el-card
    v-loading="isLoad"
    :style="isLoad ? 'height: 50vh' : ''"
  >
    <template #header v-if="!isLoad">
      <h2 class="card-title">Все товары</h2>

      <ElDivider />

      <ShopFilter v-model="filter" />
    </template>

    <div
      class="products-list"
      v-if="!isLoad && filteredProducts.length"
    >
      <AppProduct
        v-for="product in filteredProducts"
        :key="product.id"
        v-bind="product"
        :cart-count="cart[product.id]"
        @change-count="updateCartItem"
        @click="$router.push({ name: 'Product', params: { id: product.id } })"
      />
    </div>

    <ElEmpty
      v-else-if="!isLoad && !filteredProducts.length"
      description="Ничего нет"
    />
  </el-card>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { randomInteger } from '@/utils/math'
import ShopFilter from '@/components/ShopFilter'
import AppProduct from '@/components/ui/AppProduct'
import ShopCarousel from '@/components/ShopCarousel'

export default {
  name: 'Shop',
  components: { ShopFilter, AppProduct, ShopCarousel },
  setup() {
    document.title = 'Ю.Лавка | Магазин'

    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    const filter = ref({ search: '', category: '' })
    const products = computed(() => store.getters['products/products'])
    const filteredProducts = computed(() => products.value
      .filter(product => {
        if (filter.value.search) {
          return product.title.toLowerCase().includes(filter.value.search.toLowerCase())
        }
        return product
      })
      .filter(product => {
        if (filter.value.category) {
          return filter.value.category === product.category
        }
        return product
      })
    )

    const cart = computed(() => store.getters['cart/products'])

    watch(filter, value => {
      if (!value.search) delete value.search
      if (!value.category) delete value.category
      router.replace({ path: '/', query: value })
    })

    onMounted(() => {
      filter.value = route.query
    })

    const updateCartItem = (id, count) => {
      store.commit('cart/update', { id, count })
    }


    const carouselProducts = computed(() => products.value
      .slice()
      .sort(() => .5 - Math.random())
      .slice(0, 5))

    return {
      isLoad: computed(() => store.getters['products/isLoading']),
      products,
      filteredProducts,
      filter,
      updateCartItem,
      cart,
      carouselProducts
    }
  }
}
</script>

<style scoped>
.products-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  justify-items: center;
  place-content: center;
  gap: 20px;
}
</style>
