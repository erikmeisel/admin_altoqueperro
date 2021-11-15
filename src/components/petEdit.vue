<template lang="html">

<section class="src-components-agregar">
  
<v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-col>
          <v-form 
            ref="form" align="center"
            v-model="valid"
          >
                <p>Request Consumer: {{formData.data.requestConsumer}}</p>
                <p>Request Creator: {{formData.data.requestCreator}}</p>
                <p>Fecha Resuelto: {{formData.data.resolvedDate}} </p>
                <v-text-field dense label="Nombre" 
                  v-model="formData.data.pet.name"
                />    
                <p>Sexo : {{formData.data.pet.sex}} </p>
                <p>Tamaño : {{formData.data.pet.size}} </p>
                <p>Tipo : {{formData.data.pet.type}} </p>

                <v-btn :disabled="!valid" color="warning" @click="guardar()">Guardar</v-btn>
              </v-form>
      </v-col>
      <v-col>
        <GmapMap
              :center='center'
              :zoom='17'
              style='width:100%;  height: 500px;'
        >
          <GmapMarker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :clickable="true"
            :draggable="true"
            @click="center=m.position"
            @drag="updateCoordinates"
        />
        </GmapMap>
      </v-col>
    </v-row>
  </v-container>

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
        if (!this.formData.data.coordinates) {
          this.formData.data.coordinates = {
            latitude:-34.6099906,
            longitude:-58.431331
          }
        }
        this.markers = [{position:{ lat:this.formData.data.coordinates.latitude, lng: this.formData.data.coordinates.longitude }}]
        this.center = {lat:this.formData.data.coordinates.latitude, lng: this.formData.data.coordinates.longitude}
      }
    },
    data () {
      return {
        center: { lat:-34.6099906, lng: -58.431331 },
        currentPlace: null,
        markers: [],
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
      },
      addMarker(lat, lng) {
        const marker = {
          lat: lat,
          lng: lng,
        };
        this.markers.push({ position: marker });
      },
      updateCoordinates(location) {
        this.formData.data.coordinates.latitude =  location.latLng.lat()
        this.formData.data.coordinates.longitude =  location.latLng.lng()
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
