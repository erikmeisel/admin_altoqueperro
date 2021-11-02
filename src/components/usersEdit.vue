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
          v-model="formData.data.phone"
        />      
        <v-text-field dense label="Fecha Nacimiento"
          v-model="formData.data.birth"
        />   
        <v-text-field dense label="E-Mail"
          v-model="formData.data.email"
          :rules="[rules.required,rules.email]"
        />   
        <v-btn :disabled="!valid" color="warning"
      @click="enviar">Guardar</v-btn>
      </v-form>
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
            birth: null,
            name: null,
            email: null,
            phone: null,
          }
        }
      }
    },
    methods: {
      async enviar() {
        if (this.formData.id) {
          fb.update('users',this.formData.id,this.formData.data).then((ret) => {
            console.log(ret)
            this.$router.push("/users")
          }) 
        } else {
          fb.create('users',this.formData.data).then((ret) => {
            console.log(ret)
            this.$router.push("/users")
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
