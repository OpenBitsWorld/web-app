import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import UserProfile from '@/views/UserProfile.vue';
import ExploreOpenBits from '@/views/ExploreOpenBits.vue';
import UserOBits from '@/views/UserOBits.vue';
import PublishOpenBit from '@/views/PublishOpenBit.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/user-profile',
    name: 'UserProfile',
    component: UserProfile,
  },
  {
    path: '/explore-openbits',
    name: 'ExploreOBits',
    component: ExploreOpenBits,
  },
  {
    path: '/user-obits',
    name: 'UserOBits',
    component: UserOBits,
  },
  {
    path: '/publish-openbit',
    name: 'PublishOBit',
    component: PublishOpenBit,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
