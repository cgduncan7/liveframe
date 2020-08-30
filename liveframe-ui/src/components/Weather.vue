<template>
  <div id="root">
    <div id="code">
      <img v-if="displayWeatherIcon('hail')" src="@/assets/weather_icons/hail.svg">
      <img v-if="displayWeatherIcon('cloud-snow-single')" src="@/assets/weather_icons/cloud-snow-single.svg">
      <img v-if="displayWeatherIcon('lightning')" src="@/assets/weather_icons/lightning.svg">
      <img v-if="displayWeatherIcon('cloud-rain-single')" src="@/assets/weather_icons/cloud-rain-single.svg">
      <img v-if="displayWeatherIcon('fog')" src="@/assets/weather_icons/fog.svg">
      <img v-if="displayWeatherIcon('clouds')" src="@/assets/weather_icons/clouds.svg">
      <img v-if="displayWeatherIcon('sun-cloud')" src="@/assets/weather_icons/sun-cloud.svg">
      <img v-if="displayWeatherIcon('sun')" src="@/assets/weather_icons/sun.svg">
      <span>{{ normalizedWeatherCode }}</span>
    </div>
    <div id="stats">
      <div id="temp">
        <div id="values">
          <span>{{ temp }} (feels like {{ feelsLike }})</span>
        </div>
        <img v-if="isTemp('medium')" src="@/assets/weather_icons/thermometer-medium.svg" />
        <img v-if="isTemp('hot')" src="@/assets/weather_icons/thermometer-hot.svg" />
        <img v-if="isTemp('cold')" src="@/assets/weather_icons/thermometer-cold.svg" />
      </div>
      <div id="wind">
        <div id="values">
          <span>{{ windSpeed }} {{ windDirection }}</span>
        </div>
        <img v-if="isWindDirection('north')" src="@/assets/weather_icons/compass-north.svg" />
        <img v-if="isWindDirection('north-east')" src="@/assets/weather_icons/compass-north-east.svg" />
        <img v-if="isWindDirection('east')" src="@/assets/weather_icons/compass-east.svg" />
        <img v-if="isWindDirection('south-east')" src="@/assets/weather_icons/compass-south-east.svg" />
        <img v-if="isWindDirection('south')" src="@/assets/weather_icons/compass-south.svg" />
        <img v-if="isWindDirection('south-west')" src="@/assets/weather_icons/compass-south-west.svg" />
        <img v-if="isWindDirection('west')" src="@/assets/weather_icons/compass-west.svg" />
        <img v-if="isWindDirection('north-west')" src="@/assets/weather_icons/compass-north-west.svg" />
      </div>
      <div id="humidity">
        <div id="values">
          <span>{{ humidity }} humidity</span>
        </div>
        <img src="@/assets/weather_icons/barometer.svg">
      </div>
      <div id="precipitation">
        <div id="values">
          <span>{{ precipitation }}</span>
        </div>
        <img src="@/assets/weather_icons/raindrop.svg">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { IWeather, IWeatherValue, WeatherValueType } from '../types/weather'

@Component
export default class Weather extends Vue {
  constructor () {
    super()

    if (this.$store.state.weather === undefined) {
      this.$store.dispatch('fetchWeather')
    }
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
      case 'partly_cloudy': return 'Partly Cloudy'
      case 'mostly_clear':
      case 'clear': return 'Sunny'
      default: return 'Sunny'
    }
  }

  getWeatherCodeIcon (weatherCode: string): string {
    if (weatherCode === undefined) {
      return 'sun'
    }
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
      case 'snow_light':
      case 'flurries': return 'cloud-snow-single'
      case 'tstorm': return 'lightning'
      case 'rain_heavy':
      case 'rain':
      case 'rain_light':
      case 'drizzle': return 'cloud-rain-single'
      case 'fog_light':
      case 'fog': return 'fog'
      case 'cloudy': return 'clouds'
      case 'mostly_cloudy':
      case 'partly_cloudy':
      case 'mostly_clear': return 'sun-cloud'
      case 'clear': return 'sun'
      default: return 'sun'
    }
  }

  displayWeatherIcon (iconName: string): boolean {
    return this.getWeatherCodeIcon(this.weatherCode) === iconName
  }

  isTemp (temp: string): boolean {
    switch (temp) {
      case 'hot': return this.weather.temp.value > 75
      case 'cold': return this.weather.temp.value < 45
      case 'medium': return this.weather.temp.value <= 75 && this.weather.temp.value >= 45
      default: return false
    }
  }

  isWindDirection (windDir: string): boolean {
    const degrees = this.weather.wind_direction.value
    switch (windDir) {
      case 'north': return degrees >= 348.76 || degrees <= 33.75
      case 'north-east': return degrees >= 33.76 && degrees <= 78.75
      case 'east': return degrees >= 78.76 && degrees <= 123.75
      case 'south-east': return degrees >= 123.76 && degrees <= 168.75
      case 'south': return degrees >= 168.76 && degrees <= 213.75
      case 'south-west': return degrees >= 213.76 && degrees <= 258.75
      case 'west': return degrees >= 258.76 && degrees <= 303.75
      case 'north-west': return degrees >= 303.75 && degrees <= 348.75
      default: return false
    }
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
      case WeatherValueType.HUMIDITY: {
        value = Math.round(val.value as number)
        return `${value}${units}`
      }
      case WeatherValueType.PRECIPITATION: {
        value = Math.round(val.value as number)
        break
      }
      case WeatherValueType.WIND_DIRECTION: {
        const value = val.value as number
        if (value >= 348.76 || value <= 33.75) return 'N'
        else if (value >= 33.76 && value <= 78.75) return 'NE'
        else if (value >= 78.76 && value <= 123.75) return 'E'
        else if (value >= 123.76 && value <= 168.75) return 'SE'
        else if (value >= 168.76 && value <= 213.75) return 'S'
        else if (value >= 213.76 && value <= 258.75) return 'SW'
        else if (value >= 258.76 && value <= 303.75) return 'W'
        else if (value >= 303.75 && value <= 348.75) return 'NW'
        else return '...'
      }
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
  flex-direction: row;
  align-items: center;
  > * {
    margin-bottom: 20px;
  }
  color: white;
}

#code {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > img {
    height: 80%
  }

  > span {
    height: 20%;
    font-size: 24px;
  }
}

#stats {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;

  > * {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    width: 100%;

    > img {
      height: 100%;
    }

    > #values {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: space-around;
    }
  }
}
</style>
