<template>
  <el-dialog
    title="Добавление продукта"
    v-model="active"
    width="30%"
    top="20px"
    center>

    <el-form
      :model="form"
      ref="modalForm"
      :rules="rules"
      status-icon
      label-width="50px"
      label-position="top">
      <el-form-item
        label="Название"
        prop="title">
        <el-input
          v-model="form.title"
          placeholder="Введите название"
          prefix-icon="el-icon-user-solid"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="Изображение"
        prop="img">
        <el-input
          v-model="form.img"
          placeholder="Введите ссылку на изображение"
          prefix-icon="el-icon-user-solid"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="Категория"
        prop="category">
        <el-input
          v-model="form.category"
          placeholder="Выберите категорию"
          prefix-icon="el-icon-user-solid"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="Цена"
        prop="price">
        <el-input
          v-model="form.price"
          placeholder="Введите стоимость"
          prefix-icon="el-icon-user-solid"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="Количество"
        prop="count">
        <el-input
          v-model="form.count"
          placeholder="Введите количество"
          prefix-icon="el-icon-user-solid"
        ></el-input>
      </el-form-item>

      <el-form-item label-width="auto">
        <el-row type="flex" justify="center">
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
  </el-dialog>
</template>

<script>
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus';

export default {
  name: 'ProductsCreateModal',
  emits: ['create'],
  props: ['active'],
  setup(_, { emit }) {
    const modalForm = ref(null)

    const form = reactive({
      title: '',
      img: '',
      category: '',
      price: '',
      count: ''
    })

    const rules = {
      title: [
        { required: true, message: 'Пожалуйста, введите название', trigger: 'blur' },
        { min: 3, message: 'Название не может быть меньше 3 символов', trigger: 'blur' },
      ],
      img: [
        { required: true, message: 'Пожалуйста, введите ссылку на изображение', trigger: 'blur' },
        { min: 3, message: 'Здесь не может быть меньше 3 символов', trigger: 'blur' },
      ],
      category: [
        { required: true, message: 'Пожалуйста, выберите категорию', trigger: 'blur' },
      ],
      price: [
        { required: true, message: 'Пожалуйста, введите стоимость', trigger: 'blur' },
        { min: 3, message: 'Здесь не может быть меньше 3 символов', trigger: 'blur' },
      ],
      count: [
        { required: true, message: 'Пожалуйста, введите количество', trigger: 'blur' },
        { min: 3, message: 'Здесь не может быть меньше 3 символов', trigger: 'blur' },
      ]
    }

    const store = useStore()

    const isLoading = computed(() => store.getters['products/loading'])

    const submitForm = () => {
      modalForm.value.validate(async valid => {
        if (valid) {
          try {
            await store.dispatch('products/addProduct', { ...form, id: Date.now().toString() })
            emit('create')
            form.title = form.img = form.category = form.price =form.count = ''
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
      isLoading
    }
  }
}
</script>
