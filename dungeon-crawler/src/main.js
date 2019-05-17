import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';

import VueFire from 'vuefire';

import firebase from 'firebase';

Vue.use(VueFire);

Vue.config.productionTip = false;

let app = '';

firebase.auth().onAuthStateChanged(() => {
	if (!app) {
		app = new Vue({
			router,
			render: h => h(App)
		}).$mount('#app');
	}
});
