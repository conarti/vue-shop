import { ref, watch } from 'vue'

export function useConfirm(handler) {
  const confirmVisible = ref(false)
  const confirmed = ref(false)
  const handlerOptions = ref(null)


  const confirm = data => {
    handlerOptions.value = data
    confirmVisible.value = true
  }

  watch(confirmed, value => {
    if (value) {
      handler(handlerOptions.value)
      confirmed.value = false
      confirmVisible.value = false
      handlerOptions.value = null
    }
  })

  return {
    confirmVisible,
    confirm,
    confirmed
  }
}
