import {
  addDoc,
  collection,
  collectionGroup,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import ModalAddRiceAcc from "../components/ModalAddRiceAcc";
import db from "../firebase-config";
import {
  addRiceAccession,
  editRiceAccessionID,
  deleteRiceAccession,
} from "./../util";
import addIcon from '../assets/add-icon.svg'

import closeIcon from "../assets/close.svg";
import delIcon from "../assets/delete-icon.svg"
import editIcon from "../assets/edit-icon.svg"

export default function RiceAccessions() {
  const [state, setState] = useState({
    accession: "",
    variety: "",
    source: "",
    classification: "",
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const collectionRef = collection(db, "SPR/Rice_Accessions/Accession_IDs");
      const payLoad = {
        accessionId: state.accession,
        classification: state.classification,
        variety: state.variety,
        source: state.source,
        timestamp: serverTimestamp(),
      };
      await addDoc(collectionRef, payLoad);


      e.target.reset();
      setIsOpen(false)
    } catch (error) {
      alert(error);
    }
  };

  const handleChange = async (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const [riceAccessions, setRiceAccessions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

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
      <header className=" bg-blue-600  flex items-center">
        <button
          className=" hidden sm:block w-8 h-8 p-2 rounded-full bg-sprPrimary"
          onClick={() => setIsOpen(true)}
        >
          <img src={addIcon} alt="" />
        </button>
        <h1 className="text-3xl font-bold text-sprBlack opacity-80">
          Rice Accessions
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
      </div>
      {/* Main */}

      <section className="  bg-blue-300 flex-auto overflow-auto rounded-sm scrollbar ">
        <div className=" bg-red-500 flex h-96 ">


          <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
            <div className="px-6 py-2 ">Accession</div>
            {riceAccessions.map((rice) => (
              <div className="px-6 py-2"> {rice.accessionId}</div>
            ))}
          </div>
          <div className=" hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-400">
            <div className="px-6 py-2">Classification </div>
            {riceAccessions.map((rice) => (
              <div className="px-6 py-2"> {rice.classification}</div>
            ))}
          </div>
          <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-600">
            <div className="px-6 py-2">Variety</div>
            {riceAccessions.map((rice) => (
              <div className="px-6 py-2"> {rice.variety}</div>
            ))}
          </div>
          <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-600">
            <div className="px-6 py-2">Source</div>
            {riceAccessions.map((rice) => (
              <div className="px-6 py-2"> {rice.source}</div>
            ))}
          </div>
          <div className="divide-y divide-slate-400 bg-blue-700 w-full sm:w-auto ">
            <div className="px-6 py-2 opacity-0 hidden sm:block">Action</div>
            {riceAccessions.map((rice) => (
              <div className="px-6 py-2 flex items-center justify-between gap-2">
                <div className=" sm:hidden">
                  <h1 className="text-2xl font-bold text-sprBlack opacity-80">
                    {rice.accessionId}
                  </h1>
                  <h6 className="text-md  font-medium text-sprGray60">
                    {rice.variety}
                  </h6>
                  <h6 className="text-md font-medium text-sprGray60">
                    {rice.source}
                  </h6>
                </div>
                <button
                  className="bg-sprPrimary py-2 px-4 sm:px-2 sm:py-0 rounded-full"
                  onClick={() => {
                    console.log("hi");
                  }}
                >
                  view
                </button>


                <button
                  className="hidden lg:block p-1 bg-sprPrimary rounded-full "
                  onClick={() => {
                    editRiceAccessionID(rice.id);
                  }}
                >
                  <div className="w-4 h-4"><img src={editIcon} alt="" /></div>
                </button>
                <button
                  className="hidden lg:block p-1 bg-sprPrimary rounded-full"
                  onClick={() => {
                    deleteRiceAccession(rice.id);
                  }}
                >
                  <div className="w-4 h-4"><img src={delIcon} alt="" /></div>

                </button>
              </div>
            ))}
          </div>
        </div>
        {/* <div className="hidden  grid grid-cols-2 sm:grid-cols-3  lg:grid-cols-6  gap-2 p-2 bg-blue-800">
          {riceAccessions.map((rice) => (
            <div className="flex flex-col bg-yellow-500  p-2 rounded-md">
              <div className=" bg-red-600"></div>
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-xl font-bold text-sprBlack opacity-80">
                    {rice.accessionId}
                  </h1>
                  <h6 className="text-xs font-medium text-sprGray60">
                    {rice.variety}
                  </h6>
                  <h6 className="text-xs font-medium text-sprGray60">
                    {rice.source}
                  </h6>
                </div>
                <button className="bg-sprPrimary w-14 h-8 rounded-full">
                  view
                </button>
              </div>
            </div>
          ))}
        </div> */}
      </section>
      {/* Modal */}
      <ModalAddRiceAcc open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="flex bg-blue-400">
          <h1 className="page-header">Add Rice Accession</h1>
        </div>
        <div className="flex-auto bg-yellow-400 relative">
          <form
            className="flex flex-col bg-slate-400 h-full"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-auto flex-col lg:flex-row ">
              <div className="flex flex-col flex-auto  bg-green-300 -space-y-2">
                <div className="p-4 ">
                  <input
                    type="text"
                    placeholder="CL-XXXX"
                    name="accession"
                    value={state.accession}
                    onChange={handleChange}
                  />
                </div>
                <div className="p-4  flex flex-col">
                  <label>Variety</label>
                  <input
                    className="rounded-full p-2 w-3/4"
                    type="text"
                    name="variety"
                    value={state.variety}
                    onChange={handleChange}
                  />
                </div>
                <div className="p-4  flex flex-col">
                  <label>Source</label>
                  <input
                    className="rounded-full p-2 w-3/4"
                    type="text"
                    name="source"
                    value={state.source}
                    onChange={handleChange}
                  />
                </div>
                <div className="p-4  flex flex-col">
                  <label>Classification</label>
                  <input
                    className="rounded-full p-2 w-3/4"
                    type="text"
                    name="classification"
                    value={state.classification}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex-auto bg-yellow-600">
                {/* <input type="file" /> */}
              </div>
            </div>
            <div className="text-right space-x-2">
              <button
                className="bg-sprPrimary rounded-full py-2 px-3"
                onClick={() => {
                  setIsOpen(false);
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
      </ModalAddRiceAcc>
    </>
  );
}

