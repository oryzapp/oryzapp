import { collection, collectionGroup, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import db from "../firebase-config";



export default function YieldComponents({ season }) {
  const [riceData, setRiceData] = useState([])
  useEffect(() => {

    let riceCollectionRef = collectionGroup(db, "YC_Raw_Rice_Data");

    if (season === 'All') {
      riceCollectionRef = collectionGroup(db, "YC_Raw_Rice_Data");
    }
    if (season === "Wet_Season") {
      riceCollectionRef = query(collection(db, `/SPR/Rice_Seasons/Seasons/${season}/Stages/Yield_Components/YC_Raw_Rice_Data`))
    }
    if (season === "Dry_Season") {
      riceCollectionRef = query(collection(db, `/SPR/Rice_Seasons/Seasons/${season}/Stages/Yield_Components/YC_Raw_Rice_Data`))
    }

    onSnapshot(riceCollectionRef, (snapshot) => {
      setRiceData(snapshot.docs.map((doc) => doc.data()));
    });

  }, [season]);
  return (

    <>

      <div className="  flex text-sprGray60 text-sm">
        {/* ffffff */}
        <table className="">
          <thead className=" text-xs font-medium uppercase text-center bg-sprPrimaryOffLight">Accession</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-2 font-medium text-sprPrimary">Accession</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2"> {rice.accessionId === "" ? "---" : rice.accessionId}</div>
              ))}
            </div>
          </tbody>
        </table>

        {/* ffffff */}

        {/* ffffff */}
        <table className="">
          <thead className="text-xs font-medium uppercase text-center bg-sprPrimaryLight">Yield Components</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-2 font-medium text-sprPrimary">Cavans</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2 bg-slate-50"> {rice.cavans === "" ? "---" : rice.cavans}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-2 font-medium text-sprPrimary">Kilogram</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2"> {rice.kilogram === "" ? "---" : rice.kilogram}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-2 font-medium whitespace-nowrap text-sprPrimary">Grain Yield</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2 whitespace-nowrap bg-slate-50"> {rice.grainYield === "" ? "---" : rice.grainYield}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-2 font-medium text-sprPrimary">Ton/Ha</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2"> {rice.tonHa === "" ? "---" : rice.tonHa}</div>
              ))}
            </div>
          </tbody>

        </table>
        <table className="">
          <thead className="text-xs font-medium uppercase text-center bg-sprPrimaryOffLight">Aroma</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-2 font-medium whitespace-nowrap text-sprPrimary">Cooked Rice</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2 v bg-slate-50"> {rice.cookedRiceAroma === "" ? "---" : rice.cookedRiceAroma}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-2 font-medium text-sprPrimary">Grain</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2"> {rice.grainAroma === "" ? "---" : rice.grainAroma}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-2 font-medium text-sprPrimary">Leaf</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2 bg-slate-50"> {rice.leafAroma === "" ? "---" : rice.leafAroma}</div>
              ))}
            </div>
          </tbody>
        </table>

        {/* ffffff */}
      </div>

    </>


  )
}
