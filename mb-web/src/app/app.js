/**
 * External Dependencies
 */
const React = require('react');

/**
 * Internal Dependencies
 */
const Sidebar = require('../components/sidebar');

const App = () => {
  return (
    <div className="app">
      <Sidebar collapsed={ false } />
    </div>
  )
}

module.exports = App;
