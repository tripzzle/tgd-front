import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      children: [
        {
          path: '/google',
          name: 'google',
          component: () => import('../views/LoginView.vue'),
          beforeEnter() {
            window.location.href = "https://accounts.google.com/o/oauth2/v2/auth?client_id=376187865800-t0lm9jejil6qms9v6414t4ns5r78sngs.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Flogin%2Foauth2%2Fcode%2Fgoogle&service=lso&o2v=2&theme=glif&flowName=GeneralOAuthFlow&scope=email%20profile&&response_type=code"
          }
        },
      ]
    }
  ]
})

export default router