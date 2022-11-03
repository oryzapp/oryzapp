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
      <header className=" bg-blue-600  flex items-center">
        <button
          className=" w-8 h-8 rounded-full bg-sprPrimaryLight"
          onClick={() => setOpenModal(true)}
        >
          +
        </button>
        <h1 className="text-3xl font-bold text-sprBlack opacity-80">
          Manage Users</h1>
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

      </section>
      {/* Modal */}
      <ModalAddUser open={openModal} onClose={() => setOpenModal(false)}>
      <div className="flex bg-blue-400">
          <h1 className="page-header">Add User</h1>
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
                    type="text"
                    placeholder="ID"
                    name="id"
                    // value={state.accession}
                    // onChange={handleChange}
                  />
                </div>
                <div className="p-4  flex flex-col">
                  <label>Name</label>
                  <input
                    className="rounded-full p-2 w-3/4"
                    type="text"
                    name="name"
                    // value={state.variety}
                    // onChange={handleChange}
                  />
                </div>
                <div className="p-4  flex flex-col">
                  <label>Position</label>
                  <input
                    className="rounded-full p-2 w-3/4"
                    type="text"
                    name="position"
                    // value={state.source}
                    // onChange={handleChange}
                  />
                </div>
                <div className="p-4  flex flex-col">
                  <label>Role</label>
                  <input
                    className="rounded-full p-2 w-3/4"
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
                className="bg-sprPrimary rounded-full py-2 px-3"
                onClick={() => {
                  setOpenModal(false);
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
      </ModalAddUser>
    </>
  );
}
