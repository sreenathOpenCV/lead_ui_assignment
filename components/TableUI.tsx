import React, { useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { usePostUserMutation } from "../app/Services/users_service";

const TableUI = ({
  path,
  manageData,
  activeStatus,
}: {
  path:string;
  manageData: any;
  activeStatus: boolean;
}) => {
  const [params, setParams] = useState(manageData || {});
  const [updateData, setUpdateData] = useState<Record<string, any>>({});
  const [postUser, { isLoading, data: postData}] = usePostUserMutation();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setParams(manageData);
    setUpdateData({});
  }, [manageData]);

  const handleAddUser = async () => {
    try {
      if(Object.keys(updateData).length !== 0){
        setShowAlert(true);
        const response = await postUser({ path, userData: updateData }).unwrap();
        console.log("updateData", response)
        
        setTimeout(() => setShowAlert(false), 3000);
      }
    } catch (err) {
      console.error("Error posting user:", err);
    }
  };
  
  const determineTimeZone = (user:any) => {
    if (user.MaxTimeInHours === 12.5 && user.MinTimeInHours === -16.0) {
      return "ALL_TIME";
    } else if (user.MaxTimeInHours === 1.02 && user.MinTimeInHours === 1.01) {
      return "DISABLED";
    } else if (user.MaxTimeInHours === 12.5 && user.MinTimeInHours === -6.5) {
      return "Rest";
    } else if (user.MaxTimeInHours === -7.0 && user.MinTimeInHours === -16.0) {
      return "USA";
    }
    return "";
  };

  const getTimeZoneLimits = (timeZone:string) => {
    switch (timeZone) {
      case "ALL_TIME":
        return { MaxTimeInHours: 12.5, MinTimeInHours: -16.0 };
      case "DISABLED":
        return { MaxTimeInHours: 1.02, MinTimeInHours: 1.01 };
      case "Rest":
        return { MaxTimeInHours: 12.5, MinTimeInHours: -6.5 };
      case "USA":
        return { MaxTimeInHours: -7.0, MinTimeInHours: -16.0 };
      default:
        return { MaxTimeInHours: null, MinTimeInHours: null };
    }
  }; 

  const paramsKeys = params ? Object.keys(params) : [];

  const submitButton = (
    <button onClick={handleAddUser}
    className="relative inline-flex items-center justify-center px-7 py-2 mb-3 overflow-hidden font-medium text-white bg-black shadow-black hover:shadow-2xl transition duration-300 ease-out border-2 border-gray-900 rounded-full shadow-md group"
  >
    <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-black group-hover:translate-x-0 ease">
      <svg className="w-6 h-6 bg-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" ></path>
      </svg>
    </span>
    <span className="absolute flex items-center justify-center w-full h-full text-white bg-black font-bold text-md transition-all duration-300 transform group-hover:translate-x-full ease">
      Submit
    </span>
    <span className="relative invisible">Submit</span>
  </button>
  );

  const submitAlert = (
    <div className={`fixed max-sm:top-5 sm:top-5 bg-teal-100 border-l-4 border-teal-500 rounded-lg text-teal-900 px-4 py-3 sm:px-1 sm:py-1 max-sm:px-1 max-sm:py-1 sm:-mr-2 max-sm:-mr-2 shadow-md transition-transform transform  ${showAlert ? 'translate-y-0 m-12' : '-translate-y-full'}`} role="alert">
    <div className="flex">
      <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
      <div>
        <p className="font-bold sm:text-sm">Submitted Successfully</p>
        <p className="text-sm">Your changes has been saved</p>
      </div>
      <IoIosCloseCircleOutline style={{fontSize: "30px", paddingLeft: "10px"}} onClick={()=>setShowAlert(false)}/>
    </div>
  </div>
  );
 
  return (
    <>
      <div className="p-3 bg-white rounded-lg shadow-2xl h-screen">
        <div className="rounded-lg shadow hidden md:block bg-white">
        <table className="w-full overflow-y-scroll ">
            <thead className="sticky border-b-2 border-gray-200 bg-gray-700 text-white rounded-t-lg">
              <tr>
                <th className="w-1/4 p-3 text-sm font-semibold tracking-wide text-left">Name</th>
                <th className="w-1/4 p-3 text-sm font-semibold tracking-wide text-left">Email</th>
                <th className="w-10 p-3 text-sm font-semibold tracking-wide text-left">Role</th>
                {!activeStatus && (
                  <th className="w-1/8 p-3 text-sm font-semibold tracking-wide text-left">Time Zone</th>
                )}
                {activeStatus ? (
                  <th className="w-1/4 p-3 text-sm font-semibold tracking-wide text-left">Active Status</th>
                ) : (
                  <th className="w-3/8 p-3 text-sm font-semibold tracking-wide text-left">Slack Email</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 max-h-80 overflow-y-scroll">
              {params && (params.admin_records || params.sales_records || params.marketing_records) &&
                Object.keys(params.admin_records || params.sales_records || params.marketing_records).length > 0 &&
                Object.keys(params.admin_records || params.sales_records || params.marketing_records).map(
                  (key, index) => {
                    let recordType: string | undefined;
                    if (params.admin_records && params.admin_records[key]) {
                      recordType = "admin_records";
                    } else if (params.sales_records && params.sales_records[key]) {
                      recordType = "sales_records";
                    } else if (params.marketing_records && params.marketing_records[key]) {
                      recordType = "marketing_records";
                    }
                    if (!recordType) {
                      console.error("Unknown record type for key:", key);
                      return;
                    }
                    const user = params[recordType][key];
                    const userTimeZone = updateData[key]?.MaxTimeInHours ? determineTimeZone(updateData[key]) : determineTimeZone(user);
                    const isActive = updateData[key]?.ACTIVE_STATUS !== undefined ? updateData[key].ACTIVE_STATUS : user.ACTIVE_STATUS || false;

                    const rowClass = index % 2 === 0 ? "bg-white" : "bg-gray-100"; 

                      return (
                        <tr key={key} className={`${rowClass}`}>
                          <td className="p-3 text-sm text-gray-700 ">{user.FirstName} {user.LastName}</td>
                          <td className="p-3 text-sm text-gray-700 ">{key}</td>
                          <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                            <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-black rounded-lg bg-opacity-50">{user.Role}</span>
                          </td>
                          {!activeStatus && (
                            <td className="text-sm text-gray-700">
                              <div className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-1 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                              <select className="w-full focus:outline-none"
                                value={userTimeZone}
                                onChange={(e) => {
                                  const newTimeZone = e.target.value;
                                  const { MaxTimeInHours, MinTimeInHours } = getTimeZoneLimits(newTimeZone);
                                  setUpdateData(prev => ({
                                    ...prev,
                                    [key]: {...prev[key], MaxTimeInHours: MaxTimeInHours, MinTimeInHours: MinTimeInHours}
                                  }));
                                }}>
                                  <option className="text-black block py-2 text-sm" value="USA">USA</option>
                                  <option className="text-black block py-2 text-sm" value="Rest">Rest</option>
                                  <option className="text-black block py-2 text-sm" value="ALL_TIME">All Time</option>
                                  <option className="text-black block py-2 text-sm" value="DISABLED">Disabled</option>
                                </select>
                              </div>
                            </td>
                          )}
                          {activeStatus ? (
                            <td>
                              <div className="inline-flex items-center">
                                <label className="relative flex justify-between items-center group p-2 text-xl">
                                  <input className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md" 
                                        type="checkbox"
                                        id={`check-${key}`}
                                        checked={isActive}
                                        onChange={(e) => {
                                            const isChecked = e.target.checked;
                                            setUpdateData(prev => ({
                                                ...prev,
                                                [key]: {...prev[key], ACTIVE_STATUS: isChecked}
                                            }));
                                        }} />
                                  <span className="w-12 h-6 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-green-400 after:w-4 after:h-4 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-6 group-hover:after:translate-x-0"></span>
                                </label>
                              </div>
                            </td>
                          ) : (
                            <td className="p-3 text-sm text-gray-700 ">
                            <div className="flex items-center">
                              <input
                                type="text"
                                className="flex-grow bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
                                defaultValue={user.SlackEmail}
                                onChange={(e) => {
                                  const newEmail = e.target.value;
                                  setUpdateData(prev => ({
                                    ...prev,
                                    [key]: {...prev[key], SlackEmail: newEmail}
                                  }));
                                }}
                              />
                            </div>
                          </td>
                          )}
                        </tr>
                      );
                    }
                  )}
              </tbody>
          </table>
          <div className="sticky bottom-0 right-1 flex flex-end justify-end mr-2">
          {submitAlert}{submitButton}
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
          {params && (params.admin_records || params.sales_records || params.marketing_records) &&
            Object.keys(params.admin_records || params.sales_records || params.marketing_records).length >0 ? (
            Object.keys(params.admin_records || params.sales_records || params.marketing_records).map(
              (key) => {
                let recordType: string | undefined;
                if (params.admin_records && params.admin_records[key]) {
                  recordType = "admin_records";
                } else if (params.sales_records && params.sales_records[key]) {
                  recordType = "sales_records";
                } else if (params.marketing_records && params.marketing_records[key]) {
                  recordType = "marketing_records";
                }
                if (!recordType) {
                  console.error("Unknown record type for key:", key);
                  return;
                }
                const user = params[recordType][key];
                const userTimeZone = updateData[key]?.MaxTimeInHours ? determineTimeZone(updateData[key]) : determineTimeZone(user);
                const isActive = updateData[key]?.ACTIVE_STATUS !== undefined ? updateData[key].ACTIVE_STATUS : user.ACTIVE_STATUS || false;

                return (
                  <div key={key} className="bg-white space-y-3 p-4 rounded-lg shadow">
                    <div className="flex items-center space-x-2 text-sm">
                      <div>
                        <h1 className="text-blue-500 font-bold hover:underline">{user.FirstName} {user.LastName}</h1>
                      </div>
                      <div className="text-gray-500">{key}</div>
                    </div>
                    <div className="text-sm text-gray-700">{user.Role}</div>
                    {!activeStatus && (
                      <div className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-1 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                            <select className="w-full focus:outline-none"
                              value={userTimeZone}
                              onChange={(e) => {
                                const newTimeZone = e.target.value;
                                const { MaxTimeInHours, MinTimeInHours } = getTimeZoneLimits(newTimeZone);
                                setUpdateData(prev => ({
                                  ...prev,
                                  [key]: {...prev[key],MaxTimeInHours: MaxTimeInHours,MinTimeInHours: MinTimeInHours}
                                }));
                              }}>
                        <option className="text-black block py-2 text-sm" value="USA">USA</option>
                        <option className="text-black block py-2 text-sm" value="Rest">Rest</option>
                        <option className="text-black block py-2 text-sm" value="ALL_TIME">All Time</option>
                        <option className="text-black block py-2 text-sm" value="DISABLED">Disabled</option>
                      </select>
                    </div>
                    )}
                    {activeStatus ? (
                            <div className="inline-flex items-center">
                              <label className="relative flex justify-between items-center group text-xl mr-1 -ml-4">
                                <input className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md" 
                                      type="checkbox"
                                      id={`check-${key}`}
                                      checked={isActive}
                                      onChange={(e) => {
                                          const isChecked = e.target.checked;
                                          setUpdateData(prev => ({
                                              ...prev,
                                              [key]: {...prev[key], ACTIVE_STATUS: isChecked}
                                          }));
                                      }} />
                                <span className="w-12 h-6 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-green-400 after:w-4 after:h-4 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-6 group-hover:after:translate-x-0"></span>
                              </label>
                              <label className={`mt-px ${isActive ? 'text-green-500' : 'text-red-500'} font-semibold cursor-pointer select-none`} htmlFor={`check-${key}`}>
                                {isActive ? 'Active' : 'Inactive'}
                              </label>
                          </div>
                    ) : (
                      <div className="flex items-center">
                        <input
                          type="text"
                          className="flex-grow bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
                          defaultValue={user.SlackEmail}/>
                      </div>
                    )}
                  </div>
                );
              }
            )
          ) : (<div>No data available</div>)}
        </div>
        <div className="sticky bottom-0 right-1 flex flex-end justify-end m-2 lg:hidden md:hidden">{submitAlert}{submitButton}</div>
      </div>
    </>
  );
};

export default TableUI;