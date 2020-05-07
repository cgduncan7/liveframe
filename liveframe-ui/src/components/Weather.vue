<template>
  <div id="root">
    <div id="weather">
      <div id="temp">
        <img src="@/assets/weather_icons/thermometer-medium.svg" />
        <span>Actual: {{ temp }}F</span>
        <span>Feels like: {{ feelsLike }}F</span>
      </div>
      <div id="wind">
        <img src="@/assets/weather_icons/wind.svg" />
        <span>{{ windSpeed }}</span>
        <img src="@/assets/weather_icons/compass-west.svg" />
      </div>
      <div id="humidity"></div>
      <div id="precipitation"></div>
    </div>
  </div>
</template>

<script lang="ts">
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

  formatField (val?: IWeatherValue): string {
    if (!val) return '...'
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

  getWeatherCodeIcon (weatherCode: string): string {
    switch (weatherCode) {
      case 'freezing_rain_heavy':
      case 'freezing_rain':
      case 'freezing_rain_light':
      case 'freezing_drizzle':
      case 'ice_pellets_heavy':
      case 'ice_pellets':
      case 'ice_pellets_light': return 'hail'
      case 'snow_heavy':
      case 'snow':
      case 'snow_light': return 'cloud-snow-single'
      case 'flurries': return 'sun-cloud-snow'
      case 'tstorm': return 'lightning'
      case 'rain_heavy': return 'cloud-rain-single'
      case 'rain':
      case 'rain_light':
      case 'drizzle': return 'cloud-rain-single'
      case 'fog_light':
      case 'fog': return 'fog'
      case 'cloudy':
      case 'mostly_cloudy': return 'clouds'
      case 'partly_cloudy':
      case 'mostly_clear': return 'sun-cloud'
      case 'clear': return 'sun'
      default: return 'sun'
    }
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
