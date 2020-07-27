import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import UserProfile from '@/views/UserProfile.vue';
import ExploreOpenBits from '@/views/ExploreOpenBits.vue';
import UserOpenBits from '@/views/UserOpenBits.vue';
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
    path: '/user-openbits',
    name: 'UserOpenBits',
    component: UserOpenBits,
  },
  {
    path: '/publish-openbit',
    name: 'PublishOBit',
    component: PublishOpenBit,
  },
];

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
