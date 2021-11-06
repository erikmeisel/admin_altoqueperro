<template lang="html">

  <section class="src-reportes">
    <h1>Reportes</h1>
    <v-btn  color="warning" @click="sem()">1 Semana</v-btn>
    <v-btn  color="warning" @click="mes()">1 Mes</v-btn>
    <v-btn  color="warning" @click="ano()">1 Año</v-btn>
    <v-btn  color="warning" @click="todos()">Todos</v-btn>
    <v-simple-table>
      <tbody>
      <tr class="bg-info text-white">
          <td>Total Usuarios Registrados</td>
          <td>{{estadisticas.totUsuReg}}</td>
      </tr>
      <tr class="bg-info text-white">
          <td>Total Usuarios Nuevos</td>
          <td>{{estadisticas.totUsuNue}}</td>
      </tr>
      <tr class="bg-info text-white">
          <td>Total Matcheos</td>
          <td>{{estadisticas.totMat}}</td>
      </tr>
      <tr class="bg-info text-white">
          <td>Total Matcheos Nuevos</td>
          <td>{{estadisticas.totMatNue}}</td>
      </tr>
      <tr class="bg-info text-white">
          <td>Total Veterinarias Registradas</td>
          <td>{{estadisticas.totVetReg}}</td>
      </tr>
      <tr class="bg-info text-white">
          <td>Total Veterinarias Nuevas</td>
          <td>{{estadisticas.totVetNue}}</td>
      </tr>
      <tr class="bg-info text-white">
          <td>Total Hogares Registrados</td>
          <td>{{estadisticas.totHogReg}}</td>
      </tr>
      <tr class="bg-info text-white">
          <td>Total Hogares Nuevos</td>
          <td>{{estadisticas.totHogNue}}</td>
      </tr>
      </tbody>
    </v-simple-table>  

  </section>

</template>

<script lang="js">
  import * as fb from '../firebase'
  import moment from 'moment'
  export default  {
    name: 'src-reportes',
    props: [],
    mounted () {
      this.cargarDatos()
    },
    data () {
      return {
        lock:0,
        periodo:7,
        estadisticas:{
          totUsuReg:0,
          totUsuNue:0,
          totMat:0,
          totMatNue:0,
          totVetReg:0,
          totVetNue:0,
          totHogReg:0,
          totHogNue:0
        },
        datos:{
          usuarios:null,
          lostPet:null,
          foundPet:null,
          vets:null,
          shelter:null
        }
      }
    },
    methods: { 
      async cargarDatos() {
        this.estadisticas.totMat = 0
        fb.get("users").then((it)=>{
          this.datos.usuarios = it
          this.estadisticas.totUsuReg = it.length
          this.lock++
          this.todos()
        })
        fb.get("lostPetRequests").then((it)=>{
          this.datos.lostPet = it
          for (let linea of it) {
            if (linea.data.requestConsumer) {
              this.estadisticas.totMat++ 
            }
          }
          this.lock++
          this.todos()
        })
        fb.get("foundPetRequests").then((it)=>{
          this.datos.foundPet = it
          for (let linea of it) {
            if (linea.data.requestConsumer) {
              this.estadisticas.totMat++ 
            }
          }
          this.lock++
          this.todos()
        })
        fb.get("vets").then((it)=>{
          this.datos.vets = it
          this.estadisticas.totVetReg = it.length
          this.lock++
          this.todos()
        })
        fb.get("shelters").then((it)=>{
          this.datos.shelter = it
          this.estadisticas.totHogReg = it.length
          this.lock++
          this.todos()
        })
      },
      sem() {this.nuevos(7)},
      mes() {this.nuevos(31)},
      ano() {this.nuevos(365)},
      todos() {
        //el objetivo del lock es solo entrar
        // a la funcion si todos los datos fueron recibidos
        if (this.lock!=5) return 
        this.estadisticas.totUsuNue = this.estadisticas.totUsuReg
        this.estadisticas.totMatNue = this.estadisticas.totMat
        this.estadisticas.totVetNue = this.estadisticas.totVetReg
        this.estadisticas.totHogNue = this.estadisticas.totHogReg
      },
      fbDateToMoment(fbDate) {
        if (!fbDate) return null
        return moment.unix(fbDate.seconds)
      },
      nuevos(dias){
        let ahorita = moment()
        let fechaCorte = ahorita.subtract(dias, "days");
        this.estadisticas.totMatNue=0
        this.estadisticas.totUsuNue=0
        this.estadisticas.totVetNue=0
        this.estadisticas.totHogNue=0
        for (let linea of this.datos.lostPet) {
          if (linea.data.requestConsumer) {
            let date = this.fbDateToMoment(linea.data.resolvedDate)
            if (date && date.isSameOrAfter(fechaCorte)) {
              this.estadisticas.totMatNue++ 
            }
          }
        }
        for (let linea of this.datos.foundPet) {
            let date = this.fbDateToMoment(linea.data.resolvedDate)
            if (date && date.isSameOrAfter(fechaCorte)) {
              this.estadisticas.totMatNue++ 
            }
        }
        for (let linea of this.datos.usuarios) {
            let date = this.fbDateToMoment(linea.data.createdDate)
            if (date && date.isSameOrAfter(fechaCorte)) {
              this.estadisticas.totUsuNue++ 
            }
        }        
        for (let linea of this.datos.vets) {
            let date = this.fbDateToMoment(linea.data.createdDate)
            if (date && date.isSameOrAfter(fechaCorte)) {
              this.estadisticas.totVetNue++ 
            }
        }   
        for (let linea of this.datos.shelter) {
            let date = this.fbDateToMoment(linea.data.createdDate)
            if (date && date.isSameOrAfter(fechaCorte)) {
              this.estadisticas.totHogNue++ 
            }
        }               
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="scss">
  .src-reportes {

  }
</style>
