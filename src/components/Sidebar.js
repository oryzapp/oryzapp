import { button, Route, Routes } from "react-router-dom";
import Dahsboard from "../pages/Dashboard";
import RiceList from "./../pages/RiceList";
import RiceAccessions from "./../pages/RiceAccessions";
import VegetativeStage from "../pages/VegetativeStage";

import { ReactComponent as DashBIcon } from "../assets/dashboard-icon.svg";
import { ReactComponent as MUsersIcon } from "../assets/manage-users-icon.svg";
import { ReactComponent as RiceAccIcon } from "../assets/rice-accessions-icon.svg";
import { ReactComponent as RiceLIcon } from "../assets/rice-list-icon.svg";
import { ReactComponent as RiceDIcon } from "../assets/rice-data-icon.svg";
import { ReactComponent as RiceGIcon } from "../assets/rice-gallery-icon.svg";
import { ReactComponent as SQRIcon } from "../assets/scan-qr-code-icon.svg";

import { useState } from "react";

export default function Sidebar({ onChange }) {
  const [state, setState] = useState(1)

  const handleClick = (page, index) => {
    setState(index)
    onChange(page)
  }

  const activeOn = (index) => {
    setState(index)
  }

  const isAdmin = false;

  return (
    <div className=" sidenav flex  flex-col  whitespace-nowrap w-auto  mb-2 rounded-b-xl sm:rounded-l-none sm:rounded-r-xl bg-white opacity-90 sm:h-full sm:p-3  ">
      <nav className="flex flex-row  sm:flex-col ">

       {isAdmin === true ?  <button onClick={() => handleClick('dashboard', 1)} className={state === 1 ? " flex justify-center  flex-auto   sm:justify-start bg-sprPrimary rounded-lg px-3 py-2  " : " group flex justify-center  flex-auto   sm:justify-start  px-3 py-2 hover:bg-slate-200 rounded-lg   "}>
          <div className="flex items-center space-x-1  "  >
            <div className="rounded-xl h-6 w-6  ">
              {/* <img className=" relative" src={dashboardIcon} alt="" /> */}
              <DashBIcon className=" group-hover:stroke-sprInactiveGray" fill="none" stroke={state !== 1 ? "#888A89" : "white"} />
            </div>
            <h3 className={state === 1 ? "nav-text hidden md:block text-white font-medium text-md" : "nav-text hidden  md:block text-sprInactiveGray font-medium text-md"}>Dashboard</h3>
          </div>
        </button> : <></>}

      {isAdmin === true?  <button onClick={() => handleClick('users', 2)} className={state === 2 ? "hidden sm:flex justify-center  flex-auto   sm:justify-start bg-sprPrimary rounded-lg px-3 py-2 " : "group hidden  sm:flex justify-center  flex-auto   sm:justify-start  px-3 py-2 hover:bg-slate-200 rounded-lg  "}>
          <div className="flex items-center  space-x-1   " >
            <div className="rounded-xl h-6 w-6  ">
              {/* <img className=" relative" src={manageUsersIcon} alt="" /> */}
              <MUsersIcon className=" group-hover:stroke-sprInactiveGray" fill="none" stroke={state !== 2 ? "#888A89" : "white"} />
            </div>
            <h3 className={state === 2 ? "nav-text hidden md:block text-white font-medium text-md" : "nav-text hidden  md:block text-sprInactiveGray font-medium text-md"}>Manage Users</h3>
          </div>
        </button>:<></>}
       
    {isAdmin === true ?  <button onClick={() => handleClick('rice-accessions', 3)} className={state === 3 ? "flex justify-center  flex-auto   sm:justify-start bg-sprPrimary rounded-lg px-3 py-2 " : "group flex justify-center  flex-auto   sm:justify-start  px-3 py-2 hover:bg-slate-200 rounded-lg "} >
          <div className="flex items-center space-x-1   " >
            <div className="rounded-xl h-6 w-6">
              {/* <img className=" relative" src={riceAccessionsIcon} alt="" /> */}
              <RiceAccIcon className=" group-hover:stroke-sprInactiveGray" fill="none" stroke={state !== 3 ? "#888A89" : "white"} />
            </div>
            <h3 className={state === 3 ? "nav-text hidden md:block text-white font-medium text-md" : "nav-text hidden  md:block text-sprInactiveGray font-medium text-md"}>Rice Accessions</h3>
          </div>
        </button> : <></> }
       

      {isAdmin === true ?  <button onClick={() => handleClick('rice-list', 4)} className={state === 4 ? "flex justify-center  flex-auto   sm:justify-start bg-sprPrimary rounded-lg px-3 py-2 " : "group flex justify-center  flex-auto   sm:justify-start  px-3 py-2 hover:bg-slate-200 rounded-lg "} >
          <div className="flex items-center space-x-1   " >
            <div className="rounded-xl h-6 w-6">
              {/* <img className=" relative" src={riceAccessionsIcon} alt="" /> */}
              <RiceLIcon className=" group-hover:stroke-sprInactiveGray" fill="none" stroke={state !== 4 ? "#888A89" : "white"} />
            </div>
            <h3 className={state === 4 ? "nav-text hidden md:block text-white font-medium text-md" : "nav-text hidden  md:block text-sprInactiveGray font-medium text-md"}>Rice List</h3>
          </div>
        </button>:<></>}

      {isAdmin === true ?  <button onClick={() => handleClick('rice-data', 5)} className={state === 5 ? "hidden sm:flex justify-center  flex-auto   sm:justify-start bg-sprPrimary rounded-lg px-3 py-2" : " group hidden sm:flex justify-center  flex-auto   sm:justify-start  px-3 py-2 hover:bg-slate-200 rounded-lg "} >
          <div className="flex items-center space-x-1 " >
            <div className="rounded-xl h-6 w-6 ">
              {/* <img className=" relative" src={riceDataIcon} alt="" /> */}
              <RiceDIcon className=" group-hover:stroke-sprInactiveGray" fill="none" stroke={state !== 5 ? "#888A89" : "white"} />
            </div>
            <h3 className={state === 5 ? "nav-text hidden md:block text-white font-medium text-md" : "nav-text hidden  md:block text-sprInactiveGray font-medium text-md"}>Rice Data</h3>
          </div>
        </button>:<></>
}

      
        <button onClick={() => handleClick('rice-gallery', 6)} className={state === 6 ? "flex justify-center  flex-auto   sm:justify-start bg-sprPrimary rounded-lg px-3 py-2" : "group flex justify-center  flex-auto   sm:justify-start  px-3 py-2 hover:bg-slate-200 rounded-lg "} >
          <div className="flex items-center space-x-1  ">
            <div className="rounded-xl h-6 w-6 ">
              {/* <img className=" relative" src={riceGalleryIcon} alt="" /> */}
              <RiceGIcon className=" group-hover:stroke-sprInactiveGray" fill="none" stroke={state !== 6 ? "#888A89" : "white"} />
            </div>
            <h3 className={state === 6 ? "nav-text hidden md:block text-white font-medium text-md" : "nav-text hidden  md:block text-sprInactiveGray font-medium text-md"}>Rice Gallery</h3>
          </div>
        </button>

        <button onClick={() => handleClick('scan-code', 7)} className={state === 7 ? " flex justify-center  flex-auto   sm:justify-start bg-sprPrimary rounded-lg px-3 py-2 order-first sm:order-last" : "group flex justify-center  flex-auto   sm:justify-start  px-3 py-2 hover:bg-slate-200 rounded-lg order-first sm:order-last"} >
          <div className="flex items-center space-x-1  ">
            <div className="rounded-xl h-6 w-6 ">
              {/* <img className="" src={scanQRCodeIcon} alt="" /> */}
              <SQRIcon className=" group-hover:stroke-sprInactiveGray" fill="none" stroke={state !== 7 ? "#888A89" : "white"} />
            </div>
            <h3 className={state === 7 ? "nav-text hidden md:block text-white font-medium text-md" : "nav-text hidden  md:block text-sprInactiveGray font-medium text-md"}>Scan Code</h3>

          </div>
        </button>

      </nav>
    </div >
  );
}

