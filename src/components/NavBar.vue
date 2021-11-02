<template lang="html">
  <section class="src-components-nav-bar">
        <v-tabs align-with-title>
          <v-tab to="/vets">Veterinarias</v-tab>
          <v-tab to="/shelters">Hogares de Transito</v-tab>
          <v-tab to="/users">Usuarios</v-tab>
        </v-tabs>
  </section>
</template>

<script lang="js">

  export default  {
    name: 'src-components-nav-bar',
    props: [],
    mounted () {

    },
    data () {
      return {

      }
    },
    methods: {

    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-nav-bar {

  }
</style>
