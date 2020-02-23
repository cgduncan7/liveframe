<template>
  <div id="photo">
    <Frame childComponentSource='PhotoImage' />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Frame from '@/components/Frame.vue'
import PhotoImage from '@/components/PhotoImage.vue'

Vue.component('PhotoImage', PhotoImage)

export default {
  name: 'photo',
  components: {
    Frame
  }
}
</script>

<style lang="scss">
#photo {
  height: 100%;
  width: 100%;
}
</style>
