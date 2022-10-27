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
import closeIcon from "../assets/close.svg";

export default function RiceAccessions() {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    accession: "",
    variety: "",
    source: "",
    classification: "",
  });

  const handleSubmit = async (e) => {
    setLoading(true);
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
    } catch (error) {
      alert(error);
    }
    setLoading(false);
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
          className=" w-8 h-8 rounded-full bg-sprPrimaryLight"
          onClick={() => setIsOpen(true)}
        >
          +
        </button>
        <h1 className="text-4xl font-bold text-sprBlack opacity-80">
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
      <section className=" bg-blue-300 w-full flex-auto overflow-auto rounded-sm scrollbar">
        <div className="bg-red-600 z-50">ddd</div>
        <div className="bg-red-500 flex">
          <div className="flex-auto divide-y divide-slate-400 bg-blue-500">
            <div className="px-6 py-3">Accessions</div>
            {riceAccessions.map((rice) => (
              <div className="px-6 py-3">{rice.accessionId}</div>
            ))}
          </div>
          <div className="flex-auto divide-y divide-slate-400">
            <div className="px-6 py-3">Classification</div>
            {riceAccessions.map((rice) => (
              <div className="px-6 py-3">{rice.classification}</div>
            ))}
          </div>
          <div className="flex-auto divide-y divide-slate-400">
            <div className="px-6 py-3">Variety</div>
            {riceAccessions.map((rice) => (
              <div className="px-6 py-3">{rice.variety}</div>
            ))}
          </div>
          <div className="flex-auto divide-y divide-slate-400">
            <div className="px-6 py-3">Source</div>
            {riceAccessions.map((rice) => (
              <div className="px-6 py-3">{rice.variety}</div>
            ))}
          </div>

          <div className=" divide-y divide-slate-400">
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

// <div className="flex flex-auto">
//   <div className="flex flex-col">
//     <input type="text" placeholder="plchodler" />
//     <input type="text" placeholder="plchodler" />
//     <input type="text" placeholder="plchodler" />
//   </div>
//   <div className="place-self-center">Image</div>
// </div>
// <div className="flex-auto text-right space-x-2">
//   <button>Cancel</button>
//   <button>Save</button>
// </div>
