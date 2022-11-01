import { Store } from 'vuex';

const createStore = () => {
  return new Store({
    state: {
    },

    mutations: {
    },

    actions: {
      nuxtServerInit(context, payload) {
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
    },

    getters: {
      isAuthenticated(state) {
        return state.auth.loggedIn;
      },

      loggedInUser(state) {
        return state.auth.user;
      }
    },
  });
};

export default createStore;





