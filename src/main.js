import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import Geocoder from "@pderas/vue2-geocoder";
import env from '../config/config.env'
import vuetify from './plugins/vuetify'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    authenticated: false
    
  },
  mutations: {
    Login() {
      this.state.authenticated = true
    }
  }
})
Vue.config.productionTip = false

Vue.use(Geocoder, {
    defaultCountryCode: 'AR', // e.g. 'CA'
    defaultLanguage:    'es', // e.g. 'en'
    defaultMode:        'address', // or 'lat-lng'
    googleMapsApiKey:   env.API_KEY
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.state.authenticated) {
      next({ name: 'Login' })
    } else {
      next() // go to wherever I'm going
    }
  } else {
    next() // does not require auth, make sure to always call next()!
  }
})
new Vue({
  router,
  vuetify,
  store:store,
  render: h => h(App)
}).$mount('#app')
