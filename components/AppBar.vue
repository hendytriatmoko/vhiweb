<template>
  <v-app-bar
      fixed
      app
    >
      <v-toolbar-title>VHIWEB</v-toolbar-title>
      <v-spacer />
      <div v-if="dataUser != null">
        <div>{{ dataUser.email }}</div>
        <v-btn width="100%" color="red" class="white--text" small @click="logout()">Logout</v-btn>
      </div>
    </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    dataUser:[],
  }),
  methods: {
    logout(){
      this.$cookies.set('user', null)
      this.$router.push('/')
    }
  },
  created(){
    this.dataUser = this.$cookies.get('user')
    console.log('user bar', this.dataUser)
  }
}
</script>

<style>

</style>