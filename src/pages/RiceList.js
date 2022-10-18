import { collection, collectionGroup, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "../firebase-config";
export default function RiceList() {
  const [riceList, setRiceList] = useState([]);

  // console.log(riceList);

  useEffect(() => {
    const riceCollectionRef = collectionGroup(db, "Raw_Rice_Data");
    onSnapshot(riceCollectionRef, (snapshot) => {
      setRiceList(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  const trial = () => {
    const trial = document.getElementsByClassName("trial");
    console.log(trial);
  };

  return (
    <>
      {/* Header */}
      <header className=" page-header  bg-blue-600 ">All Rice List</header>
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
      <section className=" trial bg-blue-300 flex-auto overflow-auto rounded-sm scrollbar ">
        <div className="bg-red-500 flex">
          <div className="w-10 bg-blue-800 ">
            <div className="px-6 py-3 opacity-0">Action</div>
            {riceList.map((rice) => (
              <div className="px-6 py-3 gap-2">
                <input type="checkbox" onClick={trial} />
              </div>
            ))}
          </div>

          <div className="flex-auto bg-blue-500">
            <div className="px-6 py-3">Accession</div>
            {riceList.map((rice) => (
              <div className="px-6 py-3"> {rice.id}</div>
            ))}
          </div>
          <div className="flex-auto bg-blue-400">
            <div className="px-6 py-3">Season </div>
            {riceList.map((rice) => (
              <div className="px-6 py-3"> {rice.season}</div>
            ))}
          </div>
          <div className="flex-auto bg-blue-600">
            <div className="px-6 py-3">Year</div>
            {riceList.map((rice) => (
              <div className="px-6 py-3"> {rice.year}</div>
            ))}
          </div>
          <div className=" bg-blue-700 ">
            <div className="px-6 py-3 opacity-0">Action</div>
            {riceList.map((rice) => (
              <div className="px-6 py-3 flex gap-2">
                <button className="bg-sprPrimary px-3 py-1 rounded-full">
                  view
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
