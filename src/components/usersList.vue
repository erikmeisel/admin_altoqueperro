<template lang="html">

  <section class="src-components-listar">
    <v-simple-table>
      <thead>
          <th>ID</th>
          <th>Nombre</th>
          <th>e-mail</th>
          <th>Acciones</th>
      </thead><tbody>
      <tr class="bg-info text-white" v-for="(item,index) in data" :key="index">
          <td>{{ item.id }}</td>
          <td>{{ item.data.name }}</td>
          <td>{{ item.data.email }}</td>
          <td><v-btn small color="yellow"  @click="editar(item)">Editar</v-btn> 
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
       fb.get("users").then(it=>{
          this.data= it
       })

    },
    data () {
      return {
        data:null
      }
    },
    methods: {
      nuevo() {
        this.$router.push("/usersedit")
      },
      borrar(idx,item) {
        if (confirm('Esta seguro de esto?')) {
          this.data.splice(idx,1)
          fb.del('users',item.id).then(ret => {
            console.log("Elemento Borrado de la DB")
            console.log(ret)
          })
        }
      },
      editar(item) {
        this.$router.push({name: 'usersedit', params: { data: item }})
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
