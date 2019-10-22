import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Login from '../views/Auth/Login'
import Register from '../views/Auth/Register'
import DriverTrip from '../views/Driver/Trip'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    }, {
      path: '/driver/register',
      name: 'Register',
      component: Register
    }, {
      path: '/driver/trip/:driverId',
      name: 'DriverTrip',
      component: DriverTrip,
      meta: { requiredAuth: true, adminBar: false }
    }, {
      path: '/drivers',
      name: 'DriverList',
      component: () => import('../views/Admin/Drivers.vue'),
      meta: { requiredAuth: true, adminBar: true }
    }, {
      path: '/trips',
      name: 'Trips',
      component: () => import('../views/Admin/Trips.vue'),
      meta: { requiredAuth: true, adminBar: true }
    }, {
      path: '/settings',
      name: 'Settings',
      component: () => import('../views/Admin/Settings.vue'),
      meta: { requiredAuth: true, adminBar: true }

    }, {
      path: '/trip/create/:driverId?',
      name: 'CreateTrip',
      component: () => import('../views/Admin/CreateTrip.vue'),
      meta: { requiredAuth: true, adminBar: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiredAuth)) {
    if (store.getters['Auth/IsLoggedIn']) {
      next()
    } else {
      next({ name: 'Login' })
    }
  } else {
    next()
  }
})
export default router
