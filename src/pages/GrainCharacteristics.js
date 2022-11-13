import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "../firebase-config";




export default function GrainCharacteristics() {
  const season = 'Wet_Season'
  const [riceAccessions, setRiceAccessions] = useState([])
  useEffect(() => {
    const collectionRef = collection(db, `/SPR/Rice_Seasons/Seasons/${season}/Stages/Grain_Characteristics/GC_Raw_Rice_Data`);

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
      <div className=" bg-green-200 flex text-sm ">
        {/* ffffff */}
        <table className="bg-yellow-300">
          <thead className="text-xs uppercase font-medium">Accession</thead>
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
          <thead className="text-xs uppercase font-medium">Awn</thead>
          <tbody className="bg-green-800 flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Colour</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.awnColour === "" ? "---" : rice.awnColour}</div>
              ))}
            </div>
          </tbody>
        </table>

        {/* ffffff */}
        {/* ffffff */}
        <table className="bg-yellow-300">
          <thead className="text-xs uppercase font-medium">Caryopsis</thead>
          <tbody className="bg-green-800 flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Length</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.caryopsisLength === "" ? "---" : rice.caryopsisLength}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Width</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.caryopsisWidth === "" ? "---" : rice.caryopsisWidth}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Shape</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.caryopsisShape === "" ? "---" : rice.caryopsisShape}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Pericarp Colour</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.caryopsisPericarpColour === "" ? "---" : rice.caryopsisPericarpColour}</div>
              ))}
            </div>
          </tbody>
        </table>

        {/* ffffff */}
        {/* ffffff */}
        <table className="bg-yellow-300">
          <thead className="text-xs uppercase font-medium">Endorsperm</thead>
          <tbody className="bg-green-800 flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Colour</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.endorspermType === "" ? "---" : rice.endorspermType}</div>
              ))}
            </div>
          </tbody>
        </table>

        {/* ffffff */}
        {/* ffffff */}
        <table className="bg-yellow-300">
          <thead className="text-xs uppercase font-medium">Grain</thead>
          <tbody className="bg-green-800 flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Habit</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.grainLength === "" ? "---" : rice.grainLength}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Width</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.grainWidth === "" ? "---" : rice.grainWidth}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Thickness</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.grainThickness === "" ? "---" : rice.grainThickness}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">100 Grain Weight</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.grain100GrainWeight === "" ? "---" : rice.grain100GrainWeight}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">10 Grain Weight</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.grain10GrainWeight === "" ? "---" : rice.grain10GrainWeight}</div>
              ))}
            </div>
          </tbody>
        </table>

        {/* ffffff */}
        {/* ffffff */}
        <table className="bg-yellow-300">
          <thead className="text-xs uppercase font-medium">Lemma</thead>
          <tbody className="bg-green-800 flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Anthocyanin Colouration of Keel</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.lemmaAnthocyaninColourationofKeel === "" ? "---" : rice.lemmaAnthocyaninColourationofKeel}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Anthocyanin Colouration of Area Below Apiculus Late Observation</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.lemmaAnthocyaninColourationofAreaBelowApiculusLateobs === "" ? "---" : rice.lemmaAnthocyaninColourationofAreaBelowApiculusLateobs}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Colour of Apiculus Late Observation</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.lemmaColourofApiculusLateobs === "" ? "---" : rice.lemmaColourofApiculusLateobs}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Shape of Apiculus</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.lemmaShapeofApiculus === "" ? "---" : rice.lemmaShapeofApiculus}</div>
              ))}
            </div>
          </tbody>
        </table>

        {/* ffffff */}
        {/* ffffff */}
        <table className="bg-yellow-300">
          <thead className="text-xs uppercase font-medium">Lemma and Palea</thead>
          <tbody className="bg-green-800 flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Pubesence</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.lemmaandPaleaPubesence === "" ? "---" : rice.lemmaandPaleaPubesence}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Colour Late Observation</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.lemmaandPaleaColourLateobs === "" ? "---" : rice.lemmaandPaleaColourLateobs}</div>
              ))}
            </div>
          </tbody>
        </table>

        {/* ffffff */}
        {/* ffffff */}
        <table className="bg-yellow-300">
          <thead className="text-xs uppercase font-medium">Panicle</thead>
          <tbody className="bg-green-800 flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Length Late Observation</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.panicleLengthLateobs === "" ? "---" : rice.panicleLengthLateobs}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Threshability</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.panicleThreshability === "" ? "---" : rice.panicleThreshability}</div>
              ))}
            </div>
          </tbody>
        </table>

        {/* ffffff */}
        {/* ffffff */}
        <table className="bg-yellow-300">
          <thead className="text-xs uppercase font-medium">Spikelet</thead>
          <tbody className="bg-green-800 flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Fertility</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.spikeletFertility === "" ? "---" : rice.spikeletFertility}</div>
              ))}
            </div>
          </tbody>
        </table>

        {/* ffffff */}
        {/* ffffff */}
        <table className="bg-yellow-300">
          <thead className="text-xs uppercase font-medium">Sterile</thead>
          <tbody className="bg-green-800 flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Lemma Length</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.sterileLemmaLength === "" ? "---" : rice.sterileLemmaLength}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Longer Sterile Lemma Length</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.longerSterileLemmaLength === "" ? "---" : rice.longerSterileLemmaLength}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Lemma Shape</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.sterileLemmaShape === "" ? "---" : rice.sterileLemmaShape}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Lemma Colour</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.sterileLemmaColour === "" ? "---" : rice.sterileLemmaColour}</div>
              ))}
            </div>
          </tbody>
        </table>

        {/* ffffff */}
      </div>

    </>

  )
}
