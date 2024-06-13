"use client";

import React, { useState, useEffect } from 'react';
import { DateRangePicker, Range } from 'react-date-range';
import { addDays, subDays, startOfMonth, endOfMonth, addMonths, format, eachDayOfInterval } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

type Props = {
  visible: boolean;
  onClose: () => void;
  getDates: (dates: string[]) => void;
  selectedDateRange: string;
  handleButtonToggle: (dates: boolean) => void;
};

const Calendar: React.FC<Props> = ({ visible, onClose, getDates, selectedDateRange, handleButtonToggle }) => {
  console.log("selectedDateRange", selectedDateRange)

  const getInitialDateRange = () => {
    const today = new Date();
    switch (selectedDateRange) {
      case 'weekBtn':
        return { startDate: subDays(today, 6), endDate: today };
      case 'monthBtn':
        return { startDate: subDays(today, 29), endDate: today };
      case 'threeMonthsBtn':
        return { startDate: subDays(today, 89), endDate: today };
      default:
        return { startDate: today, endDate: addDays(today, 6) };
    }
  };

  const [dateRange, setDateRange] = useState(getInitialDateRange());

  useEffect(() => {
    setDateRange(getInitialDateRange());
  }, [handleButtonToggle]);

  useEffect(() => {
    const { startDate, endDate } = dateRange;
    const range = eachDayOfInterval({ start: startDate, end: endDate });
    const formattedDates = range.map(date => format(date, 'yyyy-MM-dd'));
    getDates(formattedDates);
  }, [dateRange]);

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  const handleSelect = (ranges: any) => {
    const { selection } = ranges;
    setDateRange({ startDate: selection.startDate, endDate: selection.endDate });
    handleButtonToggle(false);
  };

  return (
    <div>
      {visible && (
        <div style={{ position: 'absolute', zIndex: 2 }}>
          <DateRangePicker
            editableDateInputs={true}
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
            ranges={[{ ...dateRange, key: 'selection' }]}
            className=""
          />
          <button onClick={onClose} style={{ marginTop: 20 }} className='text-xl font-bold'>x</button>
        </div>
      )}
    </div>
  );
};

export default Calendar;