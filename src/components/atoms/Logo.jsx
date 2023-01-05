import React from 'react';

export default function Logo({ source, handleClick, className }) {
  return (
    <>
      <img className={className} onClick={handleClick} src={source}></img>
    </>
  );
}
