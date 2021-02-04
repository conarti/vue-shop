<template>
  <el-card v-loading="isLoad" :style="isLoad ? 'height: 50vh' : ''">
    <template #header v-if="!isLoad">
      <h1 class="card-title">Корзина</h1>
    </template>

    <el-empty v-if="!tableItems.length && !isLoad" description="В корзине пока ничего нет"></el-empty>
    <template v-else-if="tableItems.length">
      <AppCartTable
        :table-items="tableItems"
        @count-change="countChange"
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
import AppCartTable from '@/components/ui/AppCartTable'
import { useCart } from '@/use/cart'

export default {
  setup() {
    return {
      ...useCart()
    }
  },
  components: { AppCartTable }
}
</script>
