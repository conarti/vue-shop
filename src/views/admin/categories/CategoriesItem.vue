<template>
  <admin-page
    v-loading="isLoading"
    title="Редактирование категории"
  >
    <el-form
      :model="form"
      ref="modalForm"
      :rules="rules"
      label-width="120px"
      size="small"
      @submit.prevent
      label-position="left">
      <el-form-item
        label="Название"
        prop="title">
        <el-input
          v-model="form.title"
          placeholder="Введите название"
        ></el-input>
      </el-form-item>

      <el-form-item label-width="auto">
        <el-row type="flex" justify="end">
          <transition name="fade">
            <el-col
              :span="0"
              style="margin-right: 20px;"
              v-if="isEdited">
              <el-button
                style="width: 100%"
                type="primary"
                @click="submitForm"
                :loading="isLoading"
              >Обновить</el-button>
            </el-col>
          </transition>
          <transition name="fade">
            <el-col
              :span="0"
              style="margin-right: 20px;"
              v-if="isEdited">
              <el-button
                style="width: 100%"
                type="warning"
                @click="resetForm"
                :loading="isLoading"
              >Отменить изменения</el-button>
            </el-col>
          </transition>
          <el-col
            :span="0">
            <el-button
              style="width: 100%"
              type="danger"
              @click="removeCategory"
              :loading="isLoading"
            >Удалить</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </admin-page>

  <AppConfirm
    message="Есть несохранённые изменения. Вы хотите покинуть страницу?"
    :visible="leave"
    @reject="leave = false"
    @confirm="navigate"
  />
</template>

<script>
import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import rules from '@/utils/forms-validate-rules/CategoriesModal'
import AdminPage from '@/components/admin/AdminPage'
import AppConfirm from '@/components/UI/modal/AppConfirm'
import { useLeaveGuard } from '@/use/leave-guard'

export default {
  name: 'CategoriesItem',
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    const categories = computed(() => store.getters['categories/categories'])
    const id = route.params.id
    const categoryItem = categories.value.find(item => item.id === id)

    const productItemOld = reactive({ ...categoryItem })

    const modalForm = ref(null)

    const form = reactive({
      title: productItemOld.title
    })

    const isEdited = computed(() => {
      return form.title !== productItemOld.title
    })

    const resetForm = () => {
      form.title = productItemOld.title
    }

    const updateOld = () => {
      productItemOld.title = form.title
    }

    const submitForm = () => {
      modalForm.value.validate(async valid => {
        if (valid) {
          try {
            await store.dispatch('categories/editCategory', {
              ...form,
              id: categoryItem.id,
              type: categoryItem.type
            })
            updateOld()
          } catch (e) {}
        } else {
          return false;
        }
      })
    }

    const removeCategory = async () => {
      try {
        await store.dispatch('categories/removeCategory', id)
        router.replace({ name: 'Categories' })
      } catch (e) {}
    }

    return {
      form,
      rules,
      modalForm,
      submitForm,
      isLoading: computed(() => store.getters['products/loading']),
      categories: computed(() => store.getters['categories/categories']),
      categoryItem,
      isEdited,
      resetForm,
      removeCategory,
      ...useLeaveGuard(isEdited)
    }
  },
  components: { AdminPage, AppConfirm }
}
</script>

