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
        {
          path: 'register_step1',
          component: () =>
            import('@/views/hospital/register/register_step1/index.vue'),
        },
        {
          path: 'register_step2',
          name: 'register_step2',
          component: () =>
            import('@/views/hospital/register/register_step2/index.vue'),
        },
      ],
    },
    {
      path: '/wxlogin',
      component: () => import('@/views/wxlogin/index.vue'),
    },
    {
      path: '/user',
      component: () => import('@/views/user/index.vue'),
      redirect: '/user/certification',
      children: [
        {
          path: 'certification',
          name: 'certification',
          component: () => import('@/views/user/certification/index.vue'),
        },
        {
          path: 'order',
          name: 'order',
          component: () => import('@/views/user/order/index.vue'),
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('@/views/user/profile/index.vue'),
        },
        {
          path: 'patient',
          name: 'patient',
          component: () => import('@/views/user/patient/index.vue'),
        },
        {
          path: 'feedback',
          name: 'feedback',
          component: () => import('@/views/user/feedback/index.vue'),
        },
      ],
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
