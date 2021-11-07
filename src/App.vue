<template>
  <v-app style="background: #F0CD71">
    <Banner/>
    <NavBar />
    <v-main>
    <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Banner from './components/Banner.vue'
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',

  components: {
    NavBar,
    Banner
  }
}
</script>


