import { Link, Route, Routes } from "react-router-dom";
import Dahsboard from "../pages/Dashboard";
import RiceList from "./../pages/RiceList";
import RiceAccessions from "./../pages/RiceAccessions";
import VegetativeStage from "../pages/VegetativeStage";

import dashboardIcon from "../assets/dashboard-icon.svg"
import manageUsersIcon from "../assets/manage-users-icon.svg"
import riceAccessionsIcon from "../assets/rice-accessions-icon.svg"
import riceListIcon from "../assets/rice-list-icon.svg"
import riceDataIcon from "../assets/rice-data-icon.svg"
import riceGalleryIcon from "../assets/rice-gallery-icon.svg"
import scanQRCodeIcon from "../assets/scan-qr-code-icon.svg"

import { useEffect, useState } from "react";
import { useRef } from "react";

export default function Sidebar() {
  const [state, setState] = useState(1)

  const activeOn = (index) => {

    setState(index)

  }

  return (
    <div className=" sidenav flex  flex-col  whitespace-nowrap w-auto  mb-2 rounded-b-xl sm:rounded-l-none sm:rounded-r-xl bg-white opacity-90 sm:h-full sm:p-3  ">
      <nav className="flex flex-row  sm:flex-col ">

        <Link className={state === 1 ? "flex justify-center  flex-auto   sm:justify-start text- bg-sprPrimaryLight rounded-lg px-3 py-2  " : " flex justify-center  flex-auto   sm:justify-start  px-3 py-2 hover:bg-slate-200 rounded-lg   "} onClick={() => activeOn(1)} to="/">
          <div className="flex items-center space-x-1   "  >
            <div className="rounded-xl h-8 w-8   hover:text-white">
              <img className=" relative" src={dashboardIcon} alt="" />
            </div>
            <h3 className="nav-text hidden  md:block  ">Dashboard</h3>
          </div>
        </Link>

        <div className={state === 2 ? "flex justify-center  flex-auto   sm:justify-start bg-sprPrimaryLight rounded-lg px-3 py-2 " : "hidden  sm:flex justify-center  flex-auto   sm:justify-start  px-3 py-2 hover:bg-slate-200 rounded-lg  "} onClick={() => activeOn(2)}>

          <Link
            className="flex items-center  space-x-1   "
            to="manage-users"
          >
            <div className="rounded-xl h-8 w-8  ">
              <img className=" relative" src={manageUsersIcon} alt="" />
            </div>
            <h3 className="nav-text hidden  md:block">Manage Users</h3>
          </Link>
        </div>
        <div className={state === 3 ? "flex justify-center  flex-auto   sm:justify-start bg-sprPrimaryLight rounded-lg px-3 py-2" : "flex justify-center  flex-auto   sm:justify-start  px-3 py-2 hover:bg-slate-200 rounded-lg "} onClick={() => activeOn(3)}>

          <Link
            className="flex items-center space-x-1   "
            to="rice-list"
          >
            <div className="rounded-xl h-8 w-8 ">
              <img className=" relative" src={riceListIcon} alt="" />
            </div>
            <h3 className="nav-text hidden  md:block">Rice List</h3>
          </Link>
        </div>
        <div className={state === 4 ? "flex justify-center  flex-auto   sm:justify-start bg-sprPrimaryLight rounded-lg px-3 py-2 " : "flex justify-center  flex-auto   sm:justify-start  px-3 py-2 hover:bg-slate-200 rounded-lg "} onClick={() => activeOn(4)}>

          <Link
            className="flex items-center space-x-1   "
            to="rice-accessions"
          >
            <div className="rounded-xl h-8 w-8">
              <img className=" relative" src={riceAccessionsIcon} alt="" />
            </div>
            <h3 className="nav-text hidden  md:block">Rice Accessions</h3>
          </Link>
        </div>
        <div className={state === 5 ? "flex justify-center  flex-auto   sm:justify-start bg-sprPrimaryLight rounded-lg px-3 py-2" : "hidden sm:flex justify-center  flex-auto   sm:justify-start  px-3 py-2 hover:bg-slate-200 rounded-lg "} onClick={() => activeOn(5)}>

          <Link
            className="flex items-center space-x-1 "
            to="rice-data/vegetative-stage"
          >
            <div className="rounded-xl h-8 w-8 ">
              <img className=" relative" src={riceDataIcon} alt="" />
            </div>
            <h3 className="nav-text hidden  md:block">Rice Data</h3>
          </Link>
        </div>
        <div className={state === 6 ? "flex justify-center  flex-auto   sm:justify-start bg-sprPrimaryLight rounded-lg px-3 py-2" : "flex justify-center  flex-auto   sm:justify-start  px-3 py-2 hover:bg-slate-200 rounded-lg "} onClick={() => activeOn(6)}>

          <Link
            className="flex items-center space-x-1  "
            to="rice-gallery"
          >
            <div className="rounded-xl h-8 w-8 ">
              <img className=" relative" src={riceGalleryIcon} alt="" />
            </div>
            <h3 className="nav-text hidden  md:block">Rice Gallery</h3>
          </Link>
        </div>
        <div className={state === 7 ? "flex justify-center  flex-auto   sm:justify-start bg-sprPrimaryLight rounded-lg px-3 py-2" : "flex justify-center  flex-auto   sm:justify-start  px-3 py-2 hover:bg-slate-200 rounded-lg "} onClick={() => activeOn(7)}>

          <Link
            className="flex items-center space-x-1  "
            to="scan-code"
          >
            <div className="rounded-xl h-8 w-8 ">
              <img className="" src={scanQRCodeIcon} alt="" />
            </div>
            <h3 className="nav-text hidden  md:block">Scan Code</h3>
          </Link>
        </div>
        {/* <Link to='rice-info'></Link> */}

      </nav>
    </div>
  );
}

