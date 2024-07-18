import axios from "axios";
import  BASE_URL  from "./ApiConfig";

const api = axios.create({
  baseURL: BASE_URL,
});

const onRequest = (config) => {
  config.headers.Authorization = localStorage?.getItem("api_key") || "";
  config.headers.user_customer_id = localStorage?.getItem("customer_id") || "";
  config.headers.user_id = localStorage?.getItem("id") || "";

  return config;
};

const onRequestError = (error) => Promise.reject(error);

api.interceptors.request.use(onRequest, onRequestError);

export default api;
