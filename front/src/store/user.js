
let user = window.localStorage.getItem("user");
let business = window.localStorage.getItem("business");

export default {
  state: {
    commerces: [],
    business: business ? JSON.parse(business) : {},
    commerce: {},
    user: user ? JSON.parse(user) : null
  },
  getters: {
    business(state) {
      return state.business
    },
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
    setBusiness(state, value) {
      window.localStorage.setItem("business", JSON.stringify(value));
      state.business = value;
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