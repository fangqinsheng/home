const tabPane = {
  state: {
    openTab: [],
    cacheTab: []
  },
  mutations: {
    ADD_TAB: (state, tab) => {
      if (state.openTab.some(t => t.path === tab.path)) return;
      state.openTab.push(
        Object.assign({}, tab, {
          title: tab.meta.title || "no-name"
        })
      );
      if (!tab.meta.noCache) {
        state.cacheTab.push(tab.name);
      }
    },
    DELETE_CURRENT_TAB: (state, tab) => {
      // 需要理解.entries方法;  splice(i, v),其中i代表数组的序号，v代表删除的数量
      for (const [i, t] of state.openTab.entries()) {
        if (t.path === tab.path) {
          state.openTab.splice(i, 1);
          break;
        }
      }
      for (const i of state.cacheTab) {
        if (i === tab.path) {
          const index = state.cacheTab.indexOf(i);
          state.cacheTab.splice(index, 1);
          break;
        }
      }
    },
    DELETE_OTHER_TAB: (state, tab) => {
      for (const [i, t] of state.openTab.entries()) {
        if (t.path === tab.path) {
          state.openTab = state.openTab.slice(i, i + 1);
          break;
        }
      }
      for (const i of state.cacheTab.entries()) {
        if (i === tab.path) {
          const index = state.cacheTab.indexOf(i);
          state.cacheTab = state.cacheTab.slice(index, index + 1);
          break;
        }
      }
    },
    DELETE_ALL_TAB: state => {
      state.openTab = [];
      state.cacheTab = [];
    }
  },
  actions: {
    addCurrentTab({ commit }, tab) {
      commit("ADD_TAB", tab);
    },
    delCurrentTab({ commit, state }, tab) {
      return new Promise(resolve => {
        commit("DELETE_CURRENT_TAB", tab);
        resolve([...state.openTab]);
      });
    },
    delOthersTab({ commit, state }, tab) {
      return new Promise(resolve => {
        commit("DELETE_OTHER_TAB", tab);
        resolve([...state.openTab]);
      });
    },
    delAllTab({ commit, state }) {
      return new Promise(resolve => {
        commit("DELETE_ALL_TAB");
        resolve([...state.openTab]);
      });
    }
  }
};

export default tabPane;
