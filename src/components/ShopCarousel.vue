<template>
  <el-carousel
    v-if="!!carouselProducts"
    height="200px"
    :autoplay="true"
    :interval="4000"
    trigger="click"
    direction="horizontal"
    style="border-radius: 4px; overflow: hidden"
  >
    <el-carousel-item
      v-for="product in carouselProducts"
      :key="product.id"
    >
      <div
        class="carousel-descr"
        @click="$router.push({ name: 'Product', params: { id: product.id } })"
      >
        <h1 class="carousel-descr__title carousel-descr__title--left">{{ product.title }}</h1>
        <img class="carousel-img" :src="product.img" alt="img" />
        <h1 class="carousel-descr__title carousel-descr__title--right">{{ sum(product.price) }} руб.</h1>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import { sum } from '@/utils/formatter'

export default {
  name: 'ShopCarousel',
  props: {
    carouselProducts: Array
  },
  setup() {
    return { sum }
  }
}
</script>

<style scoped>
.carousel-img {
  width: auto;
  max-height: 80%;
  border-radius: 4px;
  overflow: hidden;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.carousel-descr {
  position: relative;
  height: 100%;
  cursor: pointer;
}
.carousel-descr__title {
  position: absolute;
  display: inline-block;
  margin: 0;
  z-index: 5000;
  color: #fff;
  font-weight: 500;
}
.carousel-descr__title--left {
  left: 25%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.carousel-descr__title--right {
  right: 25%;
  top: 50%;
  transform: translate(50%, -50%);
}
.el-carousel__item:nth-child(2n) {
  background-color: #409EFF;
}
.el-carousel__item:nth-child(2n+1) {
  background-color: #409EFF;
}
</style>
