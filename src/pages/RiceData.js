import { Link, Outlet } from "react-router-dom";
import ReproductiveStage from "./ReproductiveStage";
import GrainCharacteristics from "./GrainCharacteristics";
import ModalAddRiceData from "../components/ModalAddRiceData";
import { useState } from "react";
import delIcon from "../assets/delete-icon.svg"

export default function RiceData() {
  const [showModal, setShowModal] = useState(false)
  const [toggleState, setToggleState] = useState(1)
  console.log(toggleState);

  const toggleTab = (index) => {
    setToggleState(index)
  }



  return (
    <>
      {/* Header */}
      <header className="page-header bg-blue-600  flex items-center">
        <button className=" w-8 h-8 rounded-full bg-sprPrimaryLight" onClick={() => setShowModal(true)}>+</button>
        <h1 className="text-3xl font-bold text-sprBlack opacity-80">Rice Data</h1>
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
                <li className=" flex items-center  flex-auto p-2 bg-green-300 ">
                  <Link to="vegetative-stage">
                    <img className=" h-4 w-4 relative" src={delIcon} alt="" />

                  </Link>
                </li>
                <li className=" flex items-center flex-auto p-2  bg-green-500">
                  <Link to="reproductive-stage">
                    <img className=" h-4 w-4 relative" src={delIcon} alt="" />

                  </Link>
                </li>
                <li className=" flex items-center flex-auto p-2 bg-green-700">
                  <Link to="grain-characteristics">
                    <img className=" h-4 w-4 relative" src={delIcon} alt="" />

                  </Link>
                </li>
                <li className=" flex items-center flex-auto p-2 bg-green-900">
                  <Link to="yield-components">
                    <img className=" h-4 w-4 relative" src={delIcon} alt="" />

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
            <div className="flex whitespace-nowrap bg-blue-300">
              <div>
                <select name="" id=""></select>
              </div>
              <div>
                <button>Wet</button>
                <button>Dry</button>
              </div>
              <div>
                <button>Year</button>
              </div>
            </div>

            <div className=" flex  bg-red-600">

              <div className="flex cursor-pointer">
                <div className={toggleState === 1 ? "border-b-2 border-b-sprPrimary" : ""} onClick={() => toggleTab(1)}>
                  <img src="" alt="" />
                  <p>Vegetative Stage</p>
                </div>
                <div className={toggleState === 2 ? "border-b-2 border-b-sprPrimary" : ""} onClick={() => toggleTab(2)}>


                  <img src="" alt="" />
                  <h3>Reproductive Stage</h3>
                </div>
                <div className={toggleState === 3 ? "border-b-2 border-b-sprPrimary" : ""} onClick={() => toggleTab(3)}>

                  <img src="" alt="" />
                  <h3>Grain Characteristics</h3>

                </div>
                <div className={toggleState === 4 ? "border-b-2 border-b-sprPrimary" : ""} onClick={() => toggleTab(4)}>

                  <h3>Yield Components</h3>
                  <img src="" alt="" />
                </div>
              </div>
            </div>

            <div className="flex-auto">
              <div className={toggleState === 1 ? "flex" : "hidden"}>
                first
              </div>
              <div className={toggleState === 2 ? "flex" : "hidden"}>
                second
              </div>
              <div className={toggleState === 3 ? "flex" : "hidden"} >
                third
              </div>
              <div className={toggleState === 4 ? "flex" : "hidden"} >
                fourth
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
