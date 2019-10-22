<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex xs12 sm10 offset-sm1 v-if="trips.length">
      <v-card width="100%">
        <v-card-title>
          <v-flex xs12>
            <v-sheet class="pa-1 primary">
              <v-text-field
                v-model="search"
                label="Search"
                dark
                flat
                solo-inverted
                hide-details
                clearable
                clear-icon="cancel"
              ></v-text-field>
            </v-sheet>
          </v-flex>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :pagination.sync="pagination"
          :items="trips"
          :search="search"
          :expand="expand"
          hide-actions
          item-key="id">
          <template v-slot:headers="props">
            <tr class="text-xs-left blue-grey lighten-3">
              <th
                v-for="header in props.headers"
                :key="header.text"
                @click="changeSort(header.value)"
                :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']">
                {{ header.text }}
                <v-icon small>arrow_upward</v-icon>
              </th>
            </tr>
          </template>
          <template v-slot:items="props">
            <tr @click.stop="props.expanded = !props.expanded">
              <td class="text-capitalize">{{ props.item|name }}</td>
              <td>{{ props.item.miles }}</td>
              <td>{{ props.item.duration }}</td>
              <td>{{ props.item.speed }}</td>
              <td>
                <v-progress-linear
                  query
                  v-bind:color="['blue', 'green', 'orange', 'yellow', 'red'][Math.floor(props.item.speed/20)]"
                  background-color="blue-grey lighten-4"
                  height="14"
                  :value="props.item.speed">
                </v-progress-linear>
              </td>
            </tr>
          </template>
          <template v-slot:expand="props">
            <v-card class="py-1">
              <v-layout row v-for="(trip, index) in props.item.trips" :key="index" pt-1>
                <v-flex xs4></v-flex>
                <v-flex xs2 text-xs-center>
                  <strong class="pr-1">Trip</strong>
                  <v-avatar color="app" size="16">
                    <span class="white--text caption">{{index+1}}</span>
                  </v-avatar>
                </v-flex>
                <v-flex xs1 text-xs-left>
                  <strong>Pick Up:</strong>&nbsp;{{trip.start}}
                </v-flex>
                <v-flex xs2 text-xs-center><strong>Drop:</strong>
                  &nbsp;{{trip.end}}
                </v-flex>
                <v-flex xs4></v-flex>
              </v-layout>
            </v-card>
          </template>
          <v-alert v-slot:no-results :value="true" color="error" icon="warning">
            Your search for "{{ search }}" found no results.
          </v-alert>
        </v-data-table>
      </v-card>
      <v-card-actions>
        <v-spacer/>
        <v-spacer/>
        <v-btn block dark color="app" :to="{name: 'CreateTrip'}"><strong>Create new Trip</strong></v-btn>
      </v-card-actions>
    </v-flex>
  </v-layout>
</template>
<script>
  export default {
    name: 'driver-trip',
    data () {
      return {
        trips: [],
        search: '',
        expand: false,
        pagination: { 'sortBy': 'miles', 'descending': true, 'rowsPerPage': -1 },
        headers: [
          {
            text: 'Driver Name',
            value: 'name'
          }, {
            text: 'Miles',
            value: 'miles'
          }, {
            text: 'Duration',
            value: 'duration'
          }, {
            text: 'Speed(mph)',
            value: 'speed'
          }, {
            text: 'Percentage',
            sortable: false,
            value: 'percentage'
          }
        ]
      }
    },
    created () {
      this.$store.dispatch('Trip/Summary').then(data => {
        console.log(data)
        this.trips = data
      })
    },
    methods: {
      changeSort (column) {
        if (this.pagination.sortBy === column) {
          this.pagination.descending = !this.pagination.descending
        } else {
          this.pagination.sortBy = column
          this.pagination.descending = false
        }
      }
    }
  }
</script>

<style scoped>

</style>
