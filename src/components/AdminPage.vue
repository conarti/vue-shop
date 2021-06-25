<template>
  <el-card v-loading="loading" >
    <template #header>
      <el-row
        type="flex"
        justify="space-between"
      >
        <el-col :span="0">
          <h2 class="card-title">{{ title }}</h2>
        </el-col>
        <el-col
          :span="0"
          style="display: flex; align-items: center;"
        >
          <slot name="button" />
        </el-col>
      </el-row>
    </template>

    <slot />
  </el-card>
</template>

<script>
export default {
  name: 'AdminPage',
  props: {
    title: String,
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>
