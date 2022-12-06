import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: async () => import('@/ui/src/layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: async () => import('@/ui/src/pages/index/index-page.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: async () => import('@/ui/src/pages/ErrorNotFound.vue'),
  },
]

export default routes
