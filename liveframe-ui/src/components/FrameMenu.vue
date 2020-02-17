<template>
  <div id="menu">
    <div id="menu-contents">
      <div id="menu-title">
        <div id="menu-icons-left">
          <img
            src="@/assets/menu.svg"
            height="20px" width="20px"
            style="filter: invert(98%) sepia(0%) saturate(7490%) hue-rotate(142deg) brightness(103%) contrast(102%);"
          />
        </div>
        Sun times
        <div id="menu-icons-right">
          <div>Sun Times</div>
        </div>
      </div>
      <div id="menu-info">
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
          <span
            id="sun"
            :style="{ transform: 'translate(-50%, -50%)', left: sunXPerc(), top: sunYPerc()  }"
          />
          <div id="horizon"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class FrameMenu extends Vue {
  constructor () {
    super()

    if (Object.keys(this.$store.state.sunTimes).length === 0) {
      this.$store.dispatch('fetchSunTimes')
    }
  }

  get date () {
    return this.$store.state.date
  }

  get sunrise () {
    return this.$store.state.sunTimes.sunrise || 'Loading...'
  }

  get sunset () {
    return this.$store.state.sunTimes.sunset || 'Loading...'
  }

  currentTime () {
    let ampm = 'AM'
    let hours = this.date.getHours()
    if (hours > 12) {
      hours -= 12
      ampm = 'PM'
    } else if (hours === 12) {
      ampm = 'PM'
    } else if (hours === 0) {
      hours = 12
    }
    return `${hours}:${('0' + this.date.getMinutes()).slice(-2)}:${('0' + this.date.getSeconds()).slice(-2)} ${ampm}`
  }

  calculateSunPosition () {
    const now: number = this.date.getTime()
    const srd: Date = new Date(now)
    srd.setHours(this.sunrise.substring(0, 1))
    srd.setMinutes(this.sunrise.substring(2, 4))

    const ssd: Date = new Date(now)
    ssd.setHours(Number.parseInt(this.sunset.substring(0, 1)) + 12)
    ssd.setMinutes(this.sunset.substring(2, 4))

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

<style scoped lang="scss">
#menu {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 30px;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

#menu-contents {
  position: relative;
  background: #454545cc;
  width: 80%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#menu-title {
  position: relative;
  height: 20%;
  width: 100%;
  background: #454545;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

#menu-icons-left {
  position: absolute;
  left: 10px;
  height: 100%;
  width: 30%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

#menu-icons-right {
  position: absolute;
  right: 10px;
  height: 100%;
  width: 30%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}

#menu-info {
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5%;
  width: 100%;
  height: 100%;
  > * {
    margin-bottom: 20px;
  }
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
  background: yellow;
  border-radius: 50%;
}

#horizon {
  position: absolute;
  width: 100%;
  height: 1px;
  border: 1px solid black;
  top: 50%;
}
</style>
