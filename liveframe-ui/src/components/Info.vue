<template>
  <div id="root">
    <h3>Version 2!</h3>
    <ul>
      <li>Added menu pop-up (this). Click <span><img width=20 height=20 src="@/assets/logo_xsmall.png"/></span> in bottom right to open.</li>
      <li>Added sun times! Now shows the sunrise/sunset, current time, and current sun position. Accessible by clicking <span><img width=20 height=20 src="@/assets/sun.svg"/></span> in this menu.</li>
      <li>Added info menu (these words). Will open each update to give you more info on what has changed.</li>
      <li>Added navigation menu. Can use this to navigate to other pages in the app.</li>
      <li>Navigation contains links to 'Window' and 'Photo'. More to come later!</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Info extends Vue {
}
</script>

<style lang="scss" scoped>
@import '@/styles/base.scss';

#root {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: $base-white;
  overflow-y: scroll;
}

h1, h2, h3, h4, h5 {
  margin: 5px;
}
</style>
