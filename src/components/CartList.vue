<template>
  <el-table
    :data="products"
    style="width: 100%"
  >
    <el-table-column
      label="№"
      type="index"
    >
    </el-table-column>

    <el-table-column
      align="start"
      label="Наименование"
    >
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
      label="Цена за единицу">
      <template #default="scope">
        <span>{{ scope.row.price }}</span>
      </template>
    </el-table-column>

    <el-table-column
      align="center"
      label="Количество"
    >
      <template #default="scope">
        <el-input-number
          v-model="scope.row.cartCount"
          size="small"
          controls-position="right"
          :min="0"
          :max="scope.row.count"
          :key="scope.row.id"
          @change="$emit('count-change', scope.row.id, scope.row.cartCount)"
        ></el-input-number>
      </template>
    </el-table-column>

    <el-table-column
      align="right"
      label="Цена"
      width="100"
    >
      <template #default="scope">
        <span>{{ `${ sum(scope.row.price * scope.row.cartCount) } руб.` }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { sum } from '@/utils/formatter'

export default {
  name: 'CartList',
  props: ['products'],
  emits: ['count-change'],
  setup() {
    return { sum }
  }
}
</script>
