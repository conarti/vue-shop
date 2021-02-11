<template>
    <el-card v-loading="isLoad" :style="isLoad ? 'height: 50vh' : ''">
      <template #header v-if="!isLoad">
        <h2 class="card-title">Все товары</h2>

        <el-divider></el-divider>

        <ShopFilter v-model="filter" />
      </template>
      <div class="products-list" v-if="!isLoad && products.length">
        <ShopProduct
          v-for="product in products"
          :key="product.id"
          v-bind="product"
          @update-cart-item="updateCartItem"
        />
      </div>
      <el-empty v-else-if="!isLoad && !products.length" description="Ничего нет"></el-empty>
    </el-card>
</template>

<script>
import ShopFilter from '@/components/shop/ShopFilter'
import ShopProduct from '@/components/shop/ShopProduct'
import { useStore } from 'vuex'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const CART_MODEL = {}

export default {
  name: 'Shop',
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    const filter = ref({})
    const products = computed(() => store.getters['products/products']
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

    watch(filter, value => {
      if (!value.search) delete value.search
      if (!value.category) delete value.category
      router.replace({ path: '/', query: value })
    })

    onMounted(() => {
      filter.value = route.query
    })

    const cartData = reactive(CART_MODEL)

    const updateCartItem = (count, id) => {
      if (!count) {
        delete cartData[id]
      } else {
        cartData[id] = count
      }
    }

    return {
      isLoad: computed(() => store.getters['products/isLoading']),
      products,
      filter,
      updateCartItem
    }
  },
  components: { ShopFilter, ShopProduct }
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
