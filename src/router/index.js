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
    path: '/reg',
    name: 'Reg',
    component: () => import('../views/Reg.vue'), 
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (store.state.auth.user) {
    if (to.name === 'Auth' || to.name === 'Reg') {
      router.push({ name: 'Home' });
    } else {
      next();
    }
  } else if (to.name === 'Auth' || to.name === 'Reg') {
    next();
  } else {
    let user = JSON.parse(localStorage.getItem('user'));
    if(user && user.expirationDate >= new Date().getTime()) {
      store.dispatch('relogUser', user);
      store.dispatch('loadLists');
      next();
    } else {
      router.push({ name: 'Auth' });
    }
  }
});

export default router;
