import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/index';
Vue.use(VueRouter);

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/lists',
    name: 'Todo',
    component: () => import('../views/Lists.vue'),
  },
  {
    path: '/list/:id',
    name: 'List',
    component: () => import('../views/List.vue'),
  },
  {
    path: '/',
    name: 'Auth',
    component: () => import('../views/Auth.vue'),
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: () => import ('../views/Calendar.vue')
  },
  {
    path: '/today',
    name: 'Plan',
    component: () => import ('../views/Plan.vue')
  },
  {
    path: '/shopList',
    name: 'ShopList',
    component: () => import ('../views/ShopList.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (store.state.auth.user) {
    if (to.name === 'Auth') {
      router.push({ name: 'Home' });
    } else {
      next();
    }
  } else if (to.name === 'Auth') {
    next();
  } else {
    router.push({ name: 'Auth' });
  }
});

export default router;
