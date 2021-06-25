<template>
  <el-table
    :data="data"
    style="width: 100%; margin-bottom: 20px;">
    <el-table-column
      width="50"
      label="№">
      <template #default="scope">
        <span>{{ scope.row.number }}</span>
      </template>
    </el-table-column>
    <el-table-column
      align="center"
      label="Наименование">
      <template #default="scope">
        <span>{{ scope.row.title }}</span>
      </template>
    </el-table-column>
    <el-table-column
      align="center"
      label="Изображение">
      <template #default="scope">
        <el-image
          style="width: 50px; height: 50px; border-radius: 4px"
          :src="scope.row.img"
          fit="cover"></el-image>
      </template>
    </el-table-column>
    <el-table-column
      align="center"
      label="Категория">
      <template #default="scope">
        <span>{{ categoryTypeNames[scope.row.category] }}</span>
      </template>
    </el-table-column>
    <el-table-column
      align="center"
      label="Цена">
      <template #default="scope">
        <span>{{ scope.row.price }}</span>
      </template>
    </el-table-column>
    <el-table-column
      align="center"
      label="Количество">
      <template #default="scope">
        <span>{{ scope.row.count }}</span>
      </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="Действия"
      width="120"
      align="center">
      <template #default="scope">
        <router-link
          :to="{ name: 'AdminProduct', params: { id: scope.row.id } }"
          custom
          v-slot="{ navigate }"
        >
          <el-tooltip
            class="item"
            effect="light"
            content="Редактировать"
            placement="top"
          >
            <ElButton
              @click="navigate"
              type="primary"
              size="medium"
              circle
              icon="el-icon-edit"
            />
          </el-tooltip>
        </router-link>
        <el-tooltip
          class="item"
          effect="light"
          content="Удалить"
          placement="top"
        >
          <ElButton
            @click="confirm(scope.row.id, remove)"
            type="danger"
            size="medium"
            circle
            icon="el-icon-delete"
          />
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>

  <AppConfirm
    message="Вы действительно хотите удалить продукт?"
    :visible="confirmVisible"
    @confirm="confirmed = true"
    @reject="confirmVisible = false"
  />
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { useConfirm } from '@/use/confirm'
import AppConfirm from '@/components/ui/AppConfirm'

export default {
  name: 'ProductsList',
  props: ['data'],
  setup() {
    const store = useStore()

    const categories = computed(() => store.getters['categories/categories'])

    const categoryTypeNames = {}
    categories.value.forEach(category => categoryTypeNames[category.type] = category.title)

    const remove = async id => await store.dispatch('products/removeProduct', id)

    return {
      remove,
      ...useConfirm(remove),
      categoryTypeNames
    }
  },
  components: { AppConfirm }
}
</script>
