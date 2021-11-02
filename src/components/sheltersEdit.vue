<template lang="html">

<section class="src-components-agregar">
    <form @submit.prevent="enviar()">
        <label for="nombre">Nombre</label>
        <input 
          type="text" 
          class="form-control"
          v-model="formData.data.name"
          required
        >      
        <br>
        <label for="nombre">Telefono</label>
        <input 
          type="text" 
          class="form-control"
          v-model="formData.data.phoneNumber"
        >      
        <br>
        <label for="nombre">Cap. Max. </label>
        <input 
          type="text" 
          class="form-control"
          v-model="formData.data.capmax"
        >              
        <br>        
        <label for="nombre">Anfitrión</label>
        <input 
          type="text" 
          class="form-control"
          v-model="formData.data.hoster"
          required
        >              
        <br>        
        <label for="nombre">URL Imagen</label>
        <input 
          type="text" 
          class="form-control"
          v-model="formData.data.imageUrl"
          required
        >      
        <br>            
        <label for="nombre">Dirección</label>
        <input 
          type="text" 
          class="form-control"
          v-model="formData.data.address"
          required
        >   
        <br> 
        <label for="nombre">Barrio / Localidad</label>
        <input 
          type="text" 
          class="form-control"
          v-model="formData.data.localidad"
          required
        >   
        <br> 
        <label for="nombre">Provincia</label>
        <input 
          type="text" 
          class="form-control"
          v-model="formData.data.province"
          required
        >   
        <br> 
        <label for="nombre">Pais</label>
        <input 
          type="text" 
          class="form-control"
          v-model="formData.data.country"
          required
        >   
        <label for="nombre">Notas</label>
        <input 
          type="text" 
          class="form-control"
          v-model="formData.data.notes"
        >   
        <br>         
        <button class="btn btn-success my-3" type="submit">Guardar</button>
      </form>
    </section>
</template>

<script lang="js">
  import * as fb from '../firebase'
  import geocode from '../geocode'
  export default  {
    name: 'src-components-agregar',
    props: [],
    mounted () {
      if(this.$route.params.data) this.formData = this.$route.params.data
    },
    data () {
      return {
        formData : {
          id:null,
          data:{
            coordinates: {
              latitude:0,
              longitude:0
            },
            imageUrl: null,
            name: null,
            phoneNumber: null,
            address: null,
            localidad: null,
            notes:null,
            capmax:null,
            hoster:null,
            province:"Buenos Aires",
            country:"Argentina",
          }
        }
      }
    },
    methods: {
      async enviar() {
        geocode(this,this.guardar)
      },
      guardar(coordinates) {
        this.formData.data.coordinates = coordinates
        if (this.formData.id) {
          fb.update('shelters',this.formData.id,this.formData.data).then((ret) => {
            console.log(ret)
            this.$router.push("/shelters")
          }) 
        } else {
          fb.create('shelters',this.formData.data).then((ret) => {
            console.log(ret)
            this.$router.push("/shelters")
          }) 
        }        
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-agregar {
    margin: 2em;
  }
</style>
