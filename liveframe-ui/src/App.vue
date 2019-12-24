<template>
  <div id="app">
    <div id="display">
      <router-view/>
    </div>
    <div id="nav">
      <img id="nav-icon" src="./assets/logo_xsmall.png">
      <div id="nav-title">Liveframe</div>
    </div>
  </div>
</template>

<style lang="scss">
* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 780px;
  height: 460px;
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
