import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from './views/Dashboard.vue';
import myBlogEntries from './views/MyBlogEntries.vue';
import Team from './views/Team.vue';
import Blog from './views/Blog.vue';
import Login from './components/Login.vue';
import SignUp from './components/SignUp.vue';
import firebase from 'firebase';
//import Navbar from './components/Navbar';

Vue.use(Router);

let router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/my-blog-entries',
			name: 'myBlogEntries',
			component: myBlogEntries,
			meta: {
				requiresAuth: true
			}
		},

		{
			path: '/team',
			name: 'team',
			component: Team,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/blog',
			name: 'blog',
			component: Blog,
			meta: {
				requiresAuth: true
			}
		},

		{
			path: '/dashboard',
			name: 'dashboard',
			component: Dashboard,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/login',
			name: 'login',
			component: Login
		},
		{
			path: '/signup',
			name: 'signup',
			component: SignUp
		},
		{
			path: '/',
			redirect: '/login'
		} /* ,
		{
			name: 'Navbar',
			path: '',
			meta: {
				requiresAuth: true
			}
		} */
	]
});

router.beforeEach((to, from, next) => {
	let currentUser = firebase.auth().currentUser;
	let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

	if (requiresAuth && !currentUser) next('login');
	else if (!requiresAuth && currentUser) next('dashboard');
	else next();
});

export default router;
