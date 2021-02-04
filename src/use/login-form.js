import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { reactive, ref } from 'vue'
import { ElNotification } from 'element-plus'

export function useLoginForm() {
  const router = useRouter()
  const store = useStore()
  const route = useRoute()

  if (route.query?.message === 'auth') {
    ElNotification({
      title: 'Доступ к странице блокирован',
      message: 'Необходимо войти в аккаунт',
      type: 'warning'
    })
  }

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
          router.push('/admin')
        } catch (e) {}
      } else {
        return false;
      }
    })
  }

  const validatePass = (_, value, callback) => {
    const regexp = /[а-яё]/i;
    if (regexp.test(value)) {
      callback(new Error('Пароль не может содержать кириллицу'))
    } else {
      callback()
    }
  }

  const rules = {
    email: [
      { type: 'email', required: true, message: 'Пожалуйста, введите корректную почту', trigger: 'blur' },
    ],
    password: [
      { required: true, message: 'Пожалуйста, введите пароль', trigger: 'blur' },
      { validator: validatePass, trigger: ['change', 'blur'] },
      { min: 6, message: 'Длина пароля не менее 6 символов', trigger: ['change', 'blur'] }
    ]
  }

  return {
    form,
    loginForm,
    submitForm,
    rules
  }
}
