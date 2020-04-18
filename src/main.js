import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as firebase from "firebase"
import Buefy from 'buefy'
import './assets/scss/app.scss'

Vue.use(Buefy)

Vue.config.productionTip = false

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAosLuWYp5whNR46SUwfMES-LdFt4GrgKI",
  authDomain: "dvic-1fcb7.firebaseapp.com",
  databaseURL: "https://dvic-1fcb7.firebaseio.com",
  projectId: "dvic-1fcb7",
  storageBucket: "dvic-1fcb7.appspot.com",
  messagingSenderId: "972816456311",
  appId: "1:972816456311:web:15b68e9b54a4a708e8c472",
  measurementId: "G-BCX1R3GY8F"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
