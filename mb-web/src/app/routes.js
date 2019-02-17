/**
 * External Dependencies
 */
import React from 'react';

/**
 * Internal Dependencies
 */
import { Login, ProtectedRoute } from '../auth';
import AdminPost from '../admin-post';

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
  {
    path: '/new-post',
    component: (props) => (<ProtectedRoute { ...props } component={ AdminPost } />),
  },
  {
    path: '/:year/:month/:date/:slug/edit',
    component: (props) => (<ProtectedRoute { ...props } component={ AdminPost } />)
  },
  // {
  //   path: '*',
  //   component: PageNotFound,
  // },
];

export default routes;
