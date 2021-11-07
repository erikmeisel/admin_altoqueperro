<template lang="html">

  <section class="src-components-configuracion">
    <h1>Configración de ponderación de valores</h1>
    <v-simple-table>
      <tbody>
      <tr class="bg-info text-white">
          <td>Tipo de Mascota</td>
          <td><v-btn color="warning" fab x-small @click="res('type')">-</v-btn> {{config.type}} <v-btn color="warning" fab x-small @click="add('type')">+</v-btn></td>
      </tr>
      <tr class="bg-info text-white">
          <td>Tamaño</td>
          <td><v-btn color="warning" fab x-small @click="res('size')">-</v-btn> {{config.size}} <v-btn color="warning" fab x-small @click="add('size')">+</v-btn></td>
      </tr>
      <tr class="bg-info text-white">
          <td>Sexo</td>
          <td><v-btn color="warning" fab x-small @click="res('sex')">-</v-btn> {{config.sex}} <v-btn color="warning" fab x-small @click="add('sex')">+</v-btn></td>
      </tr>
      <tr class="bg-info text-white">
          <td>Color Pelaje</td>
          <td><v-btn color="warning" fab x-small @click="res('color')">-</v-btn> {{config.color}} <v-btn color="warning" fab x-small @click="add('color')">+</v-btn></td>
      </tr>
      <tr class="bg-info text-white">
          <td>Largo Pelaje</td>
          <td><v-btn color="warning" fab x-small @click="res('coatSize')">-</v-btn> {{config.coatSize}} <v-btn color="warning" fab x-small @click="add('coatSize')">+</v-btn></td>
      </tr>
      <tr class="bg-info text-white">
          <td>Color de ojos</td>
          <td><v-btn color="warning" fab x-small @click="res('eyecolor')">-</v-btn> {{config.eyecolor}} <v-btn color="warning" fab x-small @click="add('eyecolor')">+</v-btn></td>
      </tr>
      <tr class="bg-info text-white">
          <td>Total</td>
          <td>{{this.suma}}</td>
      </tr>

      </tbody>
    </v-simple-table>  
    <v-btn  color="warning" :disabled="this.suma!=100" @click="guardar">Guardar</v-btn>
  
  </section>

</template>

<script lang="js">
  import * as fb from '../firebase'
  export default  {
    name: 'src-components-configuracion',
    props: [],
    mounted () {
       fb.get("config","config").then(it=>{
         console.log(it)
        if (it[0].data.size>0)this.config=it[0].data
       })
    },
    data () {
      return {
        config:{
          coat:0,
          eyecolor:0,
          sex:0,
          size:0,
          type:0,
          coatSize:0,
          color:0
        }
      }
    },
    methods: {
      guardar() {
        fb.update("config","config",this.config).then((ret)=>{
          alert("Cambios guardados")
          console.log(ret)
        })
      },
      add(variable) {
        if (this.config[variable]<100) this.config[variable]++
      },
      res(variable) {
        if (this.config[variable]>0) this.config[variable]--
      }

    },
    computed: {
      suma() {
        let  sum  = 0
        for (let it in this.config) {
          sum = sum + this.config[it]
        }
        return sum
      }
    }
}


</script>

<style scoped lang="scss">
  .src-components-configuracion {

  }
  
  h1{
    margin-top: 20px;
    margin-bottom: 5px;
    text-align-last: center;
  }

  td{
    font-size: 20px;
  }
</style>
