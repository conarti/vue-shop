<template>
  <admin-page
    title="Все продукты"
    v-loading="isLoad"
  >
    <template #button>
      <el-button
        type="primary"
        size="medium"
        icon="el-icon-edit"
        @click="dialogVisible = true"
      >Добавить товар</el-button>
    </template>

    <AdminProductsList
      v-if="products.length && !isLoad"
      :data="currentPageProducts"
    />

    <AppPagination
      v-if="products.length && !isLoad"
      v-model="page"
      :data="products"
      :items-count="PAGE_PRODUCTS_COUNT"
    />

    <ElEmpty
      v-else-if="!isLoad"
      description="Продуктов пока нет"
    />
  </admin-page>

    <AdminProductsModal
      :visible="dialogVisible"
      @close="dialogVisible = false"
      @create="dialogVisible = false"
      @reject="dialogVisible = false"
    />
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import _ from 'lodash'
import AdminProductsList from '@/components/AdminProductsList'
import AdminProductsModal from '@/components/AdminProductsModal'
import AdminPage from '@/components/AdminPage'
import AppPagination from '@/components/ui/AppPagination'

export default {
  name: 'Products',
  components: {
    AdminPage,
    AdminProductsList,
    AdminProductsModal,
    AppPagination
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    const products = computed(() => store.getters['products/products'])
    const dialogVisible = ref(false)

    const page = ref(1)
    const PAGE_PRODUCTS_COUNT = 5

    const numberedProducts = computed(() => {
      return products.value
        .map((item, idx) => ({
          ...item,
          number: idx + 1
        }))
      })

    const chunkProducts = computed(() => _.chunk(numberedProducts.value, PAGE_PRODUCTS_COUNT))
    const currentPageProducts = computed(() => chunkProducts.value[page.value - 1])

    watch(page, value => {
      const query = { page: value }
      if (value === 1) delete query.page
      router.replace({ path: '/admin/products', query })
    })

    onMounted(() => {
      if (route.query.page) {
        page.value = +route.query.page
      }
    })

    return {
      products,
      dialogVisible,
      isLoad: computed(() => store.getters['products/isLoading']),
      PAGE_PRODUCTS_COUNT,
      page,
      currentPageProducts
    }
  }
}
</script>
