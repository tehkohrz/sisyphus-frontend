import React, { useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './editor-styles.css';

import { useJournal } from '../../hooks/use-journal';

export default function QuillEditor({ currentEntry }) {
  // Journal Context
  const { read_only, selectedEntry, updateEntry } = useJournal();
  // To save the title and calculate the height of the div
  function titleSizeChangeHandler() {
    const title = document.getElementById('entry-title');
    title.style.height = '1px';
    title.style.height = title.scrollHeight + 3 + 'px';
    const minusHeight = title.style.height;
    const editor = document.getElementById('text-editor');
    editor.style.setProperty('height', `calc(98% - ${minusHeight})`);
  }
  // To initiate texteditor calculation on load
  useEffect(titleSizeChangeHandler, []);

  // Input handler to save title
  function titleInputHandler(e) {
    updateEntry({ ...selectedEntry, title: e.target.value });
  }

  // OnChange handle for Quill Editor to save content
  function quillChangeHandler(content) {
    updateEntry({ ...selectedEntry, content });
  }

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
        value={selectedEntry.title}
        onChange={titleSizeChangeHandler}
        onInput={titleInputHandler}
      ></textarea>
      <div className='text-editor' id='text-editor'>
        <ReactQuill
          id='quillEditor'
          theme='snow'
          value={selectedEntry.content}
          onChange={quillChangeHandler}
          readOnly={read_only}
          modules={modules}
          formats={formats}
        />
      </div>
    </div>
  );
}
