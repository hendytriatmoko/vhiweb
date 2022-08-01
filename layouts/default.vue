<template>
  <v-app>
    <alert />
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  components: {
    Alert: () =>
      import(/* webpackChunkName: "alert" */ '@/components/Alert.vue'),
  },
  computed: {
  },
  data: () => ({
  }),
  created(){
  }
}
</script>
