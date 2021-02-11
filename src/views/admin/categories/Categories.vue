<template>
  <AdminPage
    title="Категории товаров"
    v-loading="isLoad"
  >
    <template #button>
      <el-button
        @click="dialogVisible = true"
        type="primary"
        size="medium"
        icon="el-icon-edit"
      >Добавить категорию</el-button>
    </template>

    <CategoriesList v-if="categories.length" :data="categories" />
    <el-empty v-else-if="!isLoad" description="Продуктов пока нет"></el-empty>
  </AdminPage>

  <CategoriesModal
    :visible="dialogVisible"
    @close="dialogVisible = false"
    @create="dialogVisible = false"
    @reject="dialogVisible = false"
  />
</template>

<script>
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
import AdminPage from '@/components/admin/AdminPage'
import CategoriesList from '@/components/admin/categories/CategoriesList'
import CategoriesModal from '@/components/admin/categories/CategoriesModal'

export default {
  name: 'Categories',
  setup() {
    const store = useStore()
    const categories = computed(() => store.getters['categories/categories'])
    const dialogVisible = ref(false)

    return {
      categories,
      dialogVisible,
      isLoad: computed(() => store.getters['categories/isLoading'])
    }
  },
  components: { AdminPage, CategoriesList, CategoriesModal }

}
</script>
