import { createStore } from 'vuex'
import UserModule from "./user";
import VisitantModule from "./visitant";

export default createStore({
  modules: {
    UserModule,
    VisitantModule
  }
})
