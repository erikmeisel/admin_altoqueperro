<template lang="html">

  <section class="src-components-listar">
    <table class="table">
      <tr class="bg-success text-white">
          <th>ID</th>
          <th>Nombre</th>
          <th>e-mail</th>
          <th>Acciones</th>
      </tr>
      <tr class="bg-info text-white" v-for="(item,index) in data" :key="index">
          <td>{{ item.id }}</td>
          <td>{{ item.data.name }}</td>
          <td>{{ item.data.email }}</td>
          <td><button class="btn btn-warning" type="button"  @click="editar(item)">Editar</button> 
          <button class="btn btn-danger" type="button" @click="borrar(index,item)">Borrar</button></td>
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
</style>
