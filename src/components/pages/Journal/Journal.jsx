import React, { useState } from 'react';
import { JournalProvider } from '../../context/journal-context';
import { HeaderBanner, QuillEditor, SideBar } from '../../organisms';
import './style.css';

export default function Journal() {
  const [currentEntry, setCurrentEntry] = useState({
    content: '',
    title: '',
    entry_date: null,
    readOnly: false,
  });
  return (
    <>
      <JournalProvider>
        <HeaderBanner />
        <div className='main-container'>
          <SideBar setCurrentEntry={setCurrentEntry} />
          <QuillEditor currentEntry={currentEntry} />
        </div>
      </JournalProvider>
    </>
  );
}