{
  /* <ul className=" md:pr-8 ">
  <li>
    <Link className="flex space-x-2  md:mb-2 " to="/">
      <div className="h-6 w-6 rounded-full bg-green-300">
        <img className=" relative" src={riceaccLogo} alt="" />
      </div>
      <h3 className="hidden md:block">Dashboard</h3>
    </Link>
  </li>
  <li>
    <Link className="flex space-x-2 mb-2" to="manage-users">
      <div className="hidden md:block h-6 w-6 rounded-full bg-white">
        <img className=" relative" src={userLogo} alt="" />
      </div>
      <h3 className="hidden md:block">Manage Users</h3>
    </Link>
  </li>
  <li>
    <Link className="flex space-x-2 mb-2" to="rice-list">
      <div className="h-6 w-6 rounded-full bg-white">
        <img className=" relative" src={ricelistLogo} alt="" />
      </div>
      <h3 className="hidden md:block">Rice List</h3>
    </Link>
  </li>
  <li>
    <Link className="flex space-x-2 md:mb-2" to="rice-accessions">
      <div className="h-6 w-6 rounded-full bg-white">
        <img className=" relative" src={riceaccLogo} alt="" />
      </div>
      <h3 className="hidden md:block">Rice Accessions</h3>
    </Link>
  </li>
  <li>
    <Link
      className="flex space-x-2 mb-2"
      to="rice-data/vegetative-stage"
    >
      <div className="hidden md:block h-6 w-6 rounded-full bg-white">
        <img className=" relative" src={ricedataLogo} alt="" />
      </div>
      <h3 className="hidden md:block">Rice Data</h3>
    </Link>
  </li>
  <li>
    <Link className="flex space-x-2 mb-2" to="rice-gallery">
      <div className="h-6 w-6 rounded-full bg-green-300">
        <img className=" relative" src={ricelistLogo} alt="" />
      </div>
      <h3 className="hidden md:block">Rice Gallery</h3>
    </Link>
  </li>
  <li>
    <Link className="flex space-x-2 mb-2" to="scan-code">
      <div className="h-6 w-6 rounded-full bg-green-300">
        <img className=" relative" src={ricelistLogo} alt="" />
      </div>
      <h3 className="hidden md:block">Scan Code</h3>
    </Link>
  </li>
</ul> */
}
