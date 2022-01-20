import { IRawWeatherData, IWeather } from '../types/weather'

const transformWeatherCode = (code: number): string => {
  switch (code) {
    case 1001: return 'cloudy'
    case 1101: return 'partly_cloudy'
    case 1102: return 'mostly_cloudy'
    case 2000:
    case 2100: return 'fog'
    case 4000: return 'drizzle'
    case 4001:
    case 4200:
    case 4201: return 'rain'
    case 5001: return 'flurries'
    case 5000:
    case 5100:
    case 5101: return 'snow'
    case 6000:
    case 6001:
    case 6200:
    case 6201: return 'freezing_rain'
    case 7000:
    case 7101:
    case 7102: return 'ice_pellets'
    case 8000: return 'tstorm'
    default: return 'sunny'
  }
}

export const transformWeatherData = (rawWeatherData: IRawWeatherData): IWeather => {
  if (
    rawWeatherData.data &&
    rawWeatherData.data.timelines &&
    rawWeatherData.data.timelines[0] &&
    rawWeatherData.data.timelines[0].intervals &&
    rawWeatherData.data.timelines[0].intervals[0]
  ) {
    const currentIntervalData = rawWeatherData.data.timelines[0].intervals[0]

    return {
      temp: {
        value: currentIntervalData.values.temperature,
        units: 'F'
      },
      feels_like: {
        value: currentIntervalData.values.temperatureApparent,
        units: 'F'
      },
      wind_speed: {
        value: currentIntervalData.values.windSpeed,
        units: 'mph'
      },
      wind_direction: {
        value: currentIntervalData.values.windDirection
      },
      humidity: {
        value: currentIntervalData.values.humidity
      },
      precipitation: {
        value: currentIntervalData.values.precipitationIntensity
      },
      weather_code: {
        value: transformWeatherCode(currentIntervalData.values.weatherCode)
      },
      observation_time: {
        value: currentIntervalData.startTime
      }
    }
  }

  return {
    temp: {
      value: 0,
      units: 'F'
    },
    feels_like: {
      value: 0,
      units: 'F'
    },
    wind_speed: {
      value: 0,
      units: 'mph'
    },
    wind_direction: {
      value: 0
    },
    humidity: {
      value: 0
    },
    precipitation: {
      value: 0
    },
    weather_code: {
      value: 0
    },
    observation_time: {
      value: new Date().toString()
    }
  }
}
