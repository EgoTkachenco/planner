import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import SocketIO from 'socket.io-client';
// import VueSocketIO from 'vue-socket.io'
Vue.config.productionTip = false

import './registerServiceWorker'
import vuetify from './plugins/vuetify';

// Vue.use(new VueSocketIO({
//   debug: true,
//   connection: SocketIO(`http://localhost:3000/room`), 
//   vuex: {
//     store,
//     actionPrefix: "SOCKET_",
//     options: { path: "/room/" } 
//   }
// }));

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')


