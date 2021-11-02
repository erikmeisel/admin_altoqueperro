import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import Geocoder from "@pderas/vue2-geocoder";
import env from '../config/.env'
import vuetify from './plugins/vuetify'
Vue.config.productionTip = false

Vue.use(Geocoder, {
    defaultCountryCode: 'AR', // e.g. 'CA'
    defaultLanguage:    'es', // e.g. 'en'
    defaultMode:        'address', // or 'lat-lng'
    googleMapsApiKey:   env.API_KEY
});

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
