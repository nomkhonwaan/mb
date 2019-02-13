/**
 * External Dependencies
 */
import React from 'react';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import gql from 'graphql-tag';

/**
 * Internal Dependencies
 */
import Header from '../components/header';
import PopupOverlay from '../components/popup-overlay';
import Sidebar from '../components/sidebar';
import { toggleSidebar } from '../redux/modules/app';
import routes from './routes';

/**
 * A Sidebar component that has been wrapped with Apollo Query.
 *
 * @param {object} props
 */
export const WrappedSidebar = (props) => (
  <Query
    query={ gql`
      {
        categories {
          name
          slug
        }
      }` }
  >
    {
      ({ loading, _, data }) => {
        let categories = [];

        if (data && data.categories) {
          categories = data.categories.map(({ name, slug }) => ({
            name,
            link: `/categories/${slug}`,
          }));
        }

        return (
          <Sidebar
            items={ props.items.concat(categories) }
            pathname={ props.pathname }
            onClickToggleButton={ props.onClickToggleButton }
          />
        );
      }
    }
  </Query>
);

/**
 * The main application.
 *
 * @param {object} props
 */
export const App = (props) => {
  return (
    <div className={ classnames('app', {
      '-sidebar-collapsed': props.app.sidebar.collapsed,
    }) }>
      <WrappedSidebar
        items={ props.app.sidebar.items }
        pathname={ props.location.pathname }
        onClickToggleButton={ props.toggleSidebar }
      />

      <PopupOverlay
        in={ !props.app.sidebar.collapsed }
        onClickBackground={ props.toggleSidebar }
      />

      <Header onClickToggleButton={ props.toggleSidebar } />

      { renderRoutes(routes) }
    </div>
  )
}

App.propTypes = {
  /* Properties */
  app: PropTypes.shape({
    sidebar: PropTypes.shape({
      collapsed: PropTypes.bool.isRequired,
      items: PropTypes.arrayOf(PropTypes.shape({
        link: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })).isRequired,
    }).isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,

  /* Actions */
  toggleSidebar: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    app: state.app,
  };
}

export default withRouter(connect(
  mapStateToProps,
  { toggleSidebar, },
)(App));
