import React from 'react';
import { HeaderBanner, QuillEditor, SideBar } from '../../organisms';
import './style.css';

export default function Journal() {
  return (
    <>
      <HeaderBanner />
      <div className='main-container'>
        <SideBar />
        <QuillEditor content='' readOnly={false} />
      </div>
    </>
  );
}
