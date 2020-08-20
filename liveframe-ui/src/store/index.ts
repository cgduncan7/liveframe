/* eslint-disable camelcase */
import Vue from 'vue'
import Vuex from 'vuex'
import axios, { AxiosRequestConfig } from 'axios'

import { IState } from '../types/store'

Vue.use(Vuex)

const serverUrl = process.env.NODE_ENV === 'production'
  ? 'http://home.collinduncan.com:54321/liveframe-server'
  : 'http://localhost:3000'

export default new Vuex.Store<IState>({
  state: {
    date: new Date(),
    dateWatcher: undefined,
    sunTimes: undefined,
    weather: undefined
  },
  getters: {
    date: state => state.date,
    dateWatcher: state => state.dateWatcher,
    sunTimes: state => state.sunTimes,
    weather: state => state.weather
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
    },
    setWeather: (state, weather) => {
      state.weather = weather
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
      axios.get(`${serverUrl}/sun-times`, options)
        .then((res) => {
          commit('setSunTimes', res.data.results)
        })
    },
    fetchWeather: ({ commit }) => {
      const options: AxiosRequestConfig = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Accept': 'application/json'
        }
      }
      axios.get(`${serverUrl}/weather`, options)
        .then((res) => {
          commit('setWeather', res.data)
        })
    }
  },
  modules: {
  }
})
