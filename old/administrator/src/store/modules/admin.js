import { getToken, removeToken, setToken, setRoles } from "@/utils/auth";
import { login, logout, getInfo } from "@/api/login";
import router, { resetRouter } from "@/router";

const admin = {
  state: {
    token: getToken(),
    name: "",
    avatar: "",
    desc: "",
    roles: []
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    }
  },
  actions: {
    login({ commit }, data) {
      return new Promise((resolve, reject) => {
        login(data)
          .then(response => {
            const res = response.data;
            commit("SET_TOKEN", res.token);
            // commit("SET_ROLES", res.admin.roleType);
            setToken(res.token);
            // setRoles(res.admin.roleType);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // get user info
    getInfo({ commit }) {
      return new Promise((resolve ) => {
        const data = ["superAdmin"];
        commit("SET_ROLES", data);
        resolve(data);
      });
    },

    // user logout
    logout({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            commit("SET_TOKEN", "");
            commit("SET_ROLES", []);
            removeToken();
            resetRouter();
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // remove token
    resetToken({ commit }) {
      return new Promise(resolve => {
        commit("SET_TOKEN", "");
        commit("SET_ROLES", []);
        removeToken();
        resolve();
      });
    }
  }
};

export default admin;
