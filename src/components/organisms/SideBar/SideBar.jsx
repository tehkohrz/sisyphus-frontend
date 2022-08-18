import React, { useState } from 'react';
import { DropDown, MonthRow } from '../../atoms';
import { DayGrid } from '../../molecules';
import { journalApi } from '../../../api-functions/journal_api';
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

export default function SideBar({ setCurrentEntry }) {
  // Change handler for the drop down selection
  const [entriesInMonth, setEntriesInMonth] = useState([]);
  const [selectedMthYr, setSelectedMthYr] = useState({
    month: null,
    year: new Date().getUTCFullYear(),
  });

  // Updates the selected year
  function handleYearChange(e) {
    setSelectedMthYr({
      ...selectedMthYr,
      year: e.target.value,
    });
  }

  return (
    <div className='sidebar-container'>
      <div className='year-dropdown-container'>
        <DropDown
          selectedYear={selectedMthYr.year}
          startYear={startYear}
          handleChange={handleYearChange}
        />
      </div>
      <div className='month-container'>
        {/* Set the value to the month index (Dec = 11) for selected month state */}
        {months.map((month, index) => {
          const monthYear = {
            ...selectedMthYr,
            month: 12 - index,
          };

          // Click handler to update the grid onClick
          async function handleMonthClick() {
            // Journal API to retrieve all the entries in the month
            const entries = await journalApi.getJournals(monthYear);
            setEntriesInMonth(entries);
            // Update selected month for rendering of day grid
            setSelectedMthYr(monthYear);
          }
          return (
            <div>
              <MonthRow
                name={month}
                key={month}
                handleMonthClick={handleMonthClick}
                className='month-row'
              />
              {selectedMthYr.month === monthYear.month && (
                <DayGrid
                  monthYear={monthYear}
                  entriesInMonth={entriesInMonth}
                  setCurrentEntry={setCurrentEntry}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
