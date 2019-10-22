<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex xs12 sm8 md5>
      <v-card>
        <v-toolbar color="primary" dense>
          <v-icon color="white">fa-sign-in-alt</v-icon>
          <v-toolbar-title class="white--text">Login</v-toolbar-title>
        </v-toolbar>
        <v-card-title primary-title></v-card-title>
        <v-card-text>
          <v-form ref="loginForm" @submit.prevent="onLogon" lazy-validation>
            <v-text-field
              name="email-id"
              autocomplete="email"
              type="email"
              placeholder="Email address"
              prepend-icon="perm_identity"
              v-model.trim="email"
              :rules="[(v)=> {return !!v || 'E-mail is required'}, $emailPattern]"
              clearable>
            </v-text-field>
            <v-text-field
              name="Password"
              autocomplete="current-password"
              placeholder="Password"
              prepend-icon="vpn_key"
              hint="At least 8 characters"
              min="8"
              v-model.trim="password"
              :append-icon="show_password ? 'visibility_off':'visibility'"
              @click:append="show_password = !show_password"
              :rules="[(v)=> {return !!v || 'Password is required'}, (v)=> {return v && 8 <= v.length || ' Password must be less than 8 characters'}]"
              :type="show_password ? 'text':'password'">
            </v-text-field>
            <v-card-actions>
              <v-btn block round large
                     color="blue white--text"
                     @click="onLogon"
                     :disabled="!email || !password">
                <v-icon left>input</v-icon>
                <b>Login</b>
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
        <v-footer height="auto">
          <v-layout row wrap align-end justify-center>
            <v-flex xs12 text-xs-center class="mt-3">Don't have an account?</v-flex>
            <v-flex xs12 text-xs-center>
              <v-btn flat class="font-weight-black red--text text-none" :to="{ name: 'Register'}">Create new
                account
              </v-btn>
            </v-flex>
          </v-layout>
        </v-footer>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
  export default {
    name: 'login',
    data: () => ({
      email: 'admin@email.com',
      password: 'password',
      show_password: false,
      remember_me: false
    }),
    methods: {
      onLogon () {
        let email = this.email
        let password = this.password
        if (this.$refs.loginForm.validate()) {
          this.$store.dispatch('Auth/Login', { 'email': email, 'password': password }).then(user => {
            // if (user.role === 'admin') {
              this.$router.push({ name: 'DriverList' })
            // } else {
            //   this.$router.push({ name: 'DriverTrip', params: { driverId: user.id } })
            // }
          }).catch((er) => {
            console.log(er)
          })
        }
      }
    }
  }
</script>
