<template>
  <div id="root">
    <button>Window</button>
    <button>Photo</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Navigation extends Vue {
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
