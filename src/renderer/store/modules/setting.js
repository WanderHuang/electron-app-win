const state = {
  userInfo: {} // 用户信息
}

const mutations = {
  SET_USER_INFO (state, val) {
    console.log(val)
    state.userInfo = val
  }
}

const actions = {}

const getters = {
  getUserInfo: state => {
    console.log(state.userInfo)
    return state.userInfo
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
