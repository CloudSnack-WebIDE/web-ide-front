import axios from 'axios';

const api = axios.create({
  baseURL: 'https://kd438d3d42851a.user-app.krampoline.com',
  // baseURL: 'http://localhost:8080',
});

api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem('access_token') ||
      sessionStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken =
        localStorage.getItem('refresh_token') ||
        sessionStorage.getItem('refresh_token');
      if(refreshToken){
        try{
          originalRequest.headers.Authorization = `Bearer ${refreshToken}`;
          const response = await axios(originalRequest);
          if (response.status === 200) {
            const newAccessToken = response.data.access_token
            localStorage.setItem('access_Token', newAccessToken);
            api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
          }
        }catch(error){
          console.log(error);
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          sessionStorage.removeItem('access_token');
          sessionStorage.removeItem('refresh_token');
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
