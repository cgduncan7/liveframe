<template>
  <div id="frame">
    <div id="display">
      <component :is="childComponentSource" />
    </div>
    <div id="nav">
      <img id="nav-icon" src="@/assets/logo_xsmall.png" v-on:click="toggleMenu">
      <div id="nav-title">Liveframe</div>
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
  private menuVisible!: boolean

  constructor () {
    super()
    this.menuVisible = false
  }

  toggleMenu () {
    this.menuVisible = !this.menuVisible
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
  padding: 1px 10px;
  background: $base-gray;
  color: $base-white;

  * {
    height: 28px;
  }

  #nav-title {
    display: block;
    line-height: 28px;
    margin-left: 30px;
    margin-right: 30px;
  }

  #nav-icon {
    display: block;
    position: absolute;
    width: 28px;
    height: 28px;
  }
}
</style>
