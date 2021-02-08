<template>
  <el-card>
    <template #header>
      <h1>Войти</h1>
    </template>
    <el-form :model="form" ref="loginForm" :rules="rules" status-icon label-width="50px" label-position="left">
      <el-form-item
        label="Email"
        prop="email">
        <el-input v-model="form.email" placeholder="Введите почту" prefix-icon="el-icon-user-solid"></el-input>
      </el-form-item>
      <el-form-item
        label="Pass"
        prop="password">
        <el-input v-model="form.password" placeholder="Введите пароль" show-password></el-input>
      </el-form-item>
      <el-form-item label-width="auto">
        <el-row type="flex" justify="end">
          <el-col :span="6">
            <el-button
              style="width: 100%"
              type="primary"
              round
              @click="submitForm"
            >Войти</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ElNotification } from 'element-plus'
import { reactive, ref } from 'vue'

export default {
  setup() {
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
}
</script>

<style scoped>
h1 {
  font-size: 20px;
  font-weight: 500;
}
</style>
