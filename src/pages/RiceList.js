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

  return (
    <>
      {/* Header */}
      <header className=" bg-blue-600 font-bold">Rice List</header>
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
      <section className=" bg-blue-300 flex-auto overflow-auto rounded-sm scrollbar">
        <div className="h-96 ">
          <table className="table-auto">
            <thead>
              <tr>
                <td className="pl-3 pr-0 py-3">
                  <div className=" h-5 w-5 rounded-full bg-green-300"></div>
                </td>
                <td className="px-6 py-3">Accession</td>
                <td className="px-6 py-3">Season</td>
                <td className="px-6 py-3">Year</td>
              </tr>
            </thead>
            <tbody>
              {riceList.map((rice) => (
                <tr>
                  <td className="pl-3 pr-0 py-3">
                    <div className=" h-5 w-5 rounded-full bg-green-300"></div>
                  </td>
                  <td className="px-6 py-1">{rice.id}</td>
                  <td className="px-6 py-1">{rice.season}</td>
                  <td className="px-6 py-1">{rice.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
