<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex xs12 sm6>
      <v-card width="100%">
        <v-toolbar dark dense color="primary">
          <v-icon>settings</v-icon>
          <v-toolbar-title>
            <span>Trip Settings</span>
          </v-toolbar-title>
        </v-toolbar>
        <v-container grid-list-sm class="pa-4">
          <v-form @submit.prevent="onConfigureSettings" ref="addDriverForm" lazy-validation>
            <v-layout row>
              <v-flex xs6>
                <v-dialog
                  ref="startTimeMenu"
                  v-model="startTimeModal"
                  lazy
                  full-width
                  max-width="250px">
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="startTime"
                      class="light-input"
                      outline
                      label="Min Pickup time"
                      prepend-inner-icon="access_time"
                      readonly
                      v-on="on">
                    </v-text-field>
                  </template>
                  <v-time-picker
                    v-if="startTimeModal"
                    v-model="startTime"
                    :min="minStartTime"
                    :max="maxEndTime"
                    full-width>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="startTimeModal = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="saveMinPickUpTime(startTime)">save</v-btn>
                  </v-time-picker>
                </v-dialog>
              </v-flex>
              <v-flex xs6>
                <v-dialog
                  ref="endTimeMenu"
                  v-model="endTimeModal"
                  lazy
                  full-width
                  max-width="250px">
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="endTime"
                      class="light-input"
                      outline
                      label="Max Drop time"
                      prepend-inner-icon="access_time"
                      readonly
                      v-on="on">
                    </v-text-field>
                  </template>
                  <v-time-picker
                    v-if="endTimeModal"
                    v-model="endTime"
                    :min="minStartTime"
                    :max="maxEndTime"
                    full-width>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="endTimeModal = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="saveMaxDropTime(endTime)">save</v-btn>
                  </v-time-picker>
                </v-dialog>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs6>
                <v-text-field
                  prepend-inner-icon="directions_car"
                  class="light-input input--text-center"
                  lzabel="Min Speed"
                  suffix="mph"
                  v-model.trim="minSpeed"
                  :min="0"
                  type="number"
                  hide-details
                  outline>
                </v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  prepend-inner-icon="directions_car"
                  class="light-input input--text-center"
                  lzabel="Max Speed"
                  suffix="mph"
                  v-model.trim="maxSpeed"
                  :min="minSpeed"
                  type="number"
                  hide-details
                  outline>
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-card-actions>
              <v-btn block color="blue" class="white--text" @click.stop="onConfigureSettings">Save</v-btn>
            </v-card-actions>
          </v-form>
        </v-container>
      </v-card>
    </v-flex>
    <v-snackbar
      v-model="success"
      :timeout="5000"
      multi-line>
      Trip configuration saved successfully.
      <v-btn dark flat color="pink" @click="success = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-layout>
</template>
<script>
  export default {
    name: 'settings',
    data: () => ({
      startTimeModal: false,
      startTime: '',
      minStartTime: '',
      endTimeModal: false,
      endTime: '',
      maxEndTime: '',
      minSpeed: 5,
      maxSpeed: 5,
      success: false
    }),
    created () {
      this.minSpeed = this.$store.getters['Settings/MinSpeed']
      this.maxSpeed = this.$store.getters['Settings/MaxSpeed']
      const startTime = this.$store.getters['Settings/MinTimeForPickUp']
      const endTime = this.$store.getters['Settings/MaxTimeForDrop']
      this.startTime = startTime
      this.minStartTime = startTime
      this.endTime = endTime
      this.maxEndTime = endTime
    },
    methods: {
      saveMinPickUpTime (startTime) {
        this.startTime = startTime
        this.startTimeModal = false
      },
      saveMaxDropTime (endTime) {
        this.endTime = endTime
        this.endTimeModal = false
      },
      onConfigureSettings () {
        const config = {
          startTime: this.startTime,
          endTime: this.endTime,
          minSpeed: this.minSpeed,
          maxSpeed: this.maxSpeed
        }
        this.$store.dispatch('Settings/Save', config).then(data => {
          if (data === 'SUCCESS') {
            this.success = true
          }
        })
      }
    }
  }
</script>
