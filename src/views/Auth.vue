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
import { useLoginForm } from '@/use/login-form'

export default {
  setup() {
    return {
      ...useLoginForm()
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
