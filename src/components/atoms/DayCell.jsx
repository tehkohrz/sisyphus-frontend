import React from 'react';

export default function DayCell({ date, handleClick, className, offSet }) {
  return (
    <>
      <div
        className={className}
        onClick={handleClick}
        style={{ gridColumnStart: offSet }}
      >
        {date}
      </div>
    </>
  );
}
