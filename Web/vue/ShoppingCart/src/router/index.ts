import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from 'pages/Products/index.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/shopping',
    name: 'shopping',
    component: () => import('pages/ShoppingCart/index.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
