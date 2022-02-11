/////////////////////////////////////////////////////////////
//
// pgAdmin 4 - PostgreSQL Tools
//
// Copyright (C) 2013 - 2022, The pgAdmin Development Team
// This software is released under the PostgreSQL Licence
//
//////////////////////////////////////////////////////////////

import React, { useEffect, useMemo, useRef } from 'react';
import {default as OrigJsonEditor} from 'jsoneditor.min';
import PropTypes from 'prop-types';
import CustomPropTypes from '../custom_prop_types';

/* React wrapper for JsonEditor */
export default function JsonEditor({currEditor, value, options, className}) {
  const eleRef = useRef();
  const editor = useRef();
  const defaultOptions = {
    modes: ['code', 'form', 'tree','preview'],
  };

  useEffect(()=>{
    /* Create the object only once on mount */
    editor.current = new OrigJsonEditor(eleRef.current, {
      ...defaultOptions,
      ...options,
      onChange: ()=>{
        let currVal = editor.current.getText();
        if(currVal == '') {
          currVal = null;
        }
        options.onChange(currVal);
      }
    });
    editor.current.setText(value);
    currEditor && currEditor(editor.current);
    editor.current.focus();
    return ()=>editor.current?.destroy();
  }, []);

  useMemo(() => {
    if(editor.current) {
      if(value != editor.current.getText()) {
        editor.current.setText(value ?? '');
      }
    }
  }, [value]);

  return (
    <div ref={eleRef} className={className}></div>
  );
}

JsonEditor.propTypes = {
  currEditor: PropTypes.func,
  value: PropTypes.string,
  options: PropTypes.object,
  className: CustomPropTypes.className,
};
