<template>
  <el-table
    :data="data"
    style="width: 100%"
    height="63vh">
    <el-table-column
      type="index"
      width="50">
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
        <span>{{ scope.row.category }}</span>
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
        <el-tooltip class="item" effect="light" content="Редактировать" placement="top">
          <el-button type="primary" size="medium" circle icon="el-icon-edit"></el-button>
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'ProductsList',
  props: ['data']
}
</script>
