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
