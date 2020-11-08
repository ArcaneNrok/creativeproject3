import Vue from "vue";
import VueRouter from "vue-router";
import Home from '../views/Home.vue'
import Following from '../views/Following.vue'
import User from '../views/User.vue'

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: '/following',
    name: 'Following',
    component: Following
  },
  {
    path: '/user/:id',
    name: 'User',
    component: User
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
