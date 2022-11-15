import {
  collection,
  collectionGroup,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import ModalAddUser from "../components/ModalAddUser";
import db from "../firebase-config";
import addIcon from '../assets/add-icon.svg'
import editIcon from '../assets/edit-icon.svg'
import delIcon from '../assets/delete-icon.svg'
import {
  addRiceAccession,
  editRiceAccessionID,
  deleteRiceAccession,
} from "./../util";
export default function ManageUsers() {
  const [riceAccessions, setRiceAccessions] = useState([]);
  const [openModal, setOpenModal] = useState(false)
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
      <header className="  flex items-center">
        <button
          className=" hidden sm:block w-8 h-8 p-2 rounded-full bg-sprPrimary"
          onClick={() => setOpenModal(true)}
        >
          {/* <img src={addIcon} alt="" />
        </button>
        <h1 className="text-3xl font-bold text-sprBlack opacity-80 pl-5">
          Manage Users</h1> */}
          <img src={addIcon} alt="" />
        </button>
        <h1 className="text-3xl font-bold text-sprBlack opacity-80 pl-2">
          Manage Users
        </h1>
      </header>
      {/* Options */}
      <div className="flex  items-center gap-3  bg-blue-500">
        <div className="relative drop-shadow-sm">
          <input
            className=" pl-2 py-1 text-sm focus:outline-none focus:border-none placeholder:text-sprPrimary/40 text-sprPrimary  rounded-full "
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
      <section className=" flex-auto overflow-auto rounded-sm scrollbar ">
        <div className=" flex h-96 ">
          <div className="hidden sm:block  flex-auto divide-y divide-slate-300 bg-slate-50 h-fit  ">
            <div className="px-6 py-2 text-sm font-medium bg-white text-sprBlack ">ID</div>
            {riceAccessions.map((rice) => (
              <div className="px-6 py-2 text-md font-medium text-sprGray60"> {rice.accessionId === "" ? "---" : rice.accessionId} </div>
            ))}
          </div>
          <div className=" hidden sm:block flex-auto divide-y divide-slate-300 bg-slate-200 h-fit">
            <div className="px-6 py-2 text-sm font-medium bg-white text-sprBlack">Name</div>
            {riceAccessions.map((rice) => (
              <div className="px-6 py-2 text-md font-medium text-sprGray60"> {rice.classification === "" ? "---" : rice.classification}</div>
            ))}
          </div>
          <div className="hidden sm:block flex-auto divide-y divide-slate-300 bg-slate-50 h-fit">
            <div className="px-6 py-2 text-sm font-medium bg-white text-sprBlack">Role</div>
            {riceAccessions.map((rice) => (
              <div className="px-6 py-2 text-md font-medium text-sprGray60"> {rice.variety === "" ? "---" : rice.variety}</div>
            ))}
          </div>
          <div className="hidden sm:block flex-auto divide-y divide-slate-300 bg-slate-200 h-fit">
            <div className="px-6 py-2 text-sm font-medium bg-white text-sprBlack">Position</div>
            {riceAccessions.map((rice) => (
              <div className="px-6 py-2 text-md font-medium text-sprGray60"> {rice.source === "" ? "---" : rice.source}</div>
            ))}
          </div>
          <div className="hidden sm:block flex-auto divide-y divide-slate-300 bg-slate-200 h-fit">
            <div className="px-6 py-2 text-sm font-medium bg-white text-sprBlack">Status</div>
            {riceAccessions.map((rice) => (
              <div className="px-6 py-2 text-md font-medium text-sprGray60"> {rice.source === "" ? "---" : rice.source}</div>
            ))}
          </div>
          <div className="divide-y divide-slate-50  w-full sm:w-auto h-fit ">
            <div className="px-6 py-2 opacity-0 hidden sm:block text-sm font-medium">Action</div>
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
                  className=" text-white text-sm bg-gradient-to-b from-sprPrimary to-sprPrimaryDark h-8 w-14 sm:h-6 sm:w-12 rounded-full shadow-lg shadow-slate-300 "
                  onClick={() => {
                    console.log("hi");
                  }}
                >
                  view
                </button>


                <button
                  className="hidden lg:block p-1 bg-sprPrimary rounded-full   shadow-slate-300 "
                  onClick={() => {
                    editRiceAccessionID(rice.id);
                  }}
                >
                  <div className="w-4 h-4"><img src={editIcon} alt="" /></div>
                </button>
                <button
                  className="hidden lg:block p-1 bg-sprPrimary rounded-full  shadow-slate-300 "
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
        </section>
      {/* Modal */}
      <ModalAddUser open={openModal} onClose={() => setOpenModal(false)}>
        <div className="flex bg-blue-400">
          <h1 className="page-header text-2xl font-bold">Add User</h1>
        </div>
        <div className="flex-auto bg-yellow-400 relative">
          <form
            className="flex flex-col bg-slate-400 h-full"
          // onSubmit={handleSubmit}
          >
            <div className="flex flex-auto flex-col lg:flex-row ">
              <div className="flex flex-col flex-auto  bg-green-300 -space-y-2">
                <div className="p-4 ">
                  {/* <label>ID</label> */}
                  <input
                    className="text-3xl font-medium py-px placeholder-sprPrimaryLight/50 text-sprPrimary focus:outline-none focus:ring-transparent bg-transparent"
                    type="text"
                    placeholder="ID"
                    name="id"
                  // value={state.accession}
                  // onChange={handleChange}
                  />
                </div>
                <div className="p-4  flex flex-col">
                  <label className="text-sprPrimary">Name</label>
                  <input
                    className="rounded-full p-2 w-3/4 border border-sprPrimary focus:outline-none focus:ring-2 focus:ring-sprPrimary focus:bg-sprPrimaryLight/30"
                    type="text"
                    name="name"
                  // value={state.variety}
                  // onChange={handleChange}
                  />
                </div>
                <div className="p-4  flex flex-col">
                  <label className="text-sprPrimary">Position</label>
                  <input
                    className="rounded-full p-2 w-3/4 border border-sprPrimary focus:outline-none focus:ring-2 focus:ring-sprPrimary focus:bg-sprPrimaryLight/30"
                    type="text"
                    name="position"
                  // value={state.source}
                  // onChange={handleChange}
                  />
                </div>
                <div className="p-4  flex flex-col">
                  <label className="text-sprPrimary">Role</label>
                  <input
                    className="rounded-full p-2 w-3/4 border border-sprPrimary focus:outline-none focus:ring-2 focus:ring-sprPrimary focus:bg-sprPrimaryLight/30"
                    type="text"
                    name="role"
                  // value={state.classification}
                  // onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex-auto bg-yellow-600">
                {/* <input type="file" /> */}
              </div>
            </div>
            <div className="text-right space-x-2">
              <button
                className="bg-sprGray30 rounded-full py-2 px-3 text-sm font-medium text-white shadow-slate-300"
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="bg-sprPrimary rounded-full py-2 px-3 text-sm font-medium text-white shadow-slate-300"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </ModalAddUser>
    </>
  );
}
