<template>
  <el-container class="ehome-login" direction="horizontal">
    <el-main class="login-background">
      <div class="scroll-words-wrapper">
        <span>Hope you be</span>
        <div class="scroll-item-wrapper">
          <span>HAPPY</span>
          <span>SWEET</span>
          <span>OPTIMISM</span>
          <span>POSITIVE</span>
        </div>
      </div>
    </el-main>
    <el-aside width="400px" class="form-wrapper">
      <template v-if="!isRegister">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px" width="300px" class="form-list">
          <el-form-item label="账户号码" prop="username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="用户密码" prop="password">
            <el-input type="password" auto-complete="off" v-model="form.password" @keyup.enter.native="login"></el-input>
          </el-form-item>
        </el-form>
        <div class="button-wrapper">
          <el-button type="success" @click.stop="regist">注册</el-button>
          <el-button type="primary" @click.stop="login">登录</el-button>
        </div>
      </template>
      <template v-else>
        <register ref="register" class="form-list"></register>
        <div class="button-wrapper">
          <el-button type="success" @click.stop="backToLogin">返回</el-button>
          <el-button type="primary" @click.stop="sureToRegist">确认</el-button>
        </div>
      </template>
    </el-aside>
    <div class="loading" v-loading="isLoading" v-if="isLoading" element-loading-text="正在登陆..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)"></div>
  </el-container>
</template>
<script>
import {loginUrl, registUrl} from '@/api/index'
import register from '@/pages/register'
export default {
  name: 'login',
  data () {
    return {
      isRegister: false, // 是注册界面
      isLoading: false, // loading
      form: {},
      rules: {
        username: [
          { required: true, message: '请输入账户号码', trigger: 'blur' },
          { min: 4, max: 16, message: '长度在 4 到 16 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入账户密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  components: { register },
  methods: {
    login () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.isLoading = true
          setTimeout(() => {
            this.checkUserAndGetToken(this.form.username, btoa(this.form.password))
          }, 1000)
        }
      })
    },
    regist () {
      this.isRegister = true
    },
    checkUserAndGetToken (username, password) {
      this.$h.post(loginUrl, {username, password}, {
        success: (res) => {
          this.isLoading = false
          if (res.code === 0) {
            // 设置token并跳转
            this.$store.commit('setToken', res.data.token)
            this.$store.commit('SET_USER_INFO', res.data)
            this.$router.push('/main/home')
          } else {
            this.$warning('登录失败', '请输入正确的用户名和密码', 2000)
          }
        },
        fail: (errmsg) => {
          console.log('fail')
        }
      })
    },
    backToLogin () { // 返回登录
      this.$refs.register.formData = {}
      this.form = {}
      this.isRegister = false
    },
    sureToRegist () { // 确认注册
      let form = new FormData()
      form.append('username', this.$refs.register.formData.username)
      form.append('password', btoa(this.$refs.register.formData.password1)) // base64
      form.append('avatar', this.$refs.register.formData.avatar)
      form.append('address', this.$refs.register.formData.address)
      this.$refs.register.$refs.form.validate(valid => {
        if (valid) {
          this.$h.post(registUrl, form, {
            success: res => {
              if (res.code === 0) {
                this.isLoading = true
                setTimeout(() => {
                  this.checkUserAndGetToken(res.data.username, btoa(atob(res.data.password).split('#').join('')))
                }, 3000)
              }
            },
            fail: err => {
              console.log(err)
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="less">
@full-size: 100%;
@word-height: 48px;
@bg-degree: 120deg;
@form-width: 300px;
.ehome-login {
  height: @full-size;
  .login-background {
    position: relative;
    background-image: linear-gradient(@bg-degree, #e0c3fc 0%, #8ec5fc @full-size);
    .scroll-words-wrapper {
      width: @full-size;
      height: @word-height;
      overflow: hidden;
      display: flex;
      justify-content: center;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      font-size: @word-height - 5;
      & span {
        color: #66b1ff;  
        text-align: center;
        flex-basis: 50%;
      }
      .scroll-item-wrapper {
        display: flex;
        flex-direction: column;
        height: @word-height;
        width: 200px;
        animation: scroll-words 12s infinite;
        & span {
          height: @word-height;
        }
        & span:nth-child(1) {
          color: #e0c3fc;
        }
        & span:nth-child(2) {
          color: #f9a383;
        }
        & span:nth-child(3) {
          color: lightgreen;
        }
        & span:nth-child(4) {
          color: #67c23a;
        }
      }
    }
  }
  .form-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(@bg-degree,#8ec5fc 0,  #e0c3fc @full-size);
    .form-list {
      width: @form-width;
      .el-form-item__label {
        background-color: transparent;
      }
      .el-input__inner {
        background-color: transparent;
        border-color: #66b1ff;
        color: #000;
      }
    }
    .button-wrapper{
      display: flex;
      width: @form-width;
      height: 40px;
      button {
        width: @full-size;
      }
    }
  }
  .loading {
    position: absolute;
    width: 100%;
    height: 100%;
  }
}

@keyframes scroll-words {
  0% {
    transform: translate3d(0, @word-height, 0)
  }
  20% {
    transform: translate3d(0, 0px, 0)
  }
  40% {
    transform: translate3d(0, -(@word-height), 0)
  }
  60% {
    transform: translate3d(0, -(@word-height * 2), 0)
  }
  80% {
    transform: translate3d(0, -(@word-height * 3), 0)
  }
  99.9% {
    transform: translate3d(0, -(@word-height * 4), 0)
  }
  100% {
    transform: translate3d(0, -360px, 0)
  }
}
</style>
