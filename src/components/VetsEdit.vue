<template lang="html">

<section class="src-components-agregar">
  
    <v-form
    ref="form"
    v-model="valid"
  >
        <v-text-field dense label="Nombre" 
          v-model="formData.data.name"
          :rules="[rules.required]"
        ></v-text-field>      
        <v-text-field dense label="Telefono" 
          v-model="formData.data.phone"
          :rules="[rules.required]"
        ></v-text-field>              
        <v-text-field dense label="Imagen" 
          v-model="formData.data.imageUrl"
          :rules="[rules.required]"
        ></v-text-field>      
        
                    
        <v-text-field dense label="Horario de atención" 
          v-model="formData.data.businessHours"
          :rules="[rules.required]"
        ></v-text-field>    
        <v-text-field dense label="Dirección" 
          v-model="formData.data.address"
          :rules="[rules.required]"
        ></v-text-field>    
        <v-text-field dense label="Barrio / Localidad" 
          v-model="formData.data.localidad"
          :rules="[rules.required]"
        ></v-text-field>    
        <v-text-field dense label="Provincia" 
          v-model="formData.data.province"
          :rules="[rules.required]"
        ></v-text-field>    
        <v-text-field dense label="Pais" 
          v-model="formData.data.country"
          :rules="[rules.required]"
        ></v-text-field>    
        <v-text-field dense label="Profesional" 
          v-model="formData.data.profesional"
        ></v-text-field>    
        <v-text-field dense label="Notas" 
          v-model="formData.data.notes"
        ></v-text-field>            
        <v-btn :disabled="!valid" color="warning"
      @click="enviar">Guardar</v-btn>
      </v-form>
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
        valid:false,
        rules: {
          required: value => !!value || 'Required.',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          },
        },
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
