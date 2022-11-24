import { collection, collectionGroup, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import db from "../firebase-config"




export default function ReproductiveStage({ season }) {
  const [riceData, setRiceData] = useState([])
  useEffect(() => {

    let riceCollectionRef = collectionGroup(db, "RS_Raw_Rice_Data");

    if (season === 'All') {
      riceCollectionRef = collectionGroup(db, "RS_Raw_Rice_Data");
    }
    if (season === "Wet_Season") {
      riceCollectionRef = query(collection(db, `/SPR/Rice_Seasons/Seasons/${season}/Stages/Reprodutive_Stage/RS_Raw_Rice_Data`))
    }
    if (season === "Dry_Season") {
      riceCollectionRef = query(collection(db, `/SPR/Rice_Seasons/Seasons/${season}/Stages/Reproductive_Stage/RS_Raw_Rice_Data`))
    }

    onSnapshot(riceCollectionRef, (snapshot) => {
      setRiceData(snapshot.docs.map((doc) => doc.data()));
    });

  }, [season]);

  return (
    <>

      <div className="  flex text-sm text-sprGray60">
        {/* ffffff */}
        <table className="">
          <thead className="text-xs font-medium uppercase text-center bg-sprPrimaryOffLight">Accession</thead>
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
          <thead className="text-xs uppercase font-medium text-center bg-sprPrimaryLight">Anther</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-2 font-medium text-sprPrimary">Length</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2 bg-slate-50"> {rice.antherLength === "" ? "---" : rice.antherLength}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-2 font-medium text-sprPrimary">Colour</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2"> {rice.antherColour === "" ? "---" : rice.antherColour}</div>
              ))}
            </div>
          </tbody>
        </table>

        {/* ffffff */}
        {/* ffffff */}
        <table className="">
          <thead className="text-xs uppercase font-medium text-center bg-sprPrimaryOffLight">Awns</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-2 font-medium whitespace-nowrap text-sprPrimary">Presence Wild Species</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2 whitespace-nowrap bg-slate-50"> {rice.awnsPresenceWildSpecies === "" ? "---" : rice.awnsPresenceWildSpecies}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-2 font-medium whitespace-nowrap text-sprPrimary">Distribution Cultivated Species</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2 whitespace-nowrap"> {rice.awnsDistributionCultivatedSpecies === "" ? "---" : rice.awnsDistributionCultivatedSpecies}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-2 font-medium whitespace-nowrap text-sprPrimary">Distribution Early Observation</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2 whitespace-nowrap bg-slate-50"> {rice.awnsDistributionEarlyobs === "" ? "---" : rice.awnsDistributionEarlyobs}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-2 font-medium text-sprPrimary">Length</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2"> {rice.awnLength === "" ? "---" : rice.awnLength}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-2 font-medium whitespace-nowrap text-sprPrimary">Awns Thickness</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2 whitespace-nowrap bg-slate-50"> {rice.awnsThickness === "" ? "---" : rice.awnsThickness}</div>
              ))}
            </div>
          </tbody>
        </table>

        {/* ffffff */}
        {/* ffffff */}
        <table className="">
          <thead className="text-xs uppercase font-medium text-center bg-sprPrimaryLight">Lemma</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-2 font-medium whitespace-nowrap text-sprPrimary">Colour of Apicus Early Observation</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2 whitespace-nowrap"> {rice.lemmaColourofApicusearlyobs === "" ? "---" : rice.lemmaColourofApicusearlyobs}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-2 font-medium whitespace-nowrap text-sprPrimary">Anthocyanin Colouration of Area Below Apiculus Early Observation</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2 whitespace-nowrap bg-slate-50"> {rice.lemmaAnthocyaninColourationofAreaBelowApiculusEarlyobs === "" ? "---" : rice.lemmaAnthocyaninColourationofAreaBelowApiculusEarlyobs}</div>
              ))}
            </div>
          </tbody>
        </table>

        {/* ffffff */}
        {/* ffffff */}
        <table className="">
          <thead className="whitespace-nowrap text-xs uppercase font-medium text-center bg-sprPrimaryOffLight">Lemma and Palea</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-2 font-medium whitespace-nowrap text-sprPrimary">Colour Early Observation</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2 whitespace-nowrap"> {rice.lemmaandPaleaColourEarlyobs === "" ? "---" : rice.lemmaandPaleaColourEarlyobs}</div>
              ))}
            </div>
          </tbody>
        </table>

        {/* ffffff */}
        {/* ffffff */}
        <table className="">
          <thead className="text-xs uppercase font-medium text-center bg-sprPrimaryLight">Male Sterility</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-2 font-medium text-sprPrimary">Sterility</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2 bg-slate-50"> {rice.maleSterility === "" ? "---" : rice.maleSterility}</div>
              ))}
            </div>
          </tbody>
        </table>

        {/* ffffff */}
        {/* ffffff */}
        <table className="">
          <thead className="text-xs uppercase font-medium text-center bg-sprPrimaryOffLight">Stigma</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-2 font-medium text-sprPrimary">Colour</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2"> {rice.stigmaColour === "" ? "---" : rice.stigmaColour}</div>
              ))}
            </div>
          </tbody>
        </table>

        {/* ffffff */}
        {/* ffffff */}
        <table className="">
          <thead className="text-xs uppercase font-medium text-center bg-sprPrimaryLight">Panicle</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-2 font-medium whitespace-nowrap text-sprPrimary">Arrangement of Primary Branches</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2 whitespace-nowrap bg-slate-50"> {rice.panicleArrangementofPrimaryBranches === "" ? "---" : rice.panicleArrangementofPrimaryBranches}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-2 font-medium whitespace-nowrap text-sprPrimary">Number of Basal Primary Branches</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2 whitespace-nowrap"> {rice.panicleNumberofBasalPrimaryBranches === "" ? "---" : rice.panicleNumberofBasalPrimaryBranches}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-2 font-medium whitespace-nowrap text-sprPrimary">Distance from Base to Lowest Spikelet Insertion</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2 whitespace-nowrap bg-slate-50"> {rice.panicleDistancefromBasetoLowestSpikeletInsertion === "" ? "---" : rice.panicleDistancefromBasetoLowestSpikeletInsertion}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-2 font-medium whitespace-nowrap text-sprPrimary">Texture of Main Axis</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2 whitespace-nowrap"> {rice.panicleTextureofMainAxis === "" ? "---" : rice.panicleTextureofMainAxis}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-2 font-medium whitespace-nowrap text-sprPrimary">pNumber Per Plant</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2 whitespace-nowrap bg-slate-50"> {rice.panicleNumberPerPlant === "" ? "---" : rice.panicleNumberPerPlant}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-2 font-medium text-sprPrimary">Length</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2"> {rice.panicleLength === "" ? "---" : rice.panicleLength}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-2 font-medium whitespace-nowrap text-sprPrimary">Attitude of Main Axis</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2 whitespace-nowrap bg-slate-50"> {rice.panicleAttitudeofMainAxis === "" ? "---" : rice.panicleAttitudeofMainAxis}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-2 font-medium whitespace-nowrap text-sprPrimary">Attitude of Branches</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2 whitespace-nowrap"> {rice.panicleAttitudeofBranches === "" ? "---" : rice.panicleAttitudeofBranches}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-2 font-medium whitespace-nowrap text-sprPrimary">Secondary Branching</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2 whitespace-nowrap bg-slate-50"> {rice.panicleSecondaryBranching === "" ? "---" : rice.panicleSecondaryBranching}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-2 font-medium text-sprPrimary">Exsertion</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2"> {rice.panicleExsertion === "" ? "---" : rice.panicleExsertion}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-2 font-medium text-sprPrimary">Shattering</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2 bg-slate-50"> {rice.panicleShattering === "" ? "---" : rice.panicleShattering}</div>
              ))}
            </div>
          </tbody>
        </table>

        {/* ffffff */}
      </div>

    </>
  );
}
