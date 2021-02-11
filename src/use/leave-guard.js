import { ref } from 'vue'
import { onBeforeRouteLeave, useRouter } from 'vue-router'

export function useLeaveGuard(isEdited) {
  const router = useRouter()

  const leave = ref(false)
  const canLeave = ref(false)
  const leaveTo = ref(null)

  const navigate = () => {
    leave.value = false
    canLeave.value = true
    router.push(leaveTo.value)
  }

  onBeforeRouteLeave(to => {
    leaveTo.value = to.path

    if (canLeave.value) {
      return true
    }
    if (!canLeave.value && isEdited.value) {
      leave.value = true
      return false
    }
    return true
  })

  return {
    leave,
    navigate
  }
}
