<template lang="html">

  <section class="src-components-listar">
    <button class="btn btn-success my-3" type="button" @click="nuevo()">Nuevo</button>
    <table class="table">
      <tr class="bg-success text-white">
          <th>ID</th>
          <th>Nombre</th>
          <th>Telefono</th>
          <th>Localidad</th>
          <th>Acciones</th>
      </tr>
      <tr class="bg-info text-white" v-for="(vet,index) in vets" :key="index">
          <td>{{ vet.id }}</td>
          <td>{{ vet.data.name }}</td>
          <td>{{ vet.data.phone }}</td>
          <td>{{ vet.data.localidad }}</td>
          <td><button class="btn btn-warning" type="button"  @click="editar(vet)">Editar</button> 
          <button class="btn btn-danger" type="button" @click="borrar(index,vet)">Borrar</button></td>
      </tr>
    </table>
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
        vets:null
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
    margin: 1em
  }
</style>
