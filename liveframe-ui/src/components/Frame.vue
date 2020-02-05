<template>
  <div id="frame">
    <div id="display">
    </div>
    <div id="nav">
      <img id="nav-icon" src="./assets/logo_xsmall.png" v-on:click="toggleMenu">
      <div id="nav-title">Liveframe</div>
    </div>
  </div>
</template>

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
