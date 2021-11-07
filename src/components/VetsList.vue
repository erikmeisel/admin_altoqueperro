<template lang="html">

  <section class="src-components-listar" >
    <v-btn id="btnAgregar" small color="success"   @click="nuevo">Agregar Veterinaria</v-btn>  
     <v-simple-table > 
      <thead >
          <th>ID</th>
          <th>Nombre</th>
          <th>Telefono</th>
          <th>Localidad</th>
          <th>Acciones</th>
      </thead><tbody>
      <tr class="bg-info text-white" v-for="(item,index) in vets" :key="index">
          <td>{{ item.id }}</td>
          <td>{{ item.data.name }}</td>
          <td>{{ item.data.phone }}</td>
          <td>{{ item.data.localidad }}</td>
          <td><v-btn small color="yellow" margin-left="20ps"  @click="editar(item)">Editar</v-btn> 
          <v-btn small color="red" @click="borrar(index,item)">Borrar</v-btn></td>
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
       fb.get("vets").then(it=>{
          this.vets= it
       })

    },
    data () {
      return {
        vets:null,
      }
    },
    methods: {
      nuevo() {
        this.$router.push("/vetsedit")
      },
      borrar(idx,item) {
        if (confirm('Esta seguro de esto?')) {
          this.vets.splice(idx,1)
          fb.del('vets',item.id).then(ret => {
            console.log("Elemento Borrado de la DB")
            console.log(ret)
          })
        }
      },
      editar(item) {
        this.$router.push({name: 'vetsedit', params: { data: item }})
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-listar {
    margin: 2em
  }
  .v-btn{
    margin-right: 10px;
    margin-left: 20px;
  }

  #btnAgregar{
    margin: 25px;
    padding: 20px;
  }

  thead{
    background: #D36D5E;
  }



</style>
