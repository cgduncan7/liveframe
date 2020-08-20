<template>
  <div id="root">
    <div id="weather">
      <div id="code">
        <img v-bind:src="weatherCodeSrc">
        <span>{{ normalizedWeatherCode }}</span>
      </div>
      <div id="stats">
      </div>
      <div id="temp">
        <img src="@/assets/weather_icons/thermometer-medium.svg" />
        <span>Actual: {{ temp }}</span>
        <span>Feels like: {{ feelsLike }}</span>
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
import { IWeather, IWeatherValue, WeatherValueType } from '../types/weather'

@Component
export default class Weather extends Vue {
  weatherCodeSrc: any = undefined

  constructor () {
    super()

    if (this.$store.state.weather === undefined) {
      this.$store.dispatch('fetchWeather')
    }

    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'setWeather') {
        const payload: IWeather = mutation.payload
        const code = payload.weather_code.value
        this.getWeatherCodeSrc().then((src) => {
          console.log(src)
          this.weatherCodeSrc = src
        })
      }
    })
  }

  get date () {
    return this.$store.state.date
  }

  get weather (): IWeather {
    return this.$store.state.weather
  }

  get feelsLike (): string {
    return this.formatField(this.weather.feels_like, WeatherValueType.TEMP)
  }

  get temp (): string {
    return this.formatField(this.weather.temp, WeatherValueType.TEMP)
  }

  get windSpeed (): string {
    return this.formatField(this.weather.wind_speed, WeatherValueType.WIND_SPEED)
  }

  get windDirection (): string {
    return this.formatField(this.weather.wind_direction, WeatherValueType.WIND_DIRECTION)
  }

  get humidity (): string {
    return this.formatField(this.weather.humidity, WeatherValueType.HUMIDITY)
  }

  get precipitation (): string {
    return this.formatField(this.weather.precipitation, WeatherValueType.PRECIPITATION)
  }

  get weatherCode (): string {
    return this.formatField(this.weather.weather_code, WeatherValueType.WEATHER)
  }

  get normalizedWeatherCode (): string {
    switch (this.weatherCode.toLowerCase()) {
      case 'freezing_rain_heavy':
      case 'freezing_rain':
      case 'freezing_rain_light':
      case 'freezing_drizzle': return 'Freezing Rain'
      case 'ice_pellets_heavy':
      case 'ice_pellets':
      case 'ice_pellets_light': return 'Hail'
      case 'snow_heavy':
      case 'snow':
      case 'snow_light': return 'Snow'
      case 'flurries': return 'Flurries'
      case 'tstorm': return 'Thunderstorm'
      case 'rain_heavy':
      case 'rain':
      case 'rain_light': return 'Rain'
      case 'drizzle': return 'Drizzle'
      case 'fog_light':
      case 'fog': return 'Fog'
      case 'cloudy': return 'Cloudy'
      case 'mostly_cloudy': return 'Mostly Cloudy'
      case 'partly_cloudy': return 'Partly Cloud'
      case 'mostly_clear':
      case 'clear': return 'Sunny'
      default: return 'Sunny'
    }
  }

  async getWeatherCodeSrc (): Promise<any> {
    return import(`@/assets/weather_icons/${this.getWeatherCodeIcon(this.weatherCode)}.svg`)
  }

  formatField (val: IWeatherValue, type: WeatherValueType): string {
    if (!val) return '...'
    let units = val.units ? `${val.units}` : ''
    let value
    switch (type) {
      case WeatherValueType.TEMP:
        units = '°' + units
        value = Math.round(val.value as number)
        break
      case WeatherValueType.HUMIDITY:
      case WeatherValueType.PRECIPITATION:
      case WeatherValueType.WIND_DIRECTION:
      case WeatherValueType.WIND_SPEED:
        value = Math.round(val.value as number)
        break
      case WeatherValueType.WEATHER:
        value = (val.value as string).toUpperCase()
        return value
      default:
        value = val.value
        return `${value}`
    }
    return `${value} ${units}`
  }

  getWeatherCodeIcon (weatherCode: string): string {
    switch (weatherCode.toLowerCase()) {
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
