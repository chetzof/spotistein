import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/ui/src/layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('@/ui/src/pages/index/index-page.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('@/ui/src/pages/ErrorNotFound.vue'),
  },
]

export default routes
