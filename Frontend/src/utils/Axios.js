import axios from "axios";
import SummaryApi, { baseURL } from "../common/SummaryApi";

const Axios = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

Axios.interceptors.request.use(
  async(config) => {
    const accessToken = localStorage.getItem('accessToken')

    if(accessToken){
      config.headers.Authorization = `Bearer ${accessToken }`
    }

    // console.log(config);

    return config

  },
  (error) => {
    return Promise.reject(error)
  }
)

Axios.interceptors.request.use(
  (response) => {
    return response
  },

  async(error) => {
    let originalRequest = error.config

    if(error.response.this.status === 401 && !originalRequest.retry ){
      originalRequest.retry = true

      const refreshToken = localStorage.getItem("refreshToken")

      if(refreshToken){
        const newAccessToken = await refrehAceessToken(refreshToken)

        if(newAccessToken){
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
          return Axios(originalRequest)
        }
      }
    }

    return Promise.reject(error)
  }
)

const refrehAceessToken = async(refreshToken) =>{
  try {
    const response = await Axios({
      ...SummaryApi.refreshToken,
      header: {
        Authorization: `Bearer ${refreshToken}`
      }
    })

    const accessToken = response.data.data.accessToken
    localStorage.setItem('accessToken', accessToken)
    return accessToken

  } catch (error) {
    console.log(error);
    
  }
}

export default Axios;