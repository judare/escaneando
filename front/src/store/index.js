import { createStore } from 'vuex'

let config = window.localStorage.getItem("config");

export default createStore({
  state: {
    config: config ? JSON.parse(config) : {
      style: "list",
      darkMode: true,
      cellphone: null
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
