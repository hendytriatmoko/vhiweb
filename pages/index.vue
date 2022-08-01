<template>
  <div>
    <app-bar />
    <v-card style=";margin: 50px auto !important;" :width="$vuetify.breakpoint.xs ? '80%' : '50%'">
      <v-toolbar dense elevation="0" color="#20929D" class="white--text">
          <v-toolbar-title>Login</v-toolbar-title>
      </v-toolbar>
      <div class="pa-3">
        <div><b>Email</b></div>
        <v-text-field v-model="email" outlined dense></v-text-field>
        <div><b>Password</b></div>
        <v-text-field 
            :append-icon="value ? 'mdi-eye-off' : 'mdi-eye'" 
            @click:append="() => (value = !value)"
            :type="value ? 'password' : 'text'"
            outlined
            v-model="password"
            dense>
        </v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#20929D" @click="login()" class="white--text" :disabled="email == '' || password == '' ? true : false">Masuk</v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'IndexPage',
  components: {
    AppBar: () =>
      import(/* webpackChunkName: "app-bar" */ '@/components/AppBar.vue'),
  },
  data: () => ({
    listUser:[],
    email:'',
    password:'',
    value:true,
  }),
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
      setAuth: 'auth/set',
    }),
    async login(){
      const data = JSON.stringify({
        email:this.email,
        password:this.password
      })
      await this.$axios
        .post('/login', data,{
          headers: { 'content-type': 'application/json' },
        })
        .then((res) => {
          let user = {
            email:this.email,
            token:res.data.token
          }
          this.$cookies.set('user', JSON.stringify(user))
          this.setAlert({
            status: true,
            color: 'success',
            text: 'Berhasil Login',
          })
          this.$router.push('/users')
        })
        .catch((error) => {
          let responses = error.response.data
          this.setAlert({
            status: true,
            color: 'error',
            text: responses.error,
          })
        })
    }
    // async getUser(){
    //   var params = new URLSearchParams();
    //   var request = {
    //       params: params
    //   };
    //   await this.$axios
    //       .get('/users',request)
    //       .then((response) => {
    //         this.listUser = response.data.data
    //         console.log('list user', this.listUser)
    //       })
    //       .catch((error) => {
    //           let responses = error.response.data
    //           console.log(responses.api_message)
    //       })
    // }
  },
  created(){
    // this.getUser()
  },
}
</script>
