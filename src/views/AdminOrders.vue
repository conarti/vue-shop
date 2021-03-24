<template>
  <admin-page
    title="Список заказов"
    :loading="loading"
  >
    <template v-if="orders.length && !loading">
      <el-table
        :data="orders"
        style="width: 100%; margin-bottom: 20px;">
        <el-table-column
          width="50"
          label="№"
          type="index">
        </el-table-column>

        <el-table-column
          align="center"
          label="Заказчик">
          <template #default="scope">
            <span>
              {{ getUserName(scope.row.userId) }}
            </span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="Состав заказа">
          <template #default="scope">
            <template v-for="item in scope.row.list">
              <span>
                {{ item.name }} - <i style="font-weight: bold; font-style: normal">{{ item.count }}</i>
              </span>
              <br>
            </template>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="Дата">
          <template #default="scope">
            <span>{{ new Date(scope.row.date).toLocaleString() }}</span>
          </template>
        </el-table-column>

<!--        <el-table-column-->
<!--          fixed="right"-->
<!--          label="Действия"-->
<!--          width="120"-->
<!--          align="center">-->
<!--          <template #default="scope">-->
<!--            <router-link-->
<!--              :to="{ name: 'AdminOrder', params: { id: scope.row.id } }"-->
<!--              custom-->
<!--              v-slot="{ navigate }"-->
<!--            >-->
<!--              <el-tooltip-->
<!--                class="item"-->
<!--                effect="light"-->
<!--                content="Редактировать статус"-->
<!--                placement="top"-->
<!--              >-->
<!--                <ElButton-->
<!--                  @click="navigate"-->
<!--                  type="info"-->
<!--                  size="medium"-->
<!--                  circle-->
<!--                  icon="el-icon-edit"-->
<!--                />-->
<!--              </el-tooltip>-->
<!--            </router-link>-->
<!--          </template>-->
<!--        </el-table-column>-->
      </el-table>
    </template>

    <ElEmpty v-if="!loading && orders.length === 0" description="Заказов пока нет" />
  </admin-page>
</template>
<script>
import { computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import AdminPage from '@/components/AdminPage'

export default {
  name: 'AdminOrders',
  components: { AdminPage },
  setup() {
    const store = useStore()
    const orders = computed(() => store.getters['order/orders'])
    const loading = computed(() => store.getters['order/isLoading'])

    onMounted(async () => {
      await store.dispatch('order/getOrders')
    })

    watch(loading, value => console.log(value))

    const users = computed(() => store.getters['auth/users'])
    const getUserName = userId => users.value.find(user => user.id === userId).name

    return {
      orders,
      loading,
      getUserName
    }
  }
}
</script>

<style scoped>

</style>
