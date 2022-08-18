import React from 'react';
import { DayCell, DayTitle } from '../atoms';

const DAYS_HEADER = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

// Function to get all the days within the month
//! The month start at 0 for Jan
function getDaysInMonthUTC(month, year) {
  var date = new Date(Date.UTC(year, month, 1));
  var days = [];
  while (date.getUTCMonth() === month) {
    days.push(new Date(date));
    date.setUTCDate(date.getUTCDate() + 1);
  }
  // Off set the first date of the month to the correct day
  let startDayOffSet = days[0].getUTCDay() + 1;
  // Account for the grid start line to be Sunday
  if (startDayOffSet > 7) {
    startDayOffSet = 1;
  }
  return { days, startDayOffSet };
}

// Generate the grid items for each day with conditional entry css and onClickHandler
function generateDays(monthDays, offSet, entriesInMonth = []) {
  const dayGrid = monthDays.map((day, index) => {
    let entryConditionalClass = '';

    //! Cannot shift the entry out or iterate away
    entriesInMonth.length && day.getUTCDate() === entriesInMonth[0].getUTCDate()
      ? (entryConditionalClass = 'day-grid-item entry-present')
      : (entryConditionalClass = 'day-grid-item');

    if (index === 0) {
      return (
        <DayCell
          className={entryConditionalClass}
          offSet={offSet}
          date={day.getUTCDate()}
          key={day}
        />
      );
    }
    // Remaining days of the week
    return (
      <DayCell
        className={entryConditionalClass}
        date={day.getUTCDate()}
        key={day}
      />
    );
  });
  return dayGrid;
}

export default function DayGrid({ monthYear, entriesInMonth }) {
  const { month, year } = monthYear;
  const { days, startDayOffSet } = getDaysInMonthUTC(month, year);
  console.log('day-grid', entriesInMonth);
  return (
    <>
      <div className='month-grid-container'>
        {
          // Creates the 7 day cells for the tile
          DAYS_HEADER.map((day) => {
            return <DayTitle day={day} className='day-grid-item' key={day} />;
          })
        }
        {/* Creates the cells for each week for the days in the month */}
        {/* onClick to retrieve the entry for each */}
        {generateDays(days, startDayOffSet, entriesInMonth)}
      </div>
    </>
  );
}
