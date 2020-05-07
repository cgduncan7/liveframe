<template>
  <div id="menu">
    <div id="menu-contents">
      <div id="menu-title">
        <div id="menu-icons-left">
          <FrameMenuIcon :toggled="currentMenuComponent === 'Navigation'" emitValue="toggle-nav" v-on:toggle-nav="toggleNavigation">
            <img src="@/assets/menu.svg"/>
          </FrameMenuIcon>
        </div>
        {{ menuTitle }}
        <div id="menu-icons-right">
          <FrameMenuIcon :toggled="currentMenuComponent === 'Weather'" emitValue="toggle-weather" v-on:toggle-weather="toggleWeather">
            <img src="@/assets/weather_icons/thermometer-medium.svg"/>
          </FrameMenuIcon>
          <FrameMenuIcon :toggled="currentMenuComponent === 'SunTimes'" emitValue="toggle-st" v-on:toggle-st="toggleSunTimes">
            <img src="@/assets/sun.svg"/>
          </FrameMenuIcon>
          <FrameMenuIcon :toggled="currentMenuComponent === 'Info'" emitValue="toggle-info" v-on:toggle-info="toggleInfo">
            <img src="@/assets/info.svg">
          </FrameMenuIcon>
        </div>
      </div>
      <div id="menu-info">
        <component v-bind:is="currentMenuComponent"></component>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import FrameMenuIcon from '@/components/FrameMenuIcon.vue'
import SunTimes from '@/components/SunTimes.vue'
import Info from '@/components/Info.vue'
import Navigation from '@/components/Navigation.vue'
import Weather from './Weather.vue'

Vue.component('FrameMenuIcon', FrameMenuIcon)
Vue.component('SunTimes', SunTimes)
Vue.component('Weather', Weather)
Vue.component('Info', Info)
Vue.component('Navigation', Navigation)

@Component
export default class FrameMenu extends Vue {
  private menuTitle: String
  private currentMenuComponent: String
  constructor () {
    super()

    if (Object.keys(this.$store.state.sunTimes).length === 0) {
      this.$store.dispatch('fetchSunTimes')
    }

    if (Object.keys(this.$store.state.weather).length === 0) {
      this.$store.dispatch('fetchWeather')
    }

    const d: Date = this.$store.getters.date
    const date = d.getDate()
    const month = d.getMonth()

    const isUpdateDate = date === 24 && month === 1
    if (isUpdateDate) {
      this.menuTitle = 'Info'
      this.currentMenuComponent = 'Info'
    } else {
      this.menuTitle = 'Navigation'
      this.currentMenuComponent = 'Navigation'
    }
  }

  toggleNavigation () {
    this.currentMenuComponent = 'Navigation'
    this.menuTitle = 'Navigation'
  }

  toggleSunTimes () {
    this.currentMenuComponent = 'SunTimes'
    this.menuTitle = 'Sun Times'
  }

  toggleInfo () {
    this.currentMenuComponent = 'Info'
    this.menuTitle = 'Info'
  }

  toggleWeather () {
    this.currentMenuComponent = 'Weather'
    this.menuTitle = 'Weather'
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/base.scss';

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
  background: $base-dark-gray;
  opacity: 1;
  color: $base-white;
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
  position: relative;
  width: 100%;
  height: 80%;
  background: $base-gray;
}
</style>
