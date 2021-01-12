import Vue from 'vue';
// import Vuetify from 'vuetify/lib';
import App from './App.vue';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import './main.css';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

// Vue.use(Vuetify);

// export default new Vuetify({
//   icons: {
//     iconfont: 'mdiSvg', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
//   },
// });