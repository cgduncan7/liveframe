<template>
  <div id="menu">
    <div id="menu-contents">
      <div id="menu-title">
        Sun times
      </div>
      <div id="menu-info">
        <div>
          Sunrise: {{ sunrise }}
        </div>
        <div>
          Sunset: {{ sunset }}
        </div>
        <div id="sun-position">
          <span id="sun" :style="{ left: sunOffsetX, top: sunOffsetY }" />
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
  private faketime: number
  constructor () {
    super()

    this.faketime = 0.9
    if (Object.keys(this.$store.state.sunTimes).length === 0) {
      this.$store.dispatch('fetchSunTimes')
    }
  }

  get sunrise () {
    return this.$store.state.sunTimes.sunrise || 'Loading...'
  }

  get sunset () {
    return this.$store.state.sunTimes.sunset || 'Loading...'
  }

  get dayLength () {
    return this.$store.state.sunTimes.day_length || 0
  }

  get sunOffsetX () {
    const now: number = Date.now()
    const today: Date = new Date(now)
    const srd: Date = new Date(now)
    srd.setHours(this.sunrise.substring(0, 1))
    srd.setMinutes(this.sunrise.substring(2, 4))

    const ssd: Date = new Date(now)
    ssd.setHours(Number.parseInt(this.sunset.substring(0, 1)) + 12)
    ssd.setMinutes(this.sunset.substring(2, 4))

    const sunrise: number = srd.getTime()
    const sunset: number = ssd.getTime()
    console.log(now - sunrise)
    console.log(sunset - sunrise)

    const xPos = (now - sunrise) / (sunset - sunrise) // 0.41
    const percent = `${this.faketime * 100}%`
    return percent
  }

  get sunOffsetY () {
    const now: number = Date.now()
    const today: Date = new Date(now)
    const srd: Date = new Date(now)
    srd.setHours(this.sunrise.substring(0, 1))
    srd.setMinutes(this.sunrise.substring(2, 4))

    const ssd: Date = new Date(now)
    ssd.setHours(Number.parseInt(this.sunset.substring(0, 1)) + 12)
    ssd.setMinutes(this.sunset.substring(2, 4))

    const sunrise: number = srd.getTime()
    const sunset: number = ssd.getTime()
    console.log(now - sunrise)
    console.log(sunset - sunrise)

    const xPos = (now - sunrise) / (sunset - sunrise) // 0.41
    const percent = `${(this.faketime - 0.5) * 100}%`
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

#menu-info {
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5%;
  width: 100%;
  height: 100%;
  > * {
    margin-bottom: 10px;
  }
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
