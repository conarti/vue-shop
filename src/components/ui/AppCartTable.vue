<template>
  <el-table
    :data="tableItems"
    style="width: 100%">
    <el-table-column
      align="left"
      prop="name"
      label="Наименование">
      <template #default="scope">
        <span>{{ scope.row.title }}</span>
      </template>
    </el-table-column>
    <el-table-column
      align="center"
      prop="value"
      label="Количество"
      width="150">
      <template #default="scope">
        <el-input-number
          v-model="scope.row.count"
          size="small"
          controls-position="right"
          :min="0"
          :max="100"
          :key="scope.row.id"
          @change="$emit('count-change', scope.row.count, scope.row.id)"
        ></el-input-number>
      </template>
    </el-table-column>
    <el-table-column
      align="right"
      prop="sum"
      label="Цена"
      width="100">
      <template #default="scope">
        <span>{{ `${ scope.row.price * scope.row.count } руб.` }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'AppCartTable',
  props: ['table-items'],
  emits: ['count-change']
}
</script>
