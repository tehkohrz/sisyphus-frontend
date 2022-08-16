import React from 'react';

export default function Header({ title, className }) {
  return (
    <>
      <div className={className}>{title}</div>
    </>
  );
}
