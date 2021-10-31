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
        >      
        <br>            
        <label for="nombre">Horario de atención</label>
        <input 
          type="text" 
          class="form-control"
          v-model="formData.data.businessHours"
        >   
        <br> 
        <label for="nombre">Dirección</label>
        <input 
          type="text" 
          class="form-control"
          v-model="formData.data.address"
        >   
        <br> 
        <label for="nombre">Latitud</label>
        <input 
          type="text" 
          class="form-control"
          v-model="formData.data.coordinates.latitude"
        >   
        <br> 
        <label for="nombre">Longitud</label>
        <input 
          type="text" 
          class="form-control"
          v-model="formData.data.coordinates.longitude"
        >   
        <br> 
        <label for="nombre">Barrio / Localidad</label>
        <input 
          type="text" 
          class="form-control"
          v-model="formData.data.localidad"
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
            profesional:null
          }
        }
      }
    },
    methods: {
      async enviar() {
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
