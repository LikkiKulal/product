import axios from 'axios';

const API_URL = 'https://xpanz-test.dotcod.in/api/v1/store-user/order/list';
const BEARER_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdG9yZVVzZXJJZCI6IjY2ODM4YmRjNDU1YmVkODJkNzJmZTgwOCIsInN0b3JlSWQiOiI2NjJiN2Y2ZWExNDdhMzZlZDk0M2FkOTQiLCJkZXZpY2UiOiI2NjgzOGJlZTQ1NWJlZDgyZDcyZmU4MWEiLCJleHAiOjE3MjAxNjAxODAsImlhdCI6MTcyMDE1Mjk4MH0.ewk_R0MjRQ37p4wfS-uZa8ex0sclTbdj_vvJ6cxYVLo'; // Replace with your actual token

const axiosInstance = axios.create({
  baseURL: 'https://xpanz-test.dotcod.in/api/v1/',
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = BEARER_TOKEN;
    config.headers.Device = JSON.stringify({
      "isMobile": true,
      "vendor": "LG",
      "model": "Nexus 5",
      "os": "Android",
      "osVersion": "6.0",
      "ua": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36"
    });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosInstance;