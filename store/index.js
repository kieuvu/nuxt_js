import { cookieParser } from "~/helper";

export const state = () => ({
  userAccounts: [],
  userDepartments: [],
  loggingUser: null
});

export const mutations = {
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
  },

  setLoggingUser(state, payload) {
    state.loggingUser = payload;
  }
};

export const actions = {
  nuxtServerInit(context, payload) {
  },

  async createNewUser(context, payload) {
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

  async updateUser(context, payload) {
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

  async deleteUser(context, payload) {
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

  async fetchUserAccounts(context, payload) {
    const response = await this.$axios.$get("admin/users");
    context.commit('setUserAccounts', response);
  },

  async fetchUserDepartments(context, payload) {
    const response = await this.$axios.$get("admin/departments");
    context.commit('setUserDepartment', response);
  },

  async login(context, payload) {
    const response = await this.$axios.$post('login', payload);

    if (response?.error) {
      return {
        status: false,
        data: response.details
      };
    } else {
      this.$cookies.set("loggingUser", response);
      localStorage.setItem("loggingUser", JSON.stringify(response));
      await context.dispatch("setLoggingUser", response);
      this.$router.push('/');
      return {
        status: true,
      };
    }
  },

  async logout(context, payload) {
    await this.$axios.$get("logout");
    this.$cookies.remove("loggingUser");
    localStorage.removeItem("loggingUser");
    await context.dispatch("removeLoggingUser");
    this.$router.push('/login');
  },

  setLoggingUser(context, payload) {
    context.commit("setLoggingUser", payload);
  },

  removeLoggingUser(context, payload) {
    context.commit("setLoggingUser", null);
  },

  initAuth(context, req) {
    let token;

    if (req) {
      if (req.headers && req.headers.cookie) {
        const listCookies = cookieParser(req.headers.cookie);
        token = JSON.parse(listCookies.loggingUser);
      }
    } else {
      token = JSON.parse(localStorage.getItem("loggingUser"));
    }

    context.dispatch("setLoggingUser", token);
  }
};

export const getters = {
  loggingUser(state) {
    return state.loggingUser;
  },

  userAccounts(state) {
    return [...state.userAccounts].sort((a, b) => a.id - b.id);
  },

  userDepartments(state) {
    return state.userDepartments;
  }
};






