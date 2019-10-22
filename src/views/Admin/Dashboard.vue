<template>
  <v-layout>
    <v-flex xs12 sm10 offset-sm1>
      <no-data v-if="!drivers.length" title="Drivers"/>
      <v-card v-else>
        <v-layout row wrap mt-3>
          <v-flex xs6 style="border-right: 1px solid #d5d5d5">
            <v-subheader class="blue-grey lighten-3">Total Drivers: {{drivers.length}}</v-subheader>
            <v-card flat width="100%" class="content-scroll" max-height="400px">
              <v-list two-line class="py-0">
                <transition-group name="list">
                  <div v-for="(item, index) in drivers" v-bind:key="index">
                    <v-list-tile avatar @click.stop="selectedItem = item" ripple>
                      <v-list-tile-avatar>
                        <v-avatar color="app" size="36">
                          <span class="white--text headline text-uppercase">{{item.first.charAt(0)}}</span>
                        </v-avatar>
                      </v-list-tile-avatar>
                      <v-list-tile-content>
                        <v-list-tile-title class="text-capitalize">{{item|name}}</v-list-tile-title>
                        <v-list-tile-sub-title v-html="item.email"></v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-divider inset></v-divider>
                  </div>
                </transition-group>
              </v-list>
            </v-card>
          </v-flex>
          <v-flex xs6 text-xs-center>
            <v-card flat class="content-scroll" height="450px">
              <v-scroll-y-transition mode="out-in">
                <div v-if="!selectedItem" class="title grey--text text--lighten-1 font-weight-light"
                     style="align-self: center;">
                  Select a User
                </div>
                <v-layout v-else align-center fill-height>
                  <v-card :key="selectedItem.id" class="mx-auto" flat width="80%">
                    <v-btn fab small dark absolute left style="top:10px;" color="red">
                      <v-icon medium>delete_forever</v-icon>
                    </v-btn>
                    <v-btn fab small dark absolute right style="top:10px;" color="blue">
                      <v-icon medium>edit</v-icon>
                    </v-btn>
                    <v-card-text>
                      <v-avatar color="app" size="88">
                        <span class="white--text text-uppercase" style="font-size: 72px"
                              v-html="selectedItem.first.charAt(0)"/>
                      </v-avatar>
                      <h3 class="headline mb-2 text-capitalize">
                        {{ selectedItem|name }}
                      </h3>
                      <v-flex xs12>
                        <a class="blue--text mb-2" @click.stop="" :href="`mailto:${selectedItem.email}`">{{selectedItem.email}}</a>
                      </v-flex>
                      <v-flex xs12>
                        <a class="blue--text subheading font-weight-bold" @click.stop=""
                           :href="`tel:${selectedItem.phone}`">{{ selectedItem.phone }}</a>
                      </v-flex>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-flex xs12 pt-1 class="blue-grey--text font-weight-bold">Driver license Details</v-flex>
                    <v-card-text>
                      <v-layout row wrap>
                        <v-flex xs6 text-xs-right><strong>License No :</strong></v-flex>
                        <v-flex xs6 text-xs-left pl-2>{{ selectedItem.licenceNo }}</v-flex>
                      </v-layout>
                      <v-layout row wrap>
                        <v-flex xs6 text-xs-right><strong>Issued on :</strong></v-flex>
                        <v-flex xs6 text-xs-left pl-2>{{ selectedItem.licenceIssueDate }}</v-flex>
                      </v-layout>
                      <v-layout row wrap>
                        <v-flex xs6 text-xs-right><strong>Expires :</strong></v-flex>
                        <v-flex xs6 text-xs-left pl-2>{{ selectedItem.licenceExpiresOn }}</v-flex>
                      </v-layout>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-flex xs12 pt-1 class="blue-grey--text font-weight-bold">Total Trip Summary</v-flex>
                    <v-card-text>
                      <v-layout row wrap>
                        <v-flex xs6 text-xs-right><strong>Hours Driven :</strong></v-flex>
                        <v-flex xs6 text-xs-left pl-2>{{ selectedItem.summary.hours }}</v-flex>
                      </v-layout>
                      <v-layout row wrap>
                        <v-flex xs6 text-xs-right><strong>Miles :</strong></v-flex>
                        <v-flex xs6 text-xs-left pl-2>{{ selectedItem.summary.miles }}</v-flex>
                      </v-layout>
                      <v-layout row wrap>
                        <v-flex xs6 text-xs-right><strong>Speed(mph) :</strong></v-flex>
                        <v-flex xs6 text-xs-left pl-2>{{ selectedItem.summary.speed }}</v-flex>
                      </v-layout>
                    </v-card-text>
                  </v-card>
                </v-layout>
              </v-scroll-y-transition>
            </v-card>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
    <AddDriver/>
  </v-layout>
</template>

<script>
  import { mapActions } from 'vuex'
  import AddDriver from '../../components/AddDriver'
  import NoData from '../../components/NoData'

  export default {
    name: 'admin-dashboard',
    components: {
      AddDriver,
      NoData
    },
    data: () => ({
      selectedItem: null
    }),
    computed: {
      drivers () {
        return this.$store.getters['Driver/List']
      }
    },
    methods: {
      ...mapActions('Driver', [
        'Add'
      ])
    }
  }
</script>
<style>
  .list-enter-active {
    animation: add-item 1s;
  }

  .list-leave-active {
    position: absolute;
    animation: add-item 1s reverse;
  }

  .list-move {
    transition: transform 1s;
  }

  @keyframes add-item {
    0% {
      opacity: 0;
      transform: translateX(150px);
    }
    50% {
      opacity: 0.5;
      transform: translateX(-10px) skewX(20deg);
    }
    100% {
      opacity: 1;
      transform: translateX(0px);
    }
  }
</style>
