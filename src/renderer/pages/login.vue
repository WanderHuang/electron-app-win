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
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" width="300px" class="form-list">
        <el-form-item label="账户号码" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input type="password" auto-complete="off" v-model="form.password"></el-input>
        </el-form-item>
      </el-form>
      <div class="button-wrapper">
        <el-button type="success" @click.stop="regist">注册</el-button>
        <el-button type="primary" @click.stop="login">登录</el-button>
      </div>
    </el-aside>
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
