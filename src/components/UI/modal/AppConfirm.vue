<template>
  <app-modal
    :title="message"
    :visible="visible"
    width="20%"
    padding="1rem"
    :close-visible="false"
    @close="$emit('reject')"
  >
    <template #header>
      <h4>{{ message }}</h4>
    </template>
    <div class="button-wrapper">
      <el-button
        type="danger"
        size="small"
        @click="$emit('confirm')"
      >Да</el-button>
      <el-button
        type="info"
        size="small"
        @click="$emit('reject')"
      >Нет</el-button>
    </div>
  </app-modal>
</template>

<script>
import AppModal from '@/components/UI/modal/AppModal'

export default {
  name: 'AppConfirm',
  emits: ['confirm', 'reject'],
  props: {
    message: {
      type: String,
      required: true
    },
    visible: {
      type: Boolean,
      required: true
    }
  },
  components: { AppModal }
}
</script>

<style scoped>
.button-wrapper {
  display: flex;
  justify-content: center;
}
p {
  font-weight: 500;
}
h4 {
  font-weight: 500;
}
</style>
