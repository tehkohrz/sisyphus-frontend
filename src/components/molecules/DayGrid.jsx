import React from 'react';
import { DayCell, DayTitle } from '../atoms';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

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
  // ! Conditional color rendering when there is an entry
  return { days, startDayOffSet };
}

export default function DayGrid({ monthYear, entriesInMonth }) {
  const { month, year } = monthYear;
  const { days, startDayOffSet } = getDaysInMonthUTC(month, year);

  return (
    <>
      <div className='month-grid-container'>
        {
          // Creates the 7 day cells for the tile
          DAYS.map((day) => {
            return <DayTitle day={day} className='day-grid-item' key={day} />;
          })
        }
        {/* Creates the cells for each week for the days in the month */}
        {/* onClick to retrieve the entry for each */}
        {days.map((day, index) => {
          // Set offset column for the first entry
          if (index === 0) {
            return (
              <DayCell
                className='day-grid-item'
                offSet={startDayOffSet}
                date={day.getUTCDate()}
                key={day}
              />
            );
          }
          // Remaining days of the week
          return (
            <DayCell
              className='day-grid-item'
              date={day.getUTCDate()}
              key={day}
            />
          );
        })}
      </div>
    </>
  );
}
