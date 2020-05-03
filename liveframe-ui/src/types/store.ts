import { ISunTimes } from './sun_times'
import { IWeather } from './weather'

export interface IState {
  date: Date,
  dateWatcher: number | undefined,
  sunTimes: ISunTimes,
  weather: IWeather
}
