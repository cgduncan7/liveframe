/* eslint-disable camelcase */

export interface IWeatherValue {
  value: number | string
  units?: string
}

export interface IWeather {
  lat?: number
  lon?: number
  temp?: IWeatherValue
  feels_like?: IWeatherValue
  wind_speed?: IWeatherValue
  wind_direction?: IWeatherValue
  humidity?: IWeatherValue
  precipitation?: IWeatherValue
  weather_code?: IWeatherValue
  observation_time?: IWeatherValue
}
