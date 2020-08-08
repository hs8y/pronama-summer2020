/*!
|---------------------------------------------------------------
| pronama-summer2020
|---------------------------------------------------------------
*/
import Vue from 'vue';
import Vuex from 'vuex';
import VueSmoothScroll from 'vue2-smooth-scroll'
import App from './App.vue';
import BootstrapVue from 'bootstrap-vue'

const path = require('path');

Vue.use(BootstrapVue)
Vue.use(Vuex)
Vue.use(VueSmoothScroll);

// Components
const require_component = require.context('./components', false, /.+\.vue$/);
require_component.keys().forEach(name => {
  const config = require_component(name)
  const component_name = name.split('/').pop().replace(/\.\w+$/, '');

  Vue.component(component_name, config.default);
});


const store = new Vuex.Store({
  state: {
    app: {
      name: `pronama-summer2020`,
      image_path: './images',

      character: {},
      character_type_index: 0,
      background: '',
      comment: '',
    },

    characters: [
      {
        name: `暮井 慧（プロ生ちゃん）`,
        images: [
          { name: `表情A`, file: 'kei_01.png' },
          { name: `表情B`, file: 'kei_02.png' },
          { name: `表情C`, file: 'kei_03.png' },
          { name: `表情D`, file: 'kei_04.png' },
          { name: `表情E`, file: 'kei_05.png' },
        ],
        copyright: `© 2019 合同会社プロ生`,
      },
      {
        name: `戸増千由莉（とますちゆり）`,
        images: [
          { name: `表情A`, file: 'chiyuri_01.png' },
          { name: `表情B`, file: 'chiyuri_02.png' },
          { name: `表情C`, file: 'chiyuri_03.png' },
          { name: `表情D`, file: 'chiyuri_04.png' },
          { name: `表情E`, file: 'chiyuri_05.png' },
        ],
        copyright: `© 2019 合同会社プロ生`,
      },
      {
        name: `フィネス・ヒルヴィレッジ（Finesse Hillvillage）`,
        images: [
          { name: `表情A`, file: 'finesse_01.png' },
          { name: `表情B`, file: 'finesse_02.png' },
          { name: `表情C`, file: 'finesse_03.png' },
          { name: `表情D`, file: 'finesse_04.png' },
          { name: `表情E`, file: 'finesse_05.png' },
        ],
        copyright: `© 2019 合同会社プロ生`,
      },
    ],
  },
  mutations: {
    updateCharacter(state, character) {
      state.app.character = character;
    },
    updateCharacterType(state, index) {
      state.app.character_type_index = index;
    },
    updateBackground(state, background) {
      state.app.background = background;
    },
    updateComment(state, comment) {
      state.app.comment = comment;
    },
  },
  getters: {
    imagePath: state => image_path => {
      return path.join(state.app.image_path, image_path);
    },
    characterImage: state => {
      const index = state.app.character_type_index;
      const file  = state.app.character.images[index].file;

      return path.join(state.app.image_path, file);
    },
  },
});


if (document.getElementById('app')) {
  new Vue({
    store,
    el: '#app',
    render: h => h(App),
  })
}
