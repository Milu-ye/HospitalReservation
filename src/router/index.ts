import { createRouter, createWebHistory } from 'vue-router'
export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/home',
      component: () => import('@/views/home/index.vue'),
    },
    {
      path: '/hospital',
      component: () => import('@/views/hospital/index.vue'),
      redirect: '/hospital/register',
      children: [
        {
          path: 'register',
          component: () => import('@/views/hospital/register/index.vue'),
        },
        {
          path: 'detail',
          component: () => import('@/views/hospital/detail/index.vue'),
        },
        {
          path: 'notice',
          component: () => import('@/views/hospital/notice/index.vue'),
        },
        {
          path: 'close',
          component: () => import('@/views/hospital/close/index.vue'),
        },
        {
          path: 'search',
          component: () => import('@/views/hospital/search/index.vue'),
        },
      ],
    },
    {
      path: '/wxlogin',
      component: () => import('@/views/wxlogin/index.vue'),
    },
    {
      path: '/',
      redirect: '/home',
    },
  ],
  //滚动行为
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})
