/*!
|---------------------------------------------------------------
| pronama-summer2020
|---------------------------------------------------------------
*/
import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(Vuex)


const store = new Vuex.Store({
  state: {
    app: {
      name: `pronama-summer2020`,
    },

    characters: [],
  },
  mutations: {},
});


if (document.getElementById('app')) {
  new Vue({
    store,
    el: '#app',
    render: h => h(App),
  })
}
