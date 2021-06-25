<template>
  <el-card
    v-loading="isLoad"
    :style="isLoad ? 'height: 50vh' : ''"
  >
    <template #header v-if="!isLoad">
      <h2 class="card-title">Корзина</h2>
    </template>

    <template v-if="cartItems.length && !isLoad">
      <CartList
        :products="cartItems"
        @count-change="updateCartItem"
      />

      <p class="text-right mb-10">
        <strong>Всего: {{ endSum }} руб.</strong>
      </p>

      <div class="flex-end">
        <el-button
          type="primary"
          @click="pay"
        >Оформить заказ</el-button>
      </div>
    </template>

    <ElEmpty
      v-else-if="!cartItems.length && !isLoad"
      description="В корзине пока ничего нет"
    />
  </el-card>

  <CartAuthModal
    :visible="authModal"
    @close="authModal = false"
    @logged-in="authModal = false; pay()"
  />
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { sum } from '@/utils/formatter'
import CartList from '@/components/CartList'
import CartAuthModal from '@/components/CartAuthModal'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

export default {
  name: 'Cart',
  components: { CartList, CartAuthModal },
  setup() {
    document.title = 'Ю.Лавка | Корзина'

    const store = useStore()
    const router = useRouter()

    const products = computed(() => store.getters['products/products'])
    const cart = computed(() => store.getters['cart/products'])

    const cartItems = computed(() => {
      return Object.keys(cart.value)
        .map(id => {
          return {
            ...products.value.find(item => item.id === id),
            cartCount: cart.value[id]
          }
        })
    })

    const updateCartItem = (id, count) => {
      store.commit('cart/update', { id, count })
    }

    const endSum = computed(() => {
      return sum(cartItems.value.reduce((total, item) => total + item.cartCount * item.price, 0))
    })

    const authModal = ref(false)
    const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])

    const pay = async () => {
      if (isAuthenticated.value) {
        try {
          //TODO: at this moment pay-plugin will open
          await store.dispatch('order/addOrder')
          router.push('/')
          // create order + calc products from store (count)
        } catch (e) {}
      } else {
        authModal.value = true
      }
    }

    return {
      cartItems,
      endSum,
      updateCartItem,
      isLoad: computed(() => store.getters['products/isLoading']),
      authModal,
      pay
    }
  }
}
</script>
