import { collection, collectionGroup, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import db from "../firebase-config";


export default function VegetativeStage({ season }) {


  const [riceData, setRiceData] = useState([])
  useEffect(() => {

    let riceCollectionRef = collectionGroup(db, "VS_Raw_Rice_Data");

    if (season === 'All') {
      riceCollectionRef = collectionGroup(db, "VS_Raw_Rice_Data");
    }
    if (season === "Wet_Season") {
      riceCollectionRef = query(collection(db, `/SPR/Rice_Seasons/Seasons/${season}/Stages/Vegetative_Stage/VS_Raw_Rice_Data`))
    }
    if (season === "Dry_Season") {
      riceCollectionRef = query(collection(db, `/SPR/Rice_Seasons/Seasons/${season}/Stages/Vegetative_Stage/VS_Raw_Rice_Data`))
    }

    onSnapshot(riceCollectionRef, (snapshot) => {
      setRiceData(snapshot.docs.map((doc) => doc.data()));
    });

  }, [season]);
  return (


    <>
      <div className=" bg-green-300  flex ">
        {/* ffffff */}
        <table className="bg-yellow-300 text-sm">
          <thead className="text-xs font-medium uppercase">Accession </thead>
          <tbody className="bg-green-800 flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Accession</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2"> {rice.accessionId === "" ? "---" : rice.accessionId}</div>
              ))}
            </div>
          </tbody>
        </table>

        {/* ffffff */}
        {/* ffffff */}
        <table className="bg-yellow-300 text-sm">
          <thead className=" text-xs font-medium uppercase">Auricle</thead>
          <tbody className="bg-green-800 flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Color</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2"> {rice.auricleColor === "" ? "---" : rice.auricleColor}</div>
              ))}
            </div>
          </tbody>
        </table>

        {/* ffffff */}
        {/* ffffff */}
        <table className="bg-yellow-300 text-sm">
          <thead className="text-xs font-medium uppercase">Coleoptile</thead>
          <tbody className="bg-green-800 flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Anthocyanin colouration</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2"> {rice.coleoptileAnthocyaninColouration === "" ? "---" : rice.coleoptileAnthocyaninColouration}</div>
              ))}
            </div>
          </tbody>
        </table>

        {/* ffffff */}
        {/* ffffff */}
        <table className="bg-yellow-300 text-sm">
          <thead className="text-xs font-medium uppercase">Collar</thead>
          <tbody className="bg-green-800 flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Colour</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2"> {rice.collarColour === "" ? "---" : rice.collarColour}</div>
              ))}
            </div>
          </tbody>
        </table>

        {/* ffffff */}
        {/* ffffff */}
        <table className="bg-yellow-300 text-sm">
          <thead className="text-xs font-medium uppercase">Culm</thead>
          <tbody className="bg-green-800 flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Habit</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2"> {rice.culmHabit === "" ? "---" : rice.culmHabit}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Kneeing Ability</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2"> {rice.culmKneeingAbility === "" ? "---" : rice.culmKneeingAbility}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Length</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2"> {rice.culmLength === "" ? "---" : rice.culmLength}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Number</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2"> {rice.culmNumber === "" ? "---" : rice.culmNumber}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Diameter at Basal Internode</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2"> {rice.culmDiameteratBasalInternode === "" ? "---" : rice.culmDiameteratBasalInternode}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Anthocyanin Colouration on Nodes</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2"> {rice.culmAnthocyaninColourationonNodes === "" ? "---" : rice.culmAnthocyaninColourationonNodes}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Underlying Node Colour</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2"> {rice.culmUnderlyingNodeColour === "" ? "---" : rice.culmUnderlyingNodeColour}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Internode Anthocyanin</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2"> {rice.culmInternodeAnthocyanin === "" ? "---" : rice.culmInternodeAnthocyanin}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Underlying Internode Colouration</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2"> {rice.culmUnderlyingInternodeColouration === "" ? "---" : rice.culmUnderlyingInternodeColouration}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Lodging Resistance</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2"> {rice.culmLodgingResistance === "" ? "---" : rice.culmLodgingResistance}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Strength</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2"> {rice.culmStrength === "" ? "---" : rice.culmStrength}</div>
              ))}
            </div>
          </tbody>
        </table>

        {/* ffffff */}
        {/* ffffff */}
        <table className="bg-yellow-300 text-sm">
          <thead className="text-xs font-medium uppercase">Flag Leaf</thead>
          <tbody className="bg-green-800 flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Length</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2"> {rice.flagLeafLegnth === "" ? "---" : rice.flagLeafLegnth}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Width</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2"> {rice.flagLeafWidth === "" ? "---" : rice.flagLeafWidth}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Attitude Early Observation</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2"> {rice.flagLeafAttitudeEarlyobs === "" ? "---" : rice.flagLeafAttitudeEarlyobs}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Attitude Late Obeservation</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2"> {rice.flagLeafAttitudeLateobs === "" ? "---" : rice.flagLeafAttitudeLateobs}</div>
              ))}
            </div>
          </tbody>
        </table>

        {/* ffffff */}
        {/* ffffff */}
        <table className="bg-yellow-300 text-sm">
          <thead className="text-xs font-medium uppercase">Leaf</thead>
          <tbody className="bg-green-800 flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Margin Pubesence</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2"> {rice.leafMarginPubesence === "" ? "---" : rice.leafMarginPubesence}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Senesence</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2"> {rice.leafSenesence === "" ? "---" : rice.leafSenesence}</div>
              ))}
            </div>
          </tbody>
        </table>

        {/* ffffff */}
        {/* ffffff */}
        <table className="bg-yellow-300 text-sm">
          <thead className="text-xs font-medium uppercase">Leaf Blade</thead>
          <tbody className="bg-green-800 flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Presence Absence of Anthocyanin Colouration</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2"> {rice.lbPresenceAbsenceofAnthocyaninColouration === "" ? "---" : rice.lbPresenceAbsenceofAnthocyaninColouration}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Distribution of Anthocyanin Colouration</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2"> {rice.lbDistributionofAnthocyaninColouration === "" ? "---" : rice.lbDistributionofAnthocyaninColouration}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Intensity of Green Colour</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2"> {rice.lbIntensityofGreenColour === "" ? "---" : rice.lbIntensityofGreenColour}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Attitude</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2"> {rice.lbAttitude === "" ? "---" : rice.lbAttitude}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Pubesence</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2"> {rice.lbPubesence === "" ? "---" : rice.lbPubesence}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Pubesence on Blade Surface</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2"> {rice.lbPubesenceonBladeSurface === "" ? "---" : rice.lbPubesenceonBladeSurface}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Length</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2"> {rice.lbLength === "" ? "---" : rice.lbLength}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Width</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2"> {rice.lbWidth === "" ? "---" : rice.lbWidth}</div>
              ))}
            </div>
          </tbody>
        </table>

        {/* ffffff */}
        {/* ffffff */}
        <table className="bg-yellow-300 text-sm">
          <thead className="text-xs font-medium uppercase">Leaf Sheath</thead>
          <tbody className="bg-green-800 flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Basal Leaf Sheath Colour</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2"> {rice.basalLeafSheathColour === "" ? "---" : rice.basalLeafSheathColour}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Anthocyanin Colouration</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2"> {rice.lsAnthocyaninColouration === "" ? "---" : rice.lsAnthocyaninColouration}</div>
              ))}
            </div>
          </tbody>
        </table>

        {/* ffffff */}
        {/* ffffff */}
        <table className="bg-yellow-300 text-sm">
          <thead className="text-xs font-medium uppercase">Ligule</thead>
          <tbody className="bg-green-800 flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Length</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2"> {rice.liguleLength === "" ? "---" : rice.liguleLength}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Shape</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2"> {rice.liguleShape === "" ? "---" : rice.liguleShape}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Shape Cultivated Species</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2"> {rice.liguleShapeCultivatedSpecies === "" ? "---" : rice.liguleShapeCultivatedSpecies}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Shape Wild Species</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2"> {rice.liguleShapeWildSpecies === "" ? "---" : rice.liguleShapeWildSpecies}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Margin Shape Wild Species</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2"> {rice.liguleMarginShapeWildSpecies === "" ? "---" : rice.liguleMarginShapeWildSpecies}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Margin Hairiness</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2"> {rice.liguleMarginHairiness === "" ? "---" : rice.liguleMarginHairiness}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Pubesence</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2"> {rice.ligulePubesence === "" ? "---" : rice.ligulePubesence}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Colour</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2"> {rice.liguleColour === "" ? "---" : rice.liguleColour}</div>
              ))}
            </div>
          </tbody>
        </table>

        {/* ffffff */}
        {/* ffffff */}
        <table className="bg-yellow-300 text-sm">
          <thead className="text-xs whitespace-nowrap font-medium uppercase">Rhizome and Stalon</thead>
          <tbody className="bg-green-800 flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Formation</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2"> {rice.rhizomeandStolonFormation === "" ? "---" : rice.rhizomeandStolonFormation}</div>
              ))}
            </div>
          </tbody>
        </table>

        {/* ffffff */}
        {/* ffffff */}
        <table className="bg-yellow-300 text-sm">
          <thead className="text-xs font-medium uppercase">Seedling</thead>
          <tbody className="bg-green-800 flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 font-medium">Height</div>
              {riceData.map((rice) => (
                <div className="px-6 py-2"> {rice.seedlingHeight === "" ? "---" : rice.seedlingHeight}</div>
              ))}
            </div>
          </tbody>
        </table>

      </div>



    </>
  );
}
