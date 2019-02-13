/**
 * Internal Dependencies
 */
const { Login } = require('../auth');

const routes = [
  // {
  //   path: '/',
  //   exact: true,
  //   component: RecentPosts,
  // },
  {
    path: '/login',
    component: Login,
  },
  // {
  //   path: '(categories|tags)/:slug',
  //   component: Archive,
  // },
  // {
  //   path: '/:year/:month/:date/:slug',
  //   component: Single,
  // },
  // {
  //   path: '/:year/:month/:date/:slug/edit',
  //   component: PostEditor,
  // },
  // {
  //   path: '*',
  //   component: PageNotFound,
  // },
];

module.exports = routes;
