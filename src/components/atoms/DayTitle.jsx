import React from 'react';

export default function DayTitle({ day, className }) {
  return (
    <>
      <div
        className={className}
        style={{
          borderTop: '0px',
          borderLeft: '0px',
          borderRight: '0px',
          borderBottom: '2px',
          borderStyle: 'solid',
          fontWeight: 'bold',
        }}
      >
        {day}
      </div>
    </>
  );
}
