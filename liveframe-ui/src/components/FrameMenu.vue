<template>
  <div id="menu">
    Test
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class FrameMenu extends Vue {
}
</script>

<style lang="scss">
#menu {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 30px;
  right: 0;
  background-color: rgba(255, 0, 0, .5);
}
</style>
