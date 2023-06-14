import axios from 'axios'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

const api = axios.create()
let isRefresh = false

api.defaults.baseURL = process.env.REACT_APP_SERVER_URL

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  function (err) {
    return Promise.reject(err)
  },
)

// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data
  },
  async (err) => {
    const originalConfig = err.config

    // Access Token was expired
    if (err?.response?.status === 401 && !originalConfig._retry && !isRefresh) {
      if (Cookies.get('authToken')) {
        originalConfig._retry = true
        isRefresh = true

        const config = {
          headers: {
            Authorization: `Bearer ${Cookies.get('refreshToken')}`,
          },
        }
        return api
          .post(
            '/api/users/refreshToken',
            {
              refreshToken: Cookies.get('refreshToken'),
            },
            config,
          )
          .then((res) => {
            Cookies.set('authToken', res.token)
            Cookies.set('refreshToken', res.refreshToken)
            api.defaults.headers.common['Authorization'] = `Bearer ${res.token}`
            return api(originalConfig)
          })
          .catch((err) => {
            console.log(err)
            Cookies.remove('authToken')
            Cookies.remove('refreshToken')
            const navigate = useNavigate()
            navigate('/login')
          })
          .finally(() => {
            isRefresh = false
          })
      } else {
        window.location.pathname = '/login'
      }
    }
    return Promise.reject(err)
  },
)

export default api
