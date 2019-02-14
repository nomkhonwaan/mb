/**
 * External Dependencies
 */
import React from 'react';

/**
 * Internal Dependencies
 */
import { Login, ProtectedRoute } from '../auth';
import { PostEditor } from '../single';

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
    component: (props) => (<ProtectedRoute { ...props } component={ PostEditor } />),
  },
  {
    path: '/:year/:month/:date/:slug/edit',
    component: (props) => (<ProtectedRoute { ...props } component={ PostEditor } />)
  },
  // {
  //   path: '*',
  //   component: PageNotFound,
  // },
];

export default routes;
