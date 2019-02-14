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
      if (!props.authService.isAuthenticated()) {
        props.authService.login(props.location.pathname);
      }

      return (
        <PostEditor { ...props } />
      );
    },
  },
  // {
  //   path: '*',
  //   component: PageNotFound,
  // },
];

export default routes;
