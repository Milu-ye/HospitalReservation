import { createRouter, createWebHistory } from 'vue-router'
export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/home',
      component: () => import('@/views/home/index.vue'),
      meta: { title: '首页' },
    },
    {
      path: '/hospital',
      component: () => import('@/views/hospital/index.vue'),
      redirect: '/hospital/register',
      children: [
        {
          path: 'register',
          component: () => import('@/views/hospital/register/index.vue'),
          meta: {
            title: '预约挂号',
          },
        },
        {
          path: 'detail',
          component: () => import('@/views/hospital/detail/index.vue'),
          meta: {
            title: '医院详情',
          },
        },
        {
          path: 'notice',
          component: () => import('@/views/hospital/notice/index.vue'),
          meta: {
            title: '预约通知',
          },
        },
        {
          path: 'close',
          component: () => import('@/views/hospital/close/index.vue'),
          meta: {
            title: '听诊信息',
          },
        },
        {
          path: 'search',
          component: () => import('@/views/hospital/search/index.vue'),
          meta: {
            title: '查询',
          },
        },
        {
          path: 'register_step1',
          component: () =>
            import('@/views/hospital/register/register_step1/index.vue'),
          meta: {
            title: '预约第一步',
          },
        },
        {
          path: 'register_step2',
          name: 'register_step2',
          component: () =>
            import('@/views/hospital/register/register_step2/index.vue'),

          meta: {
            title: '预约第二步',
          },
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
          meta: {
            title: '实名认证',
          },
        },
        {
          path: 'order',
          name: 'order',
          component: () => import('@/views/user/order/index.vue'),
          meta: {
            title: '挂号订单',
          },
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('@/views/user/profile/index.vue'),
          meta: {
            title: '账号信息',
          },
        },
        {
          path: 'patient',
          name: 'patient',
          component: () => import('@/views/user/patient/index.vue'),
          meta: {
            title: '就诊人管理',
          },
        },
        {
          path: 'feedback',
          name: 'feedback',
          component: () => import('@/views/user/feedback/index.vue'),
          meta: {
            title: '信息反馈',
          },
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
