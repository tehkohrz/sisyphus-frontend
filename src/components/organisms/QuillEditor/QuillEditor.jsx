import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './editor-styles.css';

export default function QuillEditor({ content = '', readOnly = false }) {
  // To save the state for the editor content
  const [quillValue, setQuillValue] = useState(content);
  // To save the title and calculate the height of the div
  function titleChangeHandler(e) {
    const title = document.getElementById('entry-title');
    title.style.height = '1px';
    title.style.height = title.scrollHeight + 3 + 'px';
    const minusHeight = title.style.height;
    const editor = document.getElementById('text-editor');
    editor.style.setProperty('height', `calc(98% - ${minusHeight})`);
  }
  useEffect(titleChangeHandler, []);
  // Modules for quillEditor
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['clean'],
    ],
  };
  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ];
  return (
    <div className='editor-container'>
      <textarea
        className='entry-title'
        id='entry-title'
        onChange={titleChangeHandler}
      ></textarea>
      <div className='text-editor' id='text-editor'>
        <ReactQuill
          id='quillEditor'
          theme='snow'
          value={quillValue}
          onChange={setQuillValue}
          readOnly={readOnly}
          modules={modules}
          formats={formats}
        />
      </div>
    </div>
  );
}
