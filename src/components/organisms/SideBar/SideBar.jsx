import React, { useState } from 'react';
import { DropDown, MonthRow } from '../../atoms';
import { DayGrid } from '../../molecules';
import { journalApi } from '../../../auth_functions/journal_api';
import './style.css';

const startYear = 2020;
// Array of months to generate the rows
const months = [
  'December',
  'November',
  'October',
  'September',
  'August',
  'July',
  'June',
  'May',
  'April',
  'March',
  'Feburary',
  'January',
];

export default function SideBar() {
  // Change handler for the drop down selection
  const [selectedYear, setSelectedYear] = useState(new Date().getUTCFullYear());
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [entriesInMonth, setEntriesInMonth] = useState([]);

  // Updates the selected year
  function handleYearChange(e) {
    setSelectedYear(e.target.value);
    setSelectedMonth(null);
  }

  return (
    <div className='sidebar-container'>
      <div className='year-dropdown-container'>
        <DropDown
          selectedYear={selectedYear}
          startYear={startYear}
          handleChange={handleYearChange}
        />
      </div>
      <div className='month-container'>
        {/* Set the value to the month index (Dec = 11) for selected month state */}
        {months.map((month, index) => {
          const monthYear = {
            year: selectedYear,
            month: 11 - index,
          };
          // Click handler to update the grid onClick
          async function handleMonthClick() {
            // Update selected month for rendering of day grid
            setSelectedMonth(month);
            // Journal API to retrieve all the entries in the month
            const entries = await journalApi.getMonth();
            setEntriesInMonth(entries);
          }
          return (
            <div>
              <MonthRow
                name={month}
                key={month}
                monthYear={monthYear}
                handleMonthClick={handleMonthClick}
                className='month-row'
              />
              {selectedMonth === month && (
                <DayGrid
                  monthYear={monthYear}
                  entriesInMonth={entriesInMonth}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
