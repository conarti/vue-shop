<template>
  <app-modal
    :title="title"
    :visible="visible"
    @close="$emit('close')"
    width="40%"
  >
    <template v-if="type === 'auth'">
      <el-form
        :model="form"
        ref="loginForm"
        :rules="rules"
        status-icon
        label-width="50px"
        label-position="left"
      >
        <el-form-item
          label="Email"
          prop="email">
          <el-input
            v-model="form.email"
            placeholder="Введите почту"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="Pass"
          prop="password">
          <el-input
            v-model="form.password"
            placeholder="Введите пароль"
            show-password
          ></el-input>
        </el-form-item>

        <el-form-item label-width="auto">
          <el-row
            :gutter="20"
            type="flex"
            justify="end"
          >
            <el-col :span="0">
              <el-button
                type="text"
                @click="type = 'reg'"
              >Зарегистрироваться</el-button>
            </el-col>
            <el-col :span="0">
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
    </template>

    <template v-else-if="type === 'reg'">
      <el-form
        :model="regFormData"
        ref="regForm"
        :rules="regRules"
        status-icon
        label-width="50px"
        label-position="left"
      >
        <el-form-item
          label="Имя"
          prop="name">
          <el-input
            v-model="regFormData.name"
            placeholder="Как к вам обращаться?"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="Email"
          prop="email">
          <el-input
            v-model="regFormData.email"
            placeholder="Введите почту"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="Pass"
          prop="password">
          <el-input
            v-model="regFormData.password"
            placeholder="Введите пароль"
            show-password
          ></el-input>
        </el-form-item>

        <el-form-item
          label=""
          prop="passwordRepeat">
          <el-input
            v-model="regFormData.passwordRepeat"
            placeholder="Повторите пароль"
            show-password
          ></el-input>
        </el-form-item>

        <el-form-item label-width="auto">
          <el-row
            :gutter="20"
            type="flex"
            justify="end"
          >
            <el-col :span="0">
              <el-button
                type="text"
                @click="type = 'auth'"
              >Я уже зарегистрирован</el-button>
            </el-col>
            <el-col :span="0">
              <el-button
                style="width: 100%"
                type="primary"
                round
                @click="submitRegForm"
              >Зарегистрироваться</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </template>
  </app-modal>
</template>

<script>
import { computed, ref } from 'vue'
import { useLoginForm } from '@/use/login-form'
import { useRegForm } from '@/use/reg-form'
import AppModal from '@/components/ui/AppModal'

export default {
  name: 'CartAuthModal',
  emits: ['close', 'logged-in'],
  components: { AppModal },
  props: ['visible'],
  setup(_, { emit }) {
    const type = ref('reg')
    const title = computed(() => type.value === 'reg' ? 'Регистрация' : 'Вход на сайт')
    return {
      type,
      title,
      ...useLoginForm(() => emit('logged-in')),
      ...useRegForm(() => emit('logged-in'))
    }
  }
}
</script>
