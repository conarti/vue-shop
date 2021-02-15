<template>
  <admin-page
    title="Список заказов"
    v-loading="isLoad"
  >
    <template v-if="orders.length">
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
            <span>Тут кнопка модалки со списком</span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="Дата">
          <template #default="scope">
            <span>{{ new Date(scope.row.date).toLocaleString() }}</span>
          </template>
        </el-table-column>

        <el-table-column
          fixed="right"
          label="Действия"
          width="120"
          align="center">
          <template #default="scope">
            <router-link
              :to="{ name: 'AdminOrder', params: { id: scope.row.id } }"
              custom
              v-slot="{ navigate }"
            >
              <el-tooltip
                class="item"
                effect="light"
                content="Редактировать статус"
                placement="top"
              >
                <ElButton
                  @click="navigate"
                  type="info"
                  size="medium"
                  circle
                  icon="el-icon-edit"
                />
              </el-tooltip>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <ElEmpty description="Заказов пока нет" />
  </admin-page>
</template>
<script>
//TODO доделать страницу
import { computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import AdminPage from '@/components/AdminPage'

export default {
  name: 'AdminOrders',
  components: { AdminPage },
  setup() {
    const store = useStore()
    const orders = computed(() => store.getters['order/orders'])

    onMounted(async () => {
      await store.dispatch('order/getOrders')
      await store.dispatch('auth/getUsers')
    })

    /*
    FIXME: тут опять та же ошибка.
     Данных нету когда рендерится таблица (почему?)
     v-if никак не блокирует рендер
   */
    const users = computed(() => store.getters['auth/users'])
    const getUserName = userId => users.value
      .find(user => user.userId === userId).name

    return {
      orders,
      isLoad: computed(() => store.getters['order/isLoading']),
      getUserName
    }
  }
}
</script>

<style scoped>

</style>
