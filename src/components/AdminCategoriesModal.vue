<template>
  <app-modal
    title="Добавление категории"
    :visible="visible"
    @close="$emit('reject')"
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
        <el-row
          type="flex"
          justify="end"
        >
          <el-col :span="0">
            <el-button
              style="width: 100%"
              type="primary"
              @click="submitForm"
              :loading="isLoading"
            >Добавить</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </app-modal>
</template>

<script>
import { useStore } from 'vuex'
import { computed, reactive, ref } from 'vue'
import rules from '@/utils/form-validate-rules/categories'
import AppModal from '@/components/ui/AppModal'

export default {
  name: 'CategoriesModal',
  emits: ['create', 'reject'],
  props: ['visible'],
  setup(_, { emit }) {
    const store = useStore()
    const modalForm = ref(null)

    const form = reactive({
      title: ''
    })

    const submitForm = () => {
      modalForm.value.validate(async valid => {
        if (valid) {
          try {
            await store.dispatch('categories/addCategory', {
              title: form.title,
              type: store.getters['categories/categories'].length.toString(),
              id: Date.now().toString()
            })
            emit('create')
            form.title = form.img = form.category = form.price = form.count = ''
          } catch (e) {}
        } else {
          return false;
        }
      })
    }

    return {
      form,
      rules,
      modalForm,
      submitForm,
      isLoading: computed(() => store.getters['categories/loading']),
      categories: computed(() => store.getters['categories/categories'])
    }
  },
  components: { AppModal }
}
</script>

<style scoped>

</style>
