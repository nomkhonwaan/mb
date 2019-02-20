/**
 * External Dependencies
 */
import React from 'react';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * Internal Dependencies
 */
import PopupOverlay from '../components/popup-overlay';
import Header from './header';
import Sidebar from './sidebar';
import { fetchAppQuery, toggleSidebar, toggleUserMenu } from '../redux/modules/app';
import routes from './routes';

/**
 * An application query.
 * <p>
 * This query will query the following these
 * - list of categories
 * - user information (if logged in)
 */
const query = `
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
class App extends React.Component {
  componentWillMount() {
    this.props.fetchAppQuery(query);
  }

  render() {
    return (
      <div className={ classnames('app', {
        '-sidebar-collapsed': this.props.app.sidebar.collapsed,
      }) }>
        <Sidebar
          currentPathname={ this.props.location.pathname }
          items={ this.props.app.sidebar.items }
          isAuthenticated={ this.props.authService.isAuthenticated() }
          onClickToggleButton={ this.props.toggleSidebar }
          onClickNavItem={ this.props.toggleSidebar }
        />
  
        <PopupOverlay
          in={ !this.props.app.sidebar.collapsed }
          onClickBackground={ this.props.toggleSidebar }
        />
  
        <Header
          userInfo={ this.props.app.userInfo }
          onClickToggleSidebarButton={ this.props.toggleSidebar }
          onClickUserAvatar={ this.props.toggleUserMenu }
        />
  
        { renderRoutes(routes, { authService: this.props.authService }) }
      </div>
    );
  }
}
// export const App = (props) => {
//   props.getUserInfo();

//   return (
//     <div className={ classnames('app', {
//       '-sidebar-collapsed': props.app.sidebar.collapsed,
//     }) }>
//       <Sidebar
//         currentPathname={ props.location.pathname }
//         items={ props.app.sidebar.items }
//         isAuthenticated={ props.authService.isAuthenticated() }
//         onClickToggleButton={ props.toggleSidebar }
//         onClickNavItem={ props.toggleSidebar }
//       />

//       <PopupOverlay
//         in={ !props.app.sidebar.collapsed }
//         onClickBackground={ props.toggleSidebar }
//       />

//       <Header userInfo={ null } />

//       { renderRoutes(routes, { authService: props.authService }) }
//     </div>
//   );
//   // return (
//   //   <Query query={ appQuery }>
//   //     {
//   //       ({ loading, err, data }) => {
//   //         let categories = [];

//   //         if (data && data.categories) {
//   //           categories = data.categories.map(({ name, slug }) => ({
//   //             name,
//   //             link: `/categories/${slug}`,
//   //           }))
//   //         }

//   //         return (
//   //           <div className={ classnames('app', {
//   //             '-sidebar-collapsed': props.app.sidebar.collapsed,
//   //           }) }>
//   //             <Sidebar 
//   //               authService={ props.authService }
//   //               items={ props.app.sidebar.items.concat(categories) }
//   //             />

//   //             <PopupOverlay
//   //               in={ !props.app.sidebar.collapsed }
//   //               onClickBackground={ props.toggleSidebar }
//   //             />
        
//   //             <Header userInfo={ data ? data.userInfo : null } />
        
//   //             { renderRoutes(routes, { authService: props.authService }) }
//   //           </div>
//   //         );
//   //       }
//   //     }
//   //   </Query>
//   // );
// }

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
  fetchAppQuery: PropTypes.func.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  toggleUserMenu: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    app: state.app,
  };
}

export default withRouter(connect(
  mapStateToProps,
  { fetchAppQuery, toggleSidebar, toggleUserMenu },
)(App));
