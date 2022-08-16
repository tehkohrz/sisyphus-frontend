import React from 'react';

export default function SideBarRow({ title, handleClick, className }) {
  return (
    <>
      <div className={className} onClick={handleClick}>
        {title}
      </div>
    </>
  );
}
