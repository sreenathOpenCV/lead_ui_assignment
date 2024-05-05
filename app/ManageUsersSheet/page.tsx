"use client";

import React, { useState, useEffect, useRef } from "react";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import TableUI from '../../components/TableUI';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../Redux/store";
import { useGetUsersQuery } from "../Services/users_service";
import { setSheetSelection } from "../Redux/sheetSelectionSlice";
import SearchBar from "../../components/SearchBar";
import { Tabs, Tab, Box } from '@mui/material';
import { useSideBarToggle } from "../../hooks/use-sidebar-toggle";

const ManageSheets = () => {
  const dispatch = useDispatch();
  const { selectedSheet, selectedSheetPath } = useSelector((state: RootState) => state.sheetSelection);
  const [value, setValue] = useState<any>(0);
  const [sheetKey, setSheetKey] = useState<string>(selectedSheetPath);
  const scrollRef = useRef();

  const { data: manage_sheets, error: fetchError, isFetching } = useGetUsersQuery(sheetKey);

  const Sheets = [
    {"name": "Black Friday SignUp", "key": "black_friday_signup"},
    {"name": "CarrerX", "key": "careerx"},
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


  const adminData = manage_sheets ? { "admin_records": manage_sheets.admin_records } : { "admin_records": {} };
  const salesData = manage_sheets ? { "sales_records": manage_sheets.sales_records } : { "sales_records": {} };
  const marketingData = manage_sheets ? { "marketing_records": manage_sheets.marketing_records } : { "marketing_records": {} };

  const { toggleCollapse, invokeToggleCollapse } = useSideBarToggle();
  const sidebarToggle = () => {
      invokeToggleCollapse();
  }

  function handleSubmitData(sheetPath: string) {
    setSheetKey(sheetPath);
  }

  const handleChange = (event:any, newValue:any) => {
    setValue(newValue);
  };

  useEffect(() => {
    setSheetKey(selectedSheetPath);
  }, [selectedSheetPath]);

  return (
    <>
      <SearchBar handleSubmitData= {handleSubmitData} path={sheetKey}/>
      <div className="-mt-1">
        <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="User Types Tabs">
            <Tab label="Sales Users" />
            <Tab label="Admin Users" />
            <Tab label="Marketing Users" />
          </Tabs>
        </Box>

        {value === 0 && (
          <TableUI
            path={sheetKey}
            manageData={salesData}
            activeStatus={true}
          />
        )}
        {value === 1 && (
          <TableUI
            path={sheetKey}
            manageData={adminData}
            activeStatus={true}
          />
        )}
        {value === 2 && (
        <TableUI
          path={sheetKey}
          manageData={marketingData}
          activeStatus={true}
        />
      )}
      </Box>
    </div>
    </>
  );
};

export default ManageSheets;