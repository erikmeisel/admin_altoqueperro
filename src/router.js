import Vue from 'vue'
import VueRouter from 'vue-router'
import VetsEdit from './components/VetsEdit.vue'
import VetList from './components/VetsList.vue'
import sheltersEdit from './components/sheltersEdit.vue'
import sheltersList from './components/sheltersList.vue'

Vue.use(VueRouter)

export const router = new VueRouter({
  mode: 'history',
  routes : [
      { path: '/', redirect:'/agregar' },
      { path: '/vetsedit', name: 'vetsedit', component: VetsEdit },
      { path: '/vets', component: VetList },
      { path: '/sheltersedit', name: 'sheltersedit', component: sheltersEdit },
      { path: '/shelters', component: sheltersList },
  ]
})