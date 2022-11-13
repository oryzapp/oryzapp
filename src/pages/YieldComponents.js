import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "../firebase-config";



export default function YieldComponents() {
  const season = 'Wet_Season'
  const [riceAccessions, setRiceAccessions] = useState([])
  useEffect(() => {
    const collectionRef = collection(db, `/SPR/Rice_Seasons/Seasons/${season}/Stages/Yield_Components/YC_Raw_Rice_Data`);

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
      
      <div className=" bg-green-200 flex text-sm">
        {/* ffffff */}
        <table className="bg-yellow-300">
          <thead className=" text-xs font-medium uppercase">Accession</thead>
          <tbody className="bg-green-800 flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Accession</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.accessionId === "" ? "---" : rice.accessionId}</div>
              ))}
            </div>
          </tbody>
        </table>

        {/* ffffff */}

        {/* ffffff */}
        <table className="bg-yellow-300">
          <thead className="text-xs font-medium uppercase">Yield Components</thead>
          <tbody className="bg-green-800 flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">cavans</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.cavans === "" ? "---" : rice.cavans}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Kilogram</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.kilogram === "" ? "---" : rice.kilogram}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Grain Yield</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.grainYield === "" ? "---" : rice.grainYield}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Ton/Ha</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.tonHa === "" ? "---" : rice.tonHa}</div>
              ))}
            </div>
          </tbody>
        </table>

        {/* ffffff */}
        {/* ffffff */}
        {/* <div className="bg-yellow-300">
          <thead></thead>
          <tbody className="bg-green-800 flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 ">Kilogram</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.kilogram === "" ? "---" : rice.kilogram}</div>
              ))}
            </div>
          </tbody>
        </div>
         */}

        {/* ffffff */}
        {/* ffffff */}
        {/* <div className="bg-yellow-300">
          <thead></thead>
          <tbody className="bg-green-800 flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 ">Grain Yield</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.grainYield === "" ? "---" : rice.grainYield}</div>
              ))}
            </div>
          </tbody>
        </div> */}

        {/* ffffff */}
        {/* ffffff */}
        {/* <div className="bg-yellow-300">
          <thead></thead>
          <tbody className="bg-green-800 flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 ">Ton/Ha</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.tonHa === "" ? "---" : rice.tonHa}</div>
              ))}
            </div>
          </tbody>
        </div> */}

        {/* ffffff */}
        {/* ffffff */}
        <table className="bg-yellow-300">
          <thead className="text-xs font-medium uppercase">Aroma</thead>
          <tbody className="bg-green-800 flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Cooked Rice</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.cookedRiceAroma === "" ? "---" : rice.cookedRiceAroma}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Grain</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.grainAroma === "" ? "---" : rice.grainAroma}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Leaf</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.leafAroma === "" ? "---" : rice.leafAroma}</div>
              ))}
            </div>
          </tbody>
        </table>

        {/* ffffff */}
      </div>

    </>

  )
}
