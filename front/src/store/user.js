
let user = window.localStorage.getItem("user");

export default {
  state: {
    commerces: [],
    commerce: {},
    user: user ? JSON.parse(user) : null
  },
  getters: {
    user(state) {
      return state.user
    },
    commerce(state) {
      return state.commerce
    },
    commerces(state) {
      return state.commerces
    }
  },
  mutations: {
    setUser(state, value) {
      window.localStorage.setItem("user", JSON.stringify(value));
      state.user = value;
    },
    setCommerces(state, value) {
      state.commerces = value;
      state.commerce = value[0];
    },
    setCommerce(state, value) {
      state.commerce = value;
    }
  },
  actions: {
  }
};