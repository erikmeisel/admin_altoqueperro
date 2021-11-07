<template lang="html">
  <section class="src-components-nav-bar">
        <v-tabs center-active align-with-title v-if="$store.state.authenticated" >
          <v-menu
            bottom
            left
          >
            <template v-slot:activator="{ on, attrs }">
<v-tab  v-bind="attrs" v-on="on">Editar datos</v-tab>
            </template>
            <v-list>
              <v-list-item to="/vets"><v-list-item-title>Veterinarias</v-list-item-title>
              </v-list-item>
              <v-list-item to="/shelters"><v-list-item-title>Hogares de Transito</v-list-item-title>
              </v-list-item>              
              <v-list-item to="/users"><v-list-item-title>Usuarios</v-list-item-title>
              </v-list-item>              
              <v-list-item to="/pet"><v-list-item-title>Mascotas</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>          
          <v-tab to="/config">Configurar ponderacion estadística</v-tab>
          <v-tab to="/report">Reportes</v-tab>
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
