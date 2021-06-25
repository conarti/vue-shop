import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import rules from '@/utils/form-validate-rules/auth'

export function useLoginForm(handleAfterLogin) {
  const router = useRouter()
  const store = useStore()

  const loginForm = ref(null)

  const form = reactive({
    email: '',
    password: ''
  })

  const submitForm = () => {
    loginForm.value.validate(async valid => {
      if (valid) {
        try {
          await store.dispatch('auth/login', { ...form })
          if (typeof handleAfterLogin === 'string') {
            router.push(handleAfterLogin)
          } else if (handleAfterLogin !== undefined){
            handleAfterLogin()
          }
          form.email = form.password = ''
        } catch (e) {}
      } else {
        return false;
      }
    })
  }

  return {
    form,
    loginForm,
    submitForm,
    rules
  }
}
