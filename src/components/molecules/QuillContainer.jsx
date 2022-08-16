import React from 'react';
import { QuillEditor } from '../atoms';

export default function QuillContainer() {
  return (
    <>
      <div id='editor'></div>
      <QuillEditor></QuillEditor>
    </>
  );
}
