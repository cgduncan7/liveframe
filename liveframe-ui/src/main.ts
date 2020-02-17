import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io'

let { token } = require('./assets/token.json')
if (!token) {
  token = 'UNKNOWN'
}

Vue.config.productionTip = false

Vue.use(new VueSocketIO({
  debug: true,
  connection: `http://localhost:3000?token=${token}`,
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
}))

store.dispatch('watchTime')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
