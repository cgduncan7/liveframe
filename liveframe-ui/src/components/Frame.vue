<template>
  <div id="frame">
    <div id="display">
      <component :is="childComponentSource" />
    </div>
    <div id="nav">
      <img id="nav-icon" src="@/assets/logo_xsmall.png">
      <div id="nav-title">Liveframe</div>
    </div>
  </div>
</template>

<script lang="ts">
import { VueConstructor } from 'vue'
import {
  Component,
  Prop,
  Vue
} from 'vue-property-decorator'

@Component
export default class Frame extends Vue {
  @Prop() private childComponentSource!: string
}
</script>

<style lang="scss">
#frame {
  width: 100%;
  height: 100%;
}

#display {
  height: 430px;
  overflow: hidden;
}

#nav {
  height: 30px;
  padding: 1px 10px;
  background: #454545;
  color: white;

  * {
    height: 28px;
  }

  #nav-title {
    display: block;
    line-height: 28px;
  }

  #nav-icon {
    display: block;
    position: fixed;
    width: 28px;
    height: 28px;
  }
}
</style>
