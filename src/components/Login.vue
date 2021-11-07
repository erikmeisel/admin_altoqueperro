<template>
   <v-app id="inspire">
      <v-content>
         <v-container fluid fill-height>
            <v-layout align-content-start justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                     <v-toolbar color="#D36D5E">
                        <v-toolbar-title>Ingreso "Al Toque Admin"</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <v-form>
                           <v-text-field color="#F0CD71"
                              prepend-icon="person"
                              name="login"
                              label="User"
                              type="text"
                              v-model="user"
                           ></v-text-field>
                           <v-text-field color="#F0CD71"
                              id="password"
                              prepend-icon="lock"
                              name="password"
                              label="Password"
                              type="password"
                              v-model="passwd"
                           ></v-text-field>
                        </v-form>
                     </v-card-text>
                     <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="#D36D5E" @click="login" height="50" width="100"  >Login</v-btn>
                     </v-card-actions>
                  </v-card>
               </v-flex>
            </v-layout>
         </v-container>
      </v-content>
   </v-app>
</template>

<script>
export default {
   name: 'Login',
   props: {
      source: String,
   },
    data () {
      return {
        user:null,
        passwd:null
      }
    },
    methods: {
        login() {
            if (this.user=="admin" && this.passwd=="altoquegato") {
                this.$store.commit('Login')
                this.$router.push("/vets")
            }
        }
    }
};
</script>

<style></style>
