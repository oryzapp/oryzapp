import { collection, collectionGroup, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "../firebase-config";
export default function RiceAccessions() {
  const [riceAccessions, setRiceAccessions] = useState([]);

  // console.log(riceList);

  useEffect(() => {
    const riceCollectionRef = collection(db, "SPR/Rice_Data/Rice_Accessions");
    onSnapshot(riceCollectionRef, (snapshot) => {
      setRiceAccessions(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <>
      {/* header */}
      <header className="h-auto bg-blue-600 font-bold flex items-center">
        <button className="h-8 w-8 rounded-full bg-sprPrimaryLight">+</button>
        <h1>RiceAccessions</h1>
      </header>
      {/* Options */}
      <div className="flex h-10 items-center gap-3  bg-blue-500">
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
        <div classNam="reelative py-1 bg-white rounded-full drop-shadow-sm">
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
      {/* Main Section */}
      <section className=" h-full w-full bg-blue-500 ">
        <table>
          <thead>
            <tr>
              <th className=" py-3 px-6 font-medium">Accession</th>
              <th className=" py-3 px-6 font-medium">Source</th>
              <th className=" py-3 px-6 font-medium">Variety</th>
              <th className=" py-3 px-6 font-medium">Classification</th>
            </tr>
          </thead>
          <tbody>
            {riceAccessions.map((rice) => (
              <tr>
                <td className="px-6 py-1">{rice.id}</td>
                <td className="px-6 py-1">{rice.source}</td>
                <td className="px-6 py-1">{rice.variety}</td>
                <td className="px-6 py-1">{rice.classification}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
