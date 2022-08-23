import React, { useState, useEffect } from 'react';
import { useJournal } from '../hooks/use-journal';

export default function DateBox({ entry_date = null, className }) {
  const { updateDate } = useJournal();
  const [stateDate, setStateDate] = useState({
    date: '',
    month: '',
    year: '',
  });

  // To initialise and set the date state
  useEffect(() => {
    if (entry_date) {
      const covertedDate = new Date(entry_date);
      setStateDate({
        date: covertedDate.getUTCDate(),
        month: covertedDate.getUTCMonth() + 1,
        year: covertedDate.getUTCFullYear(),
      });
    }
  }, [entry_date]);
  function dateInputHandler(e) {
    const date = e.target.value;
    setStateDate({ ...stateDate, date });
    return date;
  }
  function monthInputHandler(e) {
    const month = e.target.value;
    setStateDate({ ...stateDate, month });
    return month;
  }
  function yearInputHandler(e) {
    const year = e.target.value;
    setStateDate({ ...stateDate, year });
    return year;
  }
  //Updates the date everytime the input changes
  useEffect(() => {
    if (stateDate.date) {
      const enteredDate = new Date(
        stateDate.year,
        stateDate.month - 1,
        stateDate.date
      );
      updateDate(enteredDate);
    }
  }, []);

  return (
    <div className={className}>
      <input
        onChange={dateInputHandler}
        className='date-input'
        type='number'
        value={stateDate.date}
        placeholder='-'
        maxLength={2}
      />
      <input
        onChange={monthInputHandler}
        className='date-input'
        type='number'
        value={stateDate.month}
        placeholder='-'
        maxLength={2}
      />
      <input
        onChange={yearInputHandler}
        className='date-input'
        type='number'
        value={stateDate.year}
        placeholder='-'
        maxLength={4}
      />
    </div>
  );
}
