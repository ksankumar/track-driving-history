<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" v-if="$route.meta.adminBar" absolute temporary class="hidden-md-and-up">
      <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <v-avatar color="app" size="36">
              <span class="white--text headline font-weight-black">A</span>
            </v-avatar>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>Admin</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile v-for="item in items" :key="item.title" :to="item.path">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click.stop="onLogout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar dark fixed app dense clipped-right>
      <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-md-and-up"
                           v-if="$route.meta.adminBar"></v-toolbar-side-icon>
      <v-avatar color="app" tile size="36">
        <span class="white--text display-1 font-weight-black">R</span>
      </v-avatar>
      <v-toolbar-title class="headline">
        <span class="app--text font-weight-black">Root</span>
        <span class="subheading">&nbsp;Trip tracking</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down" v-if="$route.meta.adminBar">
        <v-divider vertical/>
        <v-btn flat :to="{name:'DriverList'}">Drivers</v-btn>
        <v-divider vertical/>
        <v-btn flat :to="{name:'Trips'}">Trips</v-btn>
        <v-divider vertical/>
        <v-btn flat :to="{name:'Settings'}">Settings</v-btn>
        <v-divider vertical/>
        <v-btn flat @click.stop="onLogout">Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid pa-0>
        <v-slide-x-reverse-transition mode="out-in">
          <router-view class="container-view"></router-view>
        </v-slide-x-reverse-transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

  export default {
    name: 'App',
    data: () => ({
      drawer: null,
      items: [
        { title: 'Drivers', icon: 'people', path: { name: 'DriverList' } },
        { title: 'Trips', icon: 'directions_car', path: { name: 'Trips' } },
        { title: 'Settings', icon: 'settings', path: { name: 'Settings' } }
      ]
    }),
    methods: {
      onLogout () {
        this.$store.dispatch('Auth/Logout').then(() => {
          this.$router.push({ name: 'Login' })
        })
      }
    }
  }
</script>
<style scoped>
  .container-view {
    width: 100%;
    position: absolute;
    height: 100% !important;
  }
</style>
