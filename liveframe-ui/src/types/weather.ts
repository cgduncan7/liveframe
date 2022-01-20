/* eslint-disable camelcase */

export enum WeatherValueType {
  TEMP,
  HUMIDITY,
  PRECIPITATION,
  WIND_DIRECTION,
  WIND_SPEED,
  WEATHER,
  GPS,
}

export interface IWeatherValue {
  value: number | string
  units?: string
}

export interface IWeather {
  temp: IWeatherValue
  feels_like: IWeatherValue
  wind_speed: IWeatherValue
  wind_direction: IWeatherValue
  humidity: IWeatherValue
  precipitation: IWeatherValue
  weather_code: IWeatherValue
  observation_time: IWeatherValue
}

export interface IRawTimelineIntervalValues {
  temperature: number
  temperatureApparent: number
  weatherCode: number
  windSpeed: number
  windDirection: number
  humidity: number
  precipitationIntensity: number
  precipitationProbability: number
  precipitationType: number
}
export interface IRawTimelineInterval {
  startTime: string
  values: IRawTimelineIntervalValues
}
export interface IRawTimeline {
  timestep: string
  startTime: string
  endTime: string
  intervals: IRawTimelineInterval[]
}
export interface IRawWeatherData {
  data: {
    timelines: IRawTimeline[]
  }
}
