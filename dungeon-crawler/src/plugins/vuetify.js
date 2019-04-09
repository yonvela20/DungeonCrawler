import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';

Vue.use(Vuetify, {
	iconfont: 'md',
	theme: {
		primary: '#524632',
		success: '#8f7e4f',
		info: '#ffaa2c',
		error: '#f83e70'
	}
});
