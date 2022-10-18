import Mainbar from "./components/Mainbar";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import { useEffect } from "react";
import ModalAddRiceAccessions from "./components/ModalAddRiceAccessions";
import ModalAddRiceData from "./components/ModalAddRiceData";
import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <div className="bg-sprBackground flex flex-col h-screen relative ">
      <div>
        <Topbar />
      </div>
      <div className="h-full max-h-full flex  gap-2  bg-black ">
        <Sidebar />
        <Mainbar />
      </div>
      {/* Modals */}
      {/* <ModalAddRiceAccessions /> */}
      {/* <ModalAddRiceData /> */}
    </div>
  );
}

export default App;
