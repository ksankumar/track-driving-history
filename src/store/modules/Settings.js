/**
 * Settings.js Created by sandy on 3/25/2019
 */
export default {
  namespaced: true,
  state: {
    MinTimeForPickUp: '5:30',
    MaxTimeForDrop: '24:00',
    MinSpeed: 5,
    MaxSpeed: 100
  },
  mutations: {
    MinTimeForPickUp (state, time) {
      state.MinTimeForPickUp = time
    },
    MaxTimeForDrop (state, time) {
      state.MaxTimeForDrop = time
    },
    MinSpeed (state, speed) {
      state.MinSpeed = speed
    },
    MaxSpeed (state, speed) {
      state.MaxSpeed = speed
    }
  },
  actions: {
    Save ({ commit, state }, config) {
      return new Promise((resolve) => {
        commit('MinTimeForPickUp', config.startTime)
        commit('MaxTimeForDrop', config.endTime)
        commit('MinSpeed', config.minSpeed)
        commit('MaxSpeed', config.maxSpeed)
        resolve('SUCCESS')
      })
    }
  },
  getters: {
    MinTimeForPickUp: state => state.MinTimeForPickUp,
    MaxTimeForDrop: state => state.MaxTimeForDrop,
    MinSpeed: state => state.MinSpeed,
    MaxSpeed: state => state.MaxSpeed
  }
}
