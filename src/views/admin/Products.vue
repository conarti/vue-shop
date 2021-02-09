<template>
  <el-card>
    <template #header>
      <el-row type="flex" justify="space-between">
        <el-col :span="0">
          <h2 class="card-title">Список всех продуктов</h2>
        </el-col>
        <el-col :span="0" style="display: flex; align-items: center;">
          <el-button @click="dialogVisible = true" type="primary" size="medium" icon="el-icon-edit">Создать</el-button>
        </el-col>
      </el-row>
    </template>

    <ProductsList v-if="products.length" :data="products" />
    <el-empty v-else description="Продуктов пока нет"></el-empty>
  </el-card>

  <ProductsCreateModal
    :active="dialogVisible"
    @closed="dialogVisible = false"
    @create="dialogVisible = false"
  />
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import ProductsList from '@/components/admin/products/ProductsList'
import ProductsCreateModal from '@/components/admin/products/ProductsModal'

export default {
  name: 'Products',
  setup() {
    const store = useStore()
    const products = computed(() => store.getters['products/products'])
    const dialogVisible = ref(false)

    return { products, dialogVisible }
  },
  components: { ProductsList, ProductsCreateModal }
}
</script>
