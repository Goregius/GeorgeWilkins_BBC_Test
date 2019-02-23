import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/review',
      name: 'review',
      component: () => import(/* webpackChunkName: "review" */ './views/Review.vue'),
    },
    {
      path: '/completed',
      name: 'completed',
      component: () => import(/* webpackChunkName: "completed" */ './views/Completed.vue'),
    },
  ]
});

router.beforeEach((to, from, next) => {
  store.dispatch('initialiseStore').then(() => {
    if (!to.name) return;
    if (store.state.completed && to.name !== 'completed') {
      next({ name: 'completed' });
    }
    else if (store.state.allArticlesRead && !store.state.completed && to.name !== 'review') {
      next({ name: 'review' });
    }
    else if (!store.state.allArticlesRead && !store.state.completed && to.name !== 'home') {
      next({ name: 'home' });
    }
    else {
      next();
    }
  })
});

export default router;
