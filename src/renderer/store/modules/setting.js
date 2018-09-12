const state = {
  userInfo: {} // 用户信息
}

const mutations = {
  SET_USER_INFO (state, val) {
    state.userInfo = val
  }
}

const actions = {}

const getters = {
  getUserInfo: state => {
    return state.userInfo
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
