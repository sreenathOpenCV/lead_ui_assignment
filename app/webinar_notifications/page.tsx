"use client";

import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Page: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [webinarDate, setWebinarDate] = useState<Date | null>(null);
  const [webinarTime, setWebinarTime] = useState<string>('21:30');
  const [webinarLink, setWebinarLink] = useState<string>('https://opencv.org/ai-webinar');
  const [zoomLinkVerified, setZoomLinkVerified] = useState<string>('yes');

  useEffect(() => {
    // Set default webinar date to the next Tuesday
    const nextTuesday = new Date();
    nextTuesday.setDate(nextTuesday.getDate() + ((2 + 7 - nextTuesday.getDay()) % 7));
    nextTuesday.setHours(21, 30, 0, 0);
    setWebinarDate(nextTuesday);
    setWebinarTime('21:30');
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (file && webinarDate && webinarLink && zoomLinkVerified) {
      const [hours, minutes] = webinarTime.split(':').map(Number);
      const finalWebinarDate = new Date(webinarDate);
      finalWebinarDate.setHours(hours, minutes);

      console.log({
        file,
        webinarDate: finalWebinarDate,
        webinarLink,
        zoomLinkVerified,
      });
    } else {
      alert('Please fill out all fields');
    }
  };

  const handleChange = (e:any) => {
    const value = e.target.value.toLowerCase();
    if (value === 'yes' || value === 'no' || value === '') {
      setZoomLinkVerified(value);
    }
  };

  return (
    <>
    <h1 className='text-3xl font-bold text-center mt-2'>Webinar Notifications</h1>
    <form onSubmit={handleSubmit} className=" m-4 p-4 bg-white shadow-md rounded-lg">
      <div className="mb-5">
        <label htmlFor="file" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload Leads CSV:</label>
        <input 
          type="file" 
          accept=".csv" 
          onChange={handleFileChange} 
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
        />
      </div>
      
      <div className="flex justify-between flex-col mb-5 text-center">
        <label htmlFor="webinarDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Webinar Date:</label>
            <div className="mb-5 flex justify-around">
                    <div>
                        <Calendar 
                            value={webinarDate} 
                            onChange={(date: Date) => setWebinarDate(date)} 
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            required
                            />                    
                    </div>

                    <div className='flex flex-col'>
                        <div className='mb-5'>
                            <label htmlFor="webinarTime" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Webinar Time (IST):</label>
                            <input 
                            type="time" 
                            value={webinarTime}
                            onChange={(e) => setWebinarTime(e.target.value)}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            required 
                            />                        
                        </div>
                        <div className="mb-5">
                            <label htmlFor="webinarLink" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Webinar Link:</label>
                            <a href={webinarLink} target="_blank" rel="noopener noreferrer">
                                <input
                                type="text"
                                value={webinarLink}
                                onChange={(e) => setWebinarTime(e.target.value)}
                                readOnly
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                    required
                                />
                            </a>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="zoomLinkVerified" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Verified Zoom Link(Yes/No):</label>
                            <input
                              type="text"
                              value={zoomLinkVerified}
                              onChange={handleChange}
                              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                              required
                              list="zoomLinkOptions"
                            />
                        </div>
                    </div>
            </div>
      </div>
      <div className='text-right'>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            Submit
        </button>        
      </div>
    </form>
    </>
  );
};

export default Page;
