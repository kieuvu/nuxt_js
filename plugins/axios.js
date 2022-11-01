export default function ({ $axios, redirect }) {
  $axios.defaults.headers.common['SBFW-Api-Token'] = 'SBFWANLAB2022';
  $axios.defaults.baseURL = "http://sbkintone.ga/api";

  $axios.onRequest(config => {
    return config;
  });

  $axios.onResponse(response => {
    return response;
  });

  $axios.onError(error => {
    return Promise.reject(error);
  });
}
