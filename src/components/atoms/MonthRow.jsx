import React from 'react';

export default function MonthRow({ name, className, handleMonthClick }) {
  return (
    <>
      <div className={className} onClick={handleMonthClick}>
        {name}
      </div>
    </>
  );
}
