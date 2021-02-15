import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import regRules from '@/utils/form-validate-rules/reg'
import { ElMessage } from 'element-plus'

export function useRegForm(handleAfterLogin) {
  const router = useRouter()
  const store = useStore()

  const regForm = ref(null)

  const regFormData = reactive({
    email: '',
    password: '',
    passwordRepeat: '',
    name: ''
  })

  const submitRegForm = () => {
    regForm.value.validate(async valid => {
      if (valid && regFormData.password !== regFormData.passwordRepeat) {
        ElMessage({
          message: 'Пароли не совпадают',
          type: 'error'
        })
        return false
      }
      if (valid) {
        try {
          await store.dispatch('auth/registration', {
            email: regFormData.email,
            password: regFormData.password,
            name: regFormData.name
          })
          await store.dispatch('auth/getUsers')
          if (typeof handleAfterLogin === 'string') {
            router.push(handleAfterLogin)
          } else if (handleAfterLogin !== undefined){
            handleAfterLogin()
          }
          regFormData.email = regFormData.password = regFormData.passwordRepeat = ''
        } catch (e) {}
      } else {
        return false;
      }
    })
  }

  return {
    regFormData,
    regForm,
    submitRegForm,
    regRules
  }
}
