/**
 * External Dependencies
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * Internal Dependencies
 */
import { fetchCategories, toggleSidebar } from '../redux/modules/app';

/**
 * An application sidebar.
 *
 * @param {object} props
 */
class Sidebar extends React.Component {
  componentWillMount() {
    this.props.fetchCategories();
  }

  render() {
    return (
      <div className="sidebar">
        <header className="header _flex _flex-horizontal-align-right">
          <div
            className="toggle-button _flex _flex-vertical-align-middle"
            onClick={ this.props.toggleSidebar }
          >
            <span className="close">Close</span>
            <i className="fal fa-times" />
          </div>
        </header>
  
        <nav className="nav">
          <ul className="_list-unstyled _unpadding _unmargin">
            {
              this.props.app.sidebar.items
                .concat(this.props.app.categories.map(({ name, slug }) => ({ name, link: `/categories/${slug}` })))
                .filter(({ name }) => !this.props.authService.isAuthenticated() || name !== 'Login / Register')
                .map(({ name, link }, key) => (
                  <li
                    className={ classnames('nav-item', {
                      '-selected': this.props.location.pathname === link,
                    }) }
                    key={ key }
                    onClick={ this.props.toggleSidebar }
                  >
                    <Link to={ link } className="_color-inherit _text-undecorated">
                      { name }
                    </Link>
                  </li>
                ))
            }
          </ul>
        </nav>
      </div>
    );
  }
}

// const Sidebar = (props) => {
//   return (
//     <div className="sidebar">
//       <header className="header _flex _flex-horizontal-align-right">
//         <div
//           className="toggle-button _flex _flex-vertical-align-middle"
//           onClick={ props.toggleSidebar }
//         >
//           <span className="close">Close</span>
//           <i className="fal fa-times" />
//         </div>
//       </header>

//       <nav className="nav">
//         <ul className="_list-unstyled _unpadding _unmargin">
//           {
//             props.app.sidebar.items
//               .concat(props.app.categories.map(({ name, slug }) => ({ name, link: `/categories/${slug}` })))
//               .filter(({ name }) => !props.authService.isAuthenticated() || name !== 'Login / Register')
//               .map(({ name, link }, key) => (
//                 <li
//                   className={ classnames('nav-item', {
//                     '-selected': props.location.pathname === link,
//                   }) }
//                   key={ key }
//                   onClick={ props.toggleSidebar }
//                 >
//                   <Link to={ link } className="_color-inherit _text-undecorated">
//                     { name }
//                   </Link>
//                 </li>
//               ))
//           }
//         </ul>
//       </nav>
//     </div>
//   );
// };

Sidebar.propTypes = {
  /* Properties */
  app: PropTypes.shape({
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
      })
    ),
    sidebar: PropTypes.shape({
      items: PropTypes.arrayOf(
        PropTypes.shape({
          link: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        })
      ).isRequired,
    }).isRequired,
  }).isRequired,
  authService: PropTypes.object.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,

  /* Events */
  fetchCategories: PropTypes.func.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    app: {
      categories: state.app.categories,
      sidebar: state.app.sidebar,
    }
  };
}

export default withRouter(connect(
  mapStateToProps,
  { fetchCategories, toggleSidebar }
)(Sidebar));
