import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuelazyload from 'vue-lazyload'

import fastclick from 'fastclick'

import 'common/stylus/index.styl'

fastclick.attach(document.body)

Vue.use(Vuelazyload, {
  loading: require('common/image/default.png')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
