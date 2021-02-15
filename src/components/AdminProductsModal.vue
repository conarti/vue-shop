<template>
  <app-modal
    title="Добавление товара"
    :visible="visible"
    width="40%"
    @close="$emit('reject')"
  >
    <el-form
      :model="form"
      ref="modalForm"
      :rules="rules"
      label-width="120px"
      size="small"
      label-position="left">
      <el-form-item
        label="Название"
        prop="title">
        <el-input
          v-model="form.title"
          placeholder="Введите название"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="Изображение"
        prop="img">
        <el-input
          v-model="form.img"
          placeholder="Введите ссылку на изображение"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="Категория"
        prop="category">
        <el-select
          v-model="form.category"
          placeholder="Выберите категорию"
          filterable
          style="width: 100%"
        >
          <ElOption
            v-for="item in categories"
            :label="item.title"
            :value="item.type"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="Цена"
        prop="price">
        <el-input
          v-model.number="form.price"
          placeholder="Введите стоимость"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="Количество"
        prop="count">
        <el-input
          v-model.number="form.count"
          placeholder="Введите количество"
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
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import rules from '@/utils/form-validate-rules/products'
import AppModal from '@/components/ui/AppModal'

export default {
  name: 'ProductsCreateModal',
  emits: ['create', 'reject'],
  props: ['visible'],
  setup(_, { emit }) {
    const store = useStore()
    const modalForm = ref(null)

    const form = reactive({
      title: '',
      img: '',
      category: '',
      price: '',
      count: ''
    })

    const submitForm = () => {
      modalForm.value.validate(async valid => {
        if (valid) {
          try {
            await store.dispatch('products/addProduct', { ...form, id: Date.now().toString() })
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
      isLoading: computed(() => store.getters['products/loading']),
      categories: computed(() => store.getters['categories/categories'])
    }
  },
  components: { AppModal }
}
</script>
