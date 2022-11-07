import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "../firebase-config";


export default function VegetativeStage() {
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
        <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
          <div className="px-6 py-2 ">Accession</div>
          {riceAccessions.map((rice) => (
            <div className="px-6 py-2"> {rice.accessionId}</div>
          ))}
        </div>
        <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
          <div className="px-6 py-2 ">Auricle Color</div>
          {riceAccessions.map((rice) => (
            <div className="px-6 py-2"> {rice.auricleColor}</div>
          ))}
        </div>
        <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
          <div className="px-6 py-2 ">Accession</div>
          {riceAccessions.map((rice) => (
            <div className="px-6 py-2"> {rice.accessionId}</div>
          ))}
        </div>
      </div>

    </>
  );
}
