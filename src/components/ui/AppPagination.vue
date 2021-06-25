<template>
  <div class="pagination">
    <button
      class="pag-btn arrow"
      @click="$emit('update:modelValue', +modelValue - 1)"
      :disabled="+modelValue === 1"
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
          :class="{ active: modelValue === number }"
          @click="$emit('update:modelValue', number)"
        >{{ number }}</button>
      </li>
    </ul>

    <button
      class="pag-btn arrow"
      @click="$emit('update:modelValue', +modelValue + 1)"
      :disabled="+modelValue === pagesCount"
    >
      <i class="el-icon-arrow-right"></i>
    </button>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'AppPagination',
  emits: ['update:modelValue'],
  props: {
    modelValue: Number,
    data: Array,
    itemsCount: Number
  },
  setup({ data, itemsCount }, { emit }) {

    const pagesCount = computed(() => Math.ceil(data.length / itemsCount))

    return {
      pagesCount,
    }
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
