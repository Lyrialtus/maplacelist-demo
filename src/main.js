// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuetify from 'vuetify';
import firebase from 'firebase/app';
import YmapPlugin from 'vue-yandex-maps';
import App from './App';
import router from './router';
import store from './store';

Vue.use(Vuetify);
Vue.use(YmapPlugin);
Vue.config.productionTip = false;

const config = {
  apiKey: 'AIzaSyBB7cVWI6-jIjFWTngPiI840n2n-53d6Vw',
  authDomain: 'maplacelist-demo.firebaseapp.com',
  databaseURL: 'https://maplacelist-demo.firebaseio.com',
  projectId: 'maplacelist-demo',
  storageBucket: '',
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App,
  },
  created() {
    firebase.initializeApp(config);
    this.$store.dispatch('getPlaces');
  },
});
