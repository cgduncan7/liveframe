<template>
  <button
    id="menu-icon"
    v-on:click="$emit(emitValue)"
    v-bind:class="{ active: toggled }"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class FrameMenuIcon extends Vue {
  @Prop() private toggled!: Boolean
  @Prop() private emitValue!: String
}
</script>

<style scoped lang="scss">
@import '@/styles/base.scss';

#menu-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 30px;

  > * {
    height: 20px;
    width: 20px;
  }

  &:active, &.active {
    background: $base-light-gray;
    border-radius: 25%;
  }
}
</style>
