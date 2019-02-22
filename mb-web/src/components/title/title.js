/**
 * External Dependencies
 */
import React from 'react';
import { Helmet } from 'react-helmet';

/**
 * A title of the document that concatenates with the default word.
 * 
 * @param {object} props 
 */
const Title = (props) => {
  return (
    <Helmet>
      <title>
        { props.children } - Nomkhonwaan
      </title>
    </Helmet>
  );
};

export default Title;
