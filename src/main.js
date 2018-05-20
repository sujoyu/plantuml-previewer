import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import 'babel-polyfill';
import VueDragscroll from 'vue-dragscroll';

Vue.use(Vuetify)
Vue.use(VueDragscroll)

new Vue({
  render: h => h(App)
}).$mount('#app');
