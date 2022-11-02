import { Store } from 'vuex';

const createStore = () => {
  return new Store({
    state: {
      userAccounts: [],
      userDepartments: [],
    },

    mutations: {
      setUserAccounts(state, payload) {
        state.userAccounts = payload;
      },

      setUserDepartment(state, payload) {
        state.userDepartments = payload;
      },

      addNewUser(state, payload) {
        state.userAccounts.push(payload);
      },

      removeUser(state, payload) {
        state.userAccounts = state.userAccounts.filter(user => user.id !== payload);
      },

      updateUsersList(state, payload) {
        state.userAccounts = [
          payload,
          ...state.userAccounts.filter(user => user.id !== payload.id),
        ];
      }
    },

    actions: {
      nuxtServerInit(context, payload) {
      },

      createNewUser: async function (context, payload) {
        const response = await this.$axios.$post("admin/register", payload);
        if (response?.error || !response?.status) {
          return {
            status: false,
            data: response.details
          };
        } else {
          context.commit("addNewUser", response.details);
          return {
            status: true,
            data: response.details
          };
        }
      },

      updateUser: async function (context, payload) {
        const response = await this.$axios.$post(`admin/user/${payload.id}/update`, payload.data);
        if (response?.error || !response?.status) {
          return {
            status: false,
            data: response.details
          };
        } else {
          context.commit("updateUsersList", response.details);
          return {
            status: true,
            data: response.details
          };
        }
      },

      deleteUser: async function (context, payload) {
        const response = await this.$axios.$post(`admin/user/${payload}/delete`);
        if (response?.error || !response?.status) {
          return {
            status: false,
            data: response.details
          };
        } else {
          context.commit("removeUser", payload);
          return {
            status: true,
            data: response.details
          };
        }
      },

      fetchUserAccounts: async function (context, payload) {
        const response = await this.$axios.$get("admin/users");
        context.commit('setUserAccounts', response);
      },

      fetchUserDepartments: async function (context, payload) {
        const response = await this.$axios.$get("admin/departments");
        context.commit('setUserDepartment', response);
      },

      login: async function (context, payload) {
        const response = await this.$auth.loginWith('local', {
          data: payload
        });

        if (response.data?.error) {
          return {
            status: false,
            data: response.data.details
          };
        } else {
          return {
            status: true,
          };
        }
      },

      logout: async function (context, payload) {
        await this.$auth.logout('local');
      }
    },

    getters: {
      isAuthenticated(state) {
        return state.auth.loggedIn;
      },

      loggedInUser(state) {
        return state.auth.user;
      },

      userAccounts(state) {
        return state.userAccounts.sort((a, b) => a.id - b.id);
      },

      userDepartments(state) {
        return state.userDepartments;
      }
    },
  });
};

export default createStore;





