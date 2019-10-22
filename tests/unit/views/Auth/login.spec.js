/**
 * login.spec.js.js Created by sandy on 3/30/2019
 */
import Vue from 'vue'
import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import '@/plugins/Utils.js'
import Login from '@/views/Auth/Login.vue'
// import flushPromises from 'flush-promises'
import store from '@/store/modules/Auth.js'

describe('Login.vue', () => {
  // afterEach(() => {
  //   Login.$destroy()
  // })

  Vuetify.install(Vue)
  // let wrapper
  const routes = [
    { path: '/drivers', name: 'DriverList' }
  ]
  const router = new VueRouter({ routes })
  // const localVue = createLocalVue()
  Vue.use(VueRouter)
  // localVue.use(Vuetify)
  // beforeEach(() => {
  //   const localVue = createLocalVue()
  //   localVue.use(VueRouter)
  //   localVue.use(Vuetify)
  //
  let wrapper = shallowMount(Login, {
    setData: { email: 'admin@email.com', password: 'password' },
    attachToDocument: true,
    router
  })
  it('Check Login page is rendered', () => {
    expect(shallowMount(Login).isVueInstance())
  })
  it('check login data exist', () => {
    expect(Login.data).to.be.a('function')
  })
  it('check user email default data exist', () => {
    const defaultData = Login.data()
    expect(defaultData.email).to.be.a('admin@email.com')
  })
  it('Check Login Button is triggered', async () => {
    store.actions.Login({ email: 'admin@email.com', password: 'password' }).then(data => {
      expect(data.role).to.be.a('admin')
    })
    // wrapper.find('form').trigger('submit.prevent')
    // await flushPromises()
    // expect(wrapper.vm.onLogon()).toHaveBeenCalled()
  })
})
