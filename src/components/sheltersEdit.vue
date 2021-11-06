<template lang="html">

<section class="src-components-agregar">
   <v-form
    ref="form"
    v-model="valid"
  >
        <v-text-field dense label="Nombre" 
          v-model="formData.data.name"
          :rules="[rules.required]"
        />      
        <v-text-field dense label="Telefono" 
          v-model="formData.data.phoneNumber"
        />      
        <v-text-field dense label="Cap. Max. " 
          v-model="formData.data.capmax"
        />                      
        <v-text-field dense label="Anfitrión" 
          v-model="formData.data.hoster"
          :rules="[rules.required]"
        />                      
      <v-img
          :src="imgPreview"
          max-height="150"
          max-width="250"
      ></v-img>
      <v-file-input  dense label="Imagen"
        @change="previewImage($event)" accept="image/*"        
      ></v-file-input>        
        <v-text-field dense label="Dirección" 
          v-model="formData.data.address"
          :rules="[rules.required]"
        />    
        <v-text-field dense label="Barrio / Localidad" 
          v-model="formData.data.localidad"
          :rules="[rules.required]"
        />    
        <v-text-field dense label="Provincia" 
          v-model="formData.data.province"
          :rules="[rules.required]"
        />    
        <v-text-field dense label="Pais" 
          v-model="formData.data.country"
          :rules="[rules.required]"
        />   
        <v-text-field dense label="Notas" 
          v-model="formData.data.notes"
        />            
        <v-btn :disabled="!valid" color="warning" @click="enviar">Guardar</v-btn>
      </v-form>
    </section>
</template>

<script lang="js">
  import * as fb from '../firebase'
  import geocode from '../geocode'
  import toBase64 from '../base64'
  import moment from 'moment'
  export default  {
    name: 'src-components-agregar',
    props: [],
    mounted () {
      if(this.$route.params.data) this.formData = this.$route.params.data
      this.imgPreview = this.formData.data.imageUrl      
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
        imagen:null,
        imgPreview:null,
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
            createdDate:null
          }
        }
      }
    },
    methods: {
      getFBNow() {
        let date = moment()
        return {
          seconds: date.unix(),
          nanoseconds: date.valueOf()
        }
      },      
      async previewImage(event) {
        this.imgPreview = await toBase64(event)
        this.imagen = event
      },
      guardarImagen(coordinates) {
        if (this.imagen) {
          fb.uploadFile(this.imagen).then((ret)=>{
            this.formData.data.imageUrl=ret
            this.guardar(coordinates)
          })
        } else {
          this.guardar(coordinates)
        }
      },      
      async enviar() {
        geocode(this,this.guardarImagen)
      },
      guardar(coordinates) {
        this.formData.data.coordinates = coordinates
        if (!this.formData.data.createdDate) this.formData.data.createdDate = this.getFBNow()
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
