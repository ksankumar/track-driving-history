<template>
  <v-dialog v-model="addDriverDialog" width="700">
    <template v-slot:activator="{ on }">
      <v-btn class="ripple"
             color="app"
             v-on="on"
             fab
             bottom
             right
             dark
             fixed>
        <v-icon medium>add</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-toolbar dark dense color="primary">
        <v-icon>directions_car</v-icon>
        <v-toolbar-title>Create new Driver</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="addDriverDialog = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-container grid-list-sm class="pa-4">
        <v-form ref="addDriverForm" lazy-validation>
          <v-layout row wrap>
            <v-flex xs6>
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
            <v-flex xs6>
              <v-text-field
                class="light-input"
                label="Last Name"
                v-model.trim="driver.last"
                outline
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
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
                type="tel"
                prepend-inner-icon="phone"
                v-model.trim="driver.phone"
                label="Phone"
                mask="phone"
                outline
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
        <v-spacer></v-spacer>
        <v-btn flat @click="addDriverDialog = false">Cancel</v-btn>
        <v-btn flat color="blue" :disabled="!driver.first || !driver.email" @click.stop="onCreateNewDriver">Create
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
  export default {
    name: 'add-driver',
    data () {
      const defaultForm = Object.freeze({
        first: '',
        last: '',
        phone: '123456789',
        email: '',
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
        addDriverDialog: false,
        defaultForm
      }
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
      resetForm () {
        this.driver = Object.assign({}, this.defaultForm)
        this.$refs.addDriverForm.reset()
      },
      onCreateNewDriver () {
        const driver = this.driver
        this.$store.dispatch('Trip/AddDriver', driver).then(data => {
          this.addDriverDialog = false
        })
      }
    }
  }
</script>

<style>
  .light-input .v-input__slot {
    border: 1px solid #d5d5d5 !important;
  }

  .ripple {
    animation: ripple-pink 0.6s linear infinite;
  }

  @-webkit-keyframes ripple-pink {
    0% {
      box-shadow: 0 4px 10px rgba(255, 65, 130, 0.1), 0 0 0 0 rgba(255, 65, 130, 0.1), 0 0 0 5px rgba(255, 65, 130, 0.1), 0 0 0 10px rgba(255, 65, 130, 0.1);
    }
    100% {
      box-shadow: 0 4px 10px rgba(255, 65, 130, 0.1), 0 0 0 5px rgba(255, 65, 130, 0.1), 0 0 0 10px rgba(255, 65, 130, 0.1), 0 0 0 20px rgba(255, 65, 130, 0);
    }
  }

  @keyframes ripple-pink {
    0% {
      box-shadow: 0 4px 10px rgba(255, 65, 130, 0.1), 0 0 0 0 rgba(255, 65, 130, 0.1), 0 0 0 5px rgba(255, 65, 130, 0.1), 0 0 0 10px rgba(255, 65, 130, 0.1);
    }
    100% {
      box-shadow: 0 4px 10px rgba(255, 65, 130, 0.1), 0 0 0 5px rgba(255, 65, 130, 0.1), 0 0 0 10px rgba(255, 65, 130, 0.1), 0 0 0 20px rgba(255, 65, 130, 0);
    }
  }
</style>
