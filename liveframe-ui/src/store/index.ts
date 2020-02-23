import Vue from 'vue'
import Vuex from 'vuex'
import axios, { AxiosRequestConfig } from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    date: new Date(),
    dateWatcher: undefined,
    sunTimes: {}
  },
  getters: {
    date: state => state.date,
    dateWatcher: state => state.dateWatcher,
    sunTimes: state => state.sunTimes
  },
  mutations: {
    setDateWatcher: (state, dw) => {
      state.dateWatcher = dw
    },
    setDate: (state, date) => {
      state.date = date
    },
    setSunTimes: (state, sunTimes) => {
      state.sunTimes = sunTimes
    }
  },
  actions: {
    watchTime: ({ commit, getters }) => {
      if (!getters.dateWatcher) {
        const dw = setInterval(() => {
          commit('setDate', new Date())
        }, 1000)
        commit('setDateWatcher', dw)
      }
    },
    unwatchTime: ({ commit, getters }) => {
      let dw = getters.dateWatcher
      if (dw) {
        clearInterval(dw)
        commit('setDateWatcher', undefined)
      }
    },
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
    }
  },
  modules: {
  }
})
