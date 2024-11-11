import axios from 'axios'
import useUserStore from '@/store/modules/user'
const request = axios.create({
  timeout: 10000,
  baseURL: '/api',
})
request.interceptors.request.use(config => {
  const userStore = useUserStore()
  if (userStore.userInfo.token) {
    config.headers.token = userStore.userInfo.token
  }
  return config
})
request.interceptors.response.use(
  res => {
    return res.data
  },
  err => {
    //@ts-ignore
    ElMessage({
      type: 'error',
      message: err,
    })
    return Promise.reject(err)
  },
)
export default request
