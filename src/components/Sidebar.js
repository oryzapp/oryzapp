import { Link, Route, Routes } from "react-router-dom";
import Dahsboard from "../pages/Dashboard";
import RiceList from "./../pages/RiceList";
import RiceAccessions from "./../pages/RiceAccessions";
import VegetativeStage from "../pages/VegetativeStage";

export default function Sidebar() {
  return (
    <div className=" whitespace-nowrap hidden w-auto p-3 mb-2 mr-2 rounded-r-xl bg-white opacity-90 sm:block sm:mr-0">
      <nav>
        <ul>
          <li>
            <Link className="flex space-x-2  md:mb-2 " to="/">
              <div className="h-6 w-6 rounded-full bg-green-300"></div>
              <h3 className="hidden md:block">Dashboard</h3>
            </Link>
          </li>
          <li>
            <Link className="flex space-x-2 mb-2" to="manage-users">
              <div className="hidden md:block h-6 w-6 rounded-full bg-black"></div>
              <h3 className="hidden md:block">Manage Users</h3>
            </Link>
          </li>
          <li>
            <Link className="flex space-x-2 mb-2" to="rice-list">
              <div className="h-6 w-6 rounded-full bg-green-300"></div>
              <h3 className="hidden md:block">Rice List</h3>
            </Link>
          </li>
          <li>
            <Link className="flex space-x-2 md:mb-2" to="rice-accessions">
              <div className="h-6 w-6 rounded-full bg-green-300"></div>
              <h3 className="hidden md:block">Rice Accessions</h3>
            </Link>
          </li>
          <li>
            <Link className="flex space-x-2 mb-2" to="rice-data">
              <div className="hidden md:block h-6 w-6 rounded-full bg-black"></div>
              <h3 className="hidden md:block">Rice Data</h3>
            </Link>
          </li>
          <li>
            <Link className="flex space-x-2 mb-2" to="rice-gallery">
              <div className="h-6 w-6 rounded-full bg-green-300"></div>
              <h3 className="hidden md:block">Rice Gallery</h3>
            </Link>
          </li>
          <li>
            <Link className="flex space-x-2 mb-2" to="scan-code">
              <div className="h-6 w-6 rounded-full bg-green-300"></div>
              <h3 className="hidden md:block">Scan Code</h3>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
