"use client";

import React, { useState } from 'react';
import { useGetUsersQuery } from "../Services/users_service";
import { Tabs, Tab, Box } from '@mui/material';
import TableUI from '../../components/TableUI';

const ManageUsers = () => {
  const { data: manage_users, error: fetchError, isFetching } = useGetUsersQuery("manage_users");
  const [value, setValue] = useState<any>(0);

  const handleChange = (event:any, newValue:any) => {
    setValue(newValue);
  };

  const adminData = manage_users ? { "admin_records": manage_users.admin_records } : { "admin_records": {} };
  const salesData = manage_users ? { "sales_records": manage_users.sales_records } : { "sales_records": {} };
  const marketingData = manage_users ? { "marketing_records": manage_users.marketing_records } : { "marketing_records": {} };

  return (
    <>
      <div className="flex items-center justify-between max-sm:flex-col mt-3 mb-4">
      <div className="px-3 text-sm max-sm:text-sm max-sm:mt-2 max-sm:-ml-8">Dashboard/ManageUsers</div>
      <h1 className="text-black text-3xl font-bold">ManageUsers</h1> 
      <div></div>
      <div></div>
      </div>

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
          path={"manage_users"}
          manageData={salesData}
          activeStatus={false}
        />
      )}
      {value === 1 && (
        <TableUI
          path={"manage_users"}
          manageData={adminData}
          activeStatus={false}
        />
      )}
       {value === 2 && (
        <TableUI
          path={"manage_users"}
          manageData={marketingData}
          activeStatus={false}
        />
      )}
    </Box>
    </>
  );
};

export default ManageUsers;
