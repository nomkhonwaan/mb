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
  state = {
    height: '100%',
  };

  constructor() {
    super();

    this.onChange = this.onChange.bind(this);
    this.ref = React.createRef();
  }

  componentDidMount() {
    this.setState({ height: this.ref.current.scrollHeight });
  }
  
  onChange(event) {
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
        style={ { height: this.state.height || 0 } }
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
