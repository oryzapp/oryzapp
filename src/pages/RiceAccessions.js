import {
  collection,
  collectionGroup,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "../firebase-config";
import {
  addRiceAccession,
  editRiceAccessionID,
  deleteRiceAccession,
} from "./../util";
export default function RiceAccessions() {
  const [riceAccessions, setRiceAccessions] = useState([]);

  // console.log(riceList);

  useEffect(() => {
    const collectionRef = collection(db, "SPR/Rice_Accessions/Accession_IDs");
    const q = query(collectionRef, orderBy("timestamp", "asc"));
    const unsub = onSnapshot(q, (snapshot) => {
      setRiceAccessions(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });

    return unsub;
  }, []);

  return (
    <>
      {/* Header */}
      <header className="page-header bg-blue-600  flex items-center">
        <button
          className=" w-8 h-8 rounded-full bg-sprPrimaryLight"
          onClick={addRiceAccession}
        >
          +
        </button>
        <h1>Rice Accessions</h1>
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
        <div className="bg-red-600 z-50">ddd</div>
        <div className="bg-red-500 flex">
          <div className="flex-auto bg-blue-500">
            <div className="px-6 py-3">Accessions</div>
            {riceAccessions.map((rice) => (
              <div className="px-6 py-3">{rice.accessionId}</div>
            ))}
          </div>
          <div className="flex-auto">
            <div className="px-6 py-3">Classification</div>
            {riceAccessions.map((rice) => (
              <div className="px-6 py-3">{rice.classification}</div>
            ))}
          </div>
          <div className="flex-auto">
            <div className="px-6 py-3">Variety</div>
            {riceAccessions.map((rice) => (
              <div className="px-6 py-3">{rice.variety}</div>
            ))}
          </div>
          <div className="flex-auto">
            <div className="px-6 py-3">Source</div>
            {riceAccessions.map((rice) => (
              <div className="px-6 py-3">{rice.variety}</div>
            ))}
          </div>

          <div className=" hidden  md:block">
            <div className="px-6 py-3 opacity-0">Action</div>
            {riceAccessions.map((rice) => (
              <div className="px-6 py-3 flex gap-2">
                <button className="bg-sprPrimary px-3 py-1 rounded-full">
                  view
                </button>
                <button
                  className="bg-sprPrimary px-3 py-1 rounded-full"
                  onClick={() => {
                    editRiceAccessionID(rice.id);
                  }}
                >
                  e
                </button>
                <button
                  className="bg-sprPrimary px-3 py-1 rounded-full"
                  onClick={() => {
                    deleteRiceAccession(rice.id);
                  }}
                >
                  d
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Modal */}
    </>
  );
}
