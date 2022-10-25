import Mainbar from "./components/Mainbar";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import { useEffect } from "react";
import ModalAddRiceAccessions from "./components/ModalAddRiceAccessions";
import ModalAddRiceData from "./components/ModalAddRiceData";
import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <div className=" bg-sprBackground flex flex-col h-screen relative ">
      <div className="bg-black">
        <Topbar />
      </div>
      <div className=" px-2 py-0 flex-col-reverse h-full max-h-full flex  gap-2 sm:flex-row sm:p-0 sm:pb-2 sm:pr-2 bg-black">
        <Sidebar />
        <Mainbar />
      </div>

    </div>
  );
}

export default App;
