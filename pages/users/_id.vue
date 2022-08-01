<template>
  <div>
    <app-bar />
    <v-card v-if="user.length == 0"  :width="$vuetify.breakpoint.xs ? '' : '60%'" style="margin:0 auto">
      <v-toolbar color="#20929D" dense elevation="0">
          <v-toolbar-title>Detail User</v-toolbar-title>
      </v-toolbar>
      <center>
      <v-list-item-title class="pa-6 red--text"><b>DATA USER TIDAK DITEMUKAN</b></v-list-item-title>
      </center>
    </v-card>
    <v-card v-else :width="$vuetify.breakpoint.xs ? '' : '60%'" style="margin:0 auto">
      <v-toolbar color="#20929D" dense elevation="0">
          <v-toolbar-title>Detail User</v-toolbar-title>
      </v-toolbar>
      <v-row class="pa-6">
        <v-col :cols="$vuetify.breakpoint.xs ? '12' :'6'">
          <v-img width="300" :src="user.avatar"></v-img>
        </v-col>
        <v-col :cols="$vuetify.breakpoint.xs ? '12' :'6'">
          <v-list :class="$vuetify.breakpoint.xs ? '' : 'pt-12'">
              <v-list-item>
                  <v-list-item-content v-if="$vuetify.breakpoint.xs">
                      <v-list-item-title class="teal--text">ID: <span class="black--text">{{user.id}}</span></v-list-item-title>
                      <v-list-item-title class="teal--text mt-3">Nama Depan: <span class="black--text"></span></v-list-item-title>
                      <v-list-item-title>{{user.first_name}}</v-list-item-title>
                      <v-list-item-title class="teal--text mt-3">Nama Belakang: </v-list-item-title>
                      <v-list-item-title>{{user.last_name}}</v-list-item-title>
                      <v-list-item-title class="teal--text mt-3">Email : </v-list-item-title>
                      <v-list-item-title>{{user.email}}</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-content v-else>
                      <v-list-item-title class="teal--text">ID: <span class="black--text">{{user.id}}</span></v-list-item-title>
                      <v-list-item-title class="teal--text mt-6">Nama Depan: <span class="black--text">{{user.first_name}}</span></v-list-item-title>
                      <v-list-item-title class="teal--text mt-6">Nama Belakang: <span class="black--text">{{user.last_name}}</span></v-list-item-title>
                      <v-list-item-title class="teal--text mt-6">Email : <span class="black--text">{{user.email}}</span></v-list-item-title>
                  </v-list-item-content>
              </v-list-item>
          </v-list>
        </v-col>
      </v-row>
      <!-- <v-list class="pa-6">
          <v-list-item style="margin-top:-10px">
              <v-img width="40" src="/people.webp"></v-img>
              <v-list-item-content class="ml-6">
                  <v-list-item-title class="teal--text">ID: <span class="black--text">{{user.id}}</span></v-list-item-title>
                  <v-list-item-title class="teal--text mt-6">Nama Depan: <span class="black--text">{{user.first_name}}</span></v-list-item-title>
                  <v-list-item-title class="teal--text mt-6">Nama Belakang: <span class="black--text">{{user.last_name}}</span></v-list-item-title>
                  <v-list-item-title class="teal--text mt-6">Email : <span class="black--text">{{user.email}}</span></v-list-item-title>
              </v-list-item-content>
          </v-list-item>
      </v-list> -->
    </v-card>
  </div>
</template>

<script>
export default {
    name: 'IndexPage',
    data: () => ({
      user:[],
    }),
    components: {
        AppBar: () =>
        import(/* webpackChunkName: "app-bar" */ '@/components/AppBar.vue'),
    },
    methods: {
      async getUser(){
        await this.$axios
            .get('/users/'+this.$route.params.id)
            .then((response) => {
              this.user = response.data.data
              console.log('detail user', this.user)
            })
            .catch((error) => {
                let responses = error.response.data
                console.log(responses.api_message)
            })
      },
    },
    async created(){
      await this.getUser()
      console.log('detail user', this.user.length)
    }
}
</script>

<style>

</style>