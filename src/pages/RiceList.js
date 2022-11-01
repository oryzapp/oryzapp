import { collection, collectionGroup, onSnapshot } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import db from "../firebase-config";
export default function RiceList() {

  const [riceList, setRiceList] = useState([]);

  useEffect(() => {
    const riceCollectionRef = collectionGroup(db, "Raw_Rice_Data");
    onSnapshot(riceCollectionRef, (snapshot) => {
      setRiceList(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <>
      {/* Header */}
      <header className="  bg-blue-600 ">
        <h1 className="text-4xl font-bold text-sprBlack opacity-80">
          Rice List
        </h1>
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
        <div className="block">
          <button
          >
            list
          </button>
          <button
          >
            grid
          </button>
        </div>
      </div>
      {/* Main */}
      <section className="  bg-blue-300 flex-auto overflow-auto rounded-sm scrollbar ">
        <div className=" bg-red-500 flex">
          <div className="w-10 hidden sm:block bg-blue-800 ">
            <div className="px-6 py-3 opacity-0">Action</div>
            {riceList.map((rice) => (
              <div className="px-6 py-3 gap-2">
                <input type="checkbox" />
              </div>
            ))}
          </div>

          <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
            <div className="px-6 py-3 ">Accession</div>
            {riceList.map((rice) => (
              <div className="px-6 py-3"> {rice.id}</div>
            ))}
          </div>
          <div className=" hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-400">
            <div className="px-6 py-3">Season </div>
            {riceList.map((rice) => (
              <div className="px-6 py-3"> {rice.season}</div>
            ))}
          </div>
          <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-600">
            <div className="px-6 py-3">Year</div>
            {riceList.map((rice) => (
              <div className="px-6 py-3"> {rice.year}</div>
            ))}
          </div>
          <div className="divide-y divide-slate-400 bg-blue-700 w-full sm:w-auto ">
            <div className="px-6 py-3 opacity-0 hidden sm:block">Action</div>
            {riceList.map((rice) => (
              <div className="px-6 py-3 flex items-center justify-between gap-2">
                <div className=" sm:hidden">
                  <h1 className="text-2xl font-bold text-sprBlack opacity-80">
                    {rice.id}
                  </h1>
                  <h6 className="text-md font-medium text-sprGray60">
                    {rice.season}
                  </h6>
                  <h6 className="text-md font-medium text-sprGray60">
                    {rice.year}
                  </h6>
                </div>
                <button
                  className="bg-sprPrimary px-4 py-2 sm:py-0 sm:px-2 rounded-full"
                  onClick={() => {
                    console.log("hi");
                  }}
                >
                  view
                </button>

              </div>
            ))}
          </div>
        </div>
        <div className="hidden  grid grid-cols-2 sm:grid-cols-3  lg:grid-cols-6  gap-2 p-2 bg-blue-800">
          {riceList.map((rice) => (
            <div className="flex flex-col bg-yellow-500  p-2 rounded-md">
              <div className=" bg-red-600"></div>
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-xl font-bold text-sprBlack opacity-80">
                    {rice.id}
                  </h1>
                  <h6 className="text-xs font-medium text-sprGray60">
                    {rice.season}
                  </h6>
                  <h6 className="text-xs font-medium text-sprGray60">
                    {rice.year}
                  </h6>
                </div>
                <button className="bg-sprPrimary w-14 h-8 rounded-full">
                  view
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
