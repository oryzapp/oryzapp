import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "../firebase-config";
import RiceData from "./RiceData";


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
        {/* ffffff */}
        <div className="bg-yellow-300">
          <thead>Auricle</thead>
            <tbody className="bg-green-800 flex ">
              <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 ">Color</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.auricleColor === "" ? "---" : rice.auricleColor}</div>
              ))}
              </div>
            </tbody>
        </div>
        
        {/* ffffff */}
        {/* ffffff */}
        <div className="bg-yellow-300">
          <thead>Coleoptile</thead>
            <tbody className="bg-green-800 flex ">
              <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
              <div className="px-6 py-2 ">Anthocyanin colouration</div>
              {riceAccessions.map((rice) => (
                <div className="px-6 py-2"> {rice.coleoptileAnthocyaninColouration === "" ? "---" : rice.coleoptileAnthocyaninColouration}</div>
              ))}
              </div>
            </tbody>
        </div>
        
        {/* ffffff */}
        {/* ffffff */}
        <div className="bg-yellow-300">
          <thead>Collar</thead>
            <tbody className="bg-green-800 flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
            <div className="px-6 py-2 ">Colour</div>
            {riceAccessions.map((rice) => (
              <div className="px-6 py-2"> {rice.collarColour === "" ? "---" : rice.collarColour}</div>
            ))}
            </div>
            </tbody>
        </div>
        
        {/* ffffff */}
        {/* ffffff */}
        <div className="bg-yellow-300">
          <thead>Culm</thead>
            <tbody className="bg-green-800 flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
          <div className="px-6 py-2 ">Habit</div>
          {riceAccessions.map((rice) => (
            <div className="px-6 py-2"> {rice.culmHabit === "" ? "---" : rice.culmHabit}</div>
          ))}
        </div>
        <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
          <div className="px-6 py-2 ">Kneeing Ability</div>
          {riceAccessions.map((rice) => (
            <div className="px-6 py-2"> {rice.culmKneeingAbility === "" ? "---" : rice.culmKneeingAbility}</div>
          ))}
        </div>
        <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
          <div className="px-6 py-2 ">Length</div>
          {riceAccessions.map((rice) => (
            <div className="px-6 py-2"> {rice.culmLength === "" ? "---" : rice.culmLength}</div>
          ))}
        </div>
        <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
          <div className="px-6 py-2 ">Number</div>
          {riceAccessions.map((rice) => (
            <div className="px-6 py-2"> {rice.culmNumber === "" ? "---" : rice.culmNumber}</div>
          ))}
        </div>
        <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
          <div className="px-6 py-2 ">Diameter at Basal Internode</div>
          {riceAccessions.map((rice) => (
            <div className="px-6 py-2"> {rice.culmDiameteratBasalInternode === "" ? "---" : rice.culmDiameteratBasalInternode}</div>
          ))}
        </div>
        <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
          <div className="px-6 py-2 ">Anthocyanin Colouration on Nodes</div>
          {riceAccessions.map((rice) => (
            <div className="px-6 py-2"> {rice.culmAnthocyaninColourationonNodes === "" ? "---" : rice.culmAnthocyaninColourationonNodes}</div>
          ))}
        </div>
        <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
          <div className="px-6 py-2 ">Underlying Node Colour</div>
          {riceAccessions.map((rice) => (
            <div className="px-6 py-2"> {rice.culmUnderlyingNodeColour === "" ? "---" : rice.culmUnderlyingNodeColour}</div>
          ))}
        </div>
        <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
          <div className="px-6 py-2 ">Internode Anthocyanin</div>
          {riceAccessions.map((rice) => (
            <div className="px-6 py-2"> {rice.culmInternodeAnthocyanin === "" ? "---" : rice.culmInternodeAnthocyanin}</div>
          ))}
        </div>
        <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
          <div className="px-6 py-2 ">Underlying Internode Colouration</div>
          {riceAccessions.map((rice) => (
            <div className="px-6 py-2"> {rice.culmUnderlyingInternodeColouration === "" ? "---" : rice.culmUnderlyingInternodeColouration}</div>
          ))}
        </div>
        <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
          <div className="px-6 py-2 ">Lodging Resistance</div>
          {riceAccessions.map((rice) => (
            <div className="px-6 py-2"> {rice.culmLodgingResistance === "" ? "---" : rice.culmLodgingResistance}</div>
          ))}
        </div>
        <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
          <div className="px-6 py-2 ">Strength</div>
          {riceAccessions.map((rice) => (
            <div className="px-6 py-2"> {rice.culmStrength === "" ? "---" : rice.culmStrength}</div>
          ))}
        </div>
            </tbody>
        </div>
        
        {/* ffffff */}
        {/* ffffff */}
        <div className="bg-yellow-300">
          <thead>Flag Leaf</thead>
            <tbody className="bg-green-800 flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
          <div className="px-6 py-2 ">Length</div>
          {riceAccessions.map((rice) => (
            <div className="px-6 py-2"> {rice.flagLeafLegnth === "" ? "---" : rice.flagLeafLegnth}</div>
          ))}
        </div>
        <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
          <div className="px-6 py-2 ">Width</div>
          {riceAccessions.map((rice) => (
            <div className="px-6 py-2"> {rice.flagLeafWidth === "" ? "---" : rice.flagLeafWidth}</div>
          ))}
        </div>
        <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
          <div className="px-6 py-2 ">Attitude Early Observation</div>
          {riceAccessions.map((rice) => (
            <div className="px-6 py-2"> {rice.flagLeafAttitudeEarlyobs === "" ? "---" : rice.flagLeafAttitudeEarlyobs}</div>
          ))}
        </div>
        <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
          <div className="px-6 py-2 ">Attitude Late Obeservation</div>
          {riceAccessions.map((rice) => (
            <div className="px-6 py-2"> {rice.flagLeafAttitudeLateobs === "" ? "---" : rice.flagLeafAttitudeLateobs}</div>
          ))}
        </div>
            </tbody>
        </div>
        
        {/* ffffff */}
        {/* ffffff */}
        <div className="bg-yellow-300">
          <thead>Leaf</thead>
            <tbody className="bg-green-800 flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
          <div className="px-6 py-2 ">Margin Pubesence</div>
          {riceAccessions.map((rice) => (
            <div className="px-6 py-2"> {rice.leafMarginPubesence === "" ? "---" : rice.leafMarginPubesence}</div>
          ))}
        </div>
        <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
          <div className="px-6 py-2 ">Senesence</div>
          {riceAccessions.map((rice) => (
            <div className="px-6 py-2"> {rice.leafSenesence === "" ? "---" : rice.leafSenesence}</div>
          ))}
        </div>
          </tbody>
        </div>
        
        {/* ffffff */}
        {/* ffffff */}
        <div className="bg-yellow-300">
          <thead>Leaf Blade</thead>
            <tbody className="bg-green-800 flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
          <div className="px-6 py-2 ">Presence Absence of Anthocyanin Colouration</div>
          {riceAccessions.map((rice) => (
            <div className="px-6 py-2"> {rice.lbPresenceAbsenceofAnthocyaninColouration === "" ? "---" : rice.lbPresenceAbsenceofAnthocyaninColouration}</div>
          ))}
        </div>
        <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
          <div className="px-6 py-2 ">Distribution of Anthocyanin Colouration</div>
          {riceAccessions.map((rice) => (
            <div className="px-6 py-2"> {rice.lbDistributionofAnthocyaninColouration === "" ? "---" : rice.lbDistributionofAnthocyaninColouration}</div>
          ))}
        </div>
        <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
          <div className="px-6 py-2 ">Intensity of Green Colour</div>
          {riceAccessions.map((rice) => (
            <div className="px-6 py-2"> {rice.lbIntensityofGreenColour === "" ? "---" : rice.lbIntensityofGreenColour}</div>
          ))}
        </div>
        <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
          <div className="px-6 py-2 ">Attitude</div>
          {riceAccessions.map((rice) => (
            <div className="px-6 py-2"> {rice.lbAttitude === "" ? "---" : rice.lbAttitude}</div>
          ))}
        </div>
        <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
          <div className="px-6 py-2 ">Pubesence</div>
          {riceAccessions.map((rice) => (
            <div className="px-6 py-2"> {rice.lbPubesence === "" ? "---" : rice.lbPubesence}</div>
          ))}
        </div>
        <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
          <div className="px-6 py-2 ">Pubesence on Blade Surface</div>
          {riceAccessions.map((rice) => (
            <div className="px-6 py-2"> {rice.lbPubesenceonBladeSurface === "" ? "---" : rice.lbPubesenceonBladeSurface}</div>
          ))}
        </div>
        <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
          <div className="px-6 py-2 ">Length</div>
          {riceAccessions.map((rice) => (
            <div className="px-6 py-2"> {rice.lbLength === "" ? "---" : rice.lbLength}</div>
          ))}
        </div>
        <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
          <div className="px-6 py-2 ">Width</div>
          {riceAccessions.map((rice) => (
            <div className="px-6 py-2"> {rice.lbWidth === "" ? "---" : rice.lbWidth}</div>
          ))}
        </div>
            </tbody>
        </div>
        
        {/* ffffff */}
        {/* ffffff */}
        <div className="bg-yellow-300">
          <thead>Leaf Sheath</thead>
            <tbody className="bg-green-800 flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
          <div className="px-6 py-2 ">Basal Leaf Sheath Colour</div>
          {riceAccessions.map((rice) => (
            <div className="px-6 py-2"> {rice.basalLeafSheathColour === "" ? "---" : rice.basalLeafSheathColour}</div>
          ))}
        </div>
        <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
          <div className="px-6 py-2 ">Anthocyanin Colouration</div>
          {riceAccessions.map((rice) => (
            <div className="px-6 py-2"> {rice.lsAnthocyaninColouration === "" ? "---" : rice.lsAnthocyaninColouration}</div>
          ))}
        </div>
            </tbody>
        </div>
        
        {/* ffffff */}
        {/* ffffff */}
        <div className="bg-yellow-300">
          <thead>Ligule</thead>
            <tbody className="bg-green-800 flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
          <div className="px-6 py-2 ">Length</div>
          {riceAccessions.map((rice) => (
            <div className="px-6 py-2"> {rice.liguleLength === "" ? "---" : rice.liguleLength}</div>
          ))}
        </div>
        <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
          <div className="px-6 py-2 ">Shape</div>
          {riceAccessions.map((rice) => (
            <div className="px-6 py-2"> {rice.liguleShape === "" ? "---" : rice.liguleShape}</div>
          ))}
        </div>
        <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
          <div className="px-6 py-2 ">Shape Cultivated Species</div>
          {riceAccessions.map((rice) => (
            <div className="px-6 py-2"> {rice.liguleShapeCultivatedSpecies === "" ? "---" : rice.liguleShapeCultivatedSpecies}</div>
          ))}
        </div>
        <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
          <div className="px-6 py-2 ">Shape Wild Species</div>
          {riceAccessions.map((rice) => (
            <div className="px-6 py-2"> {rice.liguleShapeWildSpecies === "" ? "---" : rice.liguleShapeWildSpecies}</div>
          ))}
        </div>
        <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
          <div className="px-6 py-2 ">Margin Shape Wild Species</div>
          {riceAccessions.map((rice) => (
            <div className="px-6 py-2"> {rice.liguleMarginShapeWildSpecies === "" ? "---" : rice.liguleMarginShapeWildSpecies}</div>
          ))}
        </div>
        <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
          <div className="px-6 py-2 ">Margin Hairiness</div>
          {riceAccessions.map((rice) => (
            <div className="px-6 py-2"> {rice.liguleMarginHairiness === "" ? "---" : rice.liguleMarginHairiness}</div>
          ))}
        </div>
        <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
          <div className="px-6 py-2 ">Pubesence</div>
          {riceAccessions.map((rice) => (
            <div className="px-6 py-2"> {rice.ligulePubesence === "" ? "---" : rice.ligulePubesence}</div>
          ))}
        </div>
        <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
          <div className="px-6 py-2 ">Colour</div>
          {riceAccessions.map((rice) => (
            <div className="px-6 py-2"> {rice.liguleColour === "" ? "---" : rice.liguleColour}</div>
          ))}
        </div>
            </tbody>
        </div>
        
        {/* ffffff */}
        {/* ffffff */}
        <div className="bg-yellow-300">
          <thead className="whitespace-nowrap">Rhizome and Stalon</thead>
            <tbody className="bg-green-800 flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
          <div className="px-6 py-2 ">Formation</div>
          {riceAccessions.map((rice) => (
            <div className="px-6 py-2"> {rice.rhizomeandStolonFormation === "" ? "---" : rice.rhizomeandStolonFormation}</div>
          ))}
        </div>
            </tbody>
        </div>
        
        {/* ffffff */}
        {/* ffffff */}
        <div className="bg-yellow-300">
          <thead>Seedling</thead>
            <tbody className="bg-green-800 flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
          <div className="px-6 py-2 ">Height</div>
          {riceAccessions.map((rice) => (
            <div className="px-6 py-2"> {rice.seedlingHeight === "" ? "---" : rice.seedlingHeight}</div>
          ))}
        </div>
            </tbody>
        </div>
        
        {/* ffffff */}
      </div>

    </>
  );
}
