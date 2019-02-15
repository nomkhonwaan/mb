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
import queryString from 'query-string';

/**
 * Internal Dependencies
 */
import PopupOverlay from '../components/popup-overlay';
import Header from './header';
import Sidebar from './sidebar';
import { toggleSidebar } from '../redux/modules/app';
import routes from './routes';

/**
 * The main application.
 *
 * @param {object} props
 */
export const App = (props) => {
  return (
    <Query
      query={ gql`
        {
          categories {
            name
            slug
          }
          userInfo {
            displayName
            avatarUrl
          }
        }` }
    >
      {
        (({ loading, err, data }) => {
          let categories = [];

          const params = queryString.parse(props.location.search);

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
              {
                isLIFF(params) ? null : ([
                  <Sidebar 
                    authService={ props.authService }
                    items={ props.app.sidebar.items.concat(categories) }
                    key="0"
                  />,

                  <PopupOverlay
                    in={ !props.app.sidebar.collapsed }
                    key="1"
                    onClickBackground={ props.toggleSidebar }
                  />,
            
                  <Header 
                    key="2"
                    userInfo={ data ? data.userInfo : null }
                  />
                ])
              }
        
              { renderRoutes(routes, { authService: props.authService }) }
            </div>
          );
        })
      }
    </Query>
  )
}

/**
 * Detects LIFF mode from query params.
 * 
 * @param {object} params 
 */
function isLIFF(params) {
  return params.mode && params.mode.toLowerCase() === 'liff';
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
