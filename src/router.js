import Vue from 'vue'
import VueRouter from 'vue-router'
import VetsEdit from './components/VetsEdit.vue'
import VetList from './components/VetsList.vue'
import sheltersEdit from './components/sheltersEdit.vue'
import sheltersList from './components/sheltersList.vue'
import usersEdit from './components/usersEdit.vue'
import usersList from './components/usersList.vue'
import Login from './components/Login.vue'
import petEdit from './components/petEdit.vue'
import petList from './components/petList.vue'
import config from './components/Configuracion.vue'

Vue.use(VueRouter)

export const router = new VueRouter({
  mode: 'hash',
  routes : [
      { path: '/', name:'Login', component: Login },
      { path: '/vetsedit', name: 'vetsedit', component: VetsEdit , meta: {requiresAuth: true}},
      { path: '/vets',  component: VetList , meta: {requiresAuth: true}},
      { path: '/sheltersedit',  name: 'sheltersedit', component: sheltersEdit , meta: {requiresAuth: true}},
      { path: '/shelters',  component: sheltersList , meta: {requiresAuth: true}},
      { path: '/usersedit',  name: 'usersedit', component: usersEdit , meta: {requiresAuth: true}},
      { path: '/users', component: usersList , meta: {requiresAuth: true}},
      { path: '/petedit',  name: 'petedit', component: petEdit , meta: {requiresAuth: true}},
      { path: '/pet', component: petList , meta: {requiresAuth: true}},
      { path: '/config', component: config , meta: {requiresAuth: true}},
  ]
})