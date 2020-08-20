<template>
    <img v-bind:src="src">
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class WindowImage extends Vue {
  private src: string
  constructor () {
    super()

    this.src = 'http://home.collinduncan.com:54321/images/window.jpg?date=' + Date.now()

    setInterval(this.refreshImage, 60000)
  }

  refreshImage () {
    this.src = 'http://home.collinduncan.com:54321/images/window.jpg?date=' + Date.now()
  }
}
</script>

<style lang="scss" scoped>
img {
  width: 100%;
  height: 100%
}
</style>
