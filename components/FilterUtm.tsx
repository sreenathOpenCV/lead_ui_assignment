import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, OutlinedInput } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import Calendar from './Calendar';
import SubmitButton from './SubmitButton';
import { useDispatch } from 'react-redux';
import { setSelectedParams } from '../app/Redux/Slices/bootcampSelectivesSlice';
import { useFetchDataKeysMutation } from '../app/Services/lineChartServices';

interface SelectedParamsData {
  dates: any[]; 
  table_names: string[];
  page_titles: string[];
  utm_sources: string[];
  utm_mediums: string[];
}

function FilterUtm({selectedDateRange, handleButtonToggle}:{selectedDateRange:string, handleButtonToggle:any}) {
  const [selectedTables, setSelectedTables] = React.useState<string[]>([]);
  const [selectedPrograms, setSelectedPrograms] = React.useState<string[]>([]);
  const [selectedSources, setSelectedSources] = React.useState<string[]>([]);
  const [selectedMediums, setSelectedMediums] = React.useState<string[]>([]);
  const [paramDates, setParamDates] = useState([])
  const [showPicker, setShowPicker] = useState(false);
  const [selectedParamsData, setSelectedParamsData] = useState<SelectedParamsData>({
    dates: [], 
    table_names: [],
    page_titles: [],
    utm_sources: [],
    utm_mediums: [],
  });
  const [paramsData, setParamsData] = useState<SelectedParamsData>({
    dates: [], 
    table_names: [],
    page_titles: [],
    utm_sources: [],
    utm_mediums: [],
  });
  const [removedParams, setRemovedParams] = useState<string[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    handleAddUser();
  }, []); 

  const [fetchDataKeys, { isLoading, isError, data, error }] = useFetchDataKeysMutation()

  const handleAddUser = async () => {
    try {
      const response = await fetchDataKeys(["table_names","page_titles", "utm_sources", "utm_mediums"]).unwrap();
      setParamsData(response);
    } catch (error) {
      console.log("Error:", error)
    }
  }

  const handleChangeTable = (event: SelectChangeEvent<string | string[]>) => {
    const value: string[] = Array.isArray(event.target.value) ? event.target.value : [event.target.value];
    const removed = selectedTables.filter(table => !value.includes(table));
    setRemovedParams(prev => [...prev, ...removed]);
    setSelectedTables(value);
    if(removed.length === 0){
    setSelectedParamsData((prevSelectedParamsData) => ({...prevSelectedParamsData, table_names: [...prevSelectedParamsData.table_names, value[value.length - 1]]}));      
    }
    else{
      setSelectedParamsData((prevSelectedParamsData) => ({...prevSelectedParamsData,table_names: prevSelectedParamsData.table_names.filter(name => !removed.includes(name))}));
    }
  };

  const handleChangeProgram = (event: SelectChangeEvent<string | string[]>) => {
    const value: string[] = Array.isArray(event.target.value) ? event.target.value : [event.target.value];
    const removed = selectedPrograms.filter(page => !value.includes(page));
    setRemovedParams(prev => [...prev, ...removed]);
    setSelectedPrograms(value);
    if(removed.length === 0){
    setSelectedParamsData((prevSelectedParamsData) => ({...prevSelectedParamsData, page_titles: [...prevSelectedParamsData.page_titles, value[value.length - 1]]}));
    }
    else{
      setSelectedParamsData((prevSelectedParamsData) => ({...prevSelectedParamsData,page_titles: prevSelectedParamsData.page_titles.filter(name => !removed.includes(name))}));
    }
  };
  
  const handleChangeSource = (event: SelectChangeEvent<string | string[]>) => {
    const value: string[] = Array.isArray(event.target.value) ? event.target.value : [event.target.value];
    const removed = selectedSources.filter(source => !value.includes(source));
    setRemovedParams(prev => [...prev, ...removed]);
    setSelectedSources(value);
    if(removed.length === 0){
    setSelectedParamsData((prevSelectedParamsData) => ({...prevSelectedParamsData, utm_sources: [...prevSelectedParamsData.utm_sources, value[value.length - 1]]}));
    }
    else{
      setSelectedParamsData((prevSelectedParamsData) => ({...prevSelectedParamsData,utm_sources: prevSelectedParamsData.utm_sources.filter(name => !removed.includes(name))}));
    }
  };
  
  const handleChangeMedium = (event: SelectChangeEvent<string | string[]>) => {
    const value: string[] = Array.isArray(event.target.value) ? event.target.value : [event.target.value];
    const removed = selectedMediums.filter(medium => !value.includes(medium));
    setRemovedParams(prev => [...prev, ...removed]);
    setSelectedMediums(value);
    if(removed.length === 0){
    setSelectedParamsData((prevSelectedParamsData) => ({...prevSelectedParamsData, utm_mediums: [...prevSelectedParamsData.utm_mediums, value[value.length - 1]]}));
    }
    else{
      setSelectedParamsData((prevSelectedParamsData) => ({...prevSelectedParamsData,utm_mediums: prevSelectedParamsData.utm_mediums.filter(name => !removed.includes(name))}));
    }
  };

  const getDates = (dates: any) => {
    setParamDates(dates);
    setSelectedParamsData((prevSelectedParamsData) => ({...prevSelectedParamsData, dates:dates}));
  };

  const setParams = () =>{
      dispatch(setSelectedParams({
        dates: paramDates,
        table_names: selectedTables,
        page_titles: selectedPrograms,
        utm_sources: selectedSources,
        utm_mediums: selectedMediums
      }));

      setRemovedParams([]);
      
      setSelectedParamsData({
        dates: [], 
        table_names: [],
        page_titles: [],
        utm_sources: [],
        utm_mediums: [],
      })
    };

    const formatDate = (date: string) => {
      const [year, month, day] = date.split('-');
      return `${day}-${month}`;
    };
  
  return (
    <div className='w-full flex lg:flex-row md:flex-row max-sm:flex-col sm:flex-col justify-around lg:m-2 md:m-2 sm:my-2 max-sm:my-2 lg:space-x-2 md:space-x-2 max-sm:space-y-2'>
      <div >
        <Calendar visible={showPicker} onClose={() => setShowPicker(false)} getDates={getDates} selectedDateRange={selectedDateRange} handleButtonToggle={handleButtonToggle}/>
        <div onClick={() => setShowPicker(true)} className="relative inline-flex items-center justify-start px-6 py-2.5 mb-1 overflow-hidden font-medium transition-all bg-red-500 rounded-xl group">
          <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4">
            <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
          </span>
          <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
          <span className="relative w-full text-left text-white text-[12px] transition-colors duration-200 ease-in-out group-hover:text-white">{paramDates.length > 0 && `Dates: ${formatDate(paramDates[0])}/${formatDate(paramDates[paramDates.length - 1])}`}</span>
        </div>
      </div>
      {paramsData.table_names && (
      <FormControl className='max-sm:w-full sm:w-full'>
        <InputLabel id="demo-multiple-checkbox-label">Table Names</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedTables}
          onChange={handleChangeTable}
          input={<OutlinedInput label="Bootcamp Tables" />}
          renderValue={(selected) => selected.join(', ')}
        >
          {paramsData.table_names.filter(table => table !== null).map((table) => (
            <MenuItem key={table} value={table!}>
              <Checkbox checked={selectedTables.indexOf(table!) > -1} />
              <ListItemText primary={table!} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      )}
      {paramsData.page_titles && (
      <FormControl className='max-sm:w-full sm:w-full'>
        <InputLabel id="demo-multiple-checkbox-label">Page Titles</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedPrograms}
          onChange={handleChangeProgram}
          input={<OutlinedInput label="Bootcamp Programs" />}
          renderValue={(selected) => selected.join(', ')}
        >
          {paramsData.page_titles.filter(title => title !== null).map((title) => (
            <MenuItem key={title} value={title!}>
              <Checkbox checked={selectedPrograms.indexOf(title!) > -1} />
              <ListItemText primary={title!} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      )}
      {paramsData.utm_sources && (
        <FormControl className='max-sm:w-full sm:w-full max-sm:my-2'>
          <InputLabel id="demo-multiple-checkbox-label">Utm Sources</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={selectedSources}
            onChange={handleChangeSource}
            input={<OutlinedInput label="Bootcamp Sources" />}
            renderValue={(selected) => selected.join(', ')}
          >
            {paramsData.utm_sources.filter(source => source !== null).map((source) => (
              <MenuItem key={source} value={source!}>
                <Checkbox checked={selectedSources.indexOf(source!) > -1} />
                <ListItemText primary={source!} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {paramsData.utm_mediums && (
      <FormControl className='max-sm:w-full sm:w-full'>
        <InputLabel id="demo-multiple-checkbox-label">Utm Mediums</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedMediums}
          onChange={handleChangeMedium}
          input={<OutlinedInput label="Bootcamp Mediums" />}
          renderValue={(selected) => selected.join(', ')}
        >
          {paramsData.utm_mediums.filter(medium => medium !== null).map((medium) => (
            <MenuItem key={medium} value={medium!}>
              <Checkbox checked={selectedMediums.indexOf(medium!) > -1} />
              <ListItemText primary={medium!} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )}

    <div onClick={() => setParams()}>
        <SubmitButton
          selectedParams={{
            dates: selectedParamsData.dates.length > 0 ? selectedParamsData.dates : 
            (selectedParamsData.page_titles.length > 0 || selectedParamsData.utm_sources.length > 0 || selectedParamsData.utm_mediums.length > 0 || selectedParamsData.table_names.length > 0) ? paramDates : selectedParamsData.dates,
            table_names: selectedParamsData.table_names.length > 0 ? selectedParamsData.table_names : 
              (selectedParamsData.page_titles.length > 0 || selectedParamsData.utm_sources.length > 0 || selectedParamsData.utm_mediums.length > 0 || selectedParamsData.dates.length > 0) ? selectedTables : selectedParamsData.table_names,
            page_titles: selectedParamsData.page_titles.length > 0 ? selectedParamsData.page_titles :
              (selectedParamsData.table_names.length > 0 || selectedParamsData.utm_sources.length > 0 || selectedParamsData.utm_mediums.length > 0 || selectedParamsData.dates.length > 0) ? selectedPrograms : selectedParamsData.page_titles,
            utm_sources: selectedParamsData.utm_sources.length > 0 ? selectedParamsData.utm_sources :
              (selectedParamsData.table_names.length > 0 || selectedParamsData.page_titles.length > 0 || selectedParamsData.utm_mediums.length > 0 || selectedParamsData.dates.length > 0) ? selectedSources : selectedParamsData.utm_sources,
            utm_mediums: selectedParamsData.utm_mediums.length > 0 ? selectedParamsData.utm_mediums :
              (selectedParamsData.table_names.length > 0 || selectedParamsData.page_titles.length > 0 || selectedParamsData.utm_sources.length > 0) ? selectedMediums : selectedParamsData.utm_mediums
          }}
          removedParams={selectedParamsData.dates.length > 0 ?
            [
                ...selectedTables.filter(item => typeof item === 'string'),
                ...selectedPrograms.filter(item => typeof item === 'string'),
                ...selectedSources.filter(item => typeof item === 'string'),
                ...selectedMediums.filter(item => typeof item === 'string')
            ] : removedParams
        }
        />
    </div>

    </div>
  );
}

export default FilterUtm;