import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import firebase from 'firebase/app';
import './registerServiceWorker'
import vuetify from './plugins/vuetify';

var firebaseConfig = {
  apiKey: "AIzaSyBt4sQDJOVAR9uQxlmM9cV6WvGDHPexeVc",
  authDomain: "planner-org-app.firebaseapp.com",
  databaseURL: "https://planner-org-app.firebaseio.com",
  projectId: "planner-org-app",
  storageBucket: "planner-org-app.appspot.com",
  messagingSenderId: "52858916149",
  appId: "1:52858916149:web:250934d4606a93f4ff507c"
};

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')


