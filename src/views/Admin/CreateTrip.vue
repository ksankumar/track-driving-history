<template>
  <v-layout align-center justify-center row fill-height>
    <no-data v-if="!driver.length" title="Drivers"/>
    <v-flex v-else xs12 sm6>
      <v-card width="100%">
        <v-toolbar dark dense color="primary">
          <v-icon>directions_car</v-icon>
          <v-toolbar-title>
            <span v-if="$route.params.driverId">Create Trip</span>
            <span v-else>Assign Trip</span>
          </v-toolbar-title>
        </v-toolbar>
        <v-container grid-list-sm class="pa-4">
          <v-form @submit.prevent="onCreateNewDriver" ref="addDriverForm" lazy-validation>
            <v-layout row wrap>
              <v-flex xs12>
                <v-select
                  label="Select the Driver"
                  :items="driver"
                  v-model="selectedDriver"
                  class="light-input"
                  item-text="first"
                  item-value="first"
                  small-chips
                  return-object
                  outline
                ></v-select>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  prepend-inner-icon="phone"
                  class="light-input"
                  label="Phone No"
                  v-model.trim="selectedDriver.phone"
                  outline
                  readonly
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs4>
                <v-dialog
                  ref="pickUpDialog"
                  v-model="stDialog"
                  lazy
                  full-width
                  width="290px">
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="startTime"
                      class="light-input"
                      label="Pickup time"
                      prepend-inner-icon="access_time"
                      readonly
                      hide-details
                      outline
                      v-on="on">
                    </v-text-field>
                  </template>
                  <v-time-picker
                    v-if="stDialog"
                    v-model="startTime"
                    :min="minStartTime"
                    :max="maxEndTime"
                    @click:minute="savePickUpTime(startTime)"
                    full-width>
                  </v-time-picker>
                </v-dialog>
              </v-flex>
              <v-flex xs4>
                <v-dialog
                  ref="dropDialog"
                  v-model="etDialog"
                  lazy
                  full-width
                  width="290px">
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="endTime"
                      class="light-input"
                      label="Drop time"
                      prepend-inner-icon="access_time"
                      readonly
                      hide-details
                      outline
                      clearable
                      v-on="on">
                    </v-text-field>
                  </template>
                  <v-time-picker
                    v-if="etDialog"
                    v-model="endTime"
                    :min="minStartTime"
                    :max="maxEndTime"
                    @click:minute="saveDropTime(endTime)"
                    full-width>
                  </v-time-picker>
                </v-dialog>
              </v-flex>
              <v-flex xs4>
                <v-text-field
                  prepend-inner-icon="directions_car"
                  class="light-input input--text-center"
                  lzabel="Miles"
                  suffix="mile"
                  :min="0"
                  type="number"
                  hide-details
                  v-model.trim="miles"
                  outline>
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs6 text-xs-left>{{duration}}</v-flex>
              <v-flex xs6 text-xs-right>{{speed}} mph</v-flex>
            </v-layout>
          </v-form>
        </v-container>
        <v-divider/>
        <v-card-actions>
          <v-btn block color="blue" class="white--text" :disabled="miles<0" @click.stop="onCreateNewTrip">
            <span v-if="$route.params.driverId">Create Trip</span>
            <span v-else>Assign Trip</span>
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-snackbar
        v-model="success"
        :timeout="5000"
        multi-line>
        Trip created successfully.
        <v-btn dark flat color="pink" @click="success = false">
          Close
        </v-btn>
      </v-snackbar>
    </v-flex>
  </v-layout>
</template>
<script>
  import NoData from '../../components/NoData'
  import Converter from '../../plugins/Converter'

  export default {
    name: 'create-trip',
    components: {
      NoData
    },
    data () {
      return {
        stDialog: false,
        etDialog: false,
        driver: [],
        selectedDriver: [],
        startTime: '',
        minStartTime: '',
        endTime: '',
        maxEndTime: '',
        seconds: 0,
        time: null,
        miles: 0,
        success: false
      }
    },
    computed: {
      duration () {
        const seconds = this.getSeconds()
        const hrs = Converter.secondsToHm(seconds)
        return hrs
      },
      speed () {
        const distance = this.miles
        const seconds = this.seconds
        const mph = Converter.getMilesPerHour(distance, seconds)
        return mph
      }
    },
    created () {
      const startTime = this.$store.getters['Settings/MinTimeForPickUp']
      const endTime = this.$store.getters['Settings/MaxTimeForDrop']
      this.startTime = startTime
      this.minStartTime = startTime
      this.endTime = null
      this.maxEndTime = endTime
      const driverId = this.$route.params.driverId
      this.$store.dispatch('Trip/DriverInfo', driverId).then(data => {
        if (data.length) {
          this.driver = data
          this.selectedDriver = data[0]
        } else {
          this.$router.push({ 'name': 'DriverList' })
        }
      })
    },
    methods: {
      savePickUpTime (startTime) {
        this.startTime = startTime
        this.stDialog = false
      },
      saveDropTime (endTime) {
        this.endTime = endTime
        this.etDialog = false
      },
      getSeconds () {
        const startTime = this.startTime
        const endTime = this.endTime
        if (is_defined(endTime)) {
          const seconds = Converter.getHr2Sec(startTime, endTime)
          this.seconds = seconds
          return seconds
        }
        return 0
      },
      onCreateNewTrip () {
        const driver = this.selectedDriver
        const trip = {
          'start': this.startTime,
          'end': this.endTime || this.startTime,
          'miles': this.miles || 0
        }
        this.$store.dispatch('Trip/Create', { 'id': driver.id, 'trip': trip }).then(data => {
          this.success = true
          this.$router.push({ name: 'DriverList' })
        })
      }
    }
  }
</script>

<style scoped>

</style>
