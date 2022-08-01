<template>
  <div>
    <app-bar />
    <v-row>
      <v-col 
      :cols="$vuetify.breakpoint.xs ? '12' 
      : !view && !$vuetify.breakpoint.xs ? '12' 
      : view && !$vuetify.breakpoint.xs ? '6' : '6'" 
      >
        <v-card outlined style="border:1px solid #20929D">
          <v-list v-for="(item,index) in listUser" :key="index">
              <v-list-item style="margin-top:-10px">
                  <v-list-item-avatar >
                      <v-img :src="item.avatar"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                      <v-list-item-title>{{ item.first_name }} {{  item.last_name  }}</v-list-item-title>
                      <v-list-item-title>{{ item.email }}</v-list-item-title>
                  </v-list-item-content>
                  <v-btn small outlined color="#20929D" @click="toDetail(item)">Detail</v-btn>
                  <v-btn small color="#20929D" class="ml-3" @click="toView(item)">View</v-btn>
              </v-list-item>
          </v-list>
          <div align="center" class="ma-2" v-if="page != totalPage">
            <v-btn color="#20929D" @click="getUsers()">Muat lebih banyak</v-btn>
          </div>
        </v-card>
      </v-col>
      <v-col 
      :cols="$vuetify.breakpoint.xs ? '12' 
      : !view && !$vuetify.breakpoint.xs ? '12' 
      : view && !$vuetify.breakpoint.xs ? '6' : ''" 
      v-if="view">
        <v-card outlined color="#20929D">
          <v-toolbar color="#20929D" dense elevation="0">
              <v-toolbar-title>View User</v-toolbar-title>

              <v-spacer></v-spacer>

              <v-btn icon @click="view = false">
                  <v-icon>mdi-close</v-icon>
              </v-btn>
          </v-toolbar>
          <v-list class="pa-6">
              <v-list-item style="margin-top:-10px">
                  <v-img width="20" :src="viewUser.avatar"></v-img>
                  <v-list-item-content class="ml-3">
                      <v-list-item-title class="teal--text">Nama :</v-list-item-title>
                      <v-list-item-title><b>{{ viewUser.first_name }} {{  viewUser.last_name  }}</b></v-list-item-title>
                      <v-list-item-title class="teal--text mt-6">Email :</v-list-item-title>
                      <v-list-item-title><b>{{ viewUser.email }}</b></v-list-item-title>
                  </v-list-item-content>
              </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
    name: 'IndexPage',
    data: () => ({
      view:false,
      listUser:[],
      page:1,
      totalPage:0,
      viewUser:[],
    }),
    components: {
        AppBar: () =>
        import(/* webpackChunkName: "app-bar" */ '@/components/AppBar.vue'),
    },
    methods: {
      async getUsers(){
        var params = new URLSearchParams();
        params.append("page", this.page);
        var request = {
            params: params
        };
        await this.$axios
            .get('/users',request)
            .then((response) => {
              // let data = response.data
              // let { hits } = response.data.data
              // this.listUser.push(...hits)
              this.listUser.push(...response.data.data)
              this.totalPage = response.data.total_pages+1
              this.page++
              console.log('list user', this.listUser)
              console.log('total page', this.totalPage)
              console.log('page', this.page)
            })
            .catch((error) => {
                let responses = error.response.data
                console.log(responses.api_message)
            })
      },
      async toView(item){
        this.viewUser = item
        this.view = true
      },
      toDetail(item){
        this.$router.push('/users/'+item.id)
      }
    },
    async created(){
      this.getUsers()
    }
}
</script>

<style>

</style>