import Converter from '../../plugins/Converter'

/**
 * Trip.js Created by sandy on 3/25/2019
 */
export default {
  namespaced: true,
  state: {
    Drivers: []
  },
  actions: {
    AddDriver ({ commit, state }, data) {
      return new Promise((resolve) => {
        commit('AddDriver', data)
        resolve('NEW_DRIVER_ADDED')
      })
    },
    DriverInfo ({ commit, state }, driverId) {
      return new Promise((resolve, reject) => {
        let driverList = state.Drivers
        if (is_defined(driverId)) {
          const list = driverList.filter(driver => driver.id === driverId)
          if (is_defined(list)) {
            resolve(list)
          } else {
            reject(new Error('DRIVER_NOT_FOUND'))
          }
        } else {
          resolve(driverList)
        }
      })
    },
    Create ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        let drivers = state.Drivers.map(function (driver) {
          if (driver.id === data.id) {
            driver.trip.push(data.trip)
            driver['summary'] = Converter.tripSummary(driver.trip)
          }
          return driver
        })
        state.Drivers = drivers
        resolve(drivers)
      })
    },
    Summary ({ commit, state, rootState }) {
      return new Promise((resolve, reject) => {
        const tripList = state.Drivers
        let list = []
        for (let item of tripList) {
          console.log(item)
          let summary = Converter.tripSummary(item.trip)
          if (rootState.Settings.MinSpeed <= summary.speed && summary.speed <= rootState.Settings.MaxSpeed) {
            list.push({
              id: item.id,
              first: item.first,
              last: item.last,
              miles: summary.miles,
              speed: summary.speed,
              duration: summary.hours,
              trips: item.trip
            })
          }
        }
        resolve(list)
      })
    }
  },
  mutations: {
    AddDriver (state, data) {
      const id = Converter.generateId()
      data['id'] = id
      data['trip'] = []
      state.Drivers.push(data)
    }
  },
  getters: {
    DriverList: state => state.Drivers
  }
}
