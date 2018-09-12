<template>
  <el-container class="ehome-login">
    <el-header class="header">WELCOME TO HOME PET!</el-header>
    <el-container class="form-wrapper">
      <el-main>
        <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="form">
          <el-form-item label="账户号码" prop="username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="用户密码" prop="password">
            <el-input type="password" auto-complete="off" v-model="form.password"></el-input>
          </el-form-item>
        </el-form>
        <div class="button-wrapper">
          <el-button type="success" round @click.stop="regist">注册</el-button>
          <el-button type="primary" round @click.stop="login">登录</el-button>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import {loginUrl} from '@/api/index'
export default {
  name: 'login',
  data () {
    return {
      form: {},
      rules: {
        username: [
          { required: true, message: '请输入账户号码', trigger: 'blur' },
          { min: 4, max: 16, message: '长度在 4 到 16 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入账户密码', trigger: 'blur' },
          { min: 4, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$h.post(loginUrl, this.form, {
            success: (res) => {
              if (res.code === 0) {
                // 设置token并跳转
                this.$store.commit('setToken', res.data.token)
                this.$store.commit('SET_USER_INFO', res.data)
                this.$router.push(this.$route.query.redirectTo)
              }
            },
            fail: (errmsg) => {
              console.log('fail')
            }
          })
        }
      })
    },
    regist () {
      console.log(`haven't open for registing`)
    }
  }
}
</script>
<style lang="less">
.ehome-login {
  height: 600px;
  background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
  .header {
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    font-family: 'Courier New', Courier, monospace
  }
  .form-wrapper{
    padding-right: 100px;
    padding-left: 200px;
    border: 2px dashed lightseagreen;
    .form {
      padding: 100px 0px 20px 100px;
    }
  }
  .button-wrapper{
    display: flex;
    justify-content: flex-end;
  }
}
</style>
