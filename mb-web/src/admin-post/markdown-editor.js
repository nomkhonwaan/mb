/**
 * External Dependencies
 */
import React from 'react';

/**
 * Internal Dependencies
 */
import { TextArea } from '../components/input';

/**
 * A markdown text editor.
 * 
 * @param {object} props 
 */
const MarkdownEditor = (props) => {
  return (
    <div className="markdown-editor">
      <TextArea />
    </div>
  );
};

export default MarkdownEditor;
