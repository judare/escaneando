import { createStore } from 'vuex'

let config = window.localStorage.getItem("config");

export default createStore({
  state: {
    config: config ? JSON.parse(config) : {
      style: "card",
      darkMode: false,
    }
  },
  getters: {
    config(state) {
      return state.config
    }
  },
  mutations: {
    setConfig(state, value) {
      state.config = value;
    }
  },
  actions: {
  },
  modules: {
  }
})
