<template>
  <el-form ref="form" :model="formData" :rules="rules" label-width="80px" width="300px" class="form-list">
    <el-form-item label="账户号码" prop="username">
      <el-input v-model="formData.username"></el-input>
    </el-form-item>
    <el-form-item label="用户密码" prop="password1">
      <el-input type="password" auto-complete="off" v-model="formData.password1"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="password2">
      <el-input type="password" auto-complete="off" v-model="formData.password2"></el-input>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data () {
    return {
      formData: {
        username: '',
        password1: '',
        password2: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入账户号码', trigger: 'blur' },
          { min: 4, max: 16, message: '长度在 4 到 16 个字符', trigger: 'blur' }
        ],
        password1: [
          { required: true, message: '请输入账户密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '请输入账户密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
          {validator: this.checkPassword, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    checkPassword (rule, value, callback) {
      if (this.formData.password1 === this.formData.password2) {
        callback()
      } else {
        callback(new Error('密码不一致 请检查'))
      }
    }
  }
}
</script>
<style>

</style>
