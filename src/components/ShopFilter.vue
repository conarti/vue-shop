<template>
  <div
    class="shop-filter"

  >
    <el-input
      placeholder="Введите для фильтрации"
      v-model="name"
      width="100%"
      :style="{ width: isClearable ? '80%' : '100%', transition: 'width 0.1s' }"
      clearable>
      <template #prepend>
        <el-select
          v-loading="isLoad"
          v-model="category"
          placeholder="Категория"
          clearable
          filterable
        >
          <ElOption
            v-for="item in categories"
            :label="item.title"
            :value="item.type"
          />
        </el-select>
      </template>
    </el-input>
    <transition name="fade-btn">
      <el-button
        v-if="isClearable"
        type="text"
        size="mini"
        style="margin: 0 auto"
        icon="el-icon-delete-solid"
        @click="reset"
      >Сбросить все фильтры</el-button>
    </transition>
  </div>
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

    const isClearable = computed(() => name.value || category.value)

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
      isLoad: computed(() => store.getters['categories/isLoading']),
      isClearable
    }
  }
}
</script>

<style scoped>
.fade-btn-enter-active {
  transition: opacity 0.25s ease 0.1s;
}

.fade-btn-leave-active {
  transition: opacity 0.05s ease
}

.fade-btn-enter-from,
.fade-btn-leave-to {
  opacity: 0;
}


.el-select {
  width: 130px;
}
.shop-filter {
  display: flex;
  justify-content: space-between;
}
</style>
