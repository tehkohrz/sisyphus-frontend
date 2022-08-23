import React, { useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './editor-styles.css';
import { journalApi } from '../../../api-functions/journal_api';
import { useJournal } from '../../hooks/use-journal';
import { Button, DateBox } from '../../atoms/';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function QuillEditor({ currentEntry }) {
  // Journal Context
  const { read_only, selectedEntry, updateEntry, isInitialized } = useJournal();
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
  function quillInputHandler(content) {
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

  async function saveEntry() {
    try {
      const data = await journalApi.postEntry(selectedEntry);
      if (data) {
        toast('Entry Saved!', {
          className: 'toast-message --toastify-color-dark',
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className='editor-container'>
      <ToastContainer className='Toastify__toast-container--top-center ' />
      <div className='editor-top-row'>
        <DateBox entry_date={selectedEntry.entry_date} className='entry-date' />
        {isInitialized && (
          <div className='button-container'>
            <Button
              className='editor-buttons'
              name='Save'
              handleClick={saveEntry}
            />
            <Button className='editor-buttons' name='Delete' />
          </div>
        )}
      </div>
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
          onInput={quillInputHandler}
          readOnly={read_only}
          modules={modules}
          formats={formats}
        />
      </div>
    </div>
  );
}
