import router from './router'
import NProgress from 'nprogress-es'
import 'nprogress-es/nprogress.css'
import useUserStore from './store/modules/user'
const whiteList = [
  '/hospital/register',
  '/hospital/detail',
  '/hospital/notice',
  '/hospital/close',
  '/hospital/search',
  '/hospital',
  '/home',
]
router.beforeEach((to, from, next) => {
  const userstore = useUserStore()
  NProgress.start()
  let token = userstore.userInfo.token
  if (token) {
    next()
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      router.push({
        path: '/home',
      })
      userstore.visiable = true
    }
  }
})
router.afterEach((to, from) => {
  NProgress.done()
  document.title = to.meta.title as string
})
