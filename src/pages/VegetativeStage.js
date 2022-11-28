import { collection, collectionGroup, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "../firebase-config";
import { ReactComponent as EditIcon } from '../assets/edit-icon.svg'
import { ReactComponent as DelIcon } from '../assets/delete-icon.svg'


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
      setRiceData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

  }, [season]);
  return (


    <>
      <div className=" flex  text-sprGray60 relative">
        {/* ffffff */}
        <table className=" text-sm">
          <thead className="text-xs font-medium uppercase text-center bg-sprPrimaryOffLight">Accession </thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium text-sprPrimary">Accession</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3"> {rice.accessionId === "" ? "---" : rice.accessionId}</div>
              ))}
            </div>
          </tbody>
        </table>

        {/* ffffff */}
        {/* ffffff */}
        <table className=" text-sm">
          <thead className=" text-xs font-medium uppercase text-center bg-sprPrimaryLight">Auricle</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium text-sprPrimary">Color</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 bg-slate-50"> {rice.auricleColor === "" ? "---" : rice.auricleColor}</div>
              ))}
            </div>
          </tbody>
        </table>

        {/* ffffff */}
        {/* ffffff */}
        <table className=" text-sm">
          <thead className="text-xs font-medium uppercase text-center bg-sprPrimaryOffLight">Coleoptile</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Anthocyanin colouration</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.coleoptileAnthocyaninColouration === "" ? "---" : rice.coleoptileAnthocyaninColouration}</div>
              ))}
            </div>
          </tbody>
        </table>

        {/* ffffff */}
        {/* ffffff */}
        <table className=" text-sm">
          <thead className="text-xs font-medium uppercase text-center bg-sprPrimaryLight">Collar</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium text-sprPrimary">Colour</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 bg-slate-50"> {rice.collarColour === "" ? "---" : rice.collarColour}</div>
              ))}
            </div>
          </tbody>
        </table>

        {/* ffffff */}
        {/* ffffff */}
        <table className=" text-sm">
          <thead className="text-xs font-medium uppercase text-center bg-sprPrimaryOffLight">Culm</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium text-sprPrimary">Habit</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3"> {rice.culmHabit === "" ? "---" : rice.culmHabit}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Kneeing Ability</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.culmKneeingAbility === "" ? "---" : rice.culmKneeingAbility}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium text-sprPrimary">Length</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3"> {rice.culmLength === "" ? "---" : rice.culmLength}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium text-sprPrimary">Number</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 bg-slate-50"> {rice.culmNumber === "" ? "---" : rice.culmNumber}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Diameter at Basal Internode</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.culmDiameteratBasalInternode === "" ? "---" : rice.culmDiameteratBasalInternode}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Anthocyanin Colouration on Nodes</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.culmAnthocyaninColourationonNodes === "" ? "---" : rice.culmAnthocyaninColourationonNodes}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Underlying Node Colour</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.culmUnderlyingNodeColour === "" ? "---" : rice.culmUnderlyingNodeColour}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Internode Anthocyanin</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.culmInternodeAnthocyanin === "" ? "---" : rice.culmInternodeAnthocyanin}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Underlying Internode Colouration</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.culmUnderlyingInternodeColouration === "" ? "---" : rice.culmUnderlyingInternodeColouration}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Lodging Resistance</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.culmLodgingResistance === "" ? "---" : rice.culmLodgingResistance}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium text-sprPrimary">Strength</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3"> {rice.culmStrength === "" ? "---" : rice.culmStrength}</div>
              ))}
            </div>
          </tbody>
        </table>

        {/* ffffff */}
        {/* ffffff */}
        <table className=" text-sm">
          <thead className="text-xs font-medium uppercase text-center bg-sprPrimaryLight">Flag Leaf</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium text-sprPrimary">Length</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 bg-slate-50"> {rice.flagLeafLegnth === "" ? "---" : rice.flagLeafLegnth}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium text-sprPrimary">Width</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3"> {rice.flagLeafWidth === "" ? "---" : rice.flagLeafWidth}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Attitude Early Observation</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.flagLeafAttitudeEarlyobs === "" ? "---" : rice.flagLeafAttitudeEarlyobs}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Attitude Late Obeservation</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.flagLeafAttitudeLateobs === "" ? "---" : rice.flagLeafAttitudeLateobs}</div>
              ))}
            </div>
          </tbody>
        </table>

        {/* ffffff */}
        {/* ffffff */}
        <table className=" text-sm">
          <thead className="text-xs font-medium uppercase text-center bg-sprPrimaryOffLight">Leaf</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Margin Pubesence</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.leafMarginPubesence === "" ? "---" : rice.leafMarginPubesence}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium text-sprPrimary">Senesence</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3"> {rice.leafSenesence === "" ? "---" : rice.leafSenesence}</div>
              ))}
            </div>
          </tbody>
        </table>

        {/* ffffff */}
        {/* ffffff */}
        <table className=" text-sm">
          <thead className="text-xs font-medium uppercase text-center bg-sprPrimaryLight">Leaf Blade</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Presence Absence of Anthocyanin Colouration</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.lbPresenceAbsenceofAnthocyaninColouration === "" ? "---" : rice.lbPresenceAbsenceofAnthocyaninColouration}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Distribution of Anthocyanin Colouration</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.lbDistributionofAnthocyaninColouration === "" ? "---" : rice.lbDistributionofAnthocyaninColouration}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Intensity of Green Colour</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.lbIntensityofGreenColour === "" ? "---" : rice.lbIntensityofGreenColour}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium text-sprPrimary">Attitude</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3"> {rice.lbAttitude === "" ? "---" : rice.lbAttitude}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium text-sprPrimary">Pubesence</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 bg-slate-50"> {rice.lbPubesence === "" ? "---" : rice.lbPubesence}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Pubesence on Blade Surface</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.lbPubesenceonBladeSurface === "" ? "---" : rice.lbPubesenceonBladeSurface}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium text-sprPrimary">Length</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 bg-slate-50"> {rice.lbLength === "" ? "---" : rice.lbLength}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium text-sprPrimary">Width</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3"> {rice.lbWidth === "" ? "---" : rice.lbWidth}</div>
              ))}
            </div>
          </tbody>
        </table>

        {/* ffffff */}
        {/* ffffff */}
        <table className=" text-sm">
          <thead className="text-xs font-medium uppercase text-center bg-sprPrimaryOffLight">Leaf Sheath</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Basal Leaf Sheath Colour</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.basalLeafSheathColour === "" ? "---" : rice.basalLeafSheathColour}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Anthocyanin Colouration</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.lsAnthocyaninColouration === "" ? "---" : rice.lsAnthocyaninColouration}</div>
              ))}
            </div>
          </tbody>
        </table>

        {/* ffffff */}
        {/* ffffff */}
        <table className=" text-sm">
          <thead className="text-xs font-medium uppercase text-center bg-sprPrimaryLight">Ligule</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium text-sprPrimary">Length</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 bg-slate-50"> {rice.liguleLength === "" ? "---" : rice.liguleLength}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium text-sprPrimary">Shape</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3"> {rice.liguleShape === "" ? "---" : rice.liguleShape}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Shape Cultivated Species</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.liguleShapeCultivatedSpecies === "" ? "---" : rice.liguleShapeCultivatedSpecies}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Shape Wild Species</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.liguleShapeWildSpecies === "" ? "---" : rice.liguleShapeWildSpecies}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Margin Shape Wild Species</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.liguleMarginShapeWildSpecies === "" ? "---" : rice.liguleMarginShapeWildSpecies}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Margin Hairiness</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.liguleMarginHairiness === "" ? "---" : rice.liguleMarginHairiness}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium text-sprPrimary">Pubesence</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 bg-slate-50"> {rice.ligulePubesence === "" ? "---" : rice.ligulePubesence}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium text-sprPrimary">Colour</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3"> {rice.liguleColour === "" ? "---" : rice.liguleColour}</div>
              ))}
            </div>
          </tbody>
        </table>

        {/* ffffff */}
        {/* ffffff */}
        <table className=" text-sm">
          <thead className="text-xs whitespace-nowrap font-medium uppercase text-center bg-sprPrimaryOffLight">Rhizome and Stalon</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium text-sprPrimary">Formation</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.rhizomeandStolonFormation === "" ? "---" : rice.rhizomeandStolonFormation}</div>
              ))}
            </div>
          </tbody>
        </table>

        {/* ffffff */}
        {/* ffffff */}
        <table className=" text-sm">
          <thead className="text-xs font-medium uppercase text-center bg-sprPrimaryLight">Seedling</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium text-sprPrimary">Height</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 "> {rice.seedlingHeight === "" ? "---" : rice.seedlingHeight}</div>
              ))}
            </div>
          </tbody>
        </table>

        <table className=" text-sm sticky right-0 ">
          <thead className="text-xs font-medium uppercase text-center bg-white">
            <p className="opacity-0">Action</p>
          </thead>
          <tbody className=" flex bg-white   ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-3 py-3 font-medium text-sprPrimary opacity-0">Action</div>
              {riceData.map((rice) => (
                <div className=" px-1 py-2 flex gap-1 ">
                  <button
                    className=" p-1 mb-1   bg-gradient-to-b from-sprPrimary to-sprPrimaryDarkest hover:bg-gradient-to-t hover:from-sprPrimaryLight hover:to-sprPrimaryLight   rounded-full   shadow-slate-300 "
                    onClick={() => {
                      console.log(rice.id);
                    }}
                  >
                    <EditIcon className="h-4" />
                  </button>
                  <button
                    className=" p-1 mb-1   bg-gradient-to-b from-sprPrimary to-sprPrimaryDarkest hover:bg-gradient-to-t hover:from-sprPrimaryLight hover:to-sprPrimaryLight   rounded-full   shadow-slate-300 "
                    onClick={() => {
                      console.log(rice.id);
                    }}
                  >
                    <DelIcon className="h-4" />
                  </button>
                </div>
              ))}
            </div>
          </tbody>
        </table>

      </div>



    </>
  );
}
