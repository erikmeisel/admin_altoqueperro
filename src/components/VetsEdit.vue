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
          v-model="formData.data.phone"
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
        <label for="nombre">Horario de atención</label>
        <input 
          type="text" 
          class="form-control"
          v-model="formData.data.businessHours"
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
        <br> 
        <label for="nombre">Profesional</label>
        <input 
          type="text" 
          class="form-control"
          v-model="formData.data.profesional"
        >   
        <br> 
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
            businessHours: null,
            coordinates: {
              latitude:0,
              longitude:0
            },
            imageUrl: null,
            name: null,
            phone: null,
            address: null,
            localidad: null,
            notes:null,
            profesional:null,
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
          fb.update('vets',this.formData.id,this.formData.data).then((ret) => {
            console.log(ret)
            this.$router.push("/vets")
          }) 
        } else {
          fb.create('vets',this.formData.data).then((ret) => {
            console.log(ret)
            this.$router.push("/vets")
          }) 
        }
      },
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
