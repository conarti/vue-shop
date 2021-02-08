<template>
  <el-table
    :data="tableItems"
    style="width: 100%">
    <el-table-column
      align="left"
      label="Наименование">
      <template #default="scope">
        <span>{{ scope.row.title }}</span>
      </template>
    </el-table-column>
    <el-table-column
      align="center"
      label="Количество"
      width="150">
      <template #default="scope">
        <el-input-number
          v-model="scope.row.cartCount"
          size="small"
          controls-position="right"
          :min="0"
          :max="scope.row.count"
          :key="scope.row.id"
          @change="$emit('count-change', scope.row.cartCount, scope.row.id)"
        ></el-input-number>
      </template>
    </el-table-column>
    <el-table-column
      align="right"
      label="Цена"
      width="100">
      <template #default="scope">
        <span>{{ `${ sum(scope.row.price * scope.row.cartCount) } руб.` }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { sum } from '@/utils/formatter'

export default {
  name: 'AppCartTable',
  props: ['table-items'],
  emits: ['count-change'],
  setup() {
    return { sum }
  }
}
</script>
