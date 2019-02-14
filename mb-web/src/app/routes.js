/**
 * External Dependencies
 */
import React from 'react';

/**
 * Internal Dependencies
 */
import { Login } from '../auth';
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
    path: '/:year/:month/:date/:slug/edit',
    render: (props) => {
      return (
        <PostEditor />
      );
    },
  },
  // {
  //   path: '*',
  //   component: PageNotFound,
  // },
];

export default routes;
