<template>
  <div id="root">
    <div id="weather">
    </div>
  </div>
</template>

<script lang="ts">
/*
 * freezing_rain_heavy
 * freezing_rain
 * freezing_rain_light
 * freezing_drizzle
 * ice_pellets_heavy
 * ice_pellets
 * ice_pellets_light
 * snow_heavy
 * snow
 * snow_light
 * flurries
 * tstorm
 * rain_heavy
 * rain
 * rain_light
 * drizzle
 * fog_light
 * fog
 * cloudy
 * mostly_cloudy
 * partly_cloudy
 * mostly_clear
 * clear
 */
import { Component, Vue } from 'vue-property-decorator'
import { IWeather, IWeatherValue } from '../types/weather'

@Component
export default class Weather extends Vue {
  constructor () {
    super()

    if (Object.keys(this.$store.state.weather).length === 0) {
      this.$store.dispatch('fetchWeather')
    }
  }
  get date () {
    return this.$store.state.date
  }

  get weather (): IWeather {
    return this.$store.state.weather
  }

  formatField (val: IWeatherValue): string {
    let units = val.units ? ` ${val.units}` : ''
    return `${val.value}${units}`
  }

  get feelsLike (): string {
    return this.formatField(this.weather.feels_like)
  }

  get temp (): string {
    return this.formatField(this.weather.temp)
  }

  get windSpeed (): string {
    return this.formatField(this.weather.wind_speed)
  }

  get windDirection (): string {
    return this.formatField(this.weather.wind_direction)
  }

  get humidity (): string {
    return this.formatField(this.weather.humidity)
  }

  get precipitation (): string {
    return this.formatField(this.weather.precipitation)
  }

  get weatherCode (): string {
    return this.formatField(this.weather.weather_code)
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/base.scss';

#root {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  > * {
    margin-bottom: 20px;
  }
  color: white;
}
</style>
