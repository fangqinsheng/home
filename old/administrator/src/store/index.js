import Vue from "vue";
import Vuex from "vuex";
import app from "./modules/app";
import permission from "./modules/permission";
// import admin from "./modules/admin";
import tabPane from "./modules/tabspane";
import getters from "./getters";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    // permission,
    // admin,
    tabPane
  },
  getters
});

export default store;
