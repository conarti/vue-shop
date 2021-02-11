<template>
  <div class="pagination">
    <button
      class="pag-btn arrow"
      @click="setCurrentPage('prev')"
      :disabled="startIdx === 0"
    >
      <i class="el-icon-arrow-left"></i>
    </button>

    <ul class="pager">
      <li
        class="number"
        v-for="number in pagesCount"
        :key="number"
      >
        <button
          class="pag-btn"
          :class="activePage === number ? 'active' : ''"
          @click="setCurrentPage(number)"
        >{{ number }}</button>
      </li>
    </ul>

    <button
      class="pag-btn arrow"
      @click="setCurrentPage('next')"
      :disabled="startIdx + itemsCount >= data.length"
    >
      <i class="el-icon-arrow-right"></i>
    </button>
  </div>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue'

export default {
  name: 'AppPagination',
  emits: ['update:modelValue'],
  props: {
    modelValue: Array,
    data: Array,
    itemsCount: Number
  },
  setup({ data, itemsCount }, { emit }) {
    const startIdx = ref(0)
    const pageItems = computed(() =>
      data
        .map((item, idx) => ({
          ...item,
          number: idx + 1
        }))
        .slice(startIdx.value, startIdx.value + itemsCount)
    )

    watch(pageItems, value => {
      emit('update:modelValue', value)
    })

    onMounted(() => {
      emit('update:modelValue', pageItems.value)
    })

    const pagesCount = computed(() => Math.ceil(data.length / itemsCount))

    const activePage = computed(() => (startIdx.value + itemsCount) / itemsCount)

    const setCurrentPage = option => {
      if (typeof option === 'number') {
        startIdx.value = (itemsCount * option) - itemsCount
      } else if (option === 'next') {
        startIdx.value += itemsCount
      } else if (option === 'prev') {
        startIdx.value -= itemsCount
      }
    }

    return { pagesCount, startIdx, activePage, setCurrentPage }
  }
}
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
}

.pag-btn {
  cursor: pointer;
  background-color: #f4f4f5;
  color: #606266;
  min-width: 30px;
  border-radius: 2px;
  border: none;
  outline: none;
  padding: 8px 0;
  font-size: 13px;
  font-weight: 700;
  transition: color .25s, background-color .25s;
}
.pag-btn:hover {
  color: #409eff;
}

.pag-btn.active {
  background-color: #409eff;
  color: #fff;
}
.pag-btn:hover.active {
  color: #fff;
}

.pag-btn:disabled.arrow {
  color: #c0c4cc;
  background-color: #f4f4f5;
  cursor: not-allowed;
}
.pag-btn:disabled:hover.arrow {
  color: #c0c4cc;
}

.pager {
  list-style-type: none;
  display: flex;
  padding: 0;
  margin: 0 5px;
}
.pager > .number {
  margin: 0 5px;
}
</style>
