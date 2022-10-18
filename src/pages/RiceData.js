import { Link, Outlet } from "react-router-dom";
import ReproductiveStage from "./ReproductiveStage";
import GrainCharacteristics from "./GrainCharacteristics";
export default function RiceData() {
  return (
    <>
      {/* Header */}
      <header className="page-header bg-blue-600  flex items-center">
        <button className=" w-8 h-8 rounded-full bg-sprPrimaryLight">+</button>
        <h1>Rice Data</h1>
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
    </>
  );
}

//
