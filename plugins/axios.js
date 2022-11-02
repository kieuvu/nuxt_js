export default function (context) {

  const $axios = context.$axios;

  $axios.defaults.headers.common['SBFW-Api-Token'] = 'SBFWANLAB2022';
  $axios.defaults.baseURL = "http://sbkintone.ga/api";

  $axios.onRequest(config => {
    const accessToken = context.$auth.strategy.token.get();
    const refreshToken = context.$auth.strategy.refreshToken.get();

    if (accessToken) {
      $axios.defaults.headers.common.Authorization = accessToken;
      $axios.defaults.headers.common.Refreshtoken = refreshToken;
    }

    return config;
  });

  $axios.onResponse(response => {
    return response;
  });

  $axios.onError(error => {
    return Promise.reject(error);
  });
}
