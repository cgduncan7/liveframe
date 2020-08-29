<template>
  <div id="root">
    <div id="sun-times">
      <div>
        Sunrise: {{ sunrise }}
      </div>
      <div>
        Sunset: {{ sunset }}
      </div>
    </div>
    <div id="current-time">
      {{ currentTime() }}
    </div>
    <div id="sun-position">
      <img
        id="sun"
        src="@/assets/sun.svg"
        :style="{ transform: 'translate(-50%, -50%)', left: sunXPerc(), top: sunYPerc()  }"
      />
      <div id="horizon"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class SunTimes extends Vue {
  constructor () {
    super()

    if (this.$store.state.sunTimes === undefined) {
      this.$store.dispatch('fetchSunTimes')
    }
  }
  get date () {
    return this.$store.state.date
  }

  get sunrise () {
    const t = this.$store.state.sunTimes.sunrise
    return (t ? this.formatTime(t) : 'Loading...')
  }

  get sunset () {
    const t = this.$store.state.sunTimes.sunset
    return (t ? this.formatTime(t) : 'Loading...')
  }

  formatTime (time: string) : String {
    const options = {
      hour: 'numeric',
      minute: 'numeric'
    }

    return Intl.DateTimeFormat('en-US', options).format(new Date(time))
  }

  currentTime () : String {
    return (this.date as Date).toLocaleTimeString('en-US', { timeZone: 'Europe/Amsterdam' })
  }

  calculateSunPosition () {
    const now: number = this.date.getTime()
    const srd: Date = new Date(now)
    srd.setHours(Number.parseInt(this.sunrise.substring(0, 1)))
    srd.setMinutes(Number.parseInt(this.sunrise.substring(2, 4)))

    const ssd: Date = new Date(now)
    ssd.setHours(Number.parseInt(this.sunset.substring(0, 1)) + 12)
    ssd.setMinutes(Number.parseInt(this.sunset.substring(2, 4)))

    const sunrise: number = srd.getTime()
    const sunset: number = ssd.getTime()

    let s
    if (now > sunset) { // sunset
      s = -(1.0 - (now - sunset) / (sunrise + 86400000 - sunset))
    } else if (now < sunrise) {
      s = -(1.0 - (now - (sunset - 86400000)) / (sunrise - (sunset - 86400000)))
    } else {
      s = (now - sunrise) / (sunset - sunrise)
    }
    return s
  }

  sunXPerc () {
    const sp = this.calculateSunPosition()
    const xPos = sp >= 0 ? sp : -sp
    const percent = `${xPos * 100}%`
    return percent
  }

  sunYPerc () {
    const sp = this.calculateSunPosition()
    const yPos = sp >= 0
      ? Math.sin(sp * Math.PI) * 0.4
      : Math.sin(-sp * Math.PI) * -0.4
    const percent = `${(0.5 - yPos) * 100}%`
    return percent
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

#sun-times {
  width: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}

#sun-position {
  position: relative;
  width: 50%;
  height: 75%;
}

#sun {
  position: absolute;
  height: 25px;
  width: 25px;
  border-radius: 50%;
}

#horizon {
  position: absolute;
  width: 100%;
  height: 1px;
  border: 1px solid $base-white;
  top: 50%;
}
</style>
