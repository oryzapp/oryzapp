import { Link, Outlet } from "react-router-dom";
import ReproductiveStage from "./ReproductiveStage";
import GrainCharacteristics from "./GrainCharacteristics";
import ModalAddRiceData from "../components/ModalAddRiceData";
import { useState } from "react";

export default function RiceData() {
  const [showModal, setShowModal] = useState(false)

//   function change_tab(id)
//  {
//    document.getElementById("page_content").innerHTML=document.getElementById(id+"_desc").innerHTML;
//    document.getElementById("page1").className="notselected";
//    document.getElementById("page2").className="notselected";
//    document.getElementById("page3").className="notselected";
//    document.getElementById(id).className="selected";
//  }

  return (
    <>
      {/* Header */}
      <header className="page-header bg-blue-600  flex items-center">
        <button className=" w-8 h-8 rounded-full bg-sprPrimaryLight" onClick={() => setShowModal(true)}>+</button>
        <h1 className="text-4xl font-bold text-sprBlack opacity-80">Rice Data</h1>
      </header>
      {/* Options */}
      <div className="flex  items-center gap-3  bg-blue-500">
        <div className="relative drop-shadow-sm">
          <input
            className=" pl-2 py-1 text-sm placeholder:text-sprGray40  rounded-full "
            type="text"
            placeholder="Find a Rice"
          />
          <button className=" w-8 h-full rounded-full absolute right-0 bg-sprPrimaryLight">
            o
          </button>
        </div>
        <div className="relative py-1 bg-white rounded-full drop-shadow-sm">
          Filter
          <div className=" hidden absolute w-28 h-auto rounded-sm p-2 z-50  bg-white">
            <label className="block" htmlFor="">
              <input type="checkbox" name="Season" id="Season" />
              Season
            </label>
            <label className="block" htmlFor="">
              <input type="checkbox" name="Season" id="Season" />
              Year
            </label>
            <label className="block" htmlFor="">
              <input type="checkbox" name="Season" id="Season" />
              Variety
            </label>
          </div>
        </div>
      </div>
      {/* Main */}
      <section className=" bg-blue-300 w-full flex-auto overflow-auto rounded-sm scrollbar">
        <div className="bg-red-500 h-full flex">
          <div className="bg-yellow-500 h-full">
            <nav className="bg-green-800 h-full">
              <ul className="flex flex-col  bg-gray-600 h-full">
                <li className=" flex items-center  flex-auto  bg-green-300 ">
                  <Link to="vegetative-stage">
                    <div className="bg-red-500 rounded-full h-4 w-4"></div>
                  </Link>
                </li>
                <li className=" flex items-center flex-auto  bg-green-500">
                  <Link to="reproductive-stage">
                    <div className="bg-red-500 rounded-full h-4 w-4"></div>
                  </Link>
                </li>
                <li className=" flex items-center flex-auto bg-green-700">
                  <Link to="grain-characteristics">
                    <div className="bg-red-500 rounded-full h-4 w-4"></div>
                  </Link>
                </li>
                <li className=" flex items-center flex-auto bg-green-900">
                  <Link to="yield-components">
                    <div className="bg-red-500 rounded-full h-4 w-4"></div>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="bg-blue-700  flex flex-row">
            <Outlet />
          </div>
        </div>
      </section>
      <div className="h-5 bg-blue-900"></div>
      {/* Modal */}
      <ModalAddRiceData open={showModal} onClose={() => setShowModal(false)}>
      <div className="flex bg-blue-400">
          <h1 className="page-header">Add Rice Data</h1>
        </div>
        <div className="flex-auto bg-yellow-400 relative">
          <form
            className="flex flex-col bg-slate-400 h-full"
            // onSubmit={handleSubmit}
          >
            <div id="main_content mt-12 ml-60">
              <li className="selected inline p-2.5 cursor-pointer" id="page1" onclick>Page1</li>
              <li className="notselected inline p-2.5 cursor-pointer" id="page2" onclick>Page2</li>
              <li className="notselected inline p-2.5 cursor-pointer" id="page3" onclick>Page3</li>

              <div className='hidden_desc hidden' id="page1_desc">
              <h2>Page 1</h2>
              Hello this is Page 1 description and this is just a sample text .This is the demo of Multiple Tab In Single Page Using JavaScript and CSS. 
              Hello this is Page 1 description and this is just a sample text .This is the demo of Multiple Tab In Single Page Using JavaScript and CSS.
              Hello this is Page 1 description and this is just a sample text .This is the demo of Multiple Tab In Single Page Using JavaScript and CSS.
              </div>

              <div className='hidden_desc hidden' id="page2_desc">
              <h2>Page 2</h2>
              Hello this is Page 2 description and this is just a sample text .This is the demo of Multiple Tab In Single Page Using JavaScript and CSS.
              </div>

              <div className='hidden_desc hidden' id="page3_desc">
              <h2>Page 3</h2>
              Hello this is Page 3 description and this is just a sample text .This is the demo of Multiple Tab In Single Page Using JavaScript and CSS. 
              Hello this is Page 3 description and this is just a sample text .This is the demo of Multiple Tab In Single Page Using JavaScript and CSS.
              </div>

              <div id="page_content p-2.5 mt-2.5">
              <h2>Page 1</h2>
              Hello this is Page 1 description and this is just a sample text .This is the demo of Multiple Tab In Single Page Using JavaScript and CSS. 
              Hello this is Page 1 description and this is just a sample text .This is the demo of Multiple Tab In Single Page Using JavaScript and CSS.
              Hello this is Page 1 description and this is just a sample text .This is the demo of Multiple Tab In Single Page Using JavaScript and CSS.
              </div>
            </div>


            
            <div className="text-right space-x-2">
              <button
                className="bg-sprPrimary rounded-full py-2 px-3"
                onClick={() => {
                  setShowModal(false);
                }}
              >
                Cancel
              </button>
              
              <button
                type="submit"
                className="bg-sprPrimary rounded-full py-2 px-3"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </ModalAddRiceData>
    </>
  );
}

//
