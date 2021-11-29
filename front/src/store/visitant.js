let config = window.localStorage.getItem("config");
let visitant = window.localStorage.getItem("visitant");

export default {
  state: {
    config: config ? JSON.parse(config) : {
      style: "list",
      darkMode: true,
      cellphone: null
    },
    visitant: visitant ? JSON.parse(visitant) : {
      Commerce: {}
    },
    products: []
  },
  getters: {
    config(state) {
      return state.config
    },
    visitant(state) {
      return state.visitant;
    },
    products(state) {
      return state.products;
    }
  },
  mutations: {
    setVisitantProducts(state, value) {
      state.products = value;
    },
    setConfig(state, value) {
      state.config = value;
    },
    setVisitant(state, value) {
      window.localStorage.setItem("visitant", JSON.stringify(value));
      state.visitant = value;
    },
    setCommerce(state, value) {
      state.visitant.Commerce = value;
    }
  },
  actions: {
  }
}
