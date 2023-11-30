import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { LocalStorage } from "quasar";

const production = 0;
const baseURL = production ? process.env.API_URL_PROD : process.env.API_URL;

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "X-Requested-With": `XMLHttpRequest`,
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
    // Authorization: "Bearer " + token,
  },
  data: {},
});

api.interceptors.request.use(
  async (config) => {
    let token = LocalStorage.getItem("access_token");
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

const file_url = production ? process.env.FILE_URL_PROD : process.env.FILE_URL;
const vue_url = production ? "https://maxirifa.com" : "http://localhost:9000";

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
  app.config.globalProperties.$FILE_URL = file_url;
})

export { api, file_url, vue_url }
