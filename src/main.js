// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import './firebase';
import VueFire from 'vuefire';
import App from './App'
import router from './router'
  import 'bootstrap/dist/css/bootstrap.css'
  import jQuery from 'jquery/dist/jquery.js'

Vue.config.productionTip = false
Vue.use(VueFire);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
