import Vue from 'vue';
import VueRouter from 'vue-router';
import UserProfile from '@/views/UserProfile.vue';
import ExploreOpenBits from '@/views/ExploreOpenBits.vue';
import ExploreOpenBit from '@/views/ExploreOpenBit.vue';
import ExploreOpenBitShares from '@/views/ExploreOpenBitShares.vue';
import UserOpenBits from '@/views/UserOpenBits.vue';
import PublishOpenBit from '@/views/PublishOpenBit.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/user-profile',
    name: 'UserProfile',
    component: UserProfile,
  },
  {
    path: '/explore-openbits',
    name: 'ExploreOpenBits',
    component: ExploreOpenBits,
  },
  {
    path: '/explore-openbit/:id',
    name: 'ExploreOpenBit',
    component: ExploreOpenBit,
  },
  {
    path: '/explore-openbit/:id/shares',
    name: 'ExploreOpenBitShares',
    component: ExploreOpenBitShares,
  },
  {
    path: '/user-openbits',
    name: 'UserOpenBits',
    component: UserOpenBits,
  },
  {
    path: '/publish-openbit',
    name: 'PublishOpenBit',
    component: PublishOpenBit,
  },
];

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes,
  /* scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash,
      };
    }
    return {
      offset: {
        x: 0,
        y: 1,
      },
    };
  }, */
});

export default router;
