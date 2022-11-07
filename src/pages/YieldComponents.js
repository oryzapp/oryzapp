import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "../firebase-config";



export default function YieldComponents() {
  const season = 'Wet_Season'
  const [riceAccessions, setRiceAccessions] = useState([])
  useEffect(() => {
    const collectionRef = collection(db, `SPR/Rice_Seasons/Seasons/${season}/Stages/Vegetative_Stage/Raw_Rice_Data`);
    // /SPR/Rice_Seasons / Seasons / Wet_Season / Stages / Vegetative_Stage / Raw_Rice_Data / v9rpeOorLurlgdaVaIWS
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
    <div className=" bg-green-200 flex ">
      {/* ffffff */}
      <div className="bg-yellow-300">
        <thead>Cavans</thead>
          <tbody className="bg-green-800 flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
            <div className="px-6 py-2 ">cavans</div>
            {riceAccessions.map((rice) => (
              <div className="px-6 py-2"> {rice.cavans === "" ? "---" : rice.cavans}</div>
            ))}
            </div>
          </tbody>
      </div>
      
      {/* ffffff */}
      {/* ffffff */}
      <div className="bg-yellow-300">
        <thead>Kilogram</thead>
          <tbody className="bg-green-800 flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
            <div className="px-6 py-2 ">Anthocyanin colouration</div>
            {riceAccessions.map((rice) => (
              <div className="px-6 py-2"> {rice.kilogram === "" ? "---" : rice.kilogram}</div>
            ))}
            </div>
          </tbody>
      </div>
      
      {/* ffffff */}
      {/* ffffff */}
      <div className="bg-yellow-300">
        <thead>Grain Yield</thead>
          <tbody className="bg-green-800 flex ">
          <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
          <div className="px-6 py-2 ">Grain Yield</div>
          {riceAccessions.map((rice) => (
            <div className="px-6 py-2"> {rice.grainYield === "" ? "---" : rice.grainYield}</div>
          ))}
          </div>
          </tbody>
      </div>
      
      {/* ffffff */}
      {/* ffffff */}
      <div className="bg-yellow-300">
        <thead>Ton/Ha</thead>
          <tbody className="bg-green-800 flex ">
          <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
          <div className="px-6 py-2 ">Ton/Ha</div>
          {riceAccessions.map((rice) => (
            <div className="px-6 py-2"> {rice.tonHa === "" ? "---" : rice.tonHa}</div>
          ))}
          </div>
          </tbody>
      </div>
      
      {/* ffffff */}
      {/* ffffff */}
      <div className="bg-yellow-300">
        <thead>Aroma</thead>
          <tbody className="bg-green-800 flex ">
          <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
        <div className="px-6 py-2 ">Cooked Rice</div>
        {riceAccessions.map((rice) => (
          <div className="px-6 py-2"> {rice.cookedRiceAroma === "" ? "---" : rice.cookedRiceAroma}</div>
        ))}
      </div>
      <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
        <div className="px-6 py-2 ">Grain</div>
        {riceAccessions.map((rice) => (
          <div className="px-6 py-2"> {rice.grainAroma === "" ? "---" : rice.grainAroma}</div>
        ))}
      </div>
      <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
        <div className="px-6 py-2 ">Leaf</div>
        {riceAccessions.map((rice) => (
          <div className="px-6 py-2"> {rice.leafAroma === "" ? "---" : rice.leafAroma}</div>
        ))}
      </div>
          </tbody>
      </div>
      
      {/* ffffff */}
    </div>

  </>

  )
}
