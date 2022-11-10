import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "../firebase-config"




export default function ReproductiveStage() {
  const season = 'Wet_Season'
  const [riceAccessions, setRiceAccessions] = useState([])
  useEffect(() => {
    const collectionRef = collection(db, `/SPR/Rice_Seasons/Seasons/${season}/Stages/Reproductive_Stage/RS_Raw_Rice_Data`);
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
        <div className="bg-yellow-300">
          <thead className="text-xs font-medium uppercase">Accession</thead>
          <tbody className="bg-green-800 flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Accession</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.accessionId === "" ? "---" : rice.accessionId}</div>
              ))}
            </div>
          </tbody>
        </div>

        {/* ffffff */}

        {/* ffffff */}
        <div className="bg-yellow-300">
          <thead className="text-xs uppercase font-medium">Anther</thead>
          <tbody className="bg-green-800 flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Length</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.antherLength === "" ? "---" : rice.antherLength}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Colour</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.antherColour === "" ? "---" : rice.antherColour}</div>
              ))}
            </div>
          </tbody>
        </div>

        {/* ffffff */}
        {/* ffffff */}
        <div className="bg-yellow-300">
          <thead className="text-xs uppercase font-medium">Awns</thead>
          <tbody className="bg-green-800 flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Presence Wild Species</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.awnsPresenceWildSpecies === "" ? "---" : rice.awnsPresenceWildSpecies}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Distribution Cultivated Species</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.awnsDistributionCultivatedSpecies === "" ? "---" : rice.awnsDistributionCultivatedSpecies}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Distribution Early Observation</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.awnsDistributionEarlyobs === "" ? "---" : rice.awnsDistributionEarlyobs}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Length</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.awnLength === "" ? "---" : rice.awnLength}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">awnsThickness</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.awnsThickness === "" ? "---" : rice.awnsThickness}</div>
              ))}
            </div>
          </tbody>
        </div>

        {/* ffffff */}
        {/* ffffff */}
        <div className="bg-yellow-300">
          <thead className="text-xs uppercase font-medium">Lemma</thead>
          <tbody className="bg-green-800 flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Colour of Apicus Early Observation</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.lemmaColourofApicusearlyobs === "" ? "---" : rice.lemmaColourofApicusearlyobs}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Anthocyanin Colouration of Area Below Apiculus Early Observation</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.lemmaAnthocyaninColourationofAreaBelowApiculusEarlyobs === "" ? "---" : rice.lemmaAnthocyaninColourationofAreaBelowApiculusEarlyobs}</div>
              ))}
            </div>
          </tbody>
        </div>

        {/* ffffff */}
        {/* ffffff */}
        <div className="bg-yellow-300">
          <thead className="whitespace-nowrap text-xs uppercase font-medium">Lemma and Palea</thead>
          <tbody className="bg-green-800 flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Colour Early Observation</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.lemmaandPaleaColourEarlyobs === "" ? "---" : rice.lemmaandPaleaColourEarlyobs}</div>
              ))}
            </div>
          </tbody>
        </div>

        {/* ffffff */}
        {/* ffffff */}
        <div className="bg-yellow-300">
          <thead className="text-xs uppercase font-medium">Male Sterility</thead>
          <tbody className="bg-green-800 flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Sterility</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.maleSterility === "" ? "---" : rice.maleSterility}</div>
              ))}
            </div>
          </tbody>
        </div>

        {/* ffffff */}
        {/* ffffff */}
        <div className="bg-yellow-300">
          <thead className="text-xs uppercase font-medium">Panicle</thead>
          <tbody className="bg-green-800 flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Arrangement of Primary Branches</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.panicleArrangementofPrimaryBranches === "" ? "---" : rice.panicleArrangementofPrimaryBranches}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Number of Basal Primary Branches</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.panicleNumberofBasalPrimaryBranches === "" ? "---" : rice.panicleNumberofBasalPrimaryBranches}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Distance from Base to Lowest Spikelet Insertion</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.panicleDistancefromBasetoLowestSpikeletInsertion === "" ? "---" : rice.panicleDistancefromBasetoLowestSpikeletInsertion}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Texture of Main Axis</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.panicleTextureofMainAxis === "" ? "---" : rice.panicleTextureofMainAxis}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">pNumber Per Plant</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.panicleNumberPerPlant === "" ? "---" : rice.panicleNumberPerPlant}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Length</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.panicleLength === "" ? "---" : rice.panicleLength}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Attitude of Main Axis</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.panicleAttitudeofMainAxis === "" ? "---" : rice.panicleAttitudeofMainAxis}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Attitude of Branches</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.panicleAttitudeofBranches === "" ? "---" : rice.panicleAttitudeofBranches}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Secondary Branching</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.panicleSecondaryBranching === "" ? "---" : rice.panicleSecondaryBranching}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Exsertion</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.panicleExsertion === "" ? "---" : rice.panicleExsertion}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Shattering</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.panicleShattering === "" ? "---" : rice.panicleShattering}</div>
              ))}
            </div>
          </tbody>
        </div>

        {/* ffffff */}
      </div>

    </>
  );
}
