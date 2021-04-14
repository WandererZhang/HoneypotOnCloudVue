import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login";
import Log from "../views/Log";
import Status from "../views/Status";
import NotFound from "../views/NotFound";
import DataMap from "../views/DataMap";
import History from "../views/History";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: {name: "Log"}
  },
  {
    path: '/log',
    name: 'Log',
    component: Log,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '/map',
    name: 'Map',
    component: DataMap,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/status',
    name: 'Status',
    component: Status,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/history',
    name: 'History',
    component: History,
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/404",
    name: "notFound",
    component: NotFound
  },
  {
    path: "*",
    redirect: "/404"
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
