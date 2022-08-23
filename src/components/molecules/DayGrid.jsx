import React from 'react';
import { DayCell, DayTitle } from '../atoms';
import { useJournal } from '../hooks/use-journal';

const DAYS_HEADER = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

// Function to get all the days within the month
// Format object for all days in the month with entries for component rendering
//! The month start at 0 for Jan
function getDaysInMonthUTC(month, year, entriesInMonth, getEntry, updateDate) {
  //! Month obtained from SQL starts at 1 for Jan
  const UTCMonth = month - 1;
  let date = new Date(Date.UTC(year, UTCMonth, 1));
  let days = [];

  while (date.getUTCMonth() === UTCMonth) {
    const currentDate = new Date(date);
    const clickHandler = () => {
      updateDate(currentDate);
    };
    // Default value for today object
    const today = {
      date: currentDate,
      offSet: 0,
      entry: false,
      clickHandler,
    };
    date.setUTCDate(date.getUTCDate() + 1);
    days.push(today);
  }
  // Off set the first date of the month to the correct day
  let startDayOffSet = days[0].date.getUTCDay() + 1;
  // Account for the grid start line to be Sunday 0
  if (startDayOffSet > 7) {
    startDayOffSet = 1;
  }
  days[0].offSet = startDayOffSet;

  // Conditional for entries present, .shift() or i counter doesnt work
  // @param entry{Date} - date of the entry
  //! Cannot shift the entry out or iterate away
  entriesInMonth.forEach((entry) => {
    // Minus one for the index of the array starting at 0
    const index = entry.getUTCDate() - 1;
    days[index].entry = true;
    // Create handler for the day component
    const clickGetJournalHandler = async () => {
      try {
        await getEntry(entry);
      } catch (err) {
        console.log(err);
      }
    };
    days[index].clickHandler = clickGetJournalHandler;
  });
  return days;
}

// Generate the grid items for each day with conditional entry css and onClickHandler
function GenerateDays(days) {
  const { selectedEntry } = useJournal();
  const dayGrid = days.map((day) => {
    let entryConditionalClass = '';

    day.date === selectedEntry.entry_date
      ? (entryConditionalClass = 'day-grid-item selected-day')
      : day.entry
      ? (entryConditionalClass = 'day-grid-item entry-present')
      : (entryConditionalClass = 'day-grid-item');
    return (
      <DayCell
        className={entryConditionalClass}
        date={day.date.getUTCDate()}
        offSet={day.offSet}
        handleClick={day.clickHandler}
        key={day.date}
      />
    );
  });
  return dayGrid;
}

export default function DayGrid({ monthYear, entriesInMonth }) {
  const { month, year } = monthYear;
  const { getEntry, updateDate } = useJournal();
  const days = getDaysInMonthUTC(
    month,
    year,
    entriesInMonth,
    getEntry,
    updateDate
  );
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
        {GenerateDays(days)}
      </div>
    </>
  );
}
