<template>
  <div
    v-if="!isLoading"
    v-loading.fullscreen.lock="isLoading"
    class="card product-card product-page"
  >
    <el-breadcrumb
      class="product-card__bcrumb"
      separator-class="el-icon-arrow-right"
    >
      <el-breadcrumb-item :to="{ path: '/' }">магазин</el-breadcrumb-item>
      <el-breadcrumb-item>{{ currentProduct.title.toLowerCase() }}</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="product-card__img-wrap">
      <img
        class="product-card__img"
        :src="currentProduct.img"
        alt="product"
      >
    </div>

    <h4 class="product-card__category">{{ currentCategoryName }}</h4>

    <h1 class="product-card__title">{{ currentProduct.title }}</h1>

    <div class="product-card__descr">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad consequatur dolor doloremque, et ex labore laborum necessitatibus quisquam recusandae similique.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex fuga quaerat saepe vel.
      </p>

    </div>

    <div class="product-card__pay">
      <h4 class="product-card__price">{{ sum(currentProduct.price) }} руб.</h4>

      <el-button
        v-if="currentProduct.cartCount === 0"
        type="primary"
        class="product-card__btn"
        icon="el-icon-goods"
        :disabled="!currentProduct.count"
        @click="updateCartProduct(1)"
      >
        В корзину
      </el-button>

      <ElInputNumber
        v-if="currentProduct.cartCount > 0"
        v-model="inputCount"
        class="product-card__btn"
        size="small"
        :min="0"
        :max="currentProduct.count"
        @change="updateCartProduct"
      />
    </div>
  </div>

  <div
    v-if="categoryProducts.length"
    class="product-card product-card--recs"
  >
    <h1 class="product-card__title product-card__title--recommended">
      Похожие товары
    </h1>

    <ProductRecommends :category-products="categoryProducts" />
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { computed, onMounted, ref, watch } from 'vue'
import { sum } from '@/utils/formatter'
import ProductRecommends from '@/components/ProductRecommends'

export default {
  name: 'Product',
  components: { ProductRecommends },
  setup() {
    const route = useRoute()
    const store = useStore()
    const products = computed(() => store.getters['products/products'])
    const categories = computed(() => store.getters['categories/categories'])
    const cart = computed(() => store.getters['cart/products'])
    const isLoading = ref(false)

    const id = computed(() => route.params.id)

    const currentProduct = computed(() => {
      return products.value.find(product => product.id === id.value)
    })

    const cartCount = computed(() => cart.value[id.value] ? cart.value[id.value] : 0)

    const inputCount = ref(cartCount.value)

    const currentCategoryName = computed(
      () => categories.value
        .find(category => category.type === currentProduct.value.category)
        .title.toLowerCase()
    )

    const updateCartProduct = (custom) => {
      if (custom) inputCount.value = custom
      store.commit('cart/update', { id: id.value, count: custom ? custom : inputCount.value })
    }

    const alreadyAtCart = ref({ ...cart.value })

    watch(id, () => alreadyAtCart.value = { ...cart.value })

    const categoryProducts = computed(() => products.value
          .filter(product => product.category === currentProduct.value.category &&
            product.id !== id.value &&
            product.count > 0 &&
            !alreadyAtCart.value[product.id]
          )
          .splice(0, 4)
    )

    return {
      currentProduct,
      isLoading,
      sum,
      currentCategoryName,
      inputCount,
      updateCartProduct,
      categoryProducts,
      products
    }
  }
}
</script>

<style>
.product-card {
  overflow: hidden;
  padding: 2rem 3rem;
  margin-bottom: 1rem;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: #303133;
  background-color: #fff;
}
.product-card--recs {

}
.product-page {
  display: grid;
  grid-template-areas:
    'bcrumb bcrumb bcrumb'
    'img category category'
    'img title title'
    'img descr descr'
    'img pay pay';
  text-align: end;
  /*justify-items: end;*/
  align-items: center;
  column-gap: 50px;
}
.product-card__bcrumb {
  grid-area: bcrumb;
  margin-bottom: 1rem;
}
.product-card__img-wrap {
  grid-area: img;
}
.product-card__img {
  max-width: 400px;
  height: auto;
  border-radius: 4px;
}
.product-card__category {
  grid-area: category;
  color: #409EFF;
  margin: 0;
  font-weight: 500;
  align-self: end;
}
.product-card__title {
  grid-area: title;
  margin: 0;
  align-self: start;
  font-weight: 500;
  color: #303133;
}
.product-card__title--recommended {
  font-size: 18px;
  text-align: center;
  margin-bottom: 2rem;
}
.product-card__descr {
  grid-area: descr;
  color: #303133;
  font-weight: 500;
}
.product-card__pay {
  grid-area: pay;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.product-card__price {
  margin-right: 3rem;
  color: #303133;
}
</style>
