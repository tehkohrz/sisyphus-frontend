import React, { useState, useEffect } from 'react';
import { JournalProvider } from '../../context/journal-context';
import { useAuth } from '../../hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import { HeaderBanner, QuillEditor, SideBar } from '../../organisms';
import './style.css';

export default function Journal() {
  const [currentEntry, setCurrentEntry] = useState({
    content: '',
    title: '',
    entry_date: null,
    readOnly: false,
  });
  const navigate = useNavigate();
  const { isAuthenticated, reAuth } = useAuth();
  useEffect(() => {
    reAuth();
    if (!isAuthenticated) {
      console.log('Not Authenticated');
      navigate('/login');
    }
  }, [isAuthenticated, navigate, reAuth]);

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
