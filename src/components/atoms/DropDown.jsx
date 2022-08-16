import React from 'react';

export default function DropDown({ startYear, handleChange, selectedYear }) {
  // Generating the year dropdown options
  let options = [];
  const currentYear = new Date().getUTCFullYear();
  while (startYear <= currentYear) {
    options.push(startYear);
    startYear += 1;
  }

  return (
    <select
      className='year-dropdown'
      onChange={handleChange}
      value={selectedYear}
    >
      {/* <option value={null}>'Select Year</option> */}
      {options.map((option) => {
        return (
          <option value={option} key={option}>
            {option}
          </option>
        );
      })}
    </select>
  );
}
