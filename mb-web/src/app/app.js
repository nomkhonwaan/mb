/**
 * External Dependencies
 */
import React from 'react';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import gql from 'graphql-tag';

/**
 * Internal Dependencies
 */
import PopupOverlay from '../components/popup-overlay';
import Header from './header';
import Sidebar from './sidebar';
import { toggleSidebar } from '../redux/modules/app';
import routes from './routes';

/**
 * An application query.
 * <p>
 * This query will query the following these
 * - list of categories
 * - user information (if logged in)
 */
const appQuery = gql`
  query AppQuery {
    categories {
      name
      slug
    }
    userInfo {
      avatarUrl
      displayName
    }
  }
`;

/**
 * The main application.
 *
 * @param {object} props
 */
export const App = (props) => {
  return (
    <Query query={ appQuery }>
      {
        ({ loading, err, data }) => {
          let categories = [];

          if (data && data.categories) {
            categories = data.categories.map(({ name, slug }) => ({
              name,
              link: `/categories/${slug}`,
            }))
          }

          return (
            <div className={ classnames('app', {
              '-sidebar-collapsed': props.app.sidebar.collapsed,
            }) }>
              <Sidebar 
                authService={ props.authService }
                items={ props.app.sidebar.items.concat(categories) }
              />

              <PopupOverlay
                in={ !props.app.sidebar.collapsed }
                onClickBackground={ props.toggleSidebar }
              />
        
              <Header userInfo={ data ? data.userInfo : null } />
        
              { renderRoutes(routes, { authService: props.authService }) }
            </div>
          );
        }
      }
    </Query>
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
  authService: PropTypes.object.isRequired,
  
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
