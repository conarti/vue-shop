<template>
  <div
    class="product-block"
    :style="{ width, height, minWidth: width, minHeight: height }"
  >
    <div class="product-avatar">
      <img
        :src="img"
        alt="img"
      />
    </div>

    <h4 class="product-title">{{ title }}</h4>

    <p class="product-price">
      {{ count ? `${sum(price)} руб.` : 'Нет в наличии' }}
    </p>

    <el-button
      v-if="!countAtCart"
      class="product-button"
      type="primary"
      :disabled="!count"
      icon="el-icon-goods"
      size="small"
      @click.stop="countAtCart = 1"
    >В корзину</el-button>

    <el-input-number
      v-if="countAtCart"
      v-model="countAtCart"
      size="small"
      :min="0"
      :max="count"
      @click.stop
    >
    </el-input-number>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { sum } from '@/utils/formatter'

export default {
  name: 'ShopProduct',
  emits: ['change-count'],
  props: [
    'count',
    'img',
    'price',
    'title',
    'id',
    'cartCount',
    'width',
    'height'
  ],
  setup(props, { emit }) {
    const countAtCart = ref(props.cartCount ? props.cartCount : 0)

    watch(countAtCart, value => {
      emit('change-count', props.id, value)
    })

    return {
      sum,
      countAtCart
    }
  }
}
</script>

<style scoped>
.product-block {
  min-width: 200px;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #DCDFE6;
  border-radius: 4px;
  cursor: pointer;
  transition: box-shadow .25s;
}
.product-block:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.product-avatar {
  height: 100%;
  min-width: 90%;
  max-width: 100%;
  border-radius: 4px;
  display: inline-block;
  overflow: hidden;
  margin: 1rem;
}
.product-avatar > img {
  object-fit: cover;
  display: block;
  height: 100%;
  width: 100%;
  vertical-align: middle;
  border-style: none;
}
.product-title {
  color: #303133;
  font-weight: 500;
  font-size: 16px;
  margin-top: 0;
  margin-bottom: .8rem;
}
.el-input-number {
  margin-bottom: 1rem;
}
.product-price {
  color: #303133;
  font-weight: 500;
  font-size: 14px;
  margin-top: 0;
}
.product-button {
  margin-bottom: 1rem;
}
</style>
