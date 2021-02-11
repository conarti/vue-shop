<template>
  <el-table
    :data="data"
    style="width: 100%">
    <el-table-column
      type="index"
      label="№">
    </el-table-column>
    <el-table-column
      align="start"
      label="Наименование">
      <template #default="scope">
        <span>{{ scope.row.title }}</span>
      </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="Действия"
      width="120">
      <template #default="scope">
        <router-link
          :to="{ name: 'Category', params: { id: scope.row.id } }"
          custom
          v-slot="{ navigate }"
        >
          <el-tooltip class="item" effect="light" content="Редактировать" placement="top">
            <el-button @click="navigate" type="primary" size="medium" circle icon="el-icon-edit"></el-button>
          </el-tooltip>
        </router-link>
        <el-tooltip class="item" effect="light" content="Удалить" placement="top">
          <el-button
            @click="confirm(scope.row.id, remove)"
            type="danger"
            size="medium"
            circle
            icon="el-icon-delete"></el-button>
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>

  <AppConfirm
    message="Вы действительно хотите удалить категорию?"
    :visible="confirmVisible"
    @confirm="confirmed = true"
    @reject="confirmVisible = false"
  />
</template>

<script>
import { useStore } from 'vuex'
import { useConfirm } from '@/use/confirm'
import AppConfirm from '@/components/UI/modal/AppConfirm'

export default {
  name: 'CategoriesList',
  props: ['data'],
  setup() {
    const store = useStore()

    const remove = async id => {
      await store.dispatch('categories/removeCategory', id)
    }

    return {
      remove,
      ...useConfirm(remove)
    }
  },
  components: { AppConfirm }
}
</script>
