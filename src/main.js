import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import 'babel-polyfill';

Vue.use(Vuetify)

new Vue({
  render: h => h(App)
}).$mount('#app');
