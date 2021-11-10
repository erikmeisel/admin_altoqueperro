<template lang="html">

  <section class="src-components-listar" align="start">
    <h3>Lista de Mascotas Perdidas</h3>
    <v-simple-table >
      <thead >
          <th>ID</th>
          <th>Nombre</th>
          <th>Tipo</th>
          <th>Acciones</th>
      </thead><tbody>
      <tr class="bg-info text-white" v-for="(item,index) in data" :key="index">
          <td>{{ item.id }}</td>
          <td>{{ item.data.pet.name }}</td>
          <td>{{ item.data.pet.type }}</td>
          <td>
          <v-btn small color="red" @click="borrar(item)">Borrar</v-btn></td>
      </tr></tbody>
    </v-simple-table>
    <br>
    <h3>Lista de Mascotas Encontradas</h3>
    <v-simple-table>
      <thead>
          <th>ID</th>
          <th>Color</th>
          <th>Tipo</th>
          <th>Acciones</th>
      </thead><tbody>
      <tr class="bg-info text-white" v-for="(item,index) in encontradas" :key="index">
          <td>{{ item.id }}</td>
          <td>{{ item.data.pet.coat }}</td>
          <td>{{ item.data.pet.type }}</td>
          <td>
          <v-btn small color="red" @click="borrar2(item)">Borrar</v-btn></td>
      </tr></tbody>
    </v-simple-table>
  </section>
</template>

<script lang="js">
  import * as fb from '../firebase'
  export default  {
    name: 'src-components-listar',
    props: [],
    mounted () {
       fb.get("lostPetRequests").then(it=>{
          this.data= it
       })
       fb.get("foundPetRequests").then(it=>{
          this.encontradas= it
       })
    },
    data () {
      return {
        data:null,
        encontradas:null
      }
    },
    methods: {
      nuevo() {
        this.$router.push("/petedit")
      },
      borrar(idx,item) {
        if (confirm('Esta seguro de esto?')) {
          this.data.splice(idx,1)
          fb.del('lostPetRequests',item.id).then(ret => {
            console.log("Elemento Borrado de la DB")
            console.log(ret)
          })
        }
      },
      borrar2(idx,item) {
        if (confirm('Esta seguro de esto?')) {
          this.data.splice(idx,1)
          fb.del('foundPetRequests',item.id).then(ret => {
            console.log("Elemento Borrado de la DB")
            console.log(ret)
          })
        }
      },
      editar(item) {
        this.$router.push({name: 'petedit', params: { data: item,collection:"foundPetRequests" }})
      },
      editar2(item) {
        this.$router.push({name: 'petedit', params: { data: item,collection:"lostPetRequests" }})
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-listar {
    margin: 1em
  }
  h3{
    margin-top: 20px;
    margin-left: 15px;
  }

  .td{
    text-align-last: center;
  }

  thead{
    background: #D36D5E;
    text-align-last: left;
  }
</style>
