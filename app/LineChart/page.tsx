"use client";

import React, { useState } from "react";
import FilterUtm from "../../components/FilterUtm";
import LineChart from "../../components/LineChart";
import DateButtons from "../../components/DateButtons";

const Page = () => {
  const [selectedDateRange, setSelectedDate] = useState("weekBtn");
  const [buttonSelectionToggle, setButtonSelectionToggle] = useState<boolean>(true);

  const handleDateChange = (value:any) => {
    setSelectedDate(value);
  };

  const handleButtonToggle = (value:boolean) => {
    setButtonSelectionToggle(value);
  };


  return (
    <>
      <h1 className="text-black text-3xl font-bold text-center mt-4">Utm Traker</h1> 
      <div className="flex flex-row m-6 h-screen">
        <div className="block w-full bg-white border border-gray-200 px-6 py-2 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <FilterUtm selectedDateRange={selectedDateRange} handleButtonToggle={handleButtonToggle}/>
          <div >
            <LineChart />
          </div>
          <DateButtons onDateChange={handleDateChange} buttonSelectionToggle={buttonSelectionToggle} handleButtonToggle={handleButtonToggle}/>
        </div>
      </div>
    </>
  );
};

export default Page;
