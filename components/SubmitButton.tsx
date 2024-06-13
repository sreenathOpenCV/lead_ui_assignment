import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import {  setSeriesData, setDeleteItem ,setDeleteBase } from '../app/Redux/Slices/bootcampProgramSeries';
import { RootState } from '../app/Redux/store';
import { useFetchDataMutation } from '../app/Services/lineChartServices';

interface SelectedParamsData {
  dates: any[]; 
  table_names: string[];
  page_titles: string[];
  utm_sources: string[];
  utm_mediums: string[];
}

// const getSeriesData = async () => {
//   try {
//     const filteredParams = Object.fromEntries(
//       Object.entries(selectedParams).filter(([key, value]) => Array.isArray(value) && value.length > 0)
//     );
//     if(filteredParams.dates.length > 0){
//       console.log("selectedParams", selectedParams)
//       dispatch(setDeleteBase());
//     }
//     else{
//       dispatch(setDeleteItem(removedParams));
//     }

//     if (filteredParams.dates.length > 0 || filteredParams.table_names.length > 0 || filteredParams.page_titles.length > 0 || filteredParams.utm_sources.length > 0 || filteredParams.utm_mediums.length > 0) {
//       const response = await fetchSeries(filteredParams).unwrap();
//       const formattedData = formatData(response);
//       console.log("setDeleteItem", filteredParams)
//       dispatch(setSeriesData(formattedData));
//     }

//   } catch (error) {
//     console.log("Error:", error);
//   }
// };


interface Selected {
  dates?: string[];
}

const SubmitButton = ({ selectedParams, removedParams }: { selectedParams: SelectedParamsData, removedParams:string[] }) => {
  const [fetchSeries, { isLoading, isError, data, error }] = useFetchDataMutation();
  const dispatch = useDispatch();

const { selected, optionsData }: { selected?: Selected, optionsData?: any } = useSelector((state: RootState) => state.bootcampSource);

const arraysAreDifferent = (arr1:string[], arr2:string[]) => {
  if (arr1.length !== arr2.length) return true;
  return arr1.some((item:any, index:any) => item !== arr2[index]);
};

const getSeriesData = async () => {
  try {
    const filteredParams = Object.fromEntries(
      Object.entries(selectedParams).filter(([key, value]) => Array.isArray(value) && value.length > 0)
    );
    if (arraysAreDifferent(selected.dates || [], filteredParams.dates)) {
      console.log("selectedParams", filteredParams);
      dispatch(setDeleteBase());
    }
    else{
      dispatch(setDeleteItem(removedParams));
    }

    if (filteredParams.dates.length > 0 || filteredParams.table_names.length > 0 || filteredParams.page_titles.length > 0 || filteredParams.utm_sources.length > 0 || filteredParams.utm_mediums.length > 0) {
      const response = await fetchSeries(filteredParams).unwrap();
      const formattedData = formatData(response);
      console.log("setDeleteItem", filteredParams)
      dispatch(setSeriesData(formattedData));
    }

  } catch (error) {
    console.log("Error:", error);
  }
};

  interface CourseData {
    name: string[];
    data: { x: string; y: number }[];
  }

  function formatData(inputData: any[]): CourseData[] {
    const formattedData: CourseData[] = [];
  
    inputData.forEach((entry) => {
      const name = entry.slice(1, -1);
      const date = formatDate(entry[0]); // Format date here
      const value = entry.slice(-1)[0];
      const existingCourse = formattedData.find(
        (course) => JSON.stringify(course.name) === JSON.stringify(name)
      );
      if (existingCourse) {
        existingCourse.data.push({ x: date, y: value });
      } else {
        formattedData.push({
          name,
          data: [{ x: date, y: value }],
        });
      }
    });
  
    console.log("formattedData", formattedData);
    return formattedData;
  }
  
  function formatDate(dateString: string): string {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}`;
  }
  
  return (
    <button
      className="bg-black mt-1 text-white w-full sm:w-auto inline-flex items-center justify-center h-12 px-4 sm:px-8 py-2 sm:py-0 text-lg font-semibold text-center transition-all duration-300 ease-in-out border-2 border-gray-600 rounded-lg cursor-pointer hover:shadow-2xl focus:shadow-xs"
      onClick={getSeriesData}
    >
      Submit
    </button>
  );
};

export default SubmitButton;
