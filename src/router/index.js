import {createRouter, createWebHistory} from 'vue-router'

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
        {
            path: '/schedule/:id',
            name: 'scheduleDetail',
            component: () => import('@/components/schedule/detail/ScheduleDetailView.vue'),
        },
        {
            path: '/schedule/write',
            name: 'schedule',
            component: () => import('@/components/schedule/write/view/ScheduleWriteView.vue'),
        },
        {
            path: '/login/oauth2/code/:where',
            name: 'oauth2',
            component: () => import('@/views/OAuth2View.vue'),

        },

    ],

});

export default router;