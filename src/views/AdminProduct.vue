<template>
  <admin-page
    v-loading="isLoading"
    title="Редактирование товара"
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
        <el-select v-model="form.category" placeholder="Выберите категорию" filterable style="width: 100%">
          <el-option v-for="item in categories" :label="item.title" :value="item.type"></el-option>
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
          justify="end">
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
              @click="removeProduct"
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
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router'
import { useStore } from 'vuex'
import { useLeaveGuard } from '@/use/leave-guard'
import rules from '@/utils/form-validate-rules/products'
import AdminPage from '@/components/AdminPage'
import AppConfirm from '@/components/ui/AppConfirm'

export default {
  name: 'AdminProduct',
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    //FIXME: Баг при получении данных, работает через раз

    const products = computed(() => store.getters['products/products'])
    const id = route.params.id

    const productItem = products.value.find(item => item.id === id)

    const productItemOld = reactive({ ...productItem })

    const modalForm = ref(null)

    const form = reactive({
      title: productItemOld.title,
      img: productItemOld.img,
      category: productItemOld.category,
      price: productItemOld.price,
      count: productItemOld.count
    })

    const isEdited = computed(() => {
      return form.title !== productItemOld.title ||
        form.img !== productItemOld.img ||
        form.category !== productItemOld.category ||
        form.price !== productItemOld.price ||
        form.count !== productItemOld.count
    })

    //FIXME: почему вот такая запись не работает?
    // const isEdited = computed(() => {
    //   return Object.keys(form).reduce((acc, key) => {
    //     return form[key] !== productItemOld[key] && acc
    //   }, false)
    // })

    const resetForm = () => {
      form.title = productItemOld.title
      form.img = productItemOld.img
      form.category = productItemOld.category
      form.price = productItemOld.price
      form.count = productItemOld.count
    }

    const updateOld = () => {
      productItemOld.title = form.title
      productItemOld.img = form.img
      productItemOld.category = form.category
      productItemOld.price = form.price
      productItemOld.count = form.count
    }

    const submitForm = () => {
      modalForm.value.validate(async valid => {
        if (valid) {
          try {
            await store.dispatch('products/editProduct', { ...form, id: productItem.id })
            updateOld()
          } catch (e) {}
        } else {
          return false;
        }
      })
    }

    const removeProduct = async () => {
      try {
        await store.dispatch('products/removeProduct', id)
        router.replace({ name: 'Products' })
      } catch (e) {}
    }

    return {
      form,
      rules,
      modalForm,
      submitForm,
      isLoading: computed(() => store.getters['products/loading']),
      categories: computed(() => store.getters['categories/categories']),
      productItem,
      isEdited,
      resetForm,
      removeProduct,
      ...useLeaveGuard(isEdited)
    }
  },
  components: { AdminPage, AppConfirm }
}
</script>
