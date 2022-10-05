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
      <header className="h-5 bg-blue-600 font-bold">Rice List</header>
      {/* Options */}
      <div className="flex h-10 bg-blue-600 ">
        <div className="relative">
          <div className="absolute right-0 rounded-full bg-red-300 w-6 h-6">
            +
          </div>
          <input
            className=" pl-2 rounded-full"
            type="text"
            placeholder="Find a Rice"
          />
        </div>
        <div className="relative">
          Filter
          <div className=" absolute w-28 h-auto rounded-sm p-2 z-50  bg-white">
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
      <section className="rounded-lg bg-blue-600">
        <table>
          <thead>
            <tr>
              <th>Accession</th>
              <th>Season</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {riceList.map((rice) => (
              <tr>
                <td>{rice.id}</td>
                <td>{rice.season}</td>
                <td>{rice.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
