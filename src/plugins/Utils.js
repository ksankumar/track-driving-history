/**
 * Utils.js Created by sandy on 3/26/2019
 */
import Vue from 'vue'

Vue.filter('name', function (obj) {
  if (is_undefined(obj)) {
    return ''
  }
  if (is_defined(obj.name)) {
    return obj.name
  }
  if (is_defined(obj.last)) {
    return obj.first + ' ' + obj.last
  }
  return obj.first || ''
})

const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
Vue.prototype.$emailPattern = function (email) {
  return !!emailRegEx.test(email) || 'Invalid e-mail.'
}

window.is_undefined = function (a) {
  return (a === null || typeof a === 'undefined' || a === '' || a === 'undefined')
}
window.is_defined = function (a) {
  return !window.is_undefined(a)
}
