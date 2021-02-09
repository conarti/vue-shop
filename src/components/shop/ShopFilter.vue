<template>
  <el-input
    placeholder="Введите для фильтрации"
    v-model="name"
    clearable>
    <template #prepend>
      <el-select v-loading="isLoad" v-model="category" placeholder="Категория" clearable filterable>
        <el-option v-for="item in categories" :label="item.title" :value="item.type"></el-option>
      </el-select>
    </template>
    <template #append>
      <el-button icon="el-icon-s-release" @click="reset">Сбросить всё</el-button>
    </template>
  </el-input>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'ShopFilter',
  props: {
    modelValue: Object
  },
  emits: ['update:modelValue'],
  setup({ modelValue }, { emit }) {
    const name = ref()
    const category = ref()
    const store = useStore()

    const reset = () => name.value = category.value = ''

    watch([name, category], values => {
      emit('update:modelValue', {
        search: values[0],
        category: values[1]
      })
    })

    onMounted(() => {
      if (modelValue) {
        name.value = modelValue.search
        category.value = modelValue.category
      }
    })

    return {
      reset,
      name,
      category,
      categories: computed(() => store.getters['categories/categories']),
      isLoad: computed(() => store.getters['categories/isLoading'])
    }
  }
}
</script>

<style scoped>
.el-select {
  width: 130px;
}
</style>
