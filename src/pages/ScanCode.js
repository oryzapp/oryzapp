import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalRiceInfo from "../components/ModalRiceInfo";
export default function ScanCode() {

  const [modalIsOpen, setModalIsOpen] = useState(false)
  return (
    <>
      {/* Header */}
      <header className=" flex items-center">
        <h1 className="text-3xl font-bold text-sprBlack opacity-80">
          Scan Code
        </h1>
      </header>

      {/* Main */}
      <section className=" w-full flex flex-auto overflow-auto rounded-sm scrollbar">
        <div className="bg-blue-400 w-1/4 flex flex-col">
          <div className="bg-yellow-500 h-3/4 p-16 flex flex-col items-center">
            <h3 className="bg-blue-300">Scan Here</h3>
            <div className="bg-slate-300 h-60 w-60 rounded-md ">n</div>
          </div>

          <div className="bg-yellow-800 h-1/4">b</div>
        </div>
        <div className="bg-red-600 w-3/4" >
          <ModalRiceInfo open={modalIsOpen} >
            Hi
          </ModalRiceInfo>
        </div>

      </section>
    </>
  );
}
