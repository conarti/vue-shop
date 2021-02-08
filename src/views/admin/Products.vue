<template>
<!--  <ProductsList :data="tableData" />-->
<!--  <el-empty description="В продуктах пока ничего нет"></el-empty>-->
<!--  <el-card>-->
<!--    <template #header>-->
<!--      <el-row type="flex" justify="space-between">-->
<!--        <el-col :span="0">-->
<!--          <h2 class="card-title">Список всех продуктов</h2>-->
<!--        </el-col>-->
<!--        <el-col :span="0" style="display: flex; align-items: center;">-->
<!--          <el-button type="primary" size="medium" icon="el-icon-edit">Создать</el-button>-->
<!--        </el-col>-->
<!--      </el-row>-->
<!--    </template>-->
<!--  <el-table-->
<!--    :data="tableData"-->
<!--    style="width: 100%"-->
<!--    height="63vh">-->
<!--    <el-table-column-->
<!--      type="index"-->
<!--      width="50">-->
<!--    </el-table-column>-->
<!--    <el-table-column-->
<!--      align="center"-->
<!--      label="Наименование">-->
<!--      <template #default="scope">-->
<!--        <span>{{ scope.row.title }}</span>-->
<!--      </template>-->
<!--    </el-table-column>-->
<!--    <el-table-column-->
<!--      align="center"-->
<!--      label="Изображение">-->
<!--      <template #default="scope">-->
<!--        <el-image-->
<!--          style="width: 50px; height: 50px; border-radius: 4px"-->
<!--          :src="scope.row.img"-->
<!--          fit="cover"></el-image>-->
<!--      </template>-->
<!--    </el-table-column>-->
<!--    <el-table-column-->
<!--      align="center"-->
<!--      label="Категория">-->
<!--      <template #default="scope">-->
<!--        <span>{{ scope.row.category }}</span>-->
<!--      </template>-->
<!--    </el-table-column>-->
<!--    <el-table-column-->
<!--      align="center"-->
<!--      label="Цена">-->
<!--      <template #default="scope">-->
<!--        <span>{{ scope.row.price }}</span>-->
<!--      </template>-->
<!--    </el-table-column>-->
<!--    <el-table-column-->
<!--      align="center"-->
<!--      label="Количество">-->
<!--      <template #default="scope">-->
<!--        <span>{{ scope.row.count }}</span>-->
<!--      </template>-->
<!--    </el-table-column>-->
<!--    <el-table-column-->
<!--      fixed="right"-->
<!--      label="Действия"-->
<!--      width="120"-->
<!--      align="center">-->
<!--      <template #default="scope">-->
<!--        <el-tooltip class="item" effect="light" content="Редактировать" placement="top">-->
<!--          <el-button type="primary" size="medium" circle icon="el-icon-edit"></el-button>-->
<!--        </el-tooltip>-->
<!--        &lt;!&ndash;        <el-tooltip class="item" effect="light" content="Открыть страницу товара" placement="top">&ndash;&gt;-->
<!--        &lt;!&ndash;          <el-button type="info" size="small" circle icon="el-icon-info"></el-button>&ndash;&gt;-->
<!--        &lt;!&ndash;        </el-tooltip>&ndash;&gt;-->
<!--      </template>-->
<!--    </el-table-column>-->
<!--  </el-table>-->
<!--  </el-card>-->
  <ProductsList />
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import ProductsList from '@/components/admin/products/ProductsList'

export default {
  name: 'ProductsList',
  setup() {
    const store = useStore()
    const products = computed(() => store.getters['products/products'])

    return { products }
  },
  components: { ProductsList }
}
</script>
