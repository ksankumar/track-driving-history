<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex xs12 sm4>
      <v-card>
        <v-toolbar dark dense color="primary">
          <v-icon>directions_car</v-icon>
          <v-toolbar-title>New driver registration</v-toolbar-title>
        </v-toolbar>
        <v-container grid-list-sm class="pa-4">
          <v-form @submit.prevent="onCreateNewDriver" ref="addDriverForm" lazy-validation>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field
                  prepend-inner-icon="account_circle"
                  class="light-input"
                  label="First Name*"
                  v-model.trim="driver.first"
                  :rules="[(v)=> !!v || '<b>First name is required</b>']"
                  required
                  outline
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  class="light-input"
                  label="Last Name"
                  v-model.trim="driver.last"
                  outline
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  class="light-input"
                  prepend-inner-icon="email"
                  label="Email*"
                  @blur.stop="checkUserExist"
                  v-model.trim="driver.email"
                  :rules="[(v)=> {return !!v || 'E-mail is required'}, $emailPattern]"
                  outline
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  class="light-input"
                  label="Password*"
                  autocomplete="off"
                  min="8"
                  v-model.trim="driver.password"
                  :append-icon="show_password ? 'visibility_off':'visibility'"
                  @click:append="show_password = !show_password"
                  :rules="[(v)=>{return !!v || 'Password is required'},
               (v)=> {return v && 8 <= v.length || 'Confirm password must be less than 8 characters'}]"
                  :type="show_password ? 'text':'password'"
                  outline
                  required>
                </v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  class="light-input"
                  label="Re-enter Password*"
                  autocomplete="off"
                  min="8"
                  v-model.trim="confirm_password"
                  :append-icon="show_confirm_password ? 'visibility_off':'visibility'"
                  @click:append="show_confirm_password = !show_confirm_password"
                  :rules="[(v)=>{return !!v || 'Password is required'},
                          (v)=> {return v && 8 <= v.length || 'Confirm password must be less than 8 characters'},
                          (v)=>{return v === driver.password || 'Password confirmation doest match Password'}]"
                  :type="show_confirm_password ? 'text':'password'"
                  outline
                  required>
                </v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  class="light-input"
                  type="tel"
                  prepend-inner-icon="phone"
                  v-model.trim="driver.phone"
                  label="Phone"
                  mask="phone"
                  outline
                ></v-text-field>
              </v-flex>
              <v-flex xs4>
                <v-text-field
                  class="light-input"
                  prepend-inner-icon="contact_mail"
                  v-model.trim="driver.licenceNo"
                  label="License No"
                  hide-details
                  outline
                ></v-text-field>
              </v-flex>
              <v-flex xs4>
                <v-dialog
                  ref="issueDialog"
                  v-model="issueDateDialog"
                  :return-value.sync="driver.licenceIssueDate"
                  persistent
                  lazy
                  full-width
                  width="290px">
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      label="Issued on"
                      class="light-input"
                      v-model.trim="driver.licenceIssueDate"
                      prepend-inner-icon="event"
                      hide-details
                      outline
                      readonly
                      v-on="on">
                    </v-text-field>
                  </template>
                  <v-date-picker v-model="driver.licenceIssueDate" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="issueDateDialog=false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.issueDialog.save(driver.licenceIssueDate)">save</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-flex>
              <v-flex xs4>
                <v-dialog
                  ref="expiryDialog"
                  v-model="expiryDateDialog"
                  :return-value.sync="driver.licenceExpiresOn"
                  persistent
                  lazy
                  full-width
                  width="290px">
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      label="Expires"
                      class="light-input"
                      v-model.trim="driver.licenceExpiresOn"
                      prepend-inner-icon="event"
                      hide-details
                      outline
                      readonly
                      v-on="on">
                    </v-text-field>
                  </template>
                  <v-date-picker v-model="driver.licenceExpiresOn" :min="driver.licenceIssueDate" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="expiryDateDialog=false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.expiryDialog.save(driver.licenceExpiresOn)">save</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-flex>
            </v-layout>
          </v-form>
        </v-container>
        <v-divider/>
        <v-card-actions>
          <v-btn flat :to="{ name: 'Login'}">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-divider vertical/>
          <v-spacer></v-spacer>
          <v-btn flat color="blue" :disabled="!driver.first || !driver.email" @click.stop="onCreateNewDriver">Register
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-snackbar
        v-model="errorInfo"
        :timeout="5000"
        multi-line>
        You entered Email address already exist.
        <v-btn dark flat color="pink" @click="errorInfo = false">
          Close
        </v-btn>
      </v-snackbar>
    </v-flex>
  </v-layout>
</template>
<script>
  export default {
    name: 'add-driver',
    data () {
      const defaultForm = Object.freeze({
        first: 'sandy',
        last: 'kumar',
        phone: '123456789',
        email: 'san@email.com',
        password: 'password',
        licenceNo: 'UG12345',
        licenceIssueDate: '2019-03-28',
        licenceExpiresOn: '2019-04-19'
      })
      return {
        driver: Object.assign({}, defaultForm),
        show_password: false,
        confirm_password: '',
        show_confirm_password: false,
        issueDateDialog: false,
        expiryDateDialog: false,
        errorInfo: false,
        defaultForm
      }
    },
    mounted () {
      this.driver = Object.assign({}, this.defaultForm)
//      this.$refs.addDriverForm.reset()
    },
    methods: {
      checkUserExist () {
        let email = this.driver.email
        if (this.$emailPattern(email) === true) {
          email = email.toLowerCase()
          this.$store.dispatch('Auth/CheckEmail', email).catch((er) => {
            this.driver.email = null
            this.errorInfo = true
          })
        }
      },
      onCreateNewDriver () {
        const driver = this.driver
        const trip = [{
          'start': '07:15',
          'end': '07:45',
          'miles': '17.3'
        }, {
          'start': '06:12',
          'end': '06:32',
          'miles': '21.8'
        }]
        console.log(trip)
        this.$store.dispatch('Auth/Register', driver).then(data => {
          console.log(data)
        })
      }
    }
  }
</script>

<style scoped>

</style>
