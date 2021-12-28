import { createStore } from 'vuex'

export default createStore({
  state: {
    count: 0,
  },
  getters: {
    double (state) {
      return state.count * 2
    }
  },
  mutations: {
    ADD_COUNT(state) {
      state.count++
    }
  },
  actions: {
    incrementACTION(context) {
      context.commit("ADD_COUNT")
    }
  },
  modules: {
  }
})
