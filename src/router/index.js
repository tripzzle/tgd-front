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
            props: true,
        },
        {
            path: '/schedule/:id',
            name: 'scheduleDetail',
            component: () => import('@/components/schedule/detail/ScheduleDetailView.vue'),
        },
        {
            path: '/schedule/:id',
            name: 'dayDetail',
            component: () => import('@/components/schedule/detail/ScheduleDayDetailView.vue'),
        },
        {
            path: '/schedule/write',
            name: 'schedule',
            component: () => import('@/components/schedule/write/view/ScheduleWriteView.vue'),
        },
        {
            path: '/signup',
            name: 'signup',
            component: () => import('@/views/SignupView.vue'),

        },
    ],

});

export default router;