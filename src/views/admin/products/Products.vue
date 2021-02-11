<template>
  <AdminPage
    title="Все продукты"
    v-loading="isLoad"
  >
    <template #button>
      <el-button
        @click="dialogVisible = true"
        type="primary"
        size="medium"
        icon="el-icon-edit"
      >Добавить товар</el-button>
    </template>

    <ProductsList
      v-if="products.length && !isLoad"
      :data="listItems"
    />
    <AppPagination
      v-if="products.length && !isLoad"
      v-model="listItems"
      :data="products"
      :items-count="5"
    />
    <el-empty v-else-if="!isLoad" description="Продуктов пока нет"></el-empty>
  </AdminPage>

    <ProductsModal
      :visible="dialogVisible"
      @close="dialogVisible = false"
      @create="dialogVisible = false"
      @reject="dialogVisible = false"
    />
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import ProductsList from '@/components/admin/products/ProductsList'
import ProductsModal from '@/components/admin/products/ProductsModal'
import AdminPage from '@/components/admin/AdminPage'
import AppPagination from '@/components/UI/AppPagination'
import { useRoute } from 'vue-router'

export default {
  name: 'Products',
  setup() {
    const store = useStore()
    const products = computed(() => store.getters['products/products'])
    const dialogVisible = ref(false)

    return {
      products,
      dialogVisible,
      isLoad: computed(() => store.getters['products/isLoading']),
      listItems: ref([])
    }
  },
  components: { AdminPage, ProductsList, ProductsModal, AppPagination }
}
</script>
