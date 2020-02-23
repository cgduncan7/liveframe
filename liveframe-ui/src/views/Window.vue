<template>
  <div id="window">
    <Frame childComponentSource='WindowImage' />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Frame from '@/components/Frame.vue'
import WindowImage from '@/components/WindowImage.vue'

Vue.component('WindowImage', WindowImage)

export default {
  name: 'window',
  components: {
    Frame
  }
}
</script>

<style lang="scss">
#window {
  height: 100%;
  width: 100%;
}
</style>
