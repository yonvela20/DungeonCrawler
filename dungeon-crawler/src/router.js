import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from './views/Dashboard.vue';
import myBlogEntries from './views/MyBlogEntries.vue';
import Team from './views/Team.vue';
import Blog from './views/Blog.vue';

Vue.use(Router);

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/my-blog-entries',
			name: 'myBlogEntries',
			component: myBlogEntries
		},

		{
			path: '/team',
			name: 'team',
			component: Team
		},
		{
			path: '/blog',
			name: 'blog',
			component: Blog
		},
		{
			path: '/',
			name: 'dashboard',
			component: Dashboard
		}
	]
});
