import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost",
  headers: {
    'Access-Control-Allow-Origin': '*',
    'X-Requested-With': 'XMLHttpRequest',
    "Content-Type": "application/json",
  },
  withCredentials: true,
})

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('ACCESS_TOKEN');
  config.headers.Authorization = `Bearer ${token}`
  return config;
})

axiosClient.interceptors.response.use((response) => {
  return response
}, (error) => {
  const {response} = error;
  if (response.status === 401) {
    localStorage.removeItem('ACCESS_TOKEN')
  } else if (response.status === 404) {
    console.error(response.message);
  }

  throw error;
})

export default axiosClient