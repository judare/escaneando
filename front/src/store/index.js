import { createStore } from 'vuex'

let config = window.localStorage.getItem("config");

export default createStore({
  state: {
    config: config ? JSON.parse(config) : {
      style: "list",
      darkMode: true,
      cellphone: null
    },
    visitant: {
      Commerce: {}
    }
  },
  getters: {
    config(state) {
      return state.config
    },
    visitant(state) {
      return state.visitant;
    }
  },
  mutations: {
    setConfig(state, value) {
      state.config = value;
    },
    setVisitant(state, value) {
      state.visitant = value;
    }
  },
  actions: {
  },
  modules: {
  }
})
