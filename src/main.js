// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from '@/plugins/router'
import { firestorePlugin } from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'
import vuetify from "@/plugins/vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  vuetify,
  components: { App },
  template: '<App/>'
})

Vue.use(firestorePlugin);

var firebaseConfig = {
  apiKey: "AIzaSyCrZsQA067kkTV9QtAuz4fn2z5UdHc_cEQ",
  authDomain: "cooking-book-808e4.firebaseapp.com",
  databaseURL: "https://cooking-book-808e4.firebaseio.com",
  projectId: "cooking-book-808e4",
  storageBucket: "cooking-book-808e4.appspot.com",
  messagingSenderId: "955428926125",
  appId: "1:955428926125:web:e462a310fd7447a6aa4c24"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

// firebase.auth().onAuthStateChanged(() => {
//   if (!app) {
//     app = new Vue({
//       router,
//       store,
//       i18n,
//       render: h => h(App)
//     }).$mount("#app");
//   }
// });




