import Vue from 'vue';
import Router from 'vue-router';
import YandexMap from '@/components/YandexMap';
import List from '@/components/List';
import New from '@/components/New';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'YandexMap',
      component: YandexMap,
    },
    {
      path: '/list',
      name: 'List',
      component: List,
    },
    {
      path: '/new',
      name: 'New',
      component: New,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
