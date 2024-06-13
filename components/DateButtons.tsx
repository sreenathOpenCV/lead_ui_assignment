import React, { useState, useEffect } from 'react';

const DateButtons = ({ onDateChange, buttonSelectionToggle, handleButtonToggle }: { onDateChange: any; buttonSelectionToggle: boolean, handleButtonToggle:any }) => {
  const [selectedButton, setSelectedButton] = useState<string | null>(buttonSelectionToggle ? 'weekBtn' : null);
  // console.log("buttonSelectionToggle", buttonSelectionToggle)

  useEffect(() => {
    if (!buttonSelectionToggle) {
      setSelectedButton(null);
    }
  }, [buttonSelectionToggle]);

  const toggleButton = (btnId: string) => {
    setSelectedButton(btnId);
    handleButtonToggle(true);
    onDateChange(btnId);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-around items-center space-y-2 sm:space-y-0 sm:space-x-2">
      <button
        onClick={() => toggleButton('weekBtn')}
        className={`selectable-button ${selectedButton === 'weekBtn' ? 'bg-black text-white hover:text-white hover:bg-black' : 'bg-transparent text-gray-500 hover:text-black'
          } w-full sm:w-auto inline-flex items-center justify-center h-12 px-4 sm:px-11 py-2 sm:py-0 text-lg font-semibold text-center transition-all duration-300 ease-in-out border-2 border-gray-600 rounded-full cursor-pointer hover:shadow-2xl focus:shadow-xs`}
      >
        Week
      </button>
      <button
        onClick={() => toggleButton('monthBtn')}
        className={`selectable-button ${selectedButton === 'monthBtn' ? 'bg-black text-white hover:text-white hover:bg-black' : 'bg-transparent text-gray-500 hover:text-black'
          } w-full sm:w-auto inline-flex items-center justify-center h-12 px-4 sm:px-10 py-2 sm:py-0 text-lg font-semibold text-center transition-all duration-300 ease-in-out border-2 border-gray-600 rounded-full cursor-pointer hover:shadow-2xl focus:shadow-xs`}
      >
        Month
      </button>
      <button
        onClick={() => toggleButton('threeMonthsBtn')}
        className={`selectable-button ${selectedButton === 'threeMonthsBtn' ? 'bg-black text-white hover:text-white hover:bg-black' : 'bg-transparent text-gray-500 hover:text-black'
          } w-full sm:w-auto inline-flex items-center justify-center h-12 px-4 sm:px-8 py-2 sm:py-0 text-lg font-semibold text-center transition-all duration-300 ease-in-out border-2 border-gray-600 rounded-full cursor-pointer hover:shadow-2xl focus:shadow-xs`}
      >
        3 Months
      </button>
    </div>
  );
};

export default DateButtons;
