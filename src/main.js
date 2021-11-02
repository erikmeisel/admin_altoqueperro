require('dotenv').config()
import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Geocoder from "@pderas/vue2-geocoder";

Vue.config.productionTip = false

Vue.use(Geocoder, {
    defaultCountryCode: 'AR', // e.g. 'CA'
    defaultLanguage:    'es', // e.g. 'en'
    defaultMode:        'address', // or 'lat-lng'
    googleMapsApiKey:   process.env.API_KEY
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
