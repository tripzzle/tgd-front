import { createRouter, createWebHistory } from 'vue-router'

 const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('@/views/MainView.vue'),

    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    },
      {
          path: '/mypage',
          name: 'mypage',
          component: () => import('@/views/MypageView.vue'),
      },
  ],
});

export default router;