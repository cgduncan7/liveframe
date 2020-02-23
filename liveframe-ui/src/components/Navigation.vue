<template>
  <div id="root">
    <button v-on:click="nav('window')">Window</button>
    <button v-on:click="nav('photo')">Photo</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { RawLocation } from 'vue-router'

@Component
export default class Navigation extends Vue {
  nav (dest: RawLocation) {
    this.$router.replace(dest)
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/base.scss';

#root {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 10%;
  color: $base-white;
  display: flex;
  flex-direction: row;
}

button {
  height: 50%;
  width: 50%;
  background: $base-light-gray;
  margin: 5%;
}
</style>
