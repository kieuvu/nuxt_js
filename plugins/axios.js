export default function (context) {

  const $axios = context.$axios;

  $axios.defaults.headers.common['SBFW-Api-Token'] = 'SBFWANLAB2022';
  $axios.defaults.baseURL = "http://sbkintone.ga/api";


  $axios.onRequest(config => {
    const loggingUser = context.store.getters.loggingUser;

    if (loggingUser) {
      config.headers.Authorization = `Bearer ${loggingUser.access_token}`;
    }

    return config;
  });

  $axios.onResponse(response => {
    return response;
  });

  $axios.onError(async (error) => {
    const ignorePath = ['/login', '/refreshtoken'];
    const isIgnored = ignorePath.some(path => error.config.url.includes(path));
    const statusCode = error.response.status;
    const loggingUser = context.store.getters.loggingUser;


    if (statusCode === 401 && !isIgnored) {
      const originalRequest = error.config;
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const config = {
            headers: {
              Refreshtoken: loggingUser.refresh_token
            }
          };
          const response = await $axios.$post('/refreshtoken', {}, config);

          context.$cookies.set("loggingUser", response);
          // localStorage.setItem("loggingUser", JSON.stringify(response));
          await context.store.dispatch("setLoggingUser", response);

        } catch (error) {
          context.$cookies.remove("loggingUser");
          // localStorage.remove("loggingUser");
          context.store.dispatch("removeLoggingUser");
          context.redirect('/');
        };
      }
    }
    return Promise.reject(error);
  });

}
