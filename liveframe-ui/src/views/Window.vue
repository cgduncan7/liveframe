<template>
  <div id="window">
    <WindowImage />
  </div>
</template>

<script lang="ts">
import WindowImage from '@/components/WindowImage.vue'

export default {
  name: 'window',
  components: {
    WindowImage
  }
}
</script>

<style lang="scss">
#window {
  height: 100%;
  width: 100%;
  img {
    height: 100%;
    width: 100%;
  }
}
</style>
