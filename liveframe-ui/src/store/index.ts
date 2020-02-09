import Vue from 'vue'
import Vuex from 'vuex'
import axios, { AxiosRequestConfig } from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sunTimes: {}
  },
  getters: {
    sunTimes: state => state.sunTimes
  },
  mutations: {
    setSunTimes: (state, sunTimes) => {
      state.sunTimes = sunTimes
    }
  },
  actions: {
    fetchSunTimes: ({ commit }) => {
      const options: AxiosRequestConfig = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Accept': 'application/json'
        }
      }
      axios.get('http://home.collinduncan.com:54321/liveframe-server/sun-times', options)
        .then((res) => {
          commit('setSunTimes', res.data.results)
        })
        .catch((e) => console.log(e))
    }
  },
  modules: {
  }
})
