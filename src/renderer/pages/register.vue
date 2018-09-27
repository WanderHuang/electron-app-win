<template>
  <el-form ref="form" :model="formData" :rules="rules" label-width="80px" width="300px" class="register-form-list">
    <el-form-item label="账户号码" prop="username">
      <el-input v-model="formData.username"></el-input>
    </el-form-item>
    <el-form-item label="用户密码" prop="password1">
      <el-input type="password" auto-complete="off" v-model="formData.password1"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="password2">
      <el-input type="password" auto-complete="off" v-model="formData.password2"></el-input>
    </el-form-item>
    <el-form-item label="用户头像" prop="avatar" class="setting-avatar">
      <img :src="formData.avatar"/>
      <el-button type="primary" @click="showAvatars = true" class="button-select">选择</el-button>
    </el-form-item>
    <el-form-item label="家庭住址" prop="address">
      <el-input v-model="formData.address"></el-input>
    </el-form-item>
    <avatar-picker :visible.sync="showAvatars" @avatarChosen="chooseAvatar"></avatar-picker>
  </el-form>
</template>
<script>
import avatarPicker from '@/components/common/avatarPicker'
export default {
  name: 'registerComp',
  components: { avatarPicker },
  data () {
    return {
      showAvatars: false,
      formData: {
        username: '',
        password1: '',
        password2: '',
        avatar: '',
        address: ''
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
        ],
        avatar: [{ required: true, message: '请选择头像', trigger: 'blur' }]
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
    },
    chooseAvatar (url) {
      this.formData.avatar = url
      this.showAvatars = false
    }
  }
}
</script>
<style lang="less">
.register-form-list {
  .el-form-item__content{
    display: flex;
    height: 40px;
    justify-content: space-around;
  }
}
</style>
