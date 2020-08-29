<template>
  <div id="frame">
    <div id="display">
      <component :is="childComponentSource" />
    </div>
    <div id="nav">
      <img id="nav-icon" src="@/assets/logo_xsmall.png" v-on:click="toggleMenu">
      <!-- <img id="nav-camera" src="@/assets/camera.svg"> -->
      <div id="nav-title">Liveframe</div>
      <div id="nav-clock">{{ currentTime }}</div>
    </div>
    <FrameMenu v-if="menuVisible"></FrameMenu>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import FrameMenu from '@/components/FrameMenu.vue'

Vue.component('FrameMenu', FrameMenu)

@Component
export default class Frame extends Vue {
  @Prop() private childComponentSource!: string
  private menuVisible: boolean = false

  toggleMenu () {
    this.menuVisible = !this.menuVisible
  }

  get date (): Date {
    return this.$store.getters.date
  }

  get currentTime () : String {
    return this.date.toLocaleTimeString('en-US', { timeZone: 'Europe/Amsterdam' })
  }
}
</script>

<style lang="scss">
@import '@/styles/base.scss';

#frame {
  position: relative;
  width: 100%;
  height: 100%;
}

#display {
  position: relative;
  height: 430px;
  overflow: hidden;
}

#nav {
  position: relative;
  height: 30px;
  width: 100%;
  padding: 1px;
  background: $base-gray;
  color: $base-white;
  display: inline-grid;
  grid-template-columns: 40px 40px 60px auto 140px;

  * {
    height: 28px;
  }

  #nav-title {
    display: block;
    line-height: 28px;
    grid-column-start: 4;
    grid-column-end: 5;
    justify-self: center;
  }

  #nav-icon {
    width: 28px;
    height: 28px;
    grid-column-start: 1;
    grid-column-end: 2;
    justify-self: center;
  }

  #nav-camera {
    width: 28px;
    height: 28px;
    grid-column-start: 2;
    grid-column-end: 3;
    justify-self: center;
  }

  #nav-clock {
    display: block;
    line-height: 28px;
    grid-column-start: 5;
    justify-self: end;
    margin-right: 5px;
  }
}
</style>
