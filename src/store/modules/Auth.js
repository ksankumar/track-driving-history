/**
 * Created by Santhosh Kumar, Krishnan on 3/27/19.
 */
import Converter from '../../plugins/Converter'

export default {
  namespaced: true,
  state: {
    IsLoggedIn: false,
    LogInBy: null,
    Users: [{
      'id': '1553735275',
      'email': 'admin@email.com',
      'password': 'password',
      'role': 'admin'
    }, {
      'id': '1553738275',
      'email': 'driver@email.com',
      'password': 'password',
      'role': 'user'
    }]
  },
  mutations: {
    Register (state, data) {
      const id = Converter.generateId()
      data['id'] = id
      state.Users.push(data)
    },
    IsLoggedIn (state, data) {
      state.IsLoggedIn = data
    },
    LogInBy (state, role) {
      state.LogInBy = role
    }
  },
  actions: {
    Login ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        for (let user of state.Users) {
          if (user.email === data.email && user.password === data.password) {
            commit('IsLoggedIn', true)
            commit('LogInBy', data.role)
            resolve(user)
          }
        }
        reject(new Error('User not found. Please register'))
      })
    },
    CheckEmail ({ commit, state }, email) {
      return new Promise((resolve, reject) => {
        for (let user of state.Users) {
          if (user.email === email) {
            reject(new Error('EMAIL_ALREADY_EXIST'))
          }
        }
        resolve('AVAILABLE')
      })
    },
    Register ({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit('Register', data)
        resolve('SUCCESS')
      })
    },
    Logout ({ commit }) {
      return new Promise((resolve, reject) => {
        commit('IsLoggedIn', false)
        commit('LogInBy', '')
        resolve('SUCCESS')
      })
    }
  },
  getters: {
    List: state => state.List,
    IsLoggedIn: state => state.IsLoggedIn,
    LogInBy: state => state.LogInBy
  }
}
