/**
 * External Dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * An input type textarea component.
 * 
 * @param {object} props
 */
class TextArea extends React.Component {
  constructor() {
    super();

    this.onChange = this.onChange.bind(this);
    this.ref = React.createRef();

    // Default, textarea height is 100% to fit its parent
    this.state = { height: '100%', };
  }

  componentDidMount() {
    // To ensure that the textarea height always fit to its content
    this.setState({ height: this.ref.current.scrollHeight });
  }

  onChange(event) {
    // Set the textarea height to fit its content
    this.setState({ height: this.ref.current.scrollHeight });

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(event);
    }
  }

  render() {
    return (
      <textarea 
        className={ classnames('input -textarea', this.props.className) }
        onChange={ this.onChange }
        ref={ this.ref }
        style={ { height: this.state.height, } }
        value={ this.props.value }
      />
    );
  }
}

TextArea.propTypes = {
  /* Properties */
  className: PropTypes.string,
  value: PropTypes.string,

  /* Events */
  onChange: PropTypes.func,
};

export default TextArea;
