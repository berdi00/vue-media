import type {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios'
import baseAxios from 'axios'
import router from '@/router'
const baseURL = import.meta.env.VITE_API_URL?.toString()
export const getAxios = (): AxiosInstance => {
  const instance = baseAxios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
  })
  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    }
    return config
  })

  instance.interceptors.response.use(
    response => response,
    async (error: AxiosError) => {
      if (error.response?.status === 403 || error.response?.status === 401) {
        localStorage.removeItem('token')
        router.push('/login')
      }
      return Promise.reject(error)
    },
  )

  return instance
}

const axios = getAxios()
export default axios
