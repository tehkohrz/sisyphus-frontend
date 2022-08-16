import React from 'react';

export default function Button({ name, handleClick, className }) {
  return (
    <>
      <button className={className} onClick={handleClick}>
        {name}
      </button>
    </>
  );
}
