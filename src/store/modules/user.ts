import { reactive, ref } from 'vue'
import type { LoginData, UserInfo } from '@/api/hospital/type'
import { reqUserLogin } from '@/api/hospital'
import { defineStore } from 'pinia'
const useUserStore = defineStore('User', () => {
  const visiable = ref<boolean>(false)
  const userInfo = reactive<UserInfo>(
    (JSON.parse(localStorage.getItem('USERINFO') as string) as UserInfo) ||
      ({} as UserInfo),
  )
  const userLogin = async (data: LoginData) => {
    const res = await reqUserLogin(data)
    if (res.code == 200) {
      Object.assign(userInfo, res.data)
      localStorage.setItem('USERINFO', JSON.stringify(userInfo))
      return 'ok'
    } else {
      return Promise.reject(Error(res.message))
    }
  }
  const logout = () => {
    userInfo.name = ''
    userInfo.token = ''
    localStorage.removeItem('USERINFO')
  }
  return {
    visiable,
    userLogin,
    userInfo,
    logout,
  }
})
export default useUserStore
