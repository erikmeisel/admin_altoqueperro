<template lang="html">

<section class="src-components-agregar">
   <v-form class="col-sm-10 col-md-6 col-lg-6"
    ref="form" align="center"
    v-model="valid"
  >
        <v-text-field dense label="requestConsumer" 
          v-model="formData.data.requestConsumer"
        />      
        <v-text-field dense label="requestCreator" 
          v-model="formData.data.requestCreator"
        />      
        Fecha Resuelto: {{formData.data.resolvedDate}}
        <v-text-field dense label="state" 
          v-model="formData.data.state"
        />                      

        <v-text-field dense label="Color de Pelo" 
          v-model="formData.data.pet.coat"
        />    
        <v-text-field dense label="Largo Del Pelo" 
          v-model="formData.data.pet.coatSize"
        />    
        <v-text-field dense label="Color de ojos" 
          v-model="formData.data.pet.eyeColor"
        />    
        <v-text-field dense label="Nombre" 
          v-model="formData.data.pet.name"
        />    
        <v-text-field dense label="Sexo" 
          v-model="formData.data.pet.sex"
        />    
        <v-text-field dense label="Tamaño" 
          v-model="formData.data.pet.size"
        />    
        <v-text-field dense label="Tipo" 
          v-model="formData.data.pet.type"
        />    
        <v-btn :disabled="!valid" color="warning" @click="guardar">Guardar</v-btn>
      </v-form>
    </section>
</template>

<script lang="js">
  import * as fb from '../firebase'
  import toBase64 from '../base64'
  export default  {
    name: 'src-components-agregar',
    props: [],
    mounted () {
      if(this.$route.params.data) {
        this.formData = this.$route.params.data
        this.collection = this.$route.params.collection
      }
      //this.imgPreview = this.formData.data.imageUrl      
    },
    data () {
      return {
        valid:false,
        collection:null,
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
            coordinates:{
              latitude:null,
              longitude:null,
            },
            creationDate:null,
            pet:{
              coat:null,
              eyeColor:null,
              name:null,
              sex:null,
              size:null,
              type:null,
            },
            requestConsumer:null,
            requestCreator:null,
            resolvedDate:null,
            state:0,
          }
        }
      }
    },
    methods: {
      async previewImage(event) {
        this.imgPreview = await toBase64(event)
        this.imagen = event
      },
      guardar() {
        if (this.formData.id) {
          fb.update(this.collection,this.formData.id,this.formData.data).then((ret) => {
            console.log(ret)
            this.$router.push("/pet")
          }) 
        } else {
          fb.create(this.collection,this.formData.data).then((ret) => {
            console.log(ret)
            this.$router.push("/pet")
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

  .v-form{
  padding-top: 100px;
  padding-left: 100px;
  padding-right: 100px;
  padding-bottom: 50px;
  margin-left: 50px;
  margin-right: 50px;
  
  background: #d36d5ebb ;
  }  
</style>
