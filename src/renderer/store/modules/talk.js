const state = {
  id: null // 客户端id
}

const mutations = {
  SET_MY_ID (state, val) {
    state.id = val
  }
}

const actions = {}

const getters = {
  getId: state => {
    return state.id
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
