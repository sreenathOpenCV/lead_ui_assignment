import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { setSheetSelection } from '../app/Redux/sheetSelectionSlice';

interface Sheet {
  name: string;
  key: string;
}

const sheets: Sheet[] = [
    {"name": "Black Friday SignUp", "key": "black_friday_signup"},
    {"name": "CareerX", "key": "careerx"},
    {"name": "Courses Certificates", "key": "courses_certificates"},
    {"name": "Curriculum", "key": "curriculum"},
    {"name": "Decision", "key": "decision"},
    {"name": "Free Courses", "key": "free_courses"},
    {"name": "Organization", "key": "organization"},
    {"name": "Program Upgrade", "key": "program_upgrade"},
    {"name": "Student Certified", "key": "student_certified"},
    {"name": "Students", "key": "students"},
    {"name": "Waitlist", "key": "waitlist"},
    {"name": "Webinar Export", "key": "webinar_export"},
    {"name": "Webinar Live Attended", "key": "webinar_live_attended"}
];

export default function SearchBar({handleSubmitData, path}: {handleSubmitData: (key: string) => void, path:string}) {
  const dispatch = useDispatch();
  const [selectedSheet, setSelectedSheet] = useState<Sheet | null>(null);
  const [lastSelectedSheet, setLastSelectedSheet] = useState<Sheet | null>(null);

  useEffect(() => {
    const matchedSheet = sheets.find(sheet => sheet.key === path);
    if (matchedSheet) {
      setLastSelectedSheet(matchedSheet);
      setSelectedSheet(matchedSheet);
    }
  }, [path]);

  const handleChange = (event: React.SyntheticEvent<Element, Event>, newValue: Sheet | null) => {
    if (newValue) {
      setLastSelectedSheet(newValue);
      setSelectedSheet(newValue);
      dispatch(setSheetSelection({ selectedSheet: newValue.name, selectedSheetPath: newValue.key }));
      handleSubmitData(newValue.key);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between max-sm:flex-col -mt-1">
      <div className="px-3 text-sm max-sm:text-sm max-sm:mt-2 max-sm:-ml-8">Dashboard/ManageSheets/{lastSelectedSheet ? <span className="text-red-500">{lastSelectedSheet.name}</span> : ''}</div>
      <h1>{lastSelectedSheet ? <span className="text-black text-3xl font-bold">{lastSelectedSheet.name}</span> : ''}</h1>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={sheets}
          getOptionLabel={(option) => option.name}
          value={selectedSheet}
          onChange={handleChange}
          className="p-2 max-sm:mt-4"
          sx={{width: 380}}
          renderInput={(params) => <TextField {...params} label="Search Sheet" />}
        />
      </div>
    </>
  );
}
