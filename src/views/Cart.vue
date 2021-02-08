<template>
  <el-card v-loading="isLoad" :style="isLoad ? 'height: 50vh' : ''">
    <template #header v-if="!isLoad">
      <h2 class="card-title">Корзина</h2>
    </template>

    <el-empty v-if="!tableItems.length && !isLoad" description="В корзине пока ничего нет"></el-empty>
    <template v-else-if="tableItems.length && !isLoad">
      <AppCartTable
        :table-items="tableItems"
        @count-change="updateCartItem"
      />

      <p class="text-right mb-10"><strong>Всего: {{ endSum }} руб.</strong></p>

      <div class="flex-end">
        <el-button
          type="primary"
        >Оплатить</el-button>
      </div>
    </template>
  </el-card>
</template>

<script>
import AppCartTable from '@/components/CartList'
import { useStore } from 'vuex'
import { computed, onMounted, reactive } from 'vue'
import { sum } from '@/utils/formatter'

// id: count
const CART_MODEL = {
  '2': 3,
  '8': 23,
  '7': 38,
  '6': 5,
  '5': 1
}

export default {
  setup() {
    const store = useStore()

    const products = computed(() => store.getters['products/products'])
    const cartData = reactive(CART_MODEL)

    const tableItems = computed(() => {
      return Object.keys(cartData)
        .map(id => {
          return {
            ...products.value.find(item => item.id === id),
            cartCount: cartData[id]
          }
        })
    })

    const endSum = computed(() => {
      return sum(tableItems.value.reduce((total, item) => total + item.cartCount * item.price, 0))
    })

    const updateCartItem = (count, id) => {
      if (!count) {
        delete cartData[id]
      } else {
        cartData[id] = count
      }
    }

    return {
      tableItems,
      endSum,
      updateCartItem,
      isLoad: computed(() => store.getters['products/isLoading'])
    }
  },
  components: { AppCartTable }
}
</script>
