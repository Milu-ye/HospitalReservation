import axios from 'axios'
import { ElMessage } from 'element-plus'
const request = axios.create({
  timeout: 10000,
  baseURL: '/api',
})
request.interceptors.request.use(config => {
  return config
})
request.interceptors.response.use(
  res => {
    return res.data
  },
  err => {
    return Promise.reject(err)
  },
)
export default request
