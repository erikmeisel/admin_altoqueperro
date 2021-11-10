<template lang="html">

  <section class="src-components-configuracion"  align="center">
    <h1>Configración de ponderación de valores</h1>
    <v-simple-table >
      <tbody>
      <tr class="bg-info text-white">
          <td>Color de Pelo</td>
          <td><v-btn color="warning" fab x-small @click="res('coatColor')">-</v-btn> {{config.coatColor}} <v-btn color="warning" fab x-small @click="add('coatColor')">+</v-btn></td>
      </tr>
      <tr class="bg-info text-white">
          <td>Largo del pelo</td>
          <td><v-btn color="warning" fab x-small @click="res('coatSize')">-</v-btn> {{config.coatSize}} <v-btn color="warning" fab x-small @click="add('coatSize')">+</v-btn></td>
      </tr>
      <tr class="bg-info text-white">
          <td>Color de ojos</td>
          <td><v-btn color="warning" fab x-small @click="res('eyecolor')">-</v-btn> {{config.eyecolor}} <v-btn color="warning" fab x-small @click="add('eyecolor')">+</v-btn></td>
      </tr>
      <tr class="bg-info text-white">
          <td>Puntaje mínimo</td>
          <td><v-btn color="warning" fab x-small @click="res('minScoreValue')">-</v-btn> {{config.minScoreValue}} <v-btn color="warning" fab x-small @click="add('minScoreValue')">+</v-btn></td>
      </tr>
      <tr class="bg-info text-white">
          <td>Hocico</td>
          <td><v-btn color="warning" fab x-small @click="res('nose')">-</v-btn> {{config.nose}} <v-btn color="warning" fab x-small @click="add('nose')">+</v-btn></td>
      </tr>
      <tr class="bg-info text-white">
          <td>Sexo</td>
          <td><v-btn color="warning" fab x-small @click="res('sex')">-</v-btn> {{config.sex}} <v-btn color="warning" fab x-small @click="add('sex')">+</v-btn></td>
      </tr>
      <tr class="bg-info text-white">
          <td>Tamaño</td>
          <td><v-btn color="warning" fab x-small @click="res('size')">-</v-btn> {{config.size}} <v-btn color="warning" fab x-small @click="add('size')">+</v-btn></td>
      </tr>
      <tr class="bg-info text-white">
          <td>Total</td>
          <td>{{this.suma}}</td>
      </tr>

      </tbody>
         <v-btn id="btn_guardar" color="warning" :disabled="this.suma!=100" @click="guardar">Guardar</v-btn>
    </v-simple-table>  
 
  
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
          coatColor:0,
          coatSize:0,
          eyecolor:0,
          minScoreValue:0,
          nose:0,
          sex:0,
          size:0
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
          if (it!='minScoreValue') sum = sum + this.config[it]
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

  section{
    margin-left: 150px;
    margin-right: 150px;
  }
  
  .v-btn{
    margin-left: 10px;
    margin-right: 10px;
  }

  #btn_guardar{
    margin-top: 10px;
    margin-bottom: 20px;
  }



</style>
